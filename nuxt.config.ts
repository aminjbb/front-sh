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
        },
        {
          name: 'register',
          path: '/register',
          file: '~/pages/auth/register/index.vue'
        },
      )
    }
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
