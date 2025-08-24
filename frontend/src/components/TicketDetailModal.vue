<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  ticket: { type: Object, default: null },
  canChangeStatus: { type: Boolean, default: true }
})
const { canChangeStatus } = props
const emit = defineEmits(['update:modelValue', 'change-status'])

const statuses = ['pending', 'accepted', 'resolved', 'rejected']
const close = () => emit('update:modelValue', false)

const fmt = (d) => (d ? new Date(d).toLocaleString() : '-')

const badgeTone = (status) => {
  switch (status) {
    case 'pending':  return 'badge-warning'
    case 'accepted': return 'badge-info'
    case 'resolved': return 'badge-success'
    case 'rejected': return 'badge-error'
    default:         return 'badge-ghost'
  }
}

const btnTone = (btnStatus, current) => {
  if (btnStatus === current) return 'btn-primary'
  switch (btnStatus) {
    case 'pending':  return 'btn-ghost'
    case 'accepted': return 'btn-outline'
    case 'resolved': return 'btn-success btn-outline'
    case 'rejected': return 'btn-error btn-outline'
    default:         return 'btn-ghost'
  }
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
   
  }
}
</script>

<template>
  <dialog
    class="modal"
    :open="modelValue"
    @cancel.prevent="close"
    @keydown.esc.prevent="close"
    role="dialog"
    aria-modal="true"
    :aria-label="ticket?.title || 'Ticket detail'"
  >
    <div class="modal-box max-w-2xl">
      <!-- Header -->
      <header class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3 class="font-semibold text-lg leading-snug break-words">
            {{ ticket?.title || 'Untitled ticket' }}
          </h3>
          <div class="mt-1 flex items-center gap-2 text-xs text-base-content/60">
            <span>Created: {{ fmt(ticket?.createdAt) }}</span>
            <span class="w-1 h-1 rounded-full bg-base-300"></span>
            <span>Updated: {{ fmt(ticket?.updatedAt) }}</span>
          </div>
        </div>

        <!-- Status badge -->
        <span
          class="badge capitalize shrink-0"
          :class="badgeTone(ticket?.status)"
          :title="`Status: ${ticket?.status || '-'}`"
        >
          {{ ticket?.status || '-' }}
        </span>
      </header>

      <!-- Description -->
      <section class="mt-4">
        <h4 class="text-sm font-medium text-base-content/70 mb-1">Description</h4>
        <div class="rounded-xl bg-base-200/60 p-3 text-sm whitespace-pre-wrap leading-relaxed">
          {{ ticket?.description || '-' }}
        </div>
      </section>

      <!-- Meta -->
      <section class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-xl border border-base-300 bg-base-100 p-3">
          <div class="text-xs text-base-content/60 mb-1">Contact</div>
          <div class="text-sm break-all flex items-center gap-2">
            <span>{{ ticket?.contact || '-' }}</span>
            <button
              v-if="ticket?.contact"
              class="btn btn-ghost btn-xs"
              title="Copy"
              @click="copy(ticket.contact)"
            >
              Copy
            </button>
          </div>
        </div>

        <div class="rounded-xl border border-base-300 bg-base-100 p-3">
          <div class="text-xs text-base-content/60 mb-1">Ticket ID</div>
          <div class="text-sm break-all font-mono">{{ (ticket?.id || ticket?._id) ?? '-' }}</div>
        </div>
      </section>

      <!-- Change status -->
      <section v-if="canChangeStatus" class="mt-5">
        <h4 class="text-sm font-medium text-base-content/70 mb-2">Change status</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="s in statuses"
            :key="s"
            class="btn btn-sm capitalize"
            :class="btnTone(s, ticket?.status)"
            @click="$emit('change-status', s)"
          >
            {{ s }}
          </button>
        </div>
      </section>

      <!-- Actions -->
      <div class="modal-action mt-6">
        <button class="btn" @click="close">Close</button>
      </div>
    </div>

    <div class="modal-backdrop" @click="close"></div>
  </dialog>
</template>


