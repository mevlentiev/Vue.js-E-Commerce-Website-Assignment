<template>
  <div class="flex flex-column">
    <h2 class="text-xl font-bold mb-2">Favorites</h2>
    <template v-if="favoritesProducts.length > 0">
      <div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li v-for="product in favoritesProducts"
              :key="product.id"
              @click="goToProduct(product.id)"
              class="Card bg-white cursor-pointer w-full h-full rounded-lg  active:scale-110 transition ease duration-75">
            <figure class="relative mb-2 w-full h-4/5">
              <img :src="product.images[0]"
                   :alt="product.title"
                   loading="lazy"
                   class="w-full h-full object-cover rounded-lg">
              <span class="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2" v-text="product.category.name"></span>
            </figure>
            <p class="flex flex-column">
          <span v-text="product.title"
                class="text-sm font-light line-clamp-1"></span>
              <span v-text="'$' + product.price"
                    class="text-lg font-medium"></span>
            </p>

            <button @click.stop="toggleFavoritesProducts(product)"
                    v-text="isFavorites(product.id) ? 'Remove Form Favorites' : 'Add To Favorites'"
                    :class="isFavorites(product.id) ? 'bg-red' : 'bg-green'"
                    class="p-3 text-white w-full"
            ></button>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center">
        <h2>No results :(((</h2>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: 'FavoritesView',
  computed: {
    ...mapState(['favoritesProducts']),
    ...mapGetters(['isFavorites']),
  },
  methods: {
    ...mapMutations(['toggleFavorites']),
    toggleFavoritesProducts(product) {
      this.toggleFavorites(product)
    },
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
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
