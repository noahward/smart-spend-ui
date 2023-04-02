import { defineStore } from 'pinia'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { api } from '@/api'
import { router } from '@/router'
import type { User, UserData } from '@/types/user'

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
      } else if (Date.parse(state.user.token.expiry) < new Date().getDate()) {
        return false
      }
      return true
    }
  },
  actions: {
    async login (userInfo: object) {
      return api.post('/auth/login', decamelizeKeys(userInfo))
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
      return api.post('/auth/register', decamelizeKeys(userInfo))
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
      localStorage.removeItem('user')
      this.user = {}
      router.push('/login')
    },
    async updateUser (userInfo: object) {
      return api.patch('/auth/user', decamelizeKeys(userInfo))
        .then((response) => {
          this.user.profile = camelizeKeys(response.data) as UserData
          localStorage.setItem('user', JSON.stringify(this.user))
        })
        .catch((error) => {
          throw error
        })
    }
  }
})
