import { defineStore } from 'pinia'

export const usePreferenceStore = defineStore('preferences', {
  state: () => ({
    miniSidebar: false,
    sidebarDrawer: true
  }),
  actions: {
    toggleMiniSidebar () {
      this.miniSidebar = !this.miniSidebar
    },
    toggleSidebarDrawer () {
      this.sidebarDrawer = !this.sidebarDrawer
    }
  }
})
