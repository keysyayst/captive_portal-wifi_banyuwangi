<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import PortalLayout from '@/layouts/PortalLayout.vue';

defineOptions({ layout: PortalLayout });
</script>

<template>
    <Head title="Terms of use" />
    <article class="mx-auto max-w-3xl py-12 lg:py-20">
        <Link
            href="/portal"
            class="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >Back to connection</Link
        >
        <h1 class="mt-6 text-4xl font-black tracking-tight">Terms of use</h1>
        <p class="mt-4 text-slate-400">
            Please use this public network responsibly and lawfully.
        </p>
        <div class="mt-10 space-y-8 text-slate-300">
            <section>
                <h2 class="text-lg font-bold text-white">Responsible access</h2>
                <p class="mt-2 leading-7">
                    Do not use the network to access unlawful content, attack
                    other devices, or disrupt the service for other visitors.
                </p>
            </section>
            <section>
                <h2 class="text-lg font-bold text-white">Privacy</h2>
                <p class="mt-2 leading-7">
                    Connection metadata may be recorded to keep the service
                    secure, understand usage, and troubleshoot network issues.
                </p>
            </section>
            <section>
                <h2 class="text-lg font-bold text-white">
                    Service availability
                </h2>
                <p class="mt-2 leading-7">
                    Public WiFi is provided as-is. Speeds and availability can
                    vary by location and network demand.
                </p>
            </section>
        </div>
    </article>
</template>
