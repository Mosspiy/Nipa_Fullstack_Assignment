<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue', 'submit'])

const form = reactive({ title: '', description: '', contact: '' })
const submitting = ref(false)
const error = ref('')

function reset() {
  form.title = ''
  form.description = ''
  form.contact = ''
  error.value = ''
}

function close() {
  if (submitting.value) return
  emit('update:modelValue', false)
}

async function onSubmit() {
  if (!form.title || !form.description || !form.contact) {
    error.value = 'Please fill all fields.'
    return
  }
  submitting.value = true
  error.value = ''
  try {
    await emit('submit', { ...form })
    reset()
    emit('update:modelValue', false)
  } catch (e) {
    error.value = e?.message || 'Create failed'
  } finally {
    submitting.value = false
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
    aria-label="Create ticket"
  >
    <div class="modal-box max-w-lg">
      <h3 class="font-semibold text-lg">Create ticket</h3>

      <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
        <div class="form-control">
          <label class="label"><span class="label-text">Title</span></label>
          <input v-model.trim="form.title" class="input input-bordered w-full" placeholder="Short summary" required />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Description</span></label>
          <textarea v-model.trim="form.description" class="textarea textarea-bordered w-full" rows="5" placeholder="Details / Steps to reproduce" required />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Contact</span></label>
          <input v-model.trim="form.contact" class="input input-bordered w-full" placeholder="email or phone" required />
        </div>

        <p v-if="error" class="text-error text-sm">{{ error }}</p>

        <div class="modal-action">
          <button type="button" class="btn" @click="close">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <span v-if="submitting" class="loading loading-spinner loading-sm mr-2"></span>
            Create
          </button>
        </div>
      </form>
    </div>

    <div class="modal-backdrop" @click="close"></div>
  </dialog>
</template>