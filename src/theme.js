import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
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
        primary: {
            light: 'rgb(58, 151, 201)',
            main: 'rgb(9, 113, 171)',
            dark: 'rgb(5, 71, 107)',
            contrastText: '#fff',
        },
        secondary: {
            light: '#559fdd',
            main: '#0971ab',
            dark: '#00467b',
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f43648',
            dark: '#9A0036',
            contrastText: '#fff',
        },
        success: {
            light: '#81C784',
            main: '#4caf50',
            dark: '#388E3C',
            contrastText: 'rgba(0,0,0,.87)',
        },
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0,0,0,.87)',
        },
        divider: 'rgba(0,0,0,.12)',
    },
    overrides: {
        MuiListItem: {
            secondaryAction: {
                text: {
                    color: '#fffff',
                },
            },
            root: {
                '& .MuiSvgIcon-root': {
                    fill: 'white',
                },
                '&$selected': {
                    backgroundColor: 'rgb(5, 71, 107)',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: 'rgb(5, 71, 107)',
                    },
                    '& .MuiSvgIcon-root': {
                        fill: 'white',
                    },
                },
            },
        },
    },
})

export default theme;
