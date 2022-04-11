import { useEffect, useState } from 'react';
import { Container, Box, Button, Stack, TextField, DialogActions, DialogContent, Autocomplete, Typography, LinearProgress } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { ControlledAutocomplete } from '../../common/forms/ControlledAutocomplete';
import { Fields as PrinterFormFields } from '../Printers/Form'
import { Fields as ConsumableFormFields } from '../Consumables/Form'
import { Fields as TelephonyFormFields } from '../Telephony/Form'
import { Fields as PhonelinesFormFields } from '../Phonelines/Form'
import { TELEPHONY, PHONELINES } from '../../../const/routes'
import useFormFetch from '../../../hooks/useFormFetch';

const TelephonyForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: TELEPHONY })
    const { phoneLines } = settings
    if (phoneLines) {
        return (
            <TelephonyFormFields
                control={control}
                errors={errors}
                {...settings}
            />
        )
    } else {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
}

const PhonelinesForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: PHONELINES })
    const { operators } = settings
    if (operators) {
        return (
            <PhonelinesFormFields
                control={control}
                errors={errors}
                {...settings}
            />
        )
    } else {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
}

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {


    // const { : , ,  } = settings;

    const selectedItemType = useWatch({ control:control, name: 'item_type_id'})
    const selectedBrand = useWatch({ control:control, name: 'brand_id'})
    
    const itemTypes = settings.itemTypes.map(e=>({id: e.id, label: e.name}))
    const brands = settings.brands.map(e=>({id: e.id, label: e.name}))

    const models = settings.models
        .filter(e => e.brand_id === selectedBrand.id && e.item_type_id === selectedItemType.id )
        .map(e=>({id: e.id, label: e.code})) || []

    const extraFields = itmtyp.id

    const handlerOnSubmit = (e) => {
        // console.log(e)
        onSubmit(e)
    }

    return (<>
        <Container>
            <Stack direction={'row'} gap={2}>
                <Controller
                    name='item_type_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            disabled={!itemType.enabled}
                            {...field}
                            id='item_type_id'
                            options={itemTypes}
                            // options={b}
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Tipo de Objeto'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.brand_id?.type}
                                        helperText={errors.brand_id?.type === 'validate' && "El tipo de item requerido"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // onInputChange={(_, data) => console.log(data)}
                            onChange={(_, data) => {
                                handlerOnSelectItemType(_, (!!data) ? data : {})
                                field.onChange(data)
                            }}
                        />
                    )
                    }
                />
                <Controller
                    name='brand_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            disabled={!brand.enabled}
                            {...field}
                            id='brand_id'
                            options={brands}
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Marca'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.brand_id?.type}
                                        helperText={errors.brand_id?.type === 'validate' && "La marca es requerida"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // onInputChange={(_, data) => console.log(data)}
                            onChange={(_, data) => {
                                handlerOnSelectBrands(_, data)
                                field.onChange(data)
                            }}
                        />
                    )
                    }
                />
            </Stack>
        </Container>

        <form onSubmit={handlerOnSubmit}>
            <DialogContent>
                <Stack direction={'column'} gap={2} >
                    <Controller
                        name='model_id'
                        control={control}
                        rules={{
                            required: true,
                            validate: value => Object.keys(value).includes('id')
                        }}
                        render={({ field }) => (
                            <Autocomplete
                                disabled={!models.lenght}
                                {...field}
                                id='model_id'
                                options={models}
                                getOptionLabel={option => {
                                    if (option.label === undefined) return ''
                                    return option.label
                                }}
                                fullWidth
                                renderInput={(params) => {
                                    return (
                                        <TextField label='Modelo'
                                            {...params}
                                            fullWidth
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                            error={!!errors.model_id?.type}
                                            helperText={errors.model_id?.type === 'validate' && "El Modelo es requerido"}
                                        />)
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(_, data) => field.onChange(data)}
                            />
                        )
                        }
                    />

                    <Stack direction={'row'} gap={2}>

                        <Controller
                            name='serial'
                            control={control}
                            rules={{ required: true, }}

                            render={({ field }) =>
                                <TextField
                                    sx={{ flexGrow: 1 }}
                                    label='Serial' id='serial' {...field}
                                    error={!!errors.serial?.type}
                                    helperText={errors.serial?.type === 'required' && "El serial es requerido"} />
                            }
                        />

                        <Controller
                            name='active_code'
                            control={control}
                            rules={{ required: true, }}
                            render={({ field }) =>
                                <TextField
                                    sx={{ flexGrow: 1 }}
                                    label='Código de activo' id='active_code' {...field}
                                    error={!!errors.active_code?.type}
                                    helperText={errors.active_code?.type === 'required' && "El Código de activo es requerido"} />
                            }
                        />


                    </Stack>


                    <Controller
                        name='state_id'
                        control={control}
                        rules={{
                            required: true,
                            validate: value => Object.keys(value).includes('id')
                        }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                id='state_id'
                                options={states}
                                // options={b}
                                getOptionLabel={option => {
                                    if (option.name === undefined) return ''
                                    return option.name
                                }}
                                // sx={{ width: 300 }}
                                renderInput={(params) => {
                                    return (
                                        <TextField label='Estado'
                                            {...params}
                                            fullWidth
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                            error={!!errors.state_id?.type}
                                            helperText={errors.state_id?.type === 'validate' && "El Estado es requerido"}
                                        />)
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(_, data) => field.onChange(data)}
                            />
                        )
                        }
                    />
                    {/* <Controller
                            name='status_id'
                            control={control}
                            rules={{
                                required: true,
                                validate: value => Object.keys(value).includes('id')
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    id='status_id'
                                    options={status}
                                    // options={b}
                                    getOptionLabel={option => {
                                        if (option.name === undefined) return ''
                                        return option.name
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField label='Estatus'
                                                {...params}
                                                fullWidth
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                                error={!!errors.status_id?.type}
                                                helperText={errors.status_id?.type === 'validate' && "El estatus es requerido"}
                                            />)
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onChange={(_, data) => field.onChange(data)}
                                />
                            )
                            }
                        /> */}
                    {(extraFields === 3) && <TelephonyForm control={control} errors={errors} />}
                    {(extraFields === 4) && <PhonelinesForm control={control} errors={errors} />}
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
        </form >

    </>
    )
}
