import { createTheme } from '@mantine/core';

export const themeOverride = createTheme({
  // Global styles
  fontFamily: 'Roboto,Verdana, sans-serif',
  // Color scheme settings
  colors: {
    primary: [
      '#f3edff',
      '#e0d7fa',
      '#beabf0',
      '#9a7de6',
      '#7c55de',
      '#693cd9',
      '#5f30d8',
      '#4f23c0',
      '#461eac',
      '#3b1898',
    ],
  },
  headings: {
    // properties for all headings
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  // Font settings

  primaryColor: 'primary',

  // Spacing settings

  // Breakpoints for responsive design
  // breakpoints: {
  //   xs: '576px',
  //   sm: '768px',
  //   md: '992px',
  //   lg: '1200px',
  //   xl: '1400px',
  // },

  // Button styles
  components: {
    Button: {
      styles: {
        root: {
          backgroundColor: 'brand.8',
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          fontFamily: 'Roboto,Verdana, sans-serif',

          borderRadius: '2px', // Rounded corners for input fields
        },
      },
    },
  },
  //   // You can override styles for other components here

  // Other theme properties can be added as needed
});
