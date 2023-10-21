import {createStandaloneToast, extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        cursor: 'auto',
        width: '0.5rem',
        h: '0.5rem',
      },
      '::-webkit-scrollbar-thumb': {
        cursor: 'pointer !important',
        '&:hover': {
          bg: 'blue.700',
        },
        bg: 'gray.600',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-track': {
        bg: 'blackAlpha.600',
        borderRadius: 'full',
      },
    },
  },
  shadows: {
    '3d': 'rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.3) 0px 5px 11px -2px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset',
    '3d-pressed':
      'rgba(0, 0, 0, 0.3) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
})

export const {ToastContainer, toast} = createStandaloneToast({
  theme,
  defaultOptions: {isClosable: true},
})

export default theme
