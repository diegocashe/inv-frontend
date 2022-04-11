import {useState} from 'react'

export const useTableTemplate = () => {
    const [row, setRow] = useState({})
    const [inEdit, setInEdit] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(false)
    const [snackbar, setSnackbar] = useState(null)
    const [dialog, setDialog] = useState(null)

    


}
