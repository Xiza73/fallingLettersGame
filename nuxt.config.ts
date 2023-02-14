// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001,
  },

  typescript: {
    shim: false,
  },

  srcDir: 'src/',

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123456',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/utils/styles/main.scss',
  ],

  build: {},

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/utils/styles/global.scss";',
        },
      },
    },
  },
});
