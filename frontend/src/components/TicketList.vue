<script setup>
import StatusChip from './StatusChip.vue'

const props = defineProps({
  items:   { type: Array,  default: () => [] },
  loading: { type: Boolean, default: false }
})
defineEmits(['open'])

function fmt(d){ return d ? new Date(d).toLocaleString() : '' }
</script>

<template>
  <section class="card bg-base-100 p-4 shadow">
    <div v-if="loading && items.length === 0" class="space-y-2">
      <div class="skeleton h-6 w-3/4"></div>
      <div class="skeleton h-6 w-2/3"></div>
      <div class="skeleton h-6 w-1/2"></div>
    </div>

    <div v-else class="mt-1 divide-y">
      <div v-for="t in items" :key="t.id" class="py-3">
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="font-medium truncate">{{ t.title }}</div>
            <div class="mt-0.5 flex items-center gap-2 text-xs text-base-content/70">
              <StatusChip :status="t.status" />
              <span class="w-1 h-1 rounded-full bg-base-300"></span>
              <span>{{ fmt(t.updatedAt) }}</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" @click="$emit('open', t)">View</button>
        </div>
      </div>

      <div v-if="items.length === 0" class="text-sm opacity-70">
        No tickets in this filter.
      </div>
    </div>
  </section>
</template>


