<script setup lang="ts">
import { computed } from 'vue'
import { getPurchasedItemsFromPurchase, getPurchaseTotalPrice, type TPurchase, type TPurchasedItem } from '../../store/photo-package/photo-package-purchase'
import { dateUTCToFormatUS_NY } from '../../utils/date-formatter-US_NY'
import PhotoPackagePurchasedItem from './photo-package-purchased-item.vue'

const { purchase } = defineProps<{
  purchase: TPurchase
}>()

const purchasedItems = computed<TPurchasedItem[]>(() => getPurchasedItemsFromPurchase(purchase))
const purchasedItemsTotalPrice = computed(() => getPurchaseTotalPrice(purchase))
</script>

<template>
  <div class="grid col-span-full grid-cols-subgrid">
    <div
      class="grid gap-2 divide-x-2 divide-rose-200 grid-cols-subgrid col-span-full rounded-md border-2 border-neutral-200 text-neutral-600 p-2"
    >
      <p>
        {{ purchase.id.slice(0, 8) }}
      </p>

      <p class="pl-2">
        Purchase bundle
      </p>

      <p />

      <p class="pl-2">
        {{ dateUTCToFormatUS_NY(purchase.dateUTC) }}
      </p>

      <p class="pl-2">
        {{ purchase.dateLocal }}
      </p>

      <p class="pl-2">
        Total: ${{ purchasedItemsTotalPrice }}
      </p>
    </div>

    <PhotoPackagePurchasedItem
      v-for="purchasedItem in purchasedItems"
      :key="purchasedItem.id"
      :purchased-item="purchasedItem"
      class="border-l-rose-100 border-l-2 ml-4"
    />
  </div>
</template>
