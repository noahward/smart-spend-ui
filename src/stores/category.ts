import { defineStore } from 'pinia'
import { camelizeKeys } from 'humps'
import { smartSpendAPI } from '@/apis/smart-spend-api'
import type { Category } from '@/types/category'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [] as Category[]
    }
  },
  getters: {
    categorySelectOptions (state) {
      return state.categories.map(category => category.name)
    }
  },
  actions: {
    async getCategories () {
      return smartSpendAPI.get('/categories/')
        .then((response) => {
          this.categories = camelizeKeys(response.data) as Category[]
        })
        .catch((error) => {
          throw error
        })
    }
  }
})
