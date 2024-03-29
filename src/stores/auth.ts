import { defineStore } from 'pinia'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { smartSpendAPI } from '@/apis/smart-spend-api'
import { router } from '@/router'
import type { User } from '@/types/user'

type UserState = {
  user: User | Record<string, never>;
  returnUrl: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    returnUrl: null
  }),
  getters: {
    isAuthenticated (state) {
      if (Object.keys(state.user).length === 0) {
        return false
      }
      return true
    }
  },
  actions: {
    async login (userInfo: object) {
      return smartSpendAPI.post('/auth/token/login/', decamelizeKeys(userInfo))
        .then((response) => {
          this.user = camelizeKeys(response.data) as User
          localStorage.setItem('user', JSON.stringify(camelizeKeys(response.data)))
          router.push(this.returnUrl || '/dashboard')
        })
        .catch((error) => {
          throw error
        })
    },
    async register (userInfo: object) {
      return smartSpendAPI.post('/auth/users/', decamelizeKeys(userInfo))
        .then((response) => {
          this.user = camelizeKeys(response.data) as User
          localStorage.setItem('user', JSON.stringify(camelizeKeys(response.data)))
          router.push(this.returnUrl || '/dashboard')
        })
        .catch((error) => {
          throw error
        })
    },
    async logout () {
      return smartSpendAPI.post('/auth/token/logout/')
        .then(() => {
          localStorage.removeItem('user')
          this.user = {}
          router.push('/login')
        })
    }
  }
})
