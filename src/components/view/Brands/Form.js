import { Button, Stack, TextField, DialogActions, DialogContent } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

export const Form = ({ onSubmit, control, errors, onCloseDialog }) => {

    const [isLoading, setIsLoading] = useState(false)

    const handlerOnSubmit = (e) => {
        setIsLoading(true)
        onSubmit(e)
    }

    return (
        <form onSubmit={handlerOnSubmit}>
            <DialogContent>

                <Stack direction={'column'} gap={2} >
                    <Controller
                        name='name'
                        control={control}
                        rules={{ required: true, }}

                        render={({ field }) =>
                            <TextField
                                label='Nombre' id='name' {...field}
                                error={!!errors.name?.type}
                                helperText={errors.name?.type === 'required' && "El nombre es requerido"} />
                        }
                    />
                    <Controller
                        name='website'
                        control={control}
                        render={({ field }) =>
                            <TextField label='Sitio Web' id='website' {...field} />
                        }
                    />
                </Stack>


            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog} type="reset" >Cancelar</Button>
                <LoadingButton
                    loading={isLoading}
                    endIcon={<Edit />}
                    type='submit'
                    loadingPosition="end"
                    variant="contained"
                >Agregar</LoadingButton>
            </DialogActions>
        </form>
    )
}
