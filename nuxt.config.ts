// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
    },
  },

  hooks: {
    'pages:extend'(pages) {
      // add New routes that you want change route
      pages.push(
        {
          name: 'login',
          path: '/login',
          file: '~/pages/auth/login/index.vue'
        }
      )
    }
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: 'https://api.shvz.ir/api/v1'
    }
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/scss/Styles.scss',
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
