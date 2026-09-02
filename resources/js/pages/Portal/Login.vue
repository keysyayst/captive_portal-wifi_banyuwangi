<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue';
import PortalLayout from '@/layouts/PortalLayout.vue';
import CardLogos from '@/components/Portal/CardLogos.vue';
import LoginStep from '@/components/Portal/LoginStep.vue';
import NikStep from '@/components/Portal/NikStep.vue';
import OtpMethodStep from '@/components/Portal/OtpMethodStep.vue';
import OtpStep from '@/components/Portal/OtpStep.vue';
import Terms from '@/pages/Portal/Terms.vue';
import { usePortalLocation } from '@/composables/usePortalLocation';
import { useOtpTimer } from '@/composables/useOtpTimer';
import type { OtpMethod, PortalStep } from '@/types/portal';

interface Slider {
  id: number;
  image_path: string;
  type: string;
}

defineOptions({ layout: PortalLayout });
const props = defineProps<{
  error?: string | null;
  mac?: string | null;
  ap?: string | null;
  nik?: string | null;
  sliders?: Slider[];
}>();

const step = ref<PortalStep>('login');
const termsOpen = ref(false);
const submitting = ref(false);
const loginMethod = ref<'phone' | 'nik'>('phone');

const form = reactive({
  countryCode: '+62',
  phone: '',
  nik: '',
  agreed: false,
  method: 'whatsapp' as OtpMethod,
  otp: ['', '', '', '', '', ''] as string[],
});

// Fetch login method setting from server
onMounted(async () => {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    if (data.login_method) {
      loginMethod.value = data.login_method as 'phone' | 'nik';
    }
  } catch (err) {
    console.error('Failed to fetch config:', err);
  }
});

const { location, loading: locationLoading, detect } = usePortalLocation();
detect();

const { remaining, start: startTimer } = useOtpTimer(60);

const maskedPhone = computed(() => {
  const raw = form.phone.replace(/\s/g, '');
  return `${form.countryCode} ${raw.slice(0, 3)}*** ${raw.slice(-3)}`;
});

function fullPhone() {
  return `${form.countryCode.replace(/\D/g, '')}${form.phone.replace(/\s/g, '')}`;
}

function toggleAgree() {
  form.agreed = !form.agreed;
}

function goToOtpMethod() {
  const raw = form.phone.replace(/\s/g, '');
  if (raw.length >= 8 && form.agreed) step.value = 'otp-method';
}

function connectPhone() {
  const raw = form.phone.replace(/\s/g, '');
  if (raw.length >= 8 && form.agreed) {
    // Bypass OTP - go directly to verify
    verifyPhone();
  }
}

function connectNik() {
  const rawNik = form.nik.replace(/\D/g, '');
  if (rawNik.length === 16 && form.agreed) {
    verifyNik();
  }
}

function sendOtp() {
  step.value = 'otp';
  form.otp = ['', '', '', '', '', ''];
  startTimer();
}

function resendOtp() {
  form.otp = ['', '', '', '', '', ''];
  startTimer();
}

const submitError = ref<string | null>(null);

function detectDeviceType() {
  if (typeof navigator === 'undefined') return 'unknown';
  return /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

async function verifyPhone() {
  if (submitting.value) return;
  submitting.value = true;
  submitError.value = null;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        phone_number: fullPhone(),
        otp: '', // Empty OTP for phone login
        mac_address: props.mac || '00:00:00:00:00:00',
        device_type: detectDeviceType(),
        access_point_location: props.ap || 'dummy-ap',
        terms_agreed: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      submitError.value = data.message ?? 'Login gagal, coba lagi.';
      return;
    }

    localStorage.setItem('portal_token', data.token);
    window.location.href = data.redirect_url;
  } catch (err) {
    submitError.value = 'Tidak bisa terhubung ke server, coba lagi.';
  } finally {
    submitting.value = false;
  }
}

async function verifyNik() {
  if (submitting.value) return;
  submitting.value = true;
  submitError.value = null;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        nik: form.nik,
        otp: '', // Empty OTP for NIK login
        mac_address: props.mac || '00:00:00:00:00:00',
        device_type: detectDeviceType(),
        access_point_location: props.ap || 'dummy-ap',
        terms_agreed: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      submitError.value = data.message ?? 'Login gagal, coba lagi.';
      return;
    }

    localStorage.setItem('portal_token', data.token);
    window.location.href = data.redirect_url;
  } catch (err) {
    submitError.value = 'Tidak bisa terhubung ke server, coba lagi.';
  } finally {
    submitting.value = false;
  }
}

async function verify() {
  if (form.otp.some((d) => !d) || submitting.value) return;
  submitting.value = true;
  submitError.value = null;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        phone_number: fullPhone(),
        otp: form.otp.join(''),
        mac_address: props.mac || '00:00:00:00:00:00',
        device_type: detectDeviceType(),
        access_point_location: props.ap || 'dummy-ap',
        terms_agreed: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      submitError.value = data.message ?? 'Verifikasi gagal, coba lagi.';
      return;
    }

    localStorage.setItem('portal_token', data.token);
    window.location.href = data.redirect_url;
  } catch (err) {
    submitError.value = 'Tidak bisa terhubung ke server, coba lagi.';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <CardLogos />

  <!-- Step 1: Login (Phone or NIK based on settings) -->
  <Transition v-if="step === 'login'" name="step-fade" mode="out-in">
    <!-- Phone Login Flow -->
    <LoginStep
      v-if="loginMethod === 'phone'"
      key="login-phone"
      :form="form"
      :location-text="location"
      :location-loading="locationLoading"
      :error="submitError || error"
      @update:phone="(v) => (form.phone = v)"
      @update:country-code="(v) => (form.countryCode = v)"
      @toggle-agree="toggleAgree"
      @show-terms="termsOpen = true"
      @connect="connectPhone"
    />

    <!-- NIK Login Flow -->
    <NikStep
      v-else
      key="login-nik"
      :form="{ nik: form.nik, agreed: form.agreed }"
      :location-text="location"
      :location-loading="locationLoading"
      :error="submitError || error"
      :submitting="submitting"
      @update:nik="(v) => (form.nik = v)"
      @toggle-agree="toggleAgree"
      @show-terms="termsOpen = true"
      @connect="connectNik"
    />
  </Transition>

  <!-- Step 2: OTP Method Selection (only for phone with OTP enabled - currently disabled) -->
  <Transition v-if="step === 'otp-method' && loginMethod === 'phone'" name="step-fade" mode="out-in">
    <OtpMethodStep
      key="otp-method"
      :method="form.method"
      :masked-phone="maskedPhone"
      @update:method="(v) => (form.method = v)"
      @back="step = 'login'"
      @send="sendOtp"
    />
  </Transition>

  <!-- Step 3: OTP Verification (only for phone with OTP enabled - currently disabled) -->
  <Transition v-if="step === 'otp' && loginMethod === 'phone'" name="step-fade" mode="out-in">
    <OtpStep
      key="otp"
      :otp="form.otp"
      :method="form.method"
      :masked-phone="maskedPhone"
      :remaining="remaining"
      :error="submitError"
      @update:otp="(v) => (form.otp = v)"
      @back="step = 'otp-method'"
      @verify="verify"
      @resend="resendOtp"
    />
  </Transition>

  <div class="pb-2" />

  <Terms :open="termsOpen" @close="termsOpen = false" />
</template>

<style scoped>
.step-fade-enter-active { animation: slide-up 0.45s cubic-bezier(0.22, 0.68, 0, 1.1) both; }
</style>
