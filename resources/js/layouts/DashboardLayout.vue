<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const navigation = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Active users', href: '/dashboard/active-users' },
    { label: 'Login history', href: '/dashboard/login-history' },
    { label: 'Manajemen AP', href: '/dashboard/ap-management' },
    { label: 'Pengaturan Portal', href: '/dashboard/settings' },
];

const page = usePage();
const currentPageLabel = computed(() => {
    const currentPath = page.url.split('?')[0];

    return navigation.find((item) => item.href === currentPath)?.label ?? 'Dashboard';
});
</script>

<template>
    <div class="min-h-screen bg-slate-100 text-slate-900 font-sans">
        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-cyan-800 px-5 py-6 lg:block z-20" style="background: linear-gradient(90deg, #0e6a7f, #0891b2);">
            <!-- Sidebar Header dengan Logo Instansi -->
            <Link href="/dashboard" class="flex items-center gap-3 px-2 group mb-8">
                <div class="flex items-center gap-1.5 shrink-0">
                    <img src="/images/logo_bwi.png" alt="Pemkab Banyuwangi" class="h-8 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105" />
                    <img src="/images/logo_kominfo.png" alt="Kominfo Banyuwangi" class="h-8 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105" />
                </div>
                <div class="flex flex-col">
                    <span class="text-base font-bold font-display tracking-tight text-white group-hover:text-cyan-100 transition-colors leading-tight">WiFi Control</span>
                    <span class="text-[9px] font-bold tracking-widest text-slate-100 uppercase leading-tight mt-0.5">Kominfo Banyuwangi</span>
                </div>
            </Link>

            <nav class="space-y-1.5">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                    :class="$page.url === item.href ? 'bg-white/20 text-white border-l-4 border-cyan-200' : 'text-slate-100 hover:bg-white/10 hover:text-white'"
                >
                    {{ item.label }}
                </Link>
            </nav>
        </aside>

        <div class="lg:pl-64">
            <!-- Header Atas -->
            <header class="flex items-center border-b border-cyan-800 px-6 py-4 lg:px-10 sticky top-0 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)]" style="background: #0891b2;">
                <h1 class="text-xl font-black font-display text-white tracking-tight">{{ currentPageLabel }}</h1>
            </header>

            <!-- Navigasi Mobile -->
            <nav class="flex gap-2 overflow-x-auto border-b border-cyan-800 px-6 py-3 lg:hidden" style="background: linear-gradient(90deg, #0e6a7f, #0891b2);">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                    :class="$page.url === item.href ? 'bg-white/20 text-white font-semibold' : 'text-slate-100 hover:bg-white/10 hover:text-white'"
                >
                    {{ item.label }}
                </Link>
            </nav>

            <!-- Konten Utama -->
            <main class="p-6 lg:p-10 anim-up">
                <slot />
            </main>
        </div>
    </div>
</template>
