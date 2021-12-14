import { createTheme } from "@material-ui/core/styles"

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#990000',
    },
    secondary: {
      main: '#0000',
    },
    rose: {
      main: '#f50057',
    },
    appbar: {
      //main: '#ffff',
      main: '#303030',
    },
    topbar: {
      main: '#f0f0f0',
    },
    divider: 'rgba(0,0,0,.12)',
    background: {
      default: '#ddd',
    },
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        color: '#ffff',
        backgroundColor: '#990000',
      },
    },
    MuiListItem: {
      secondaryAction: {
        text: {
          color: '#fffff',
        },
      },
      root: {
        // '& .MuiSvgIcon-root': {
        //     fill: 'white',
        // },
        '&$selected': {
          //backgroundColor: '#9c4dcc',
          backgroundColor: '#990000',
          color: '#ffffff',
          '&:hover': {
            //backgroundColor: '#9c4dcc',
            backgroundColor: '#DD0031',
          },
          // '& .MuiSvgIcon-root': {
          //     fill: 'white',
          // },
        },
      },
    },
  },
})

export default theme
