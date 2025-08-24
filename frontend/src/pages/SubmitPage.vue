<script setup>
import { onMounted, ref, computed } from 'vue'
import { http } from '../api/http'
import TicketDetailModal from '../components/TicketDetailModal.vue'
import CreateTicketModal from '../components/CreateTicketModal.vue'
import TicketFilterBar from '../components/TicketFilterBar.vue'
import TicketList from '../components/TicketList.vue'
import Swal from 'sweetalert2'

const tickets = ref([])
const loading = ref(false)

const showDetail = ref(false)
const selected = ref(null)
const showCreate = ref(false)

const statuses = ['pending', 'accepted', 'resolved', 'rejected']
const activeStatus = ref('all')

// metrics
const total = computed(() => tickets.value.length)
const counts = computed(() => {
  const map = { pending: 0, accepted: 0, resolved: 0, rejected: 0 }
  for (const t of tickets.value) if (map[t.status] !== undefined) map[t.status]++
  return map
})
const filteredTickets = computed(() =>
  activeStatus.value === 'all'
    ? tickets.value
    : tickets.value.filter(t => t.status === activeStatus.value)
)


async function loadAll() {
  loading.value = true
  try {
    const { data } = await http.get('/tickets', {
      params: { sort: 'updatedAt', order: 'desc' }
    })
    tickets.value = Array.isArray(data)
      ? data.map(d => ({ ...d, id: d.id || d._id }))
      : []
  } catch (e) {
    toast('error', e?.response?.data?.message || e?.message || 'Failed to load tickets')
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function createTicket(payload) {
  loading.value = true
  try {
    await http.post('/tickets', payload)
    await loadAll()
    showCreate.value = false
    toast('success', 'Ticket created successfully')
  } catch (e) {
    toast('error', e?.response?.data?.message || e?.message || 'Create failed')
    console.error(e)
  } finally {
    loading.value = false
  }
}

function open(t){ selected.value = t; showDetail.value = true }

function toast(icon, title) {
  Swal.fire({ toast: true, position: 'top-end', icon, title, showConfirmButton: false, timer: 2800 })
}

onMounted(loadAll)
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Toolbar -->
    <div class="flex items-center justify-between">
      <h2 class="font-semibold text-lg">Tickets</h2>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" @click="showCreate = true">
          + Create Ticket
        </button>
        <button class="btn btn-outline btn-sm" @click="loadAll" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-xs mr-1"></span>
          Refresh
        </button>
      </div>
    </div>

    <!-- Filters -->
    <section class="card bg-base-100 p-3 shadow">
      <TicketFilterBar
        v-model="activeStatus"
        :statuses="statuses"
        :counts="counts"
        :total="total"
      />
    </section>

    <!-- List -->
    <TicketList
      :items="filteredTickets"
      :loading="loading"
      @open="open"
    />

    <!-- Modals -->
    <TicketDetailModal
      v-model="showDetail"
      :ticket="selected"
      :can-change-status="false"
    />
    <CreateTicketModal
      v-model="showCreate"
      @submit="createTicket"
    />
  </div>
</template>
