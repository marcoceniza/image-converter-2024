<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-[50px] bg-blue-500 leading-[50px]">
    <div class="container mx-auto px-4">
      <nav class="text-white">
        <RouterLink to="/">Image Converter</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
