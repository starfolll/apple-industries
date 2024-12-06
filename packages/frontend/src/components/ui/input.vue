<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'

type TProps = /* @vue-ignore */ TextareaHTMLAttributes & {}

defineProps<TProps>()

const model = defineModel<TextareaHTMLAttributes['value']>()
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="model"
    class="text-neutral-900 block w-full p-2 placeholder:text-neutral-400 outline-none text-sm border-2 border-rose-200 rounded-md shadow-sm focus:border-rose-500"
    @input="event => $emit('update:modelValue', (event.target as HTMLTextAreaElement).value)"
  >
</template>
