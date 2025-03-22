const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/graphql': {
        target: 'https://fakeapi.platzi.com',
        changeOrigin: true,
        pathRewrite: { '^/graphql': '/graphql' },
        secure: false,
      }
    }
  }
})
