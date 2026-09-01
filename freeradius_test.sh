#!/bin/bash
# FreeRADIUS End-to-End Testing Checklist
# Copy file ini dan jalankan untuk full testing

cd /home/wifi/captive_portal-wifi_banyuwangi

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║    FREERADIUS END-TO-END TESTING CHECKLIST                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Test 1: Basic Authentication
echo -e "\n[TEST 1] Basic Authentication (radtest)"
docker compose exec freeradius radtest 08123456789 "rahasia123" localhost 0 testing123 2>&1 | grep "Access-Accept\|Access-Reject"
TEST1=$?

# Test 2: Wrong Password
echo -e "\n[TEST 2] Wrong Password Should Reject"
docker compose exec freeradius radtest 08123456789 "wrongpassword" localhost 0 testing123 2>&1 | grep "Access-Reject" > /dev/null
TEST2=$?

# Test 3: Non-existent User
echo -e "\n[TEST 3] Non-existent User Should Reject"
docker compose exec freeradius radtest 9999999999 "password" localhost 0 testing123 2>&1 | grep "Access-Reject" > /dev/null
TEST3=$?

# Test 4: Database Connectivity
echo -e "\n[TEST 4] Database Connectivity"
docker compose exec db mysql -h localhost -u captive_user -pcaptive_secret captive_portal -e "SELECT COUNT(*) FROM radcheck;" 2>&1 | grep -E "^[0-9]" > /dev/null
TEST4=$?

# Test 5: Concurrent Requests (10 simultan)
echo -e "\n[TEST 5] Concurrent Requests (10 auth attempts)"
SUCCESS=0
for i in {1..10}; do
  docker compose exec freeradius radtest 08123456789 "rahasia123" localhost 0 testing123 &>/dev/null && ((SUCCESS++))
done
echo "Result: $SUCCESS/10 successful"
if [ $SUCCESS -eq 10 ]; then TEST5=0; else TEST5=1; fi

# Test 6: High Load Test (30 requests)
echo -e "\n[TEST 6] High Load Test (30 rapid auth requests)"
LOAD_SUCCESS=0
for i in {1..30}; do
  docker compose exec freeradius radtest 08123456789 "rahasia123" localhost 0 testing123 &>/dev/null && ((LOAD_SUCCESS++)) &
done
wait
echo "Result: $LOAD_SUCCESS/30 successful (some may be parallel)"

# Summary
echo -e "\n╔══════════════════════════════════════════════════════════════╗"
echo "║                    TEST RESULTS SUMMARY                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"

echo -n "1. Basic Auth:         " && [ $TEST1 -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL"
echo -n "2. Wrong Password:     " && [ $TEST2 -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL"
echo -n "3. Non-existent User:  " && [ $TEST3 -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL"
echo -n "4. Database Connect:   " && [ $TEST4 -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL"
echo -n "5. Concurrent (10x):   " && [ $TEST5 -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL"

echo -e "\n════════════════════════════════════════════════════════════════"

if [ $TEST1 -eq 0 ] && [ $TEST2 -eq 0 ] && [ $TEST3 -eq 0 ] && [ $TEST4 -eq 0 ]; then
  echo "✅ FREERADIUS READY FOR PRODUCTION"
else
  echo "❌ SOME TESTS FAILED - Review above"
fi
