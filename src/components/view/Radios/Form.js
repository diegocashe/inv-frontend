
import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const Fields = ({ control, errors, radioModels, radioTypes }) => {
    return (
        <Stack direction={'column'} gap={2} >
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
                        options={radioModels}
                        getOptionLabel={option => {
                            if (option.name === undefined) return ''
                            return option.name
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
                                    error={!!errors.radio_types_id?.type}
                                    helperText={(errors.radio_types_id?.type === 'validate' || errors.radio_types_id?.type === 'required') && "El tipo de radio es requerido"}
                                />)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, data) => field.onChange(data)}
                    />
                )}
            />
            <Controller
                name='radio_model_id'
                control={control}
                rules={{
                    required: true,
                    validate: value => Object.keys(value).includes('id')
                }}
                fullWidth
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        id='radio_model_id'
                        options={radioTypes}
                        getOptionLabel={option => {
                            if (option.name === undefined) return ''
                            return option.name
                        }}
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField label='Modelo de radio'
                                    {...params}
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    error={!!errors.radio_model_id?.type}
                                    helperText={(errors.radio_model_id?.type === 'validate' || errors.radio_model_id?.type === 'required') && "El modelo de radio es requerido"}
                                />)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, data) => field.onChange(data)}
                    />
                )}
            />
        </Stack>
    )

}

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {

    const { radioModels, radioTypes } = settings

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
