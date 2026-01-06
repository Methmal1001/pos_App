<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Collapsible Sidebar -->
    <Sidenavbar :sidebar-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Category Buttons -->
      <div class="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
        <div class="flex flex-wrap gap-3 justify-center sm:justify-start overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="activeTab === tab
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            class="px-6 py-3 rounded-full font-medium text-sm sm:text-base transition whitespace-nowrap"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Main Content: Products + Order Panel -->
      <div class="flex flex-1 flex-col lg:flex-row">
        <!-- Products Grid -->
        <div class="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
            >
              <!-- Fixed Size Image Container (click image for fullscreen popup) -->
              <div class="relative w-full h-48 sm:h-56 bg-gray-100 overflow-hidden" @click.stop="openImagePopup(product.image)">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span class="text-white text-lg font-semibold">View Full</span>
                </div>
              </div>

              <!-- Product Info + ADD Button -->
              <div class="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight">
                    {{ product.name }}
                  </h3>
                  <p class="text-xl font-bold text-orange-600 mt-3">
                    ${{ product.price.toFixed(2) }}
                  </p>
                </div>
                <button
                  @click.stop="addToOrder(product)"
                  class="mt-4 border border-yellow-700 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-700 hover:text-white font-medium transition"
                >
                  ADD
                </button>

              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-24 text-gray-500">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
            <p class="text-xl font-medium">No items in {{ activeTab }}</p>
            <p class="text-sm mt-2">This category is empty or coming soon</p>
          </div>
        </div>

        <!-- Order Panel (FIXED HEIGHT, NOT FIXED POSITION) -->
        <div
          class="w-full lg:w-[32rem]
                h-screen
                bg-white shadow-xl
                flex flex-col
                border-t lg:border-t-0 lg:border-l
                overflow-hidden"
        >

          <!-- Header -->
          <div class="p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100 flex justify-between items-center shrink-0">
            <h2 class="text-xl font-bold text-gray-800">Current Order</h2>

            <div class="relative cursor-pointer px-2" @click="showHoldOrders = true">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>

              <span
                v-if="holdOrdersCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
              >
                {{ holdOrdersCount }}
              </span>
            </div>
          </div>

          <!-- ONLY THIS SECTION SCROLLS -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3">

            <div
              v-for="(item, index) in orderItems"
              :key="item.id"
              :class="index === selectedItemIndex ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-gray-50'"
              class="rounded-lg p-3 border border-gray-200 text-sm"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">
                    {{ item.qty }} × {{ item.name }}
                  </p>
                  <p class="text-xs text-gray-500">Standard portion</p>
                </div>

                <div class="text-right">
                  <p class="font-bold text-orange-600">
                    ${{ (item.price * item.qty).toFixed(2) }}
                  </p>
                  <button
                    @click.stop="removeItem(item)"
                    class="text-red-500 hover:text-red-700 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div class="flex gap-2">
                <input
                  type="number"
                  v-model.number="item.qty"
                  min="1"
                  class="w-16 border border-gray-300 rounded px-2 py-1 text-xs"
                />
                <input
                  type="text"
                  placeholder="Discount (%)"
                  class="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="orderItems.length === 0" class="text-center py-12 text-gray-400">
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4"></div>
              <p class="text-base font-medium">Your order is empty</p>
              <p class="text-sm">Tap ADD on any item</p>
            </div>
          </div>

          <!-- Payment Summary & Method Selection -->
          <div class="border-t p-4 bg-gray-50 shrink-0 space-y-6">

          <!-- Summary Card -->
          <div class="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div class="flex justify-between text-gray-600">
              <span class="font-medium">Subtotal</span>
              <span class="font-semibold border px-2 py-1 rounded border-gray-300 bg-gray-100">Rs {{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between text-gray-600 text-sm">
              <span class="font-medium">Tax (15%)</span>
              <span>Rs {{ tax.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between items-center border-t pt-3">
              <span class="text-lg font-bold text-gray-800">Total</span>
              <span class="text-lg font-bold text-white bg-orange-500 px-3 py-1 rounded-lg shadow-md">Rs {{ payableAmount.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Payment Method Selection -->
          <div class="flex gap-4 justify-center">
            <!-- Cash -->
            <button
              class="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 focus:ring-2 focus:ring-green-500"
            >
              <svg class="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 9V7a5 5 0 00-10 0v2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-2z"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">Cash</span>
            </button>

            <!-- Card -->
            <button
              class="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 focus:ring-2 focus:ring-blue-500"
            >
              <svg class="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 7h18M3 11h18M5 15h4"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">Card</span>
            </button>

            <!-- Credit -->
            <button
              class="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 focus:ring-2 focus:ring-purple-500"
            >
              <svg class="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM5 22v-2a4 4 0 014-4h6a4 4 0 014 4v2H5z"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">Credit</span>
            </button>
          </div>

        </div>

          <!-- Action Buttons (FIXED) -->
          <div class="border-t p-4 bg-white shrink-0">
            <div class="flex gap-3">
              <button
                @click="holdCurrentOrders"
                class="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-bold"
              >
                Hold Order
              </button>

              <button
                @click="proceedPayment"
                class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold"
              >
                Pay
              </button>
            </div>
          </div>

          <!-- Modals -->
          <holdOrders
            v-if="showHoldOrders"
            :hold-orders-list="holdOrdersList"
            @close="showHoldOrders = false"
            @use-and-delete-order="useAndDeleteHoldOrder"
            @delete-order="deleteHoldOrder"
          />

          <payments
            v-if="showPayments"
            :order-items="orderItems"
            @close="closePayments"
          />
        </div>

      </div>
    </div>

    <!-- Fullscreen Image Popup -->
    <div v-if="popupImage" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" @click="popupImage = null">
      <img :src="popupImage" alt="Full size product" class="max-w-full max-h-full object-contain" />
      <button class="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-400">✕</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Sidenavbar from '~/components/sidenavbar.vue'
import Header from '~/components/header.vue'
import payments from '~/components/payments/index.vue'
// import { mapState, mapActions, mapMutations } from 'vuex'
import holdOrders from '~/components/hold_orders/index.vue'

import { useRouter } from 'vue-router'

export default {
  components: {
    Sidenavbar,
    Header,
    payments,
    holdOrders,
  },

  data() {
    return {
      sidebarOpen: true,
      activeTab: 'Lunch',
      selectedItemIndex: -1,
      popupImage: null,
      tabs: ['Starters', 'Breakfast', 'Lunch', 'Supper', 'Deserts', 'Beverages'],
      products: [
        { id: 1, name: 'Schezwan Egg Noodles', price: 24.00, category: 'Lunch', image: 'https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles-500x375.jpg' },
        { id: 2, name: 'Stir Egg Fry Udon Noodles', price: 24.00, category: 'Lunch', image: 'https://eggs.ca/wp-content/uploads/2024/06/Kimchi-Udon-Stir-Fry-with-Fried-Eggs2-CMS.jpg' },
        { id: 3, name: 'Thai Style Fried Noodles', price: 26.00, category: 'Lunch', image: 'https://d1w7312wesee68.cloudfront.net/1usnAkC5ZbalV8sAU577gWVhdYtiH05B3pkMf_9uI34/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-253052000000000000/menu/images/item-8af8458e-fb30-4914-bde9-3cd7f2de4edd.jpg' },
        { id: 4, name: 'Chinese Prawn Spaghetti', price: 32.00, category: 'Supper', image: 'https://images.notquitenigella.com/images/kung-pao-prawn-spaghetti/ll.jpg' },
        { id: 5, name: 'Pancakes with Maple Syrup', price: 18.00, category: 'Breakfast', image: 'https://www.giallozafferano.com/images/260-26079/Pancakes-with-maple-syrup_1200x800.jpg' },
        { id: 6, name: 'Avocado Toast', price: 15.00, category: 'Breakfast', image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/qegjhdml/266b99bc-c80b-4e55-8eeb-a1891793a5f0.jpg' },
        { id: 7, name: 'Spring Rolls', price: 12.00, category: 'Starters', image: 'https://www.thespruceeats.com/thmb/LAD6HCmf0MFSpV3JDJgM9n7REos=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-thai-fresh-rolls-with-vegetarian-option-3217706-hero-A-3bdb04a8ee2444a2ab6873810a334642.jpg' },
        { id: 8, name: 'Chocolate Lava Cake', price: 14.00, category: 'Deserts', image: 'https://www.allrecipes.com/thmb/J0D_WQYOGJs3PpuDqqconBr0efI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7272577-67dd531d7b4a48dbb254dcdaafa658d4.jpg' },
        { id: 9, name: 'Fresh Orange Juice', price: 8.00, category: 'Beverages', image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-1296x728-feature.jpg?w=1155&h=1528' },
        { id: 10, name: 'Grilled Chicken Salad', price: 22.00, category: 'Lunch', image: 'https://challengedairy.com/wp-content/uploads/recipe_zesty_ranch_chicken_salad_2280.jpg' },
        { id: 11, name: 'Tiramisu', price: 16.00, category: 'Deserts', image: 'https://www.bunsenburnerbakery.com/wp-content/uploads/2016/06/easy-tiramisu-square-29-720x540.jpg' },
        { id: 12, name: 'Iced Latte', price: 10.00, category: 'Beverages', image: 'https://www.coca-cola.com/content/dam/onexp/us/en/brands/simply/products/simply-hpg-product-category-img-orange.jpg' },
      ],
      showPayments: false,

      orderItems: [],
      holdOrdersList: [],      // store held orders
      holdOrdersCount: 0,      // notification badge
      showHoldOrders: false,
    }
  },

  // watch: {
  //   showPayments(newVal) {
  //     if (newVal) {
  //       document.body.style.overflow = 'hidden' // disable scroll
  //     } else {
  //       document.body.style.overflow = 'auto'   // enable scroll
  //     }
  //   }
  // },

  computed: {
    // ...mapState({

    // }),
    filteredProducts() {
      return this.products.filter(p => p.category === this.activeTab)
    },

    subtotal() {
      return this.orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
    },

    tax() {
      return this.subtotal * 0.15
    },

    payableAmount() {
      return this.subtotal + this.tax
    }
  },

  methods: {
    addToOrder(product) {
      const existing = this.orderItems.find(i => i.id === product.id)
      if (existing) {
        existing.qty += 1
      } else {
        this.orderItems.push({ ...product, qty: 1 })
      }
    },

    removeItem(itemToRemove) {
      this.orderItems = this.orderItems.filter(i => i.id !== itemToRemove.id)
    },

    openImagePopup(imageUrl) {
      this.popupImage = imageUrl
    },

    proceedPayment() {
      this.showPayments = true
      document.body.style.overflow = 'hidden'
    },
    closePayments() {
      this.showPayments = false
      document.body.style.overflow = 'auto'
    },

    holdCurrentOrders() {
      if (this.orderItems.length === 0) return;

      // Ask for confirmation
      const confirmed = confirm('Are you sure you want to hold this order?');
      if (!confirmed) return; // stop if user clicks "Cancel"

      // Add current order to holdOrdersList
      this.holdOrdersList.push([...this.orderItems]);

      // Update badge count
      this.holdOrdersCount = this.holdOrdersList.length;

      // Optionally clear current order
      this.orderItems = [];

      // Show the hold orders modal
      // this.showHoldOrders = true;
    },

    closeHoldOrders() {
      this.showHoldOrders = false;
    },

    useAndDeleteHoldOrder(index) {
      // Load into current order
      this.orderItems = [...this.holdOrdersList[index]]
      
      // Remove from hold orders list
      this.holdOrdersList.splice(index, 1)
      this.holdOrdersCount = this.holdOrdersList.length
      
      // Close modal
      this.showHoldOrders = false
    },
    deleteHoldOrder(index) {
      this.holdOrdersList.splice(index, 1)
      this.holdOrdersCount = this.holdOrdersList.length
    },
    holdOrders() {
      if (this.orderItems.length > 0) {
        this.holdOrdersList.push([...this.orderItems])
        this.holdOrdersCount = this.holdOrdersList.length
        this.orderItems = []  // optionally clear current order
      }
    },
  }
}
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
</style>