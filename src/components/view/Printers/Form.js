import { Container, Box, Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { ControlledAutocomplete } from '../../common/forms/ControlledAutocomplete';

export const Fields = ({ control, errors, printerTypes,  consumables, printType }) => {
    // if(printerTypes && consumables && printType )
    return (
        <Stack gap={2} >
        <Stack direction={'row'} gap={2}>
            <Controller
                name='printer_type_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                    <ControlledAutocomplete
                        // disabled={!printType.enabled}
                        {...field}
                        id='printer_type_id'
                        options={printerTypes}
                        // options={b}
                        getOptionLabel={option => {
                            if (option.name === undefined) return ''
                            return option.name
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => {
                            return (
                                <TextField label='Tipo de Impresora'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.printerTypes?.type}
                                    helperText={errors.printerTypes?.type === 'validate' && "El tipo de impresora requerido"}
                                />)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // onInputChange={(_, data) => console.log(data)}
                        onChange={(_, data) => field.onChange(data)}
                    />
                )}
            />
            <Controller
                name='print_types_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                    <Autocomplete
                        // disabled={!printType.enabled}
                        {...field}
                        id='print_types_id '
                        options={printType}
                        // options={b}
                        getOptionLabel={option => {
                            if (option.name === undefined) return ''
                            return option.name
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => {
                            return (
                                <TextField label='Tipo de impresión'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.printType?.type}
                                    helperText={errors.printType?.type === 'validate' && "El tipo de impresión es requerido"}
                                />)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // onInputChange={(_, data) => console.log(data)}
                        onChange={(_, data) => field.onChange(data)}
                    />
                )}
            />
            </Stack>
            <Controller
                name='consumable_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                    <Autocomplete
                        // disabled={!brand.enabled}
                        {...field}
                        id='consumable_id'
                        options={consumables}
                        fullWidth
                        getOptionLabel={option => {
                            if (option.name === undefined) return ''
                            return option.name
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField label='Consumible'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.brand_id?.type}
                                    helperText={errors.brand_id?.type === 'validate' && "El consumible es requerida"}
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

    const { printerTypes, consumables, printType } = settings

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    return (<>
        <form onSubmit={handlerOnSubmit}>
            <DialogContent>
                <Fields {...settings} control={control} errors={errors}/>
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