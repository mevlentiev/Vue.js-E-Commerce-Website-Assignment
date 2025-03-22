<template>
  <div class="flex flex-column">

    <template v-if="lastFavorites.length > 0">
      <div>
        <h2 class="text-xl font-bold my-4">Favorites</h2>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li v-for="product in lastFavorites"
              :key="product.id"
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
            <button @click="toggleFavoritesProducts(product)"
                    v-text="isFavorites(product.id) ? 'Remove Form Favorites' : 'Add To Favorites'"
                    :class="isFavorites(product.id) ? 'bg-red' : 'bg-green'"
                    class="p-3 text-white w-full"
            ></button>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="recentlyViewed.length > 0">
      <div>
        <h2 class="text-xl font-bold my-4">Recently Viewed</h2>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li v-for="product in recentlyViewed"
              :key="product.id"
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
            <button @click="toggleFavoritesProducts(product)"
                    v-text="isFavorites(product.id) ? 'Remove Form Favorites' : 'Add To Favorites'"
                    :class="isFavorites(product.id) ? 'bg-red' : 'bg-green'"
                    class="p-3 text-white w-full"
            ></button>
          </li>
        </ul>
      </div>
    </template>

    <h2 class="text-xl font-bold my-4">Products</h2>

    <SearchProducts></SearchProducts>

    <template v-if="filteredProducts.length > 0">
      <div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li v-for="product in filteredProducts"
              :key="product.id"
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
            <button @click="toggleFavoritesProducts(product)"
                    v-text="isFavorites(product.id) ? 'Remove Form Favorites' : 'Add To Favorites'"
                    :class="isFavorites(product.id) ? 'bg-red' : 'bg-green'"
                    class="p-3 text-white w-full"
            ></button>
          </li>
        </ul>

        <div class="mt-5 flex justify-center gap-4">
          <button @click="prevPage"
                  :disabled="currentPage === 1"
                  class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Previous
          </button>
          <button @click="nextPage"
                  class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </div>
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
import SearchProducts from '@/components/HomeView/SearchProducts.vue'

export default {
  name: 'HomeProducts',
  components: {SearchProducts},
  computed: {
    ...mapState(['products', 'searchQuery']),
    ...mapGetters(['isFavorites', 'recentlyViewed', 'lastFavorites']),
    filteredProducts() {
      return this.searchQuery.length > 0 ? this.products.filter(product => {
        return product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      }) : this.products
    },
    offset() {
      return (this.currentPage - 1) * this.limit
    }
  },
  mounted() {
    if (!this.products.length) {
      this.loadProducts()
    }
  },
  methods: {
    ...mapMutations(['toggleFavorites']),
    toggleFavoritesProducts(product) {
      this.toggleFavorites(product)
    },
    loadProducts() {
      this.$store.dispatch('fetchProducts', {
        offset: this.offset,
        limit: this.limit
      })
    },
    nextPage() {
      this.currentPage++
      this.loadProducts()
    },
    prevPage() {
      if (this.currentPage !== 1) {
        this.currentPage--
        this.loadProductsInCategory()
      }
    },
  },
  data() {
    return {
      currentPage: 1,
      limit: 8
    }
  }
}
</script>

<style scoped>

</style>
