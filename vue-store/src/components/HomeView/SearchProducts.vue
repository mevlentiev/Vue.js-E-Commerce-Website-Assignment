<template>
  <div class="p-4 my-4 flex justify-center bg-gray-100 shadow w-full">
    <input
        type="text"
        placeholder="Search Products..."
        class="border p-2 rounded w-full max-w-sm"
        v-model="query"
        @input="updateQuery"
    />
  </div>
</template>

<script>

export default {
  name: 'SearchProducts',

  data() {
    return {
      query: ''
    }
  },

  methods: {
    updateQuery() {
      this.$store.commit('setSearchQuery', this.query)
    }
  }
}
</script>

<style scoped>

</style>
