<script setup>
import { onMounted, ref } from 'vue'
import { useTickets } from '../stores/tickets'
import KanbanBoard from '../components/KanbanBoard.vue'


const store = useTickets()
const statuses = ['pending','accepted','resolved','rejected']


onMounted(() => store.fetch())
</script>


<template>
  <div class="p-4 max-w-6xl mx-auto space-y-6">
    <!-- Toolbar -->
    <div class="flex flex-col md:flex-row md:items-end gap-3">
      <div class="form-control w-full md:w-48">
        <label class="label"><span class="label-text">Sort by</span></label>
        <select v-model="store.sort" class="select select-bordered">
          <option value="updatedAt">Latest update</option>
          <option value="createdAt">Created</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div class="form-control w-full md:w-48">
        <label class="label"><span class="label-text">Order</span></label>
        <select v-model="store.order" class="select select-bordered">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      <div class="flex-1"></div>
      <button class="btn btn-outline" @click="store.fetch()">Refresh</button>
    </div>

  
    <KanbanBoard />

  </div>
</template>

