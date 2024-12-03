<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'

type TProps = /* @vue-ignore */ TextareaHTMLAttributes & {}

defineProps<TProps>()

const model = defineModel<TextareaHTMLAttributes['value']>()
</script>

<template>
  <textarea
    v-bind="$attrs"
    v-model="model"
    class="text-neutral-900 block w-full p-2 placeholder:text-neutral-400 outline-none text-sm border-2 border-indigo-200 rounded-md shadow-sm focus:border-indigo-500"
    @input="event => $emit('update:modelValue', (event.target as HTMLTextAreaElement).value)"
  />
</template>
