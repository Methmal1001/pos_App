<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidenavbar
      :sidebar-open="sidebarOpen"
      @toggle="sidebarOpen = !sidebarOpen"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <!-- <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" /> -->

      <!-- Settings Content -->
      <div class="p-6">
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800">Settings</h1>
          <p class="text-gray-500 mt-1">
            Manage system configuration and restaurant preferences
          </p>
        </div>

        <!-- Settings Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Manage Products -->
          <div
            @click="goTo('/settings/products')"
            class="settings-card"
          >
            <div class="icon bg-orange-100 text-orange-600">🍔</div>
            <h3>Manage Products</h3>
            <p>Add, edit menu items, prices, categories</p>
          </div>

          <!-- Manage Staff -->
          <div
            @click="goTo('/settings/staff')"
            class="settings-card"
          >
            <div class="icon bg-blue-100 text-blue-600">👤</div>
            <h3>Manage Staff</h3>
            <p>Cashiers, admins, roles & permissions</p>
          </div>

          <!-- Manage Tables -->
          <div
            @click="goTo('/settings/tables')"
            class="settings-card"
          >
            <div class="icon bg-green-100 text-green-600">🪑</div>
            <h3>Manage Tables</h3>
            <p>Table layout, sections, capacity</p>
          </div>

          <!-- Transaction Management -->
          <div
            @click="goTo('/settings/transactions')"
            class="settings-card"
          >
            <div class="icon bg-purple-100 text-purple-600">💳</div>
            <h3>Transaction Management</h3>
            <p>Payments, refunds, invoices</p>
          </div>

          <!-- Appearance -->
          <div
            @click="goTo('/settings/appearance')"
            class="settings-card"
          >
            <div class="icon bg-pink-100 text-pink-600">🎨</div>
            <h3>Appearance</h3>
            <p>Theme colors, receipt design</p>
          </div>

          <!-- System Settings -->
          <div
            @click="goTo('/settings/system')"
            class="settings-card"
          >
            <div class="icon bg-gray-200 text-gray-700">⚙️</div>
            <h3>System Settings</h3>
            <p>Tax, currency, printer, language</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidenavbar from '~/components/sidenavbar.vue'
import Header from '~/components/header.vue'

export default {
  components: {
    Sidenavbar,
    Header
  },

  data() {
    return {
      sidebarOpen: true
    }
  },

  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
/* Card Styling */
.settings-card {
  @apply bg-white rounded-xl p-6 border border-gray-200 shadow-sm cursor-pointer
         hover:shadow-lg hover:-translate-y-1 transition-all duration-300;
}

.settings-card h3 {
  @apply text-lg font-semibold text-gray-800 mt-4;
}

.settings-card p {
  @apply text-sm text-gray-500 mt-1;
}

.icon {
  @apply w-14 h-14 rounded-xl flex items-center justify-center text-2xl;
}
</style>
