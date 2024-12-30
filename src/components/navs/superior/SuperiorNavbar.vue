<template>
  <nav class="mb-2 p-2 bg-white rounded shadow-sm">
    <div class="flex justify-between items-center">
      <div>
        <button @click="toggleSidebar" class="">
          <vue-feather v-if="isMobile" type="menu"></vue-feather>
        </button>
      </div>
      <div class="flex space-x-2">
        <ripple-button>
          <vue-feather class="text-slate-600" type="sun"></vue-feather>
        </ripple-button>
        <ripple-button>
          <vue-feather class="text-slate-600" type="bell"></vue-feather>
        </ripple-button>
        <ripple-button>
          <vue-feather class="text-slate-600" type="info"></vue-feather>
        </ripple-button>
        <div class="relative inline-block text-left">
          <!-- Botón del dropdown -->
          <button
            @click="toggleDropdown"
            type="button"
            class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-purple-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Opciones
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Menú del dropdown -->
          <div
            v-if="isOpen"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <a
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="menu-item-2"
              >
                Cerrar sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSidebarStore } from '@/stores/sidenav'
import RippleButton from '@/components/buttons/RippleButton.vue'
// import DashDotDrowpdown from '@/components/dropdowns/DashDotDrowpdown.vue'
const isOpen = ref(false)
const $body = document.querySelector('body')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const sidebarStore = useSidebarStore()

const isMobile = computed(() => sidebarStore.isMobile)

const toggleSidebar = () => {
  sidebarStore.isMobileOpen = !sidebarStore.isMobileOpen
}
if ($body) {
  $body.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isOpen.value = false
    }
  })
}
</script>
