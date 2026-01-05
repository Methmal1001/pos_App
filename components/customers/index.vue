<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-6">Add New Customer</h2>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="form.name" required class="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="form.phone" required class="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email (optional)</label>
            <input v-model="form.email" type="email" class="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div class="mt-6 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 py-3 border border-gray-300 rounded-lg">Cancel</button>
          <button type="submit" class="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600">Add Customer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { name: '', phone: '', email: '' }
    }
  },
  methods: {
    submit() {
      this.$emit('add', this.form)
    }
  }
}
</script>