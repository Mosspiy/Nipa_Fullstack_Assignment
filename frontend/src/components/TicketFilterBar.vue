<script setup>
const props = defineProps({
  modelValue: { type: String, default: 'all' },     // v-model สถานะที่เลือก
  statuses:    { type: Array,  default: () => ['pending','accepted','resolved','rejected'] },
  counts:      { type: Object, default: () => ({}) },
  total:       { type: Number, default: 0 }
})
defineEmits(['update:modelValue'])

function btnTone(btnStatus, currentStatus) {
  if (btnStatus === currentStatus) return 'btn-primary'
  switch (btnStatus) {
    case 'pending':  return 'btn-warning btn-outline'
    case 'accepted': return 'btn-info btn-outline'
    case 'resolved': return 'btn-success btn-outline'
    case 'rejected': return 'btn-error btn-outline'
    default:         return 'btn-ghost'
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      class="btn btn-sm"
      :class="modelValue === 'all' ? 'btn-primary' : 'btn-ghost'"
      @click="$emit('update:modelValue','all')"
    >
      All
      <span class="badge badge-ghost ml-2">{{ total }}</span>
    </button>

    <button
      v-for="s in statuses"
      :key="s"
      class="btn btn-sm capitalize"
      :class="btnTone(s, modelValue)"
      @click="$emit('update:modelValue', s)"
    >
      {{ s }}
      <span class="badge badge-ghost ml-2">{{ counts[s] || 0 }}</span>
    </button>
  </div>
</template>


