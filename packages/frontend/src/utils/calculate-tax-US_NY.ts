import { Decimal } from 'decimal.js'

const newYorkTaxRate = new Decimal(0.08875)

export function calculateTaxUS_NY(price: number) {
  return new Decimal(price).mul(newYorkTaxRate)
}
