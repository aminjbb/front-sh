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
    secondary: '#757575',
    error: '#D32F2F',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#F57C00',
    danger: '#D32F2F',
    detail: '#673AB7',
    primary500: '#E91E63',
    info: '#2196F3',
    danger: '#D32F2F',
    detail: '#673AB7',
    primary500: '#E91E63',

    // New design system
    /* background: '#FAFAFA',
    surface: '#FAFAFA', */

    sPrimary: '#D72685',
    sPrimaryLighten1: '#E77DB6',
    sPrimaryLighten2: '#EFA8CE',
    sPrimaryLighten3: '#FBE9F3',
    sPrimaryDarken1: '#AC1E6A',
    sPrimaryDarken2: '#811750',

    sSecondary: '#757575',
    sSecondaryLighten1: '#64B5F6',
    sSecondaryLighten2: '#90CAF9',
    sSecondaryLighten3: '#E3F2FD',
    sSecondaryDarken1: '#757575',
    sSecondaryDarken2: '#757575',

    sWarning: '#EF6C00',
    sWarningLighten1: '#FF9800',
    sWarningLighten2: '#FFF3E0',

    sSuccess: '#2E7D32',
    sSuccessLighten1: '#4CAF50',
    sSuccessLighten2: '#E8F5E9',

    sError: '#C62828',
    sErrorLighten1: '#F44336',
    sErrorLighten2: '#FFEBEE',

    sGray: '#6A6A6A',
    sGrayLighten1: '#64B5F6',
    sGrayLighten2: '#9A9A9A',
    sGrayLighten3: '#9E9E9E',
    sGrayDarken1: '#424242',
    sGrayDarken2: '#3C3C3C',
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