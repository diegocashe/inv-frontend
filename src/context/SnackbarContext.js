import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const SnackbarContext = createContext({
    snackbar: { message: '', visible: false, severity: '' },
    setSnackbar: () => { }
})

export const SnackbarContextProvider = ({ value, children }) => {
    const [snackbar, setSnackbar] = useState({ message: '', visible: false, severity: '' })

    const setSnack = (message = '', visible = false, severity = '') => {
        setSnackbar({ message, visible, severity })
    }

    const handleCloseSnack = () => {
        setSnack('', false)
    }


    return (
        <SnackbarContext.Provider value={{ snackbar: snackbar, setSnackbar: setSnack }}>
            {children}
            {(snackbar.message !== '') && <Snackbar
                open={snackbar.visible}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                action={
                    <IconButton onClick={handleCloseSnack}>
                        <Close fontSize="small" />
                    </IconButton>}
            >
                <Alert onClose={handleCloseSnack} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>

            </Snackbar>}
        </SnackbarContext.Provider>
    )
}
