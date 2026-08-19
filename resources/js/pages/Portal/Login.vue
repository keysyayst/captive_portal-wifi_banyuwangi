<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import PortalLayout from '@/layouts/PortalLayout.vue';

defineOptions({ layout: PortalLayout });

const form = ref({
    phone_number: '',
    mac_address: '',
    device_type: 'mobile',
    terms_agreed: false,
});
const processing = ref(false);
const error = ref('');

async function login() {
    error.value = '';
    if (!form.value.terms_agreed) {
        error.value = 'Please accept the terms before continuing.';
        return;
    }
    processing.value = true;
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ...form.value,
                ip_address: 'portal-client',
            }),
        });
        const data = await response.json();
        if (!response.ok)
            throw new Error(data.message ?? 'Unable to connect right now.');
        window.location.href = data.redirect_url ?? 'https://banyuwangi.go.id';
    } catch (exception) {
        error.value =
            exception instanceof Error
                ? exception.message
                : 'Unable to connect right now.';
    } finally {
        processing.value = false;
    }
}
</script>

<template>
    <Head title="Connect to WiFi" />
    <section
        class="grid items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-20"
    >
        <div>
            <p
                class="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase"
            >
                Welcome online
            </p>
            <h1
                class="mt-5 max-w-xl text-5xl leading-[1.05] font-black tracking-tight lg:text-7xl"
            >
                Good places feel better connected.
            </h1>
            <p class="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Join the Banyuwangi public network and enjoy fast, reliable
                access during your visit.
            </p>
        </div>
        <form
            @submit.prevent="login"
            class="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl shadow-cyan-950/40 sm:p-8"
        >
            <h2 class="text-2xl font-bold">Connect to the network</h2>
            <p class="mt-2 text-sm text-slate-500">
                It only takes a few seconds.
            </p>
            <div
                v-if="error"
                class="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
            >
                {{ error }}
            </div>
            <label class="mt-6 block text-sm font-semibold"
                >Phone number<input
                    v-model="form.phone_number"
                    required
                    type="tel"
                    class="mt-2 w-full rounded-xl border-slate-200 px-4 py-3 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="08xxxxxxxxxx"
            /></label>
            <label class="mt-4 block text-sm font-semibold"
                >Device<input
                    v-model="form.device_type"
                    type="text"
                    class="mt-2 w-full rounded-xl border-slate-200 px-4 py-3 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Mobile, laptop, tablet"
            /></label>
            <label class="mt-5 flex items-start gap-3 text-sm text-slate-600"
                ><input
                    v-model="form.terms_agreed"
                    type="checkbox"
                    class="mt-0.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                /><span
                    >I agree to the
                    <Link
                        href="/portal/terms"
                        class="font-semibold text-cyan-700 hover:underline"
                        >terms of use</Link
                    >.</span
                ></label
            >
            <button
                :disabled="processing"
                type="submit"
                class="mt-7 w-full rounded-xl bg-cyan-400 px-4 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
            >
                {{ processing ? 'Connecting...' : 'Connect securely' }}
            </button>
        </form>
    </section>
</template>
