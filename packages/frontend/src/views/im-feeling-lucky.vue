<script setup lang="ts">
import type { TPhotoPackageType } from '../store/photo-package/photo-package'
import { useSessionStorage } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CardPercentageBorder from '../components/ui/card-percentage-border.vue'
import CardText from '../components/ui/card-text.vue'
import Input from '../components/ui/input.vue'
import LayoutTask from '../layouts/layout-task.vue'
import { PhotoPackagePrice } from '../store/photo-package/photo-package'
import { PhotoPackagesAvailable } from '../store/photo-package/photo-packages-available'

// All the code for this task stored here for easier reading of one file
// In a real-world scenario, this code would be split into multiple files

// This scenario is shown in the third task

const purchasingPackage = ref<(TPhotoPackageType)[]>([])

const winnableFreeItemsCount = 2

const total = computed(() => purchasingPackage.value.reduce((acc, curr) => acc + PhotoPackagePrice[curr], 0))
const spentLastTime = ref(0)
const spentTotal = ref(0)

const timeFromTheLastWin = ref<Date>(new Date())
const maxWinningChance = useSessionStorage('maxWinningChance', '75')
const intervalBetweenWinsInSec = useSessionStorage('intervalBetweenWins', '10')
const intervalToMaxWinChanceInSec = useSessionStorage('intervalToMaxWinChance', '20')

const intervalBetweenWins = computed(() => +intervalBetweenWinsInSec.value * 1000)
const intervalToMaxWinChance = computed(() => +intervalToMaxWinChanceInSec.value * 1000)

const displayedCurrentTime = ref(new Date())
const displayedPercentageBetweenWins = ref(getPercentageBetweenWins())
const displayedWinningChance = ref(getWinningChance())

const displayedWinningChanceInterval = ref<number>()

const messagePurchase = ref('')
const messageWonItems = ref('')

function isWinningChanceIntervalPassed() {
  return new Date().getTime() - timeFromTheLastWin.value.getTime() > intervalBetweenWins.value
}

function getWinningChance() {
  const timeFromTheLastWinInMs = new Date().getTime() - timeFromTheLastWin.value.getTime()
  const winningChance
    = ((timeFromTheLastWinInMs - intervalBetweenWins.value) / intervalToMaxWinChance.value)
    * 100

  return Math.min(winningChance, +maxWinningChance.value)
}

function getWonItems() {
  const purchasedItems = [...purchasingPackage.value]
  const wonItems: TPhotoPackageType[] = []

  for (let i = 0; i < winnableFreeItemsCount; i++) {
    if (!purchasedItems.length) break

    const randomIndex = Math.floor(Math.random() * purchasedItems.length)
    wonItems.push(purchasedItems[randomIndex])
    purchasedItems.splice(randomIndex, 1)
  }

  return wonItems
}

function attemptToWin() {
  const isWon = Math.random() * 100 < getWinningChance()

  if (isWon) {
    timeFromTheLastWin.value = new Date()
  }

  return isWon
}

function getPercentageBetweenWins() {
  const timeFromTheLastWinInMs = new Date().getTime() - timeFromTheLastWin.value.getTime()
  const percentage = (timeFromTheLastWinInMs / intervalBetweenWins.value) * 100
  return Math.min(percentage, 100)
}

function setDisplayedData() {
  displayedCurrentTime.value = new Date()
  displayedPercentageBetweenWins.value = getPercentageBetweenWins()
  displayedWinningChance.value = getWinningChance()
}

function emulatePurchase() {
  const isAttemptingToWin = purchasingPackage.value.length === 3 && isWinningChanceIntervalPassed()
  const isWon = isAttemptingToWin && attemptToWin()
  const wonItems = isWon ? getWonItems() : null

  const discount = wonItems?.reduce((acc, curr) => acc + PhotoPackagePrice[curr], 0) || 0
  const totalCost = purchasingPackage.value.reduce((acc, curr) => acc + PhotoPackagePrice[curr], 0)
  const finalCost = totalCost - discount

  messageWonItems.value = isWon ? `${wonItems?.join(' and ')}` : ''

  if (isAttemptingToWin) messagePurchase.value = isWon ? 'You won!' : 'Try again next time!'
  else messagePurchase.value = ''

  setDisplayedData()
  purchasingPackage.value = []

  spentLastTime.value = finalCost
  spentTotal.value += finalCost
}

