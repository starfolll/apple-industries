import type { TPurchasedItem, TPurchasedItemInput } from './photo-package-purchase'
import { generateId } from '../../utils/generate-id'
import { PurchasedItems, Purchases } from './photo-package-purchase'
import { getRandomPhotoPackageId } from './photo-packages-available'

function submitPurchase(
  date: string,
  purchasedItems: TPurchasedItemInput[],
): void {
  const dateLocal = date
  const dateUTC = new Date(date).toUTCString()

  const purchasedItemsModified = purchasedItems.map(item => ({
    ...item,

    id: generateId(),

    dateUTC,
    dateLocal,
  } satisfies TPurchasedItem))

  PurchasedItems.value.push(...purchasedItemsModified)
  Purchases.value.push({
    id: crypto.randomUUID(),

    dateUTC,
    dateLocal,

    purchasedItemsId: purchasedItemsModified.map(item => item.id),
  })
}

export const purchasedItemsCountMin = 1
export const purchasedItemsCountMax = 3
function getRandomPurchasedItemsCount(): number {
  return Math.floor(Math.random() * (purchasedItemsCountMax - purchasedItemsCountMin + 1)) + purchasedItemsCountMin
}

function getRandomPurchasedItems(): TPurchasedItemInput[] {
  return Array.from({ length: getRandomPurchasedItemsCount() }, () => ({
    itemId: getRandomPhotoPackageId(),
    discountPercentage: Math.random() > 0.2 ? 0 : 100,
  }))
}

export function populatePurchases(): void {
  submitPurchase('Thu, 28 Nov 2024 23:30:00 CST', getRandomPurchasedItems())
  submitPurchase('Fri, 29 Nov 2024 23:30:00 EST', getRandomPurchasedItems())
  submitPurchase('Sat, 30 Nov 2024 23:30:00 CST', getRandomPurchasedItems())
  submitPurchase('Sun, 01 Dec 2024 23:30:00 EST', getRandomPurchasedItems())
}

export function clearPurchases(): void {
  PurchasedItems.value = []
  Purchases.value = []
}
