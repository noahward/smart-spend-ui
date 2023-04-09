export function formatCurrency (amount: number, currencyCode?: string) {
  const options = {
    style: 'currency',
    currency: currencyCode || 'USD'
  }
  return amount.toLocaleString('en-US', options)
}
