<template>
  <div class="home">
    <HomeProducts></HomeProducts>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeProducts from '@/components/HomeView/HomeProducts.vue'

export default {
  name: 'HomeView',
  components: {
    HomeProducts
  }
}
</script>
