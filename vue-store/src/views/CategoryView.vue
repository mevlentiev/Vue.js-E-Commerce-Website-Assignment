<template>
  <div class="flex flex-column">
    <h2 class="text-xl font-bold mb-2">Products</h2>
    <template v-if="productsInCategory.length > 0">
      <div>
        <div class="flex justify-end my-4">
          <label class="flex items-center mr-2.5 font-weight-medium">Sort By:</label>
          <select v-model="currentSorting">
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A -> Z</option>
            <option value="name_desc">Name: Z -> A</option>
          </select>
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li v-for="product in sortedProducts"
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

export default {
  name: 'CategoryView',
  computed: {
    ...mapState(['productsInCategory']),
    ...mapGetters(['isFavorites']),
    categoryId() {
      return this.$route.params.id
    },
    offset() {
      return (this.currentPage - 1) * this.limit
    },
    sortedProducts() {
      const originalArray = [...this.productsInCategory]

      switch (this.currentSorting) {
        case 'price_asc':
          return originalArray.sort((a, b) => a.price - b.price)

        case 'price_desc':
          return originalArray.sort((a, b) => b.price - a.price)

        case 'name_asc':
          return originalArray.sort((a, b) => a.title.localeCompare(b.title))

        case 'name_desc':
          return originalArray.sort((a, b) => b.title.localeCompare(a.title))

        default:
          return originalArray
      }
    }
  },
  mounted() {
    this.loadProductsInCategory()
  },
  watch: {
    categoryId() {
      this.loadProductsInCategory()
    }
  },
  methods: {
    ...mapMutations(['toggleFavorites']),
    toggleFavoritesProducts(product) {
      this.toggleFavorites(product)
    },
    loadProductsInCategory() {
      this.$store.dispatch('fetchProductsByCategoryId', {
        categoryId: this.categoryId,
        offset: this.offset,
        limit: this.limit
      })
    },
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    nextPage() {
      this.currentPage++
      this.loadProductsInCategory()
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
      limit: 8,
      currentSorting: 'default'
    }
  }
}
</script>

<style scoped>

</style>
