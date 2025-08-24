<script setup>
const props = defineProps({
  status: { type: String, required: true } // pending | accepted | resolved | rejected
})

// โทนสี
function chipClass(s) {
  switch (s) {
    case 'pending':  return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'accepted': return 'bg-sky-100 text-sky-800 border border-sky-200'
    case 'resolved': return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    case 'rejected': return 'bg-rose-100 text-rose-800 border border-rose-200'
    default:         return 'bg-base-200 text-base-content/70 border border-base-300'
  }
}

// ไอคอน
function iconPath(s) {
  switch (s) {
    case 'pending':  // clock
      return 'M10 2a8 8 0 110 16 8 8 0 010-16zm.75 4.5a.75.75 0 00-1.5 0v4.25c0 .2.08.39.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.28-2.28V6.5z'
    case 'accepted': // star
      return 'M10 2l2.39 4.85 5.35.78-3.87 3.77.91 5.33L10 14.77 4.22 16.73l.91-5.33L1.26 7.63l5.35-.78L10 2z'
    case 'resolved': // check
      return 'M8.5 11.5l-3-3 1-1 2 2 4.5-4.5 1 1-5.5 5.5z'
    case 'rejected': 
      return 'M10 18a8 8 0 100-16 8 8 0 000 16zm2.83-10.83a.75.75 0 00-1.06-1.06L10 8.88 8.23 7.11a.75.75 0 10-1.06 1.06L8.94 9.94l-1.77 1.77a.75.75 0 101.06 1.06L10 11l1.77 1.77a.75.75 0 001.06-1.06L11.06 9.94l1.77-1.77z'
    default:
      return ''
  }
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium select-none"
    :class="chipClass(status)"
    :aria-label="`Status: ${status}`"
  >
    <svg v-if="iconPath(status)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path :d="iconPath(status)" />
    </svg>
    <span class="capitalize">{{ status }}</span>
  </span>
</template>

