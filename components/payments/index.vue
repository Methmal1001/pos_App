<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
    
    <!-- Modal -->
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 overflow-auto relative z-50">
      
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-red-500 font-bold text-2xl hover:text-red-700 transition"
      >
        ✕
      </button>

      <!-- Title -->
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>

      <!-- Order Items List -->
      <div class="divide-y divide-gray-200">
        <div 
          v-for="item in orderItems" 
          :key="item.id" 
          class="flex justify-between items-center py-3"
        >
          <div class="text-gray-700 font-medium">
            {{ item.qty }} × {{ item.name }}
          </div>
          <div class="text-gray-900 font-semibold">
            Rs. {{ (item.qty * item.price).toFixed(2) }}
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="mt-6 flex justify-between items-center text-lg font-bold text-gray-800 border-t pt-4">
        <span>Total</span>
        <span>Rs. {{ orderItems.reduce((acc, i) => acc + i.qty*i.price, 0).toFixed(2) }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex gap-3">
        <button
          @click="$emit('close')"
          class="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Cancel
        </button>
        <button
          class="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          Proceed to Pay
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
div[overflow-auto] {
  -webkit-overflow-scrolling: touch;
}
</style>