import { ThemeProvider } from '@mui/material/styles'
import { createContext, useState } from "react";
import { Theme } from '../theme/Themes';

export const ThemeContext = createContext({
    theme: Theme('light'),
    changeTheme: () => { },
    toggleThemeMode: () => { }
})

export const ThemeContextProvider = ({ value, children }) => {
    const [theme, setTheme] = useState(Theme('light'))

    const changeTheme = (theme) => {
        setTheme(theme)
    }

    const toggleThemeMode = () => {
        if (theme.palette.mode === 'light'){
            setTheme(Theme('dark'))
        }else{
            setTheme(Theme('light'))
        }
    }

    return (
        <ThemeContext.Provider value={{ theme:theme, changeTheme, toggleThemeMode }}>
            <ThemeProvider theme={theme} >
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
