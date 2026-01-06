<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
    <div 
      class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 relative z-50 flex flex-col"
    >
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 text-red-500 font-bold text-2xl hover:text-red-700"
      >
        ✕
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Hold Orders</h2>

      <!-- Scrollable List Container -->
      <div 
        class="flex-1 overflow-y-auto space-y-4 max-h-[60vh] pr-2"
      >
        <!-- List of Hold Orders -->
        <div 
          v-for="(order, index) in holdOrdersList" 
          :key="index" 
          class="border rounded p-4 bg-gray-50 shadow-sm"
        >
          <p class="font-semibold mb-2">Order #{{ index + 1 }}</p>

          <!-- Items in the Order -->
          <div v-for="item in order" :key="item.id" class="flex justify-between py-1 border-b last:border-b-0">
            <span>{{ item.qty }} × {{ item.name }}</span>
            <span>Rs. {{ (item.qty * item.price).toFixed(2) }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-2 mt-4">
            <button 
              @click="$emit('use-and-delete-order', index)" 
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold"
            >
              Use
            </button>
            <button 
              @click="$emit('delete-order', index)" 
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
            >
              Del
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="holdOrdersList.length === 0" class="text-center py-12 text-gray-400">
          <p class="text-base font-medium">No hold orders available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    holdOrdersList: {
      type: Array,
      required: true
    }
  }
}
</script>