onMounted(() => {
  displayedWinningChanceInterval.value = window.setInterval(setDisplayedData, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(displayedWinningChanceInterval.value)
})
</script>

<template>
  <LayoutTask>
    <template #title>
      I’m feeling lucky!
    </template>

    <CardText>
      <template #title>
        Task
      </template>

      <p>
        At Apple Industries it’s important to remember that we sell fun: you and your friends climbing in one of our mega
        booths for some silly group scenes, hanging out in the movie theater lobby and being part of the movie magic, making
        your own memorabilia at a sports stadium or theme park. We also like winning prizes! Our booths have three types of
        photo packages: prints (4x6 photo) for $5, panoramas (6x12 prints) for $7, and strips (two 2x6 photo strips) for $5. Once
        per hour at most, we want one customer that orders each package type to have a chance to receive the other two
        packages of prints for free. To do that, we’ll need some software that knows what package the customer ordered,
        determines if that customer’s order is eligible to win, and then if they in fact won the free prints.
      </p>
    </CardText>

    <CardText>
      <template #title>
        General thoughts
      </template>

      <p>
        <u>
          To solve this task we need a few things:
        </u>
        <br>
        1. A way to know when the last win was. This approach will give us a predicted amount of time between the wins.
        <br>
        2. After the last won and the reserved amount of time between the wins (step 1) passed, we can start adding a <u>chance</u> to win.
        With each second the chance to win will increase and will reach it's maximum (coveted in step 3).
        We can also define the amount of time to reach the maximum chance of winning.
        <br>
        3. The maximum chance of winning. This is the maximum chance that the customer can win the free prints.
        To avoid people predicting the system and winning every time, we can set the maximum chance of winning,
        so it will be harder to define the winning strategy. Also, if we remove the limit of winning chance (so we can match 100%),
        we can make a photo booth more attractive to more people, as they will know that they will win the free prints at some point.
      </p>

      <p>
        <u>How to win:</u>
        <br>
        1. Wait until the border of <span class="bg-rose-500 text-rose-50 rounded-full px-2">delay box</span> to be full rose color.
        <br>
        2. Select all three <span class="border-rose-500 border-2 rounded-full px-2">packages</span>.
        <br>
        3. Click the <span class="bg-rose-500 text-rose-50 rounded px-2">Purchase</span> button.
      </p>

      <p>
        <u>Additional settings</u>
        <br>
        You can play with the settings on the right side of the screen to tweak the max winning chance and the time between the wins.
      </p>
    </CardText>

    <div class="flex gap-8">
      <div class="flex flex-col gap-8">
        <label
          v-for="photoPackage in PhotoPackagesAvailable"
          :key="photoPackage.id"
          class="has-[:checked]:border-rose-500 shadow flex flex-col gap-2 shadow-rose-50 border-2 border-rose-100 rounded-md p-2 cursor-pointer"
        >
          <input
            v-model="purchasingPackage"
            type="checkbox"
            class="hidden"
            :value="photoPackage.type"
          >

          <p>{{ photoPackage.type }}</p>
          <p>{{ photoPackage.label }}</p>
          <p class="text-rose-500">
            ${{ photoPackage.price }}
          </p>
        </label>
      </div>

      <div class="flex flex-col gap-8 grow">
        <div class="flex flex-col gap-8 grow">
          <CardPercentageBorder :percentage="displayedPercentageBetweenWins" class="relative">
            <div class="absolute text-nowrap top-full left-1/2 -translate-x-1/2 rounded-full px-4 -mt-2 bg-rose-500 text-rose-50">
              delay box
            </div>

            <div class="flex justify-between">
              Time of the last win:

              <span class="text-rose-500">
                {{ timeFromTheLastWin?.toLocaleTimeString() }}
              </span>
            </div>
            <div class="flex justify-between">
              Current time:

              <span class="text-rose-500">
                {{ displayedCurrentTime?.toLocaleTimeString() }}
              </span>
            </div>
          </CardPercentageBorder>

          <CardPercentageBorder
            :percentage="displayedWinningChance"
            class="relative"
          >
            <div class="absolute text-nowrap top-full left-1/2 -translate-x-1/2 rounded-full px-4 -mt-2 bg-rose-500 text-rose-50">
              max {{ maxWinningChance }}%
            </div>

            Winning chance:

            <span class="text-rose-500">
              {{ displayedWinningChance.toFixed(2) }}%
            </span>
          </CardPercentageBorder>
        </div>

        <div class="flex mt-auto flex-col gap-2">
          <p v-if="messagePurchase" class="text-rose-400 text-center font-bold">
            {{ messagePurchase }}
          </p>

          <button
            :disabled="!purchasingPackage.length"
            class="bg-rose-500 transition-transform text-rose-50 px-4 rounded-md py-2 disabled:bg-rose-200 disabled:text-rose-400 disabled:cursor-not-allowed"
            :class="{ 'scale-110': purchasingPackage.length }"
            @click="emulatePurchase"
          >
            <template v-if="displayedWinningChance > 0 && purchasingPackage.length === 3">
              I’m feeling lucky!
            </template>
            <template v-else>
              Purchase
            </template>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-44 grow">
        <p class="rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
          Total:

          <span class="text-rose-500">
            ${{ total }}
          </span>
        </p>

        <p class="rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
          Spent last time:

          <span class="text-rose-500">
            ${{ spentLastTime }}
          </span>
        </p>

        <p class="rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
          Spent total:

          <span class="text-rose-500">
            ${{ spentTotal }}
          </span>
        </p>

        <p v-if="messageWonItems">
          You won:
          <span class="text-rose-500">
            {{ messageWonItems }}
          </span>
        </p>
      </div>

      <div class="grid grid-cols-[auto_1fr] items-start gap-4 h-fit max-w-64">
        <label class="grid gap-4 col-span-2 grid-cols-subgrid items-center">
          <p>Max winning percent</p>
          <Input v-model="maxWinningChance" />
        </label>

        <label class="grid gap-4 col-span-2 grid-cols-subgrid items-center">
          <p>Interval between wins<br>in seconds</p>
          <Input v-model="intervalBetweenWinsInSec" />
        </label>

        <label class="grid gap-4 col-span-2 grid-cols-subgrid items-center">
          <p>Interval to max win chance<br>in seconds</p>
          <Input v-model="intervalToMaxWinChanceInSec" />
        </label>
      </div>
    </div>
  </LayoutTask>
</template>
