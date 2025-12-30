<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- Mobile Menu Toggle -->
      <!-- <button @click="$emit('toggle-sidebar')" class="lg:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> -->
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Restro POS</h1>
    </div>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xs sm:max-w-md mx-4 sm:mx-8">
      <div class="relative">
        <input
          type="text"
          placeholder="Search products....."
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
        />
        <span class="absolute left-3 top-3.5 text-gray-400">🔍</span>
      </div>
    </div>

    <!-- Right Icons + Button -->
    <div class="flex items-center space-x-3 sm:space-x-4">
      <button class="text-gray-600 hover:text-gray-800">
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      </button>
      <button class="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 text-sm font-medium">
        Select Table
      </button>
    </div>
  </header>
</template>

<script setup>
defineEmits(['toggle-sidebar'])
</script>