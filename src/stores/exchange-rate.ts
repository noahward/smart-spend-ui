import { defineStore } from 'pinia'
import { camelizeKeys } from 'humps'
import { exchangeRateAPI } from '@/apis/exchange-rate-api'
import type { ExchangeRate, ExchRateAPIResponse } from '@/types/exchange-rate'

export const useExchRateStore = defineStore('exchange-rate', {
  state: () => {
    return {
      exchangeRates: [] as ExchangeRate[]
    }
  },
  actions: {
    async getExchangeRate (fromCurrencyCode: string, toCurrencyCode: string) {
      let targetRate = this.exchangeRates.find(rate => {
        return rate.to === toCurrencyCode && rate.from === fromCurrencyCode
      })

      if (targetRate) {
        const dateUpdated = new Date(targetRate.lastUpdated)
        // Do not update exchange rate if it is less than 24 hours old
        if (dateUpdated.getTime() > Date.now() - 86400000) {
          return
        }
      }

      const params = { pair: fromCurrencyCode.concat('_', toCurrencyCode) }
      return exchangeRateAPI.get('/exchangerate', { params })
        .then((response) => {
          const apiResponse = camelizeKeys(response.data) as ExchRateAPIResponse
          const exchangeRateData = {
            from: fromCurrencyCode,
            to: toCurrencyCode,
            exchangeRate: apiResponse.exchangeRate,
            lastUpdated: new Date()
          }
          if (targetRate) {
            targetRate = exchangeRateData
          } else {
            this.exchangeRates.push(exchangeRateData)
          }
        })
        .catch((error) => {
          throw error
        })
    },
    refreshExchangeRates (uniqueCurrencies: string[], baseCurrency: string) {
      const promises: Promise<any>[] = []
      uniqueCurrencies.forEach(currencyCode => {
        promises.push(this.getExchangeRate(currencyCode, baseCurrency))
      })
      return Promise.all(promises)
    }
  }
})
