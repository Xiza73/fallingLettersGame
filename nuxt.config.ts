export default defineNuxtConfig({
  devServer: {
    port: 3001,
  },

  typescript: {
    shim: false,
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  modules: ['@pinia/nuxt', 'nuxt-icon'],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123456',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  plugins: ['~/plugins/vue-final-modal.ts'],

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/utils/styles/main.scss',
    'vue-final-modal/style.css',
  ],

  build: {
    transpile: ['gsap'],
  },

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
