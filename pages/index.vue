<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Full-page background image -->
    <div
      class="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
      :style="{ backgroundImage: `url('https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }"
    ></div>

    <!-- Dark overlay for readability -->
    <div class="fixed inset-0 bg-black/50 -z-10"></div>

    <!-- Main layout -->
    <div class="flex flex-1 relative z-10">
      <Sidenavbar :sidebar-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

      <div class="flex-1 flex flex-col">
        <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

        <main class="flex-1 flex items-center justify-center p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            <!-- Cashier Card -->
            <router-link to="/cashier" class="group">
              <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center transition-transform group-hover:scale-105 group-hover:shadow-xl">
                <h3 class="text-2xl font-bold text-gray-800">Cashier</h3>
                <p class="mt-4 text-gray-600">Manage orders and payments</p>
              </div>
            </router-link>

            <!-- Reservations Card -->
            <router-link to="/tables" class="group">
              <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center transition-transform group-hover:scale-105 group-hover:shadow-xl">
                <h3 class="text-2xl font-bold text-gray-800">Reservations</h3>
                <p class="mt-4 text-gray-600">Book and manage tables</p>
              </div>
            </router-link>

            <!-- Complaints Card -->
            <router-link to="/reports" class="group">
              <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center transition-transform group-hover:scale-105 group-hover:shadow-xl">
                <h3 class="text-2xl font-bold text-gray-800">Reports</h3>
                <p class="mt-4 text-gray-600">View and handle customer feedback</p>
              </div>
            </router-link>
          </div>
        </main>
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
    Header,
  },

  data() {
    return {
      sidebarOpen: true,
    }
  },

  methods: {
    // You can add methods for future card actions if needed
  },
}
</script>

<style scoped>
/* Optional: hide scrollbar for cleaner look */
::-webkit-scrollbar {
  display: none;
}
</style>
