<template>
  <div class="p-5 max-w-xl mx-auto">
    <template v-if="product">
      <div class="flex items-start">
        <figure class="relative mb-2 w-full h-4/5">
          <img :src="product.images[0]"
               :alt="product.title"
               class="w-full h-full object-cover rounded-lg">
          <span class="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2" v-text="product.category.name"></span>
        </figure>
        <div>
          <h2 v-text="product.title"
                class="text-sm font-light"></h2>
          <p v-text="'$' + product.price"
             class="text-lg font-medium"></p>
          <p class="text-grey mb-2" v-text="product.description"></p>
          <button @click="toggleFavoritesProducts(product)"
                  v-text="isFavorites(product.id) ? 'Remove Form Favorites' : 'Add To Favorites'"
                  :class="isFavorites(product.id) ? 'bg-red' : 'bg-green'"
                  class="p-3 text-white w-full"
          ></button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";


export default {
  name: 'ProductView',
  computed: {
    ...mapState(['productsInCategory']),
    ...mapGetters(['isFavorites']),
    product() {
      return this.productsInCategory.find(product => {
        return product.id === parseInt(this.$route.params.id)
      })
    }
  },
  mounted() {
    if (this.product) {
      this.$store.commit('addToRecentlyViewed', this.product)
    }
  },
  methods: {
    ...mapMutations(['toggleFavorites']),
    toggleFavoritesProducts(product) {
      this.toggleFavorites(product)
    },
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
