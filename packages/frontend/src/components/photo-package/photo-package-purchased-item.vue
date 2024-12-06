<script setup lang="ts">
import { computed } from 'vue'
import { getItemPromPurchasedItem, type TPurchasedItem } from '../../store/photo-package/photo-package-purchase'

const { purchasedItem } = defineProps<{
  purchasedItem: TPurchasedItem
}>()

const protoPackage = computed(() => getItemPromPurchasedItem(purchasedItem))
</script>

<template>
  <div class="grid gap-2 divide-x-2 grid-cols-subgrid divide-rose-200 col-span-full text-neutral-600 p-2">
    <p>
      {{ purchasedItem.id.slice(0, 8) }}
    </p>

    <p class="pl-2">
      {{ protoPackage?.type }}
    </p>

    <p class="pl-2">
      {{ purchasedItem.discountPercentage }}%
    </p>

    <p />

    <p class="pl-2">
      {{ purchasedItem.dateLocal }}
    </p>

    <p class="pl-2 text-right">
      <template v-if="purchasedItem.discountPercentage !== 100">
        ${{ protoPackage?.price }}
      </template>
      <template v-else>
        <s>${{ protoPackage.price }}</s>
        <span class="text-rose-400 pl-1">Free</span>
      </template>
    </p>
  </div>
</template>
