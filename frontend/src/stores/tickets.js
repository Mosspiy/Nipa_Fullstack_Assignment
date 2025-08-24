import { defineStore } from 'pinia'
import { http } from '../api/http'

const normalize = (d) => ({ ...d, id: d.id || d._id })
const mergeById = (list, item) => {
  const i = list.findIndex(x => x.id === item.id)
  if (i === -1) return [...list, item]
  const next = list.slice()
  next[i] = item
  return next
}

export const useTickets = defineStore('tickets', {
  state: () => ({
    items: [],
    sort: 'updatedAt',
    order: 'desc',
    loading: false,
    error: null
  }),

  getters: {
    all: (s) => s.items,
  },

  actions: {
    async fetch(paramsExtra = {}) {
      this.loading = true
      this.error = null
      try {
        const params = { ...paramsExtra }
        if (this.filterStatus) params.status = this.filterStatus
        if (this.sort) params.sort = this.sort
        if (this.order) params.order = this.order
        if (this.q) params.q = this.q        

        const { data } = await http.get('/tickets', { params })
        this.items = Array.isArray(data) ? data.map(normalize) : []
      } catch (e) {
        this.error = e?.response?.data?.message || e?.message || 'Failed to load tickets'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    
    async fetchMine(contact) {
      if (!contact) return
      return this.fetch({ contact, sort: 'updatedAt', order: 'desc' })
    },

    async create(payload) {
      this.error = null
      try {
        const { data } = await http.post('/tickets', payload)
        this.items = mergeById(this.items, normalize(data))
       
        await this.fetch()
        return data
      } catch (e) {
        this.error = e?.response?.data?.message || e?.message || 'Create failed'
        throw e
      }
    },

    
    async update(id, patch) {
      if (!id) throw new Error('update(): missing id')
      this.error = null

     
      const idx = this.items.findIndex(x => x.id === id)
      const prev = idx >= 0 ? { ...this.items[idx] } : null
      if (idx >= 0) {
        const optimistic = { ...this.items[idx], ...patch, updatedAt: new Date().toISOString() }
        this.items.splice(idx, 1, optimistic)
      }

      try {
        const { data } = await http.put(`/tickets/${id}`, patch)
        const next = normalize(data)
        if (idx >= 0) this.items.splice(idx, 1, next)
        else this.items = mergeById(this.items, next)
        return data
      } catch (e) {
        if (idx >= 0 && prev) this.items.splice(idx, 1, prev) // rollback
        this.error = e?.response?.data?.message || e?.message || 'Update failed'
        console.error(e)
        throw e
      }
    }
  }
})
