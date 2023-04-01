import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { CustomDarkTheme, CustomLightTheme } from '@/theme'

import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'CustomDarkTheme',
    themes: {
      CustomLightTheme,
      CustomDarkTheme
    }
  },
  defaults: {
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    }
  }
})
