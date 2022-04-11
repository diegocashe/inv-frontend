import { createTheme } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

export const Theme31 = {
    primary: '#083973',
    third: '#184479',
    constrast: '#6D89AA',
    secondary: '#FB9800',
}

export const theme1 = createTheme({
    palette: {
        mode: 'light',
        type: 'light',
        primary: {
            main: '#083973',
        },
        secondary: {
            main: '#FB9800',
        },
        info: {
            main: '#2196f3',
        },
        contrast: {
            main: '#6D89AA',
            darken: blueGrey[800]
        },
        blueLigth: {
            main: '#F1F3F5'
        },
        ligth: {
            main: '#f1f1f1'
        },
        background: {
            paper: '#eff9ff',
            default: '#b8dffd',
        },
        primaryGradient: {
            main: 'linear-gradient(106deg, rgba(8,56,115,1) 20%, rgba(72,145,201,1) 100%)',
        },
        secondaryGradient: {
            main: 'linear-gradient(106deg, rgba(241,123,0,1) 20%, rgba(253,203,128,1) 100%)',
        },
    },
    typography: {
        // h1: {
        //     color: '#f1f1f1'
        // },
        // h2: {
        //     color: '#f1f1f1'
        // },
        // h3: {
        //     color: '#f1f1f1'
        // },
        // h4: {
        //     color: '#f1f1f1'
        // },
        // h5: {
        //     color: '#f1f1f1'
        // },
        // h6: {
        //     color: '#f1f1f1'
        // }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                // si quieres background gradien animados: 
                //https://codepen.io/chriscoyier/pen/eRbLWP

                containedPrimary: {
                    background: 'linear-gradient(106deg, rgba(8,56,115,1) 20%, rgba(72,145,201,1) 100%)',
                    border: 0,
                    borderRadius: 3,
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(106deg, rgba(8,56,115,0.8) 20%, rgba(72,145,201,0.8) 100%)',
                      },
                },
                containedSecondary: {
                    background: 'linear-gradient(106deg, rgba(241,123,0,1) 20%, rgba(253,203,128,1) 100%)',
                    border: 0,
                    borderRadius: 3,
                    color: 'white',
                   '&:hover': {
                        background: 'linear-gradient(106deg, rgba(241,123,0,0.8) 20%, rgba(253,203,128,0.8) 100%)',
                      },
                }
            },

        },

        MuiList: {
            styleOverrides: {
                dense: true
            }
        },

        MuiMenuItem: {
            styleOverrides: {
                dense: true,
            }
        },

        MuiTable: {
            styleOverrides: {
                size: 'small',
            }
        },

        MuiTooltip:{
            styleOverrides:{
                arrow:true,
                popperArrow:true,
                tooltipArrow:true
            }
        }

        // MuiTooltip: {
        //     styleOverrides: {
        //         arrow: true,
        //     }
        // },
    },
},
)