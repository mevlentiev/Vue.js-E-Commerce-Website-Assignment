import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    productsInCategory: [],
    favoritesProducts: [],
    recentlyViewedProducts: [],
    categories: [],
    searchQuery: '',
  },
  getters: {
    categories: state => state.categories,
    lastFavorites: state => state.favoritesProducts.slice(-5).reverse(),
    recentlyViewed: state => state.recentlyViewedProducts,
    isFavorites: (state) => (id) => {
      return state.favoritesProducts.some(product => product.id === id)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProductsByCategoryId(state, products) {
      state.productsInCategory = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    toggleFavorites(state, product) {
      const exists = state.favoritesProducts.some(favoritesProduct => favoritesProduct.id === product.id)

      if (exists) {
        state.favoritesProducts = state.favoritesProducts.filter(favoritesProduct => favoritesProduct.id !== product.id)
      } else {
        state.favoritesProducts.push(product)
      }
    },
    addToRecentlyViewed(state, product) {
      state.recentlyViewedProducts = [
          product,
          ...state.recentlyViewedProducts.filter(recentlyViewedProduct => recentlyViewedProduct.id !== product.id)
      ].slice(0, 5)
    }
  },
  actions: {
    async fetchProducts({ commit }, {offset = 0, limit = 10}) {
      try {
        const result = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        const data = await result.json();
        commit('setProducts', data);
      } catch (error) {
        console.error('Failed to fetch products: ', error)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const result = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await result.json();
        commit('setCategories', data);
      } catch (error) {
        console.error('Failed to fetch categories: ', error)
      }
    },
    async fetchProductsByCategoryId({ commit }, {categoryId, offset = 0, limit = 10}) {
      try {
        const result = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}&offset=${offset}&limit=${limit}`);
        const data = await result.json();
        commit('setProductsByCategoryId', data);
      } catch (error) {
        console.error('Failed to fetch products by category id: ', error)
      }
    },
  },
  modules: {
  }
})
