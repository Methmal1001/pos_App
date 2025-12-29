// layouts/posLayout.vue
<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col">
      <div class="p-4 text-xl font-bold border-b border-gray-700">
        POS System
      </div>
      <nav class="flex-1 p-2 space-y-1">
        <button
          v-for="item in categories"
          :key="item"
          class="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          {{ item }}
        </button>
      </nav>
      <div class="p-4 border-t border-gray-700 text-sm">
        Cashier: Admin
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
const categories = [
  'All Items',
  'Beverages',
  'Food',
  'Snacks',
  'Desserts'
]
</script>