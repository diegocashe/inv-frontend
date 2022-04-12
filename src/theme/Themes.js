import { createTheme } from "@mui/material"

const getPalette = (mode) => ({
    palette: {
        mode,
        ...((mode === 'light')
            ? {
                primary: {
                    main: '#083973',
                },
                secondary: {
                    main: '#FB9800',
                },
                info: {
                    main: '#2196f3',
                },
                background: {
                    main:'#052750',
                    paper: '#fff',
                    default: '#b8dffd',
                    
                },
                nav: {
                    header: {
                        text: '#083973',
                        background: '#fff'
                    },
                    aside: {
                        text: '#f1f1f1',
                        background: '#083973'
                    },
                }
            }
            : {
                // primary: {
                //     main: '#083973',
                // },
                // secondary: {
                //     main: '#FB9800',
                // },
                // info: {
                //     main: '#2196f3',
                // },
                // background: {
                //     paper: '#eff9ff',
                //     default: '#b8dffd',
                // },
                // nav: {
                //     header: 'linear-gradient(to right, #141e30, #243b55)',
                //     aside: '#243B55'
                // },
                // text:{
                //     primary:'#0000'
                // }

            })
    }
})

// primaryGradient: {
//     main: 'linear-gradient(106deg, rgba(8,56,115,1) 20%, rgba(72,145,201,1) 100%)',
// },
// secondaryGradient: {
//     main: 'linear-gradient(106deg, rgba(241,123,0,1) 20%, rgba(253,203,128,1) 100%)',
// },

export const Theme = (mode) => createTheme({
    ...getPalette(mode),
    typography: {
        h1: {
            fontFamily: 'Manrope',
        },
        h2: {
            fontFamily: 'Manrope',
        },
        h4: {
            fontFamily: 'Manrope',
        },
        h3: {
            fontFamily: 'Manrope',
        },
        h5: {
            fontFamily: 'Manrope',
        },
        h6: {
            fontFamily: 'Manrope',
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

            MuiTooltip: {
                styleOverrides: {
                    arrow: true,
                    popperArrow: true,
                    tooltipArrow: true
                }
            }

            // MuiTooltip: {
            //     styleOverrides: {
            //         arrow: true,
            //     }
            // },
        },
    },
})