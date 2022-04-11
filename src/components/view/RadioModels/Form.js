import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const Fields = ({ control, errors, models, radioTypes, radioBands, radioFrecuency }) => (

    <Stack direction={'column'} gap={2} >
        <Stack direction={'row'} gap={2}>
            <Controller
                name='band_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        id='band_id'
                        options={radioBands.map(e => ({ label: e.name, id: e.id }))}
                        getOptionLabel={option => {
                            if (option.label === undefined) return ''
                            return option.label
                        }}
                        sx={{ width: 400 }}
                        renderInput={(params) => {
                            return (
                                <TextField label='Banda'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.band_id?.type}
                                    helperText={(errors.band_id?.type === 'validate' || errors.band_id?.type === 'required') && "La banda es requerida"}
                                />)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, data) => field.onChange(data)}
                    />
                )
                }
            />
            <Controller
                name='frecuency_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        id='frecuency_id'
                        options={radioFrecuency.map(e => ({ label: e.frequency, id: e.id }))}
                        getOptionLabel={option => {
                            if (option.label === undefined) return ''
                            return option.label
                        }}
                        sx={{ width: 400 }}
                        renderInput={(params) => {
                            return (
                                <TextField label='Radio Frecuencia'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.frecuency_id?.type}
                                    helperText={(errors.frecuency_id?.type === 'validate' || errors.frecuency_id?.type === 'required') && "La frecuencia es requerida"}
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
            name='radio_types_id'
            control={control}
            rules={{
                required: true,
                validate: value => Object.keys(value).includes('id')
            }}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    id='radio_types_id'
                    options={radioTypes.map(e => ({ label: e.name, id: e.id }))}
                    getOptionLabel={option => {
                        if (option.label === undefined) return ''
                        return option.label
                    }}
                    fullWidth
                    renderInput={(params) => {
                        return (
                            <TextField label='Tipo de radio'
                                {...params}
                                fullWidth
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                error={!!errors.band_id?.type}
                                helperText={(errors.radio_types_id?.type === 'validate' || errors.radio_types_id?.type === 'required') && "El tipo de radio es requerido"}
                            />)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, data) => field.onChange(data)}
                />
            )
            }
        />

    </Stack>
)

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {

    const { models, radioTypes, radioBands, radioFrecuency } = settings


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
