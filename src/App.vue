<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <main class="w-full h-screen">
    <Header />
    <RouterView />
  </main>
</template>
