import type { ThemeDefinition } from 'vuetify'

const CustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#5D87FF',
    secondary: '#49BEFF',
    lightPrimary: '#ECF2FF',
    lightSecondary: '#E8F7FF',
    textPrimary: '#2A3547',
    textSecondary: '#2A3547',
    textMedium: '#788497',
    primaryBorder: '#e5eaef',
    secondaryBorder: '#c0cdda',
    inputBorder: '#DFE5EF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    info: '#539BFF',
    success: '#13DEB9',
    warning: '#FFAE1F',
    error: '#FA896B'
  }
}

const CustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#5D87FF',
    secondary: '#49BEFF',
    lightPrimary: '#253662',
    lightSecondary: '#1C455D',
    textPrimary: '#EAEFF4',
    textSecondary: '#7C8FAC',
    textMedium: '#A8B8D0',
    primaryBorder: '#333F55',
    secondaryBorder: '#909baf',
    inputBorder: '#465670',
    background: '#2a3447',
    surface: '#2a3447',
    info: '#539BFF',
    success: '#13DEB9',
    warning: '#FFAE1F',
    error: '#FA896B'
  }
}

export { CustomLightTheme, CustomDarkTheme }
