import {
  createVuetify
} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#D72685',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    rtl: true,
    theme: {
      defaultTheme: 'myTheme',
      themes: {
        myTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})