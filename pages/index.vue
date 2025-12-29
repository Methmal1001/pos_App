<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Collapsible Sidebar -->
    <Slidenavbar :sidebar-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

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

        <!-- Order Panel (Smaller cards, auto-calculates subtotal & tax) -->
        <div class="w-full lg:w-96 bg-white shadow-xl flex flex-col border-t lg:border-t-0 lg:border-l">
          <!-- Mobile Header -->
          <div class="lg:hidden p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-800">Current Order</h2>
            <button class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
              + Add Customer
            </button>
          </div>

          <!-- Desktop Header -->
          <div class="hidden lg:flex p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100 justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">Order</h2>
            <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              + Add Customer
            </button>
          </div>

          <!-- Order Items List (Smaller compact cards) -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="(item, index) in orderItems"
              :key="item.id"
              :class="index === selectedItemIndex ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-gray-50'"
              class="rounded-lg p-3 border border-gray-200 transition-all text-sm"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">
                    {{ item.qty }} × {{ item.name }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">Standard portion</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-orange-600">
                    ${{ (item.price * item.qty).toFixed(2) }}
                  </p>
                  <button @click.stop="removeItem(item)" class="text-red-500 hover:text-red-700 text-lg">✕</button>
                </div>
              </div>

              <div class="flex gap-2">
                <input
                  type="number"
                  :value="item.qty"
                  min="1"
                  class="w-16 border border-gray-300 rounded px-2 py-1 text-xs focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Discount (%)"
                  class="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </div>
            </div>

            <!-- Empty Order -->
            <div v-if="orderItems.length === 0" class="text-center py-12 text-gray-400">
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4"></div>
              <p class="text-base font-medium">Your order is empty</p>
              <p class="text-sm mt-1">Tap ADD on any item</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-4 border-t grid grid-cols-2 gap-2 text-sm">
            <button class="py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">Add Note</button>
            <button class="py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">Discount</button>
            <button class="py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">Coupon</button>
            <button class="py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">More</button>
          </div>

          <!-- Summary (auto-calculated) -->
          <div class="p-4 border-t bg-gradient-to-b from-gray-50 to-white space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tax (15%)</span>
              <span class="font-semibold">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
              <span>Payable Amount</span>
              <span class="text-orange-600">${{ payableAmount.toFixed(2) }}</span>
            </div>

            <div class="flex gap-3 pt-3">
              <button class="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-bold">
                Hold Order
              </button>
              <button class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold">
                Proceed
              </button>
            </div>
          </div>
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

<script setup>
import { ref, computed } from 'vue'
import Slidenavbar from '~/components/slidenavbar.vue'
import Header from '~/components/header.vue'

const sidebarOpen = ref(true)
const activeTab = ref('Lunch')
const selectedItemIndex = ref(-1)
const popupImage = ref(null) // For fullscreen popup

const tabs = ['Starters', 'Breakfast', 'Lunch', 'Supper', 'Deserts', 'Beverages']

// High-quality real food images from web search (ready for backend replacement)
const products = ref([
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
  { id: 12, name: 'Iced Latte', price: 10.00, category: 'Beverages', image: 'https://www.coca-cola.com/content/dam/onexp/us/en/brands/simply/products/simply-hpg-product-category-img-orange.jpg' }, // fallback similar
])

const filteredProducts = computed(() => products.value.filter(p => p.category === activeTab.value))

const orderItems = ref([])

function addToOrder(product) {
  const existing = orderItems.value.find(i => i.id === product.id)
  if (existing) {
    existing.qty += 1
  } else {
    orderItems.value.push({ ...product, qty: 1 })
  }
}

function removeItem(itemToRemove) {
  orderItems.value = orderItems.value.filter(i => i.id !== itemToRemove.id)
}

function openImagePopup(imageUrl) {
  popupImage.value = imageUrl
}

const subtotal = computed(() => orderItems.value.reduce((acc, item) => acc + (item.price * item.qty), 0))
const tax = computed(() => subtotal.value * 0.15)
const payableAmount = computed(() => subtotal.value + tax.value)
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
</style>