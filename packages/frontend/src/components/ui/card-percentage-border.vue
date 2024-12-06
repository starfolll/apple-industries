<script setup lang="ts">
const {
  percentage = 0,
} = defineProps<{
  percentage: number
}>()
</script>

<template>
  <div
    class="percentage-background rounded-md p-0.5 from-rose-500 to-rose-100"
    :style="{ '--filling-percentage': percentage }"
  >
    <div class="bg-white p-2 rounded text-neutral-600">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.percentage-background {
  background: conic-gradient(
    var(--tw-gradient-from) 0 calc(var(--filling-percentage) / 100 * 360deg),
    var(--tw-gradient-to) 0deg
  );
}
</style>
