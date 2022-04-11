import { Container, Box, Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

export const Fields = ({ control, errors,  telephonyTypes, models  }) => {
    return (
        <Stack direction={'column'} gap={2}>
                <Controller
                    name='telephony_type_id'
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
                            id='telephony_type_id'
                            options={telephonyTypes.map(e => ({ id: e.id, label: e.name }))}
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Tipo de telefonía'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.telephony_type_id?.type}
                                        helperText={(errors.telephony_type_id?.type === 'validate' || errors.telephony_type_id?.type === 'required') && "El Tipo de telefonía es requerido"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // onInputChange={(_, data) => console.log(data)}
                            onChange={(_, data) => field.onChange(data)}
                        />
                    )}
                />
        </Stack>
    )
}

export const Form = ({ onSubmit = () => { }, control, errors, onCloseDialog, settings, isLoading }) => {

    const { telephonyTypes, models } = settings

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