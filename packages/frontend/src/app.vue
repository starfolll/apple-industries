<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="max-w-screen-lg mx-auto py-8 h-full">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in" :duration="200">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>
