import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { ControlledAutocomplete } from '../../common/forms/ControlledAutocomplete';

export const Fields = ({ control, errors, models, printerTypes, printTypes, consumableModels }) => {

    if (models, printerTypes, printTypes, consumableModels) {
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
                            <Autocomplete
                                // disabled={!printType.enabled}
                                {...field}
                                id='printer_type_id'
                                options={printerTypes.map(e => ({ label: e.name, id: e.id }))}
                                // options={b}
                                getOptionLabel={option => {
                                    if (option.label === undefined) return ''
                                    return option.label
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
                                            error={!!errors.printer_type_id?.type}
                                            helperText={(errors.printer_type_id?.type === 'validate' || errors.printer_type_id?.type === 'required') && "El tipo de impresora requerido"}
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
                                options={printTypes.map(e => ({ label: e.name, id: e.id }))}
                                // options={b}
                                getOptionLabel={option => {
                                    if (option.label === undefined) return ''
                                    return option.label
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
                                            error={!!errors.print_types_id?.type}
                                            helperText={(errors.print_types_id?.type === 'validate' || errors.print_types_id?.type === 'required') && "El tipo de impresión es requerido"}
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
                            options={consumableModels.map(e => ({ label: e.model.code, id: e.id }))}
                            fullWidth
                            getOptionLabel={option => {
                                if (option?.label === undefined) return ''
                                return option.label
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Consumible'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.consumable_id?.type}
                                        helperText={(errors.consumable_id?.type === 'validate' || errors.consumable_id?.type === 'required') && "El consumible es requerido"}
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
    else {
        return <>no a cargado</>
    }
}

export const Form = ({ onSubmit = () => { }, control, errors, onCloseDialog, settings, isLoading }) => {

    const { printerTypes, consumables, printType } = settings

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