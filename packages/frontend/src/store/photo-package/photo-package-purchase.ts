import type { TPhotoPackage } from './photo-package'
import { ref } from 'vue'
import { calculateDiscount } from '../../utils/calculate-discount'
import { dateUTCToLocalDateUS_NY } from '../../utils/date-formatter-US_NY'
import { PhotoPackagesAvailable } from './photo-packages-available'

export type TPurchasedItem = {
  id: string

  itemId: TPhotoPackage['id']

  discountPercentage: number

  dateUTC: string
  dateLocal: string
}
export type TPurchasedItemInput = Omit<TPurchasedItem, 'id' | 'dateUTC' | 'dateLocal'>

export type TPurchase = {
  id: string

  purchasedItemsId: TPurchasedItem['id'][]

  dateUTC: string
  dateLocal: string
}

export const PurchasedItems = ref<TPurchasedItem[]>([])
export const Purchases = ref<TPurchase[]>([])

export function getPurchasedItemsFromPurchase(purchase: TPurchase): TPurchasedItem[] {
  return PurchasedItems.value.filter(item => purchase.purchasedItemsId.includes(item.id))
}

export function getItemPromPurchasedItem(item: TPurchasedItem): TPhotoPackage {
  return PhotoPackagesAvailable.find(photoPackage => photoPackage.id === item.itemId)!
}

export function getPurchaseTotalPrice(purchase: TPurchase): number {
  return getPurchasedItemsFromPurchase(purchase).reduce(
    (total, item) => calculateDiscount(getItemPromPurchasedItem(item).price, item.discountPercentage) + total,
    0,
  )
}

export function getPurchaseTotalPriceByMonthUS_NY(month: number): number {
  return Purchases.value
    .filter(purchase => dateUTCToLocalDateUS_NY(purchase.dateUTC).getMonth() === month)
    .reduce((total, purchase) => getPurchaseTotalPrice(purchase) + total, 0)
}
