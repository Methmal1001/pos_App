<template>
  <div
    :class="sidebarOpen ? 'w-54' : 'w-20'"
    class="bg-gray-100 text-gray-700 flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
  >
    <!-- Logo / Title Area -->
    <div class="py-6 px-4 flex items-center justify-between border-b border-gray-200">
      <h2 v-show="sidebarOpen" class="text-xl font-bold text-orange-500">POS</h2>
      <button
        @click="$emit('toggle')"
        class="p-2 rounded hover:bg-gray-200 text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'" />
        </svg>
      </button>
    </div>

    <!-- Menu Items -->
    <ul class="flex-1 py-8 space-y-4 px-4">
      <li v-for="item in menuItems" :key="item.name" class="cursor-pointer group">
        <div
          :class="item.name === 'Home' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200 text-gray-600 group-hover:text-gray-800'"
          class="p-3 rounded-lg transition flex items-center space-x-3"
        >
          <span class="text-2xl">{{ item.icon }}</span>
          <span v-show="sidebarOpen" class="text-sm font-medium">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  sidebarOpen: Boolean
})
defineEmits(['toggle'])

const menuItems = [
  { name: 'Home', icon: '🏠' },
  { name: 'Customers', icon: '👥' },
  { name: 'Tables', icon: '🪑' },
  { name: 'Orders', icon: '🧾' },
  { name: 'Cashier', icon: '💵' },
  { name: 'Reports', icon: '📊' },
  { name: 'Settings', icon: '⚙️' }
]
</script>