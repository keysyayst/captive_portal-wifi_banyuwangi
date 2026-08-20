<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue';
import type { PortalLoginState } from '@/types/portal';

const props = defineProps<{
  form: Pick<PortalLoginState, 'countryCode' | 'phone' | 'agreed'>;
  locationText: string;
  locationLoading: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:phone', value: string): void;
  (e: 'update:countryCode', value: string): void;
  (e: 'toggle-agree'): void;
  (e: 'show-terms'): void;
  (e: 'connect'): void;
}>();


const countries = ref<any[]>([]);
const countriesLoading = ref(true);
const selectedCountry = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('/api/countries');

    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    const data = await response.json();

    countries.value = data.countries || [];

    selectedCountry.value =
      countries.value.find((c) => c.code === 'ID') ||
      countries.value[0];
  } catch (error) {
    console.error('Error fetching countries:', error);

    countries.value = [
      {
        phone_code: '+62',
        name: 'Indonesia',
        code: 'ID'
      },
      {
        phone_code: '+65',
        name: 'Singapore',
        code: 'SG'
      },
      {
        phone_code: '+60',
        name: 'Malaysia',
        code: 'MY'
      }
    ];

    selectedCountry.value = countries.value[0];
  } finally {
    countriesLoading.value = false;
  }
});

function handleCountryChange(country: any) {
  selectedCountry.value = country;
  emit('update:countryCode', country.phone_code);
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

function onPhoneInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;

  emit('update:phone', formatPhone(value));
}

const rawPhoneLength = computed(() => {
  return props.form.phone.replace(/\s/g, '').length;
});

const isValid = computed(() => {
  return rawPhoneLength.value >= 8 && props.form.agreed;
});
</script>

<template>
  <div class="px-5 sm:px-6 pb-6 pt-4 space-y-5 anim-up">
    <div
      v-if="error"
      class="rounded-xl px-4 py-3 text-xs font-medium"
      style="
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #b91c1c;
      "
    >
      {{ error }}
    </div>

    <div class="text-center space-y-1">

      <p
        class="text-2xl font-bold font-display leading-tight tracking-tight"
        style="color: #0c1730;"
      >
        Selamat Datang
      </p>

      <p class="text-xs text-slate-400">
        Masukkan nomor HP dan verifikasi untuk mulai browsing
      </p>

      <div class="flex items-center justify-center gap-1.5 py-1">

        <span
          v-if="locationLoading"
          class="flex items-center gap-2 text-xs text-slate-400"
        >
          <span class="w-3.5 h-3.5 text-teal-500 opacity-60">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="spinning"
            >
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              />
            </svg>
          </span>
          Mendeteksi lokasi...
        </span>

        <span
          v-else
          class="flex items-center gap-1.5 text-xs text-teal-600 font-medium truncate max-w-60"
        >

          <span class="w-3.5 h-3.5 text-teal-500">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
              />

              <circle
                cx="12"
                cy="10"
                r="3"
              />
            </svg>

          </span>

          <span class="truncate">
            {{ locationText }}
          </span>

          <span
            class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot shrink-0"
          />

        </span>
      </div>
    </div>

    <div>
      <label
        class="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2"
      >
        Nomor Telepon / HP
      </label>


      <div class="flex gap-2">

        <Listbox
          :model-value="selectedCountry"
          @update:model-value="handleCountryChange"
        >

          <div class="relative w-18 shrink-0">

            <ListboxButton
              class="
                relative
                w-full
                px-3
                py-2.5
                text-left
                bg-white
                border
                border-slate-300
                rounded-lg
                cursor-pointer
                hover:border-teal-500
                focus:outline-none
                focus:ring-2
                focus:ring-teal-200
                transition-all
                text-sm
              "
            >

              <span
                v-if="countriesLoading"
                class="text-slate-400"
              >
                Loading...
              </span>

              <span
                v-else
                class="block truncate pr-5"
              >
                {{ selectedCountry?.phone_code }}
              </span>


              <span
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >

                <svg
                  class="w-4 h-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>

              </span>

            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >

              <ListboxOptions
                class="
                  absolute
                  z-50
                  w-max
                  min-w-50
                  py-1
                  mt-1
                  overflow-auto
                  text-sm
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  shadow-lg
                  max-h-48
                "
              >

                <ListboxOption
                  v-for="country in countries"
                  v-slot="{ active, selected }"
                  :key="country.code"
                  :value="country"
                  as="template"
                >

                  <li
                    :class="[
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active
                        ? 'bg-teal-100 text-teal-900'
                        : 'text-slate-900',
                      selected
                        ? 'bg-teal-50 font-semibold'
                        : ''
                    ]"
                  >

                    <span class="block truncate">
                      {{ country.name }}
                      ({{ country.phone_code }})
                    </span>


                    <span
                      v-if="selected"
                      class="
                        absolute
                        inset-y-0
                        left-0
                        flex
                        items-center
                        pl-3
                        text-teal-600
                      "
                    >

                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                        />
                      </svg>
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <div class="relative flex-1 min-w-0">

          <input
            type="tel"
            inputmode="numeric"
            placeholder="812 3456 7890"
            class="card-input w-full"
            style="letter-spacing: normal;"
            maxlength="13"
            :value="form.phone"
            @input="onPhoneInput"
          />

          <div
            v-if="rawPhoneLength >= 8"
            class="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-teal-500
              w-4
              h-4
              pointer-events-none
            "
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-start gap-3 sm:gap-4">

      <button
        type="button"
        @click="emit('toggle-agree')"
        class="shrink-0 mt-0.5 cursor-pointer"
        aria-label="Setujui syarat dan ketentuan"
      >

        <div
          class="
            w-7
            h-7
            rounded-lg
            border-2
            flex
            items-center
            justify-center
            transition-all
          "
          :style="
            form.agreed
              ? {
                  borderColor: '#0891b2',
                  background: '#0891b2'
                }
              : {
                  borderColor: '#cbd5e1',
                  background: '#ffffff'
                }
          "
        >

          <svg
            v-if="form.agreed"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4 text-white"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>

        </div>

      </button>

      <p
        class="
          flex-1
          min-w-0
          text-sm
          leading-relaxed
          text-slate-500
          select-none
        "
      >

        Saya telah membaca dan menyetujui

        <button
          type="button"
          class="
            inline
            font-semibold
            underline
            underline-offset-2
            text-teal-600
            hover:text-teal-700
            transition-colors
          "
          @click="emit('show-terms')"
        >
          Syarat &amp; Ketentuan Penggunaan
        </button>
        layanan WiFi Gratis Banyuwangi.
      </p>

    </div>


    <button
      type="button"
      class="
        w-full
        py-3.5
        rounded-xl
        font-bold
        text-sm
        font-display
        tracking-wide
        transition-all
      "
      :disabled="!isValid"
      :style="
        isValid
          ? {
              background:
                'linear-gradient(135deg, #0e6a7f 0%, #0891b2 60%, #06b6d4 100%)',
              color: '#fff',
              cursor: 'pointer',
              boxShadow:
                '0 4px 20px rgba(8,145,178,0.3)'
            }
          : {
              background: '#f1f5f9',
              color: '#94a3b8',
              cursor: 'not-allowed',
              boxShadow: 'none'
            }
      "
      @click="emit('connect')"
    >
      Hubungkan
    </button>

  </div>
</template>


<style scoped>

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.live-dot {
  animation: pulse-dot 1.8s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.45;
    transform: scale(0.8);
  }
}

@media (max-width: 380px) {
  .card-input {
    font-size: 14px;
  }
}
</style>