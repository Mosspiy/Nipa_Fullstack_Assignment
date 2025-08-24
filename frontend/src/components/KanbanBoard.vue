<script setup>
import { ref } from 'vue'
import KanbanColumn from './KanbanColumn.vue'
import TicketDetailModal from './TicketDetailModal.vue'
import { useTickets } from '../stores/tickets'

const store = useTickets()
const statuses = ['pending','accepted','resolved','rejected']

const itemsByStatus = (s) => store.items.filter(i => i.status === s)

const showDetail = ref(false)
const selected = ref(null)
function openDetail(ticket){ selected.value = ticket; showDetail.value = true }

async function changeStatus(newStatus){
  if (!selected.value) return
  const id = selected.value.id || selected.value._id
  await store.update(id, { status: newStatus })
  const fresh = store.items.find(i => (i.id||i._id) === id)
  selected.value = fresh || selected.value
}

async function onMove({ id, to }){
  if (!id) return
  const current = store.items.find(x => (x.id||x._id) === id)
  if (current && current.status === to) return
  await store.update(id, { status: to })
}
</script>


<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <KanbanColumn
      v-for="s in statuses"
      :key="s"
      :title="s"
      :items="itemsByStatus(s)"
      @move="onMove"
      @open="openDetail"
    />
  </div>

  <TicketDetailModal
    v-model="showDetail"
    :ticket="selected"
    @change-status="changeStatus"
  />
</template>
