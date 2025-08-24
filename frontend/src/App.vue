<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <nav class="navbar bg-base-100 shadow">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Helpdesk</a>
      </div>
      <div class="flex-none gap-2">
        <RouterLink to="/submit" class="btn btn-ghost">Submit</RouterLink>
        <RouterLink to="/desk" class="btn btn-ghost">Desk</RouterLink>
      </div>
    </nav>
    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>


