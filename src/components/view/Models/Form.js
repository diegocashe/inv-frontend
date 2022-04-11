import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete, LinearProgress, Box } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Fields as TelefonyFormFields } from '../TelephonyModelsView/Form';
import useFormFetch from '../../../hooks/useFormFetch';
import { TELEPHONYMODELS, PRINTERMODELS, CONSUMABLEMODELS, RADIOMODELS } from '../../../const/routes'
import { Fields as PrinterFormFields } from '../PrinterModels/Form';
import { Fields as ConsumableModelsFields } from '../ConsumableModels/Form';
import { Fields as RadioModelsFields } from '../RadioModels/Form';

const LoadingForm = (props) => (
    <Box sx={{ width: '100%' }}>
        <LinearProgress />
    </Box>
)

const PrinterModelsForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: PRINTERMODELS })
    const { models, printerTypes, printTypes, consumableModels } = settings

    if (models && printerTypes && printTypes && consumableModels) {
        return <PrinterFormFields control={control} errors={errors} {...settings} />
    }
    else {
        return <LoadingForm />
    }
}

const ConsumableModelsForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: CONSUMABLEMODELS })
    const { models, consumableTypes, consumableColors } = settings

    if (models && consumableTypes && consumableColors) {
        return <ConsumableModelsFields control={control} errors={errors} {...settings} />
    }
    else {
        return <LoadingForm />
    }
}

const TelephonyModelsForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: TELEPHONYMODELS })
    const { telephonyTypes, models } = settings
    if (telephonyTypes && models) {
        return <TelefonyFormFields control={control} errors={errors} {...settings} />
    }
    else {
        return <LoadingForm />
    }
}

const RadioModelsForm = ({ control, errors }) => {
    const { settings } = useFormFetch({ route: RADIOMODELS })
    const { models, radioTypes, radioBands, radioFrecuency } = settings
    if (models && radioTypes && radioBands && radioFrecuency) {
        return <RadioModelsFields control={control} errors={errors} {...settings} />
    }
    else {
        return <LoadingForm />
    }
}

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {

    const { brands, itemTypes } = settings
    const itmtyp = useWatch({ control:control, name: 'item_type_id'})
    const extraFields = itmtyp.id
    // console.log(itmtyp)

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    // if (extraFields !== undefined) {
        if (true) {
        return (
            <form onSubmit={handlerOnSubmit}>
                <DialogContent>
                    <Stack direction={'column'} gap={2} >
                        <Controller
                            name='item_type_id'
                            control={control}
                            rules={{
                                required: true,
                                validate: value => Object.keys(value).includes('id')
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    // disabled={!itemType?.enabled}
                                    {...field}
                                    id='item_type_id'
                                    options={itemTypes.map(e => ({ label: e.name, id: e.id }))}
                                    getOptionLabel={option => {
                                        if(option === undefined)return ''
                                        return option.label
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField label='Tipo de Objeto'
                                                {...params}
                                                fullWidth
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                                error={!!errors.item_type_id?.type}
                                                helperText={errors.item_type_id?.type === 'validate' && "El tipo de item requerido"}
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
                                name='code'
                                control={control}
                                rules={{ required: true, }}
                                render={({ field }) =>
                                    <TextField
                                        fullWidth
                                        label='Código' id='Code' {...field}
                                        error={!!errors.code?.type}
                                        helperText={errors.code?.type === 'required' && "El código es requerido"} />
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
                                        {...field}
                                        id='brand_id'
                                        options={brands.map(e => ({  label: e.name, id: e.id }))}
                                        getOptionLabel={option => {
                                            return option.label
                                        }}
                                        fullWidth
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
                                        onChange={(_, data) => field.onChange(data)}
                                    />
                                )
                                }
                            />
                        </Stack>


                        <Controller
                            name='description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <TextField label='Descripción' id='description' {...field}
                                    fullWidth
                                    error={!!errors.description?.type}
                                    helperText={errors.description?.type === 'required' && "La descripción es requerida"}
                                />
                            }
                        />
                        {(extraFields === 1) && <PrinterModelsForm control={control} errors={errors} />}
                        {(extraFields === 2) && <ConsumableModelsForm control={control} errors={errors} />}
                        {(extraFields === 3) && <TelephonyModelsForm control={control} errors={errors} />}
                        {/* {(extraFields === 4) && <PhonelinesForm control={control} errors={errors} />} */}
                        {(extraFields === 5) && <RadioModelsForm control={control} errors={errors} />}
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
        )
    } else {
        return <LoadingForm />
    }
}
