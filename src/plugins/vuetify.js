// src/plugins/vuetify.js

// Import global styles and icon font
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Import Vuetify core, standard components, and directives
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labs, 
  },
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6A1B9A',    // Deep Purple
          secondary: '#7B1FA2',   // Purple
          accent: '#D500F9',     // Neon Purple
          background: '#FAFAFA',  // Very Light Gray
          surface: '#FFFFFF',    // Pure White
          error: '#E53935',      // Red
          info: '#1E88E5',       // Blue
          success: '#43A047',    // Green
          warning: '#FB8C00',    // Orange
        },
      },
      dark: {
        colors: {
          primary: '#9C27B0',    // Lighter Purple
          secondary: '#512DA8',   // Dark Indigo
          accent: '#FF4081',     // Neon Pink
          background: '#1A1A1A',  // Very Dark Gray
          surface: '#121212',    // Deep Black
          error: '#CF6679',      // Soft Red
          info: '#64B5F6',       // Soft Blue
          success: '#66BB6A',    // Soft Green
          warning: '#FFB74D',    // Soft Orange
        },
      },
      bw: {
        colors: {
          primary: '#333333',    // Dark Gray
          secondary: '#666666',   // Medium Gray
          accent: '#999999',     // Light Gray
          background: '#FAFAFA',  // Very Light Gray
          surface: '#FFFFFF',    // Pure White
          error: '#D32F2F',      // Professional Red
          info: '#0288D1',       // Info Blue
          success: '#2E7D32',    // Forest Green
          warning: '#F57C00',    // Deep Orange
        },
      },
      bwDark: {
        colors: {
          primary: '#303030',    // Dark Gray
          secondary: '#505050',   // Medium Gray
          accent: '#707070',     // Light Gray
          background: '#1A1A1A',  // Very Dark Gray
          surface: '#121212',    // Nearly Black
          error: '#EF5350',      // Soft Red
          info: '#29B6F6',       // Light Blue
          success: '#66BB6A',    // Soft Green
          warning: '#FFA726',    // Soft Orange
        },
      },
    },
  },
})

export default vuetify
