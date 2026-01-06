<template>
  <div
    :class="sidebarOpen ? 'w-56' : 'w-20'"
    class="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex flex-col transition-all duration-300 ease-in-out overflow-hidden shadow-lg"
  >
    <!-- Logo / Toggle Button -->
    <div class="py-6 px-4 flex items-center justify-between border-b border-gray-700">
      <!-- Logo / Title -->
      <h2 v-show="sidebarOpen" class="text-xl font-bold text-orange-400">
       
      </h2>

      <!-- Toggle Button -->
      <button
        @click="$emit('toggle')"
        class="p-2 rounded ml-auto mr-auto 
               text-gray-200 hover:bg-gray-600
               transition-all duration-300 ease-in-out
               transform hover:scale-110 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="sidebarOpen
              ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7'
              : 'M13 5l7 7-7 7M5 5l7 7-7 7'"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Items -->
    <ul class="flex-1 py-6 my-3 space-y-2 px-2">
      <li v-for="item in menuItems" :key="item.name" class="group">
        <nuxt-link
          :to="item.path"
          class="flex items-center space-x-4 p-3 rounded-lg transition duration-300"
          :class="[
            $route.path === item.path
              ? 'bg-orange-500 text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          ]"
        >
          <!-- Icon -->
          <span class="text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            {{ item.icon }}
          </span>

          <!-- Label -->
          <span v-show="sidebarOpen" class="text-sm font-medium transition-opacity duration-300">
            {{ item.name }}
          </span>
        </nuxt-link>
      </li>
    </ul>

    <!-- Footer / Optional -->
    <div class="py-4 px-4 border-t border-gray-700 text-center text-gray-400 text-xs">
      © 2026 Restaurant POS
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sidebarOpen: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      menuItems: [
        { name: 'Home', icon: '🏠', path: '/' },
        { name: 'Cashier', icon: '💵', path: '/cashier' },
        { name: 'Orders', icon: '🧾', path: '/orders' },
        { name: 'Tables', icon: '🍽️', path: '/tables' },
        { name: 'Customers', icon: '👥', path: '/customers' },
        { name: 'Reports', icon: '📊', path: '/reports' },
        { name: 'Settings', icon: '⚙️', path: '/settings' }
      ]
    }
  }
}
</script>

<style scoped>
/* Smooth icon hover */
.group:hover span {
  transition: transform 0.3s;
  transform: scale(1.15);
}

/* Optional: make label fade smoothly when sidebar collapses */
span {
  transition: opacity 0.3s, transform 0.3s;
}
</style>
