import { Container, Box, Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

export const Fields = ({ control, errors, phoneLines }) => {
    return (
        <Stack direction={'column'} gap={2}>
            <Stack direction={'row'} gap={2}>
                <Controller
                    name='imei'
                    control={control}
                    rules={{ required: true, }}

                    render={({ field }) =>
                        <TextField
                            label='IMEI' id='imei' {...field}
                            error={!!errors.imei?.type}
                            helperText={errors.imei?.type === 'required' && "El IMEI es requerido"} />
                    }
                />
                <Controller
                    name='imei2'
                    control={control}
                    rules={{ required: true, }}

                    render={({ field }) =>
                        <TextField
                            label='IMEI 2' id='imei2' {...field}
                            error={!!errors.imei2?.type}
                            helperText={errors.imei2?.type === 'required' && "El IMEI 2 es requerido"} />
                    }
                />
            </Stack>
            <Stack direction={'row'} gap={2}>

                <Controller
                    name='phone_line_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            // disabled={!brand.enabled}
                            {...field}
                            fullWidth
                            disableClearable
                            id='phone_line_id'
                            options={phoneLines?.map(e => ({ id: e.id, label: e.number }))}
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Línea Telefónica'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.phone_line_id?.type}
                                        helperText={errors.phone_line_id?.type === 'validate' && "La línea telefónica es requerida"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // onInputChange={(_, data) => console.log(data)}
                            onChange={(_, data) => field.onChange(data)}
                        />
                    )}
                />

               
            </Stack>
        </Stack>
    )
}

export const Form = ({ onSubmit = () => { }, control, errors, onCloseDialog, settings, isLoading }) => {

    const { phoneLines } = settings

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    return (<>
        <form onSubmit={handlerOnSubmit}>
            <DialogContent>
                <Fields {...settings} control={control} errors={errors} />
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
        </form >
    </>
    )
}

export default Form