import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

import { Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab';

export const ConfirmDialog = ({
    dialogContainer = false,
    open = true,
    title = 'Título',
    content = '¿Esta seguro de continuar?',
    onAccept = async () => { },
    onCancel = async () => { },
    loading = false
}) => {

    const handlerOnAccept = async (e) => {
        await onAccept(e)
    }

    return (
        <Dialog open={open} maxWidth='lg' >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} >Cancelar</Button>
                <LoadingButton
                    onClick={handlerOnAccept}
                    loading={loading}
                    endIcon={<Edit />}
                    loadingPosition="end"
                    variant="contained"
                >Aceptar</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
