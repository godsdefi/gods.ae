import { extendTheme } from '@chakra-ui/theme-utils'
import { type ThemeConfig } from '@chakra-ui/theme'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  // Base theme overrides
  styles: {
    global: {
      'html, body': {
        color: 'gray.900',
        lineHeight: 'tall',
        backgroundColor: 'white',
      },
    },
  },
  config,
})

export default theme
