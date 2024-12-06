<script setup lang="ts">
import type Decimal from 'decimal.js'
import { onMounted, ref } from 'vue'
import PhotoPackagePurchase from '../components/photo-package/photo-package-purchase.vue'
import CardText from '../components/ui/card-text.vue'
import LayoutTask from '../layouts/layout-task.vue'
import { getPurchaseTotalPriceByMonthUS_NY, Purchases } from '../store/photo-package/photo-package-purchase'
import { populatePurchases, purchasedItemsCountMax, purchasedItemsCountMin } from '../store/photo-package/photo-package-purchase-mock'
import { calculateTaxUS_NY } from '../utils/calculate-tax-US_NY'

const totalIncomeInNovember = ref<number | null>(null)
const totalTaxToPay = ref<Decimal | null>(null)

onMounted(() => {
  populatePurchases()

  totalIncomeInNovember.value = getPurchaseTotalPriceByMonthUS_NY(11 - 1)
  totalTaxToPay.value = calculateTaxUS_NY(totalIncomeInNovember.value)
})
</script>

<template>
  <LayoutTask>
    <template #title>
      ...Death and taxes
    </template>

    <CardText>
      <template #title>
        Task
      </template>

      <p>
        Once per calendar month Agent Smith of the Internal Revenue Service (IRS) wants to know how much tax we owe them.
        For now, since our headquarters is in Long Island, New York, the IRS only requires us to pay the local sales tax rate of
        8.625% no matter where the customer paid to use our photo booth. Luckily, we don’t need to pay taxes on the
        packages we gave away for free. To make this easy, our accounting department will need some software that can add
        up all the order revenue collected in a photo booth by calendar month and determine how much tax we owe the IRS.
      </p>
    </CardText>

    <CardText>
      <template #title>
        General thoughts
      </template>

      <p>
        <u>
          Tax period alignment
        </u>
        <br>
        The first thing that comes to my mind is that we need to align the tax period with the calendar month.
        Because photo booth are located in different states, that mean that they can have different time zones.
        So, we can unify all the time zones to the UTC and then convert it to the New York time zone when needed.
        Meaning that if someone purchased item anything in Missouri (CST),
        this time will be converted to the UTC time zone, and then to the New York time zone
        because the headquarters is located there (EST).
        <br>
        Making this sort of manipulations we can easily calculate the tax for the month and pay it to the IRS.
      </p>

      <p>
        <u>
          Tax calculation
        </u>
        <br>
        The second thing is that we need to calculate the tax for the month.
        We can do this by collecting all of the purchases, summing them up and then multiplying by the tax rate.
        <br>
        The issue here is that we need to accurately calculate the tax, as the IRS will not be happy if we will pay less or more than we should,
        even if it is a small amount.
        <br>
        To resolve this situation, we can use the Decimal.js library, as it fits here well.
        Well, we can use regular js numbers, but I leave it as an open question.
      </p>
    </CardText>

    <CardText>
      <template #title>
        Example
      </template>

      <p>
        Table is represented in an close to real-database example.
        <br>
        By refreshing the page, you can see the different data.
      </p>

      <p>
        <u>
          Table description
        </u>
      </p>

      <ul class="list-disc pl-6 flex flex-col gap-2">
        <li>
          The table below shows the purchases and purchased items for the month of November and December.
        </li>
        <li>
          There are 2 locations that have photo booths: Missouri (CST) and New York (EST).
          You can define the time zone of the purchase by the <span class="text-rose-500 font-semibold">Purchase Date Local</span> column.
          Also this column will always show the same time of 23:30:00 so we can see the difference in dates between the time zones.
        </li>
        <li>
          Those time zones are converted to the New York time zone in the <span class="text-rose-500 font-semibold">Purchase Date In New York</span> column.
          (for this example I'm skipping UTC column)
        </li>
        <li>
          All purchases of the prints are grouped together by the purchase bundle,
          each bundle can have more than <b>{{ purchasedItemsCountMin }}</b> and up to <b>{{ purchasedItemsCountMax }}</b> items.
        </li>
        <li>
          The <span class="text-rose-500 font-semibold">Price</span> column shows the price of the item,
          but if the item was free, the price will be crossed out and the "Free" text will be shown.
          The free items are excluded from the tax calculation.
        </li>
      </ul>
    </CardText>

    <p class="text-lg font-semibold">
      Table of purchases and purchased items
    </p>

    <div class="grid gap-4 grid-cols-[auto_auto_auto_1fr_1fr_auto] relative">
      <div class="grid-cols-subgrid grid gap-4 col-span-full font-semibold text-rose-500 px-2 sticky top-0 py-4 backdrop-blur rounded-lg bg-white/50">
        <p>Id</p>
        <p>Item type</p>
        <p>Discount</p>
        <p>Purchase Date In New York</p>
        <p>Purchase Date Local</p>
        <p>Price</p>
      </div>

      <PhotoPackagePurchase
        v-for="purchase in Purchases"
        :key="purchase.id"
        :purchase="purchase"
      />
    </div>

    <div class="grid gap-4 rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
      <p class="text-lg text-rose-500">
        Conclusion
      </p>

      <p>
        Total income in November:
        <span class="text-rose-500">
          ${{ totalIncomeInNovember }}
        </span>
        <br>
        Total tax to pay:
        <span class="text-rose-500">
          ${{ totalTaxToPay }}
        </span>
        <br>
        (unfortunately, I didn't find information how IRS wants to round the price, so leaving it as is 😅)
      </p>
    </div>
  </LayoutTask>
</template>
