<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="min-h-screen bg-slate-950 text-white">
        <header
            class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8"
        >
            <Link href="/portal" class="flex items-center gap-3">
                <span
                    class="flex size-10 items-center justify-center rounded-2xl bg-cyan-400 font-black text-slate-950"
                    >W</span
                >
                <span>
                    <span class="block text-sm font-bold tracking-wide"
                        >Banyuwangi WiFi</span
                    >
                    <span class="block text-xs text-slate-400"
                        >Public access portal</span
                    >
                </span>
            </Link>
            <Link
                href="/portal/terms"
                class="text-sm text-slate-300 transition hover:text-cyan-300"
                >Terms</Link
            >
        </header>

        <main class="mx-auto w-full max-w-6xl px-6 pb-12 lg:px-8">
            <slot />
        </main>

        <footer
            class="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-slate-500 lg:px-8"
        >
            Secure public internet access for visitors in Banyuwangi.
        </footer>
    </div>
</template>
