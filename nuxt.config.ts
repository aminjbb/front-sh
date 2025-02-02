// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
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
        },
          {
            name: 'forgotPassword',
            path: '/forgot_password',
            file: '~/pages/auth/forgot_password/index.vue'
          }
      )
    }
  },

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: 'https://api.shvz.ir/api/v1',
      neshanMapKey:'web.0bfff696f3a1488d972d6047de31ab48',
      serviceKey:'service.217a0b81087143108632348cba35fe9e',
      gtagId:'GTM-5RRH4PX',
      siteUrl: 'https://shavaz.com'
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

  compatibilityDate: '2024-09-25',
})