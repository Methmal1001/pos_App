<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidenavbar :sidebar-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Page Content -->
      <div class="p-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 class="text-3xl font-bold text-gray-800">Customers</h1>

          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <!-- Search -->
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name or phone..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Add Customer -->
            <button
              @click="addCustomers"
              class="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium
                     hover:bg-orange-600 transition shadow-md flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Customer
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div class="flex border-b">
            <button
              @click="activeTab = 'registered'"
              :class="activeTab === 'registered'
                ? 'border-b-4 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-800'"
              class="flex-1 py-4 font-medium text-center transition"
            >
              Registered Customers
            </button>

            <button
              @click="activeTab = 'walkin'"
              :class="activeTab === 'walkin'
                ? 'border-b-4 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-800'"
              class="flex-1 py-4 font-medium text-center transition"
            >
              Walk-in Customers
            </button>
          </div>

          <!-- Customer List -->
          <div class="p-6">
            <!-- Empty -->
            <div v-if="filteredCustomers.length === 0" class="text-center py-12 text-gray-500">
              <p class="text-lg font-medium">No customers found</p>
              <p class="text-sm mt-2">Try adjusting your search or add a new customer</p>
            </div>

            <!-- Cards -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="customer in filteredCustomers"
                :key="customer.id"
                @click="viewCustomerDetails(customer)"
                class="relative bg-white border border-gray-200 rounded-xl shadow-sm
                       hover:shadow-md transition cursor-pointer"
              >
                <!-- Walk-in badge -->
                <span
                  v-if="customer.isWalkin"
                  class="absolute top-3 right-3 bg-blue-100 text-blue-700
                         text-xs px-2 py-1 rounded-full"
                >
                  Walk-in
                </span>
                <span
                  v-if="!customer.isWalkin"
                  class="absolute top-3 right-3 bg-blue-100 text-blue-700
                         text-xs px-2 py-1 rounded-full"
                >
                  Registered
                </span>

                <div class="p-5">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-orange-100 rounded-full flex items-center
                             justify-center text-orange-600 font-bold text-xl"
                    >
                      {{ customer.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800 text-lg">
                        {{ customer.name }}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {{ customer.phone || 'No phone' }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p class="text-gray-500">Last Visit</p>
                      <p class="font-medium">{{ customer.lastVisit || 'Never' }}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Spent</p>
                      <p class="font-medium text-orange-600">
                        Rs. {{ customer.totalSpent.toFixed(2) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-500">Loyalty Points</p>
                      <p class="font-medium text-green-600">
                        {{ customer.points }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-500">Orders</p>
                      <p class="font-medium">
                        {{ customer.orderCount }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 px-5 py-3 border-t text-right">
                  <span class="text-orange-600 font-medium hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
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
      sidebarOpen: true,
      activeTab: 'registered',
      searchQuery: '',
      customers: [
        {
          id: 1,
          name: 'John Doe',
          phone: '0771234567',
          lastVisit: 'Dec 28, 2025',
          totalSpent: 2450.50,
          points: 120,
          orderCount: 8
        },
        {
          id: 2,
          name: 'Sarah Lee',
          phone: '0719876543',
          lastVisit: 'Dec 29, 2025',
          totalSpent: 1897.75,
          points: 95,
          orderCount: 5,
        },
        {
          id: 1,
          name: 'James Smith',
          phone: '0771234567',
          lastVisit: 'Dec 28, 2025',
          totalSpent: 2450.50,
          points: 120,
          orderCount: 8
        },
        {
          id: 2,
          name: 'Mishura Fernando',
          phone: '0719876543',
          lastVisit: 'Dec 29, 2025',
          totalSpent: 1897.75,
          points: 95,
          orderCount: 5,
        },
        {
          id: 1001,
          name: 'Anuradha Perera',
          phone: '0998833445',
          lastVisit: 'Dec 30, 2025',
          totalSpent: 458.80,
          points: 0,
          orderCount: 1,
          isWalkin: true
        }
      ]
    }
  },

  computed: {
    filteredCustomers() {
      let list =
        this.activeTab === 'registered'
          ? this.customers.filter(c => !c.isWalkin)
          : this.customers.filter(c => c.isWalkin)

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(
          c =>
            c.name.toLowerCase().includes(q) ||
            (c.phone && c.phone.includes(q))
        )
      }
      return list
    }
  },

  methods: {
    addCustomers() {
      this.$router.push(`/customers/add`)
    },

    viewCustomerDetails(customer) {
      this.$router.push(`/customers/${customer.id}`)
    }
  }
}
</script>
