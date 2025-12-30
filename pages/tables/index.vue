<template>
<div class="flex min-h-screen bg-gray-50">
    <Sidenavbar :sidebar-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
    <div class="flex-1 flex flex-col">
        <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    </div>
</div>  
</template>


<script>
import { ref, computed } from 'vue'
import Sidenavbar from '~/components/sidenavbar.vue'
import Header from '~/components/header.vue'
// import { mapState, mapActions, mapMutations } from 'vuex'

import { useRouter } from 'vue-router'

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

  computed: {
    // ...mapState({

    // }),
    
  },

  methods: {
    
  }
}
</script>

<style scoped>
</style>