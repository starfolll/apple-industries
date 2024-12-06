<template>
  <div class="grid gap-4 rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
    <p class="text-lg text-rose-500">
      <slot name="title" />
    </p>

    <slot />
  </div>
</template>
