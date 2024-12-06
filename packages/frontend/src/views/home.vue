<script lang="ts" setup>
import { RouterLink } from 'vue-router'

type TTaskRoute = {
  name: string
  to: string
}

const displayedRoutes: TTaskRoute[] = [{
  name: 'Mirror, mirror on the screen',
  to: '/mirror-mirror-on-the-screen',
}, {
  name: 'I’m feeling lucky!',
  to: '/im-feeling-lucky',
}, {
  name: 'Only two things in life are guaranteed',
  to: '/only-two-things-in-life-are-guaranteed',
}]
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 h-full">
    <p class="text-2xl text-rose-500">
      Coding challenges:
    </p>

    <div class="flex gap-8 mx-auto">
      <RouterLink
        v-for="(route, index) in displayedRoutes"
        :key="route.to"
        :to="route.to"
        class="w-48 aspect-video px-4 group hover:scale-105 transition-transform flex items-center justify-center border-2 border-rose-500 text-rose-500 font-semibold rounded-md shadow-2xl shadow-rose-200"
      >
        <p class="text-xl text-balance group-hover:scale-90 transition-transform">
          {{ index + 1 }}. {{ route.name }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>
