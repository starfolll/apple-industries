<template>
  <div class="flex flex-col gap-8 pb-64 mx-8">
    <nav class="flex gap-8">
      <RouterLink
        to="/"
        class="text-lg flex items-center justify-center bg-rose-500 text-rose-50 font-semibold rounded-full px-4"
      >
        ← home
      </RouterLink>

      <h1 class="text-3xl">
        <slot name="title" />
      </h1>
    </nav>

    <slot />
  </div>
</template>
