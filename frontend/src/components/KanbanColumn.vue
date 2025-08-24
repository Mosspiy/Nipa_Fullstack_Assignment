<template>
  <div class="rounded-2xl p-3 bg-base-200">
    <!-- หัวคอลัมน์ -->
    <div :class="['flex items-center justify-between mb-2 px-2 py-1 rounded-lg font-semibold capitalize tracking-wide text-sm',
                 headerColor(props.title)]">
      <span>{{ title }}</span>
      <span class="badge badge-ghost">{{ items.length }}</span>
    </div>

    <!-- การ์ด -->
    <Draggable
      :list="items"
      :group="{ name: 'tickets', put: true }"
      :item-key="itemKey"
      class="space-y-2 min-h-[220px]"
      :animation="150"
      @change="onChanged"
      @start="onDragStart"
      @end="onDragEnd"
      :delay="120"
      :delay-on-touch-only="true"
    >
      <template #item="{ element }">
  <article
    :class="[
      'relative card bg-base-100 transition-shadow p-3 cursor-grab active:cursor-grabbing select-none',
      isRejected ? 'opacity-70 shadow-none border border-base-300' : 'shadow-sm hover:shadow'
    ]"
    @click="openIfNotDragging(element)"
  >
    <!-- แถบสีซ้าย -->
    <div class="absolute left-0 top-0 h-full w-1.5 rounded-l"
         :class="colorStrip(element.status)" />
    <!-- Title -->
    <h4 class="font-semibold leading-snug line-clamp-2 pr-16">
      {{ element.title }}
    </h4>
    <!-- Contact -->
    <div class="mt-1 text-sm text-base-content/80 truncate pr-16" :title="element.contact">
      {{ element.contact }}
    </div>
    <!-- Updated -->
    <footer class="mt-2 text-xs opacity-70 pr-16">
      {{ fmt(element.updatedAt) }}
    </footer>
  </article>
</template>
    </Draggable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps({
  title: { type: String, required: true }, // pending | accepted | resolved | rejected
  items: { type: Array, required: true }
})
const isRejected = computed(() => props.title === 'rejected')
const emit = defineEmits(['move', 'open'])

const itemKey = (it) => it.id || it._id

// แถบซ้ายการ์ด
const colorStrip = (status) => {
  switch (status) {
    case 'pending':  return 'bg-yellow-500'
    case 'accepted': return 'bg-sky-500'
    case 'resolved': return 'bg-emerald-600'
    case 'rejected': return 'bg-rose-600'
    default:         return 'bg-neutral-400'
  }
}

// สีหัว column
const headerColor = (status) => {
  switch (status) {
    case 'pending':  return 'bg-yellow-500 text-white'
    case 'accepted': return 'bg-sky-600 text-white'
    case 'resolved': return 'bg-emerald-600 text-white'
    case 'rejected': return 'bg-rose-600 text-white'
    default:         return 'bg-neutral-500 text-white'
  }
}

const fmt = (d) => (d ? new Date(d).toLocaleString() : '')

// ป้องกัน modal เปิดระหว่างลาก
const dragging = ref(false)
function onDragStart(){ dragging.value = true }
function onDragEnd(){ dragging.value = false }
function openIfNotDragging(el){ if (!dragging.value) emit('open', el) }

function onChanged(evt){
  if (evt?.added?.element) {
    const el = evt.added.element
    const id = itemKey(el)
    emit('move', { id, to: props.title })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden; display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
