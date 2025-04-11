// src/stores/sidebar.js
import { defineStore } from 'pinia'

const local = localStorage.getItem('sidebar')
const isOpen = local ? JSON.parse(local) : true

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: isOpen,
    isMobileOpen: false,
    isMobile: false,
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
      // guardamos el estado en localStorage
      localStorage.setItem('sidebar', String(this.isOpen))
    },
    toggleMobileSidebar() {
      this.isMobileOpen = !this.isMobileOpen
    },
    openSidebar() {
      this.isOpen = true
    },
    closeSidebar() {
      this.isOpen = false
    },
  },
})
