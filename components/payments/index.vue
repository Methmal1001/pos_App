<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
    <!-- Modal -->
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative z-50"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-4 text-red-500 font-bold text-2xl hover:text-red-700 transition"
      >
        ✕
      </button>

      <!-- Title -->
      <h2 class="text-xl font-bold mb-4 text-center text-gray-800">
        Restaurant Bill
      </h2>

      <!-- Restaurant Info -->
      <div class="text-center text-sm text-gray-500 mb-4">
        <p class="font-semibold text-gray-700">ABC Restaurant</p>
        <p>Main Street, City</p>
        <p>Tel: 011-2345678</p>
      </div>

      <hr class="border-dashed mb-4" />

      <!-- Customer Contact -->
      <div class="flex items-center justify-between mb-4">
        <span class="font-semibold text-gray-700">Customer Tel</span>
        <input
          v-model="contactNumber"
          type="text"
          placeholder="07XXXXXXXX"
          class="border border-orange-400 rounded px-2 py-1 w-36 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      </div>

      <!-- Items -->
      <div class="divide-y divide-gray-200 max-h-60 overflow-y-auto text-sm">
        <div
          v-for="item in orderItems"
          :key="item.id"
          class="flex justify-between py-2"
        >
          <div class="flex-1 text-gray-700">
            {{ item.qty }} × {{ item.name }}
          </div>
          <div class="font-semibold text-gray-800">
            Rs {{ (item.qty * item.price).toFixed(2) }}
          </div>
        </div>
      </div>

      <hr class="border-dashed my-4" />

      <!-- Total -->
      <div class="flex justify-between text-base font-bold text-gray-800">
        <span>Total</span>
        <span>Rs {{ totalAmount.toFixed(2) }}</span>
      </div>

      <!-- Payment Method -->
      <div class="flex justify-between items-center mt-3 text-sm">
        <span class="font-semibold text-gray-700">Payment</span>
        <span
          class="px-3 py-1 rounded-full bg-yellow-400 font-bold uppercase text-gray-900"
        >
          {{ paymentMethod }}
        </span>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-gray-500 mt-5">
        Thank you! Please visit again 😊
      </p>

      <!-- Action Buttons -->
      <div class="mt-6 flex gap-3">
        <button
          @click="$emit('close')"
          class="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Close
        </button>
        <button
          class="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          Confirm Payment
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
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      contactNumber: ''
    }
  },

  computed: {
    totalAmount() {
      return this.orderItems.reduce(
        (total, item) => total + item.qty * item.price,
        0
      )
    }
  }
}
</script>

<style scoped>
/* Smooth scroll inside bill */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>
