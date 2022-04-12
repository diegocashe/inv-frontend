
import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const Fields = ({ control, errors, consumableTypes, consumableColors }) => {
    return (
        <Stack direction={'column'} gap={2} >
            <Stack direction={'row'} gap={2}>
                <Controller
                    name='consumable_color_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            id='consumable_color_id'
                            options={consumableColors.map(e => ({ label: e.colors, id: e.id }))}
                            disableClearable
                            sx={{ width: 400 }}
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            fullWidth

                            renderInput={(params) => {
                                return (
                                    <TextField label='Colores de impresión'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.consumable_color_id?.type}
                                        helperText={(errors.consumable_color_id?.type === 'validate' || errors.consumable_color_id?.type === 'required') && "El Color es requerido"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(_, data) => field.onChange(data)}
                        />
                    )
                    }
                />

                <Controller
                    name='consumable_type_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            id='consumable_type_id'
                            options={consumableTypes.map(e => ({ label: e.name, id: e.id }))}
                            disableClearable
                            sx={{ width: 400 }}
                            getOptionLabel={option => {
                                return option.label
                            }}
                            fullWidth
                            renderInput={(params) => {
                                return (
                                    <TextField label='Tipo de Consumible'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.consumable_type_id?.type}
                                        helperText={(errors.consumable_type_id?.type === 'validate' || errors.consumable_type_id?.type === 'required') && "El Tipo de consumible requerido"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(_, data) => field.onChange(data)}
                        />
                    )
                    }
                />
            </Stack>
        </Stack>
    )
}

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {

    const { consumableCodes, consumableTypes } = settings

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    return (
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
    )
}
