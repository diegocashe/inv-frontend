
import { Button, Stack, TextField, DialogActions, DialogContent, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { ControlledAutocomplete as Autocomplete } from '../../common/forms/ControlledAutocomplete';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const Form = ({ onSubmit, control, errors, onCloseDialog, settings, isLoading }) => {

    const { operators } = settings

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    return (
        <form onSubmit={handlerOnSubmit}>
            <DialogContent>

                <Stack direction={'column'} gap={2} >
                    <Stack direction={'row'} gap={2}>
                        <Controller
                            name='operator_id'
                            control={control}
                            rules={{
                                required: true,
                                validate: value => Object.keys(value).includes('id')
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    id='operator_id'
                                    options={operators}
                                    getOptionLabel={option => {
                                        if (option.name === undefined) return ''
                                        return option.name
                                    }}
                                    fullWidth
                                    renderInput={(params) => {
                                        return (
                                            <TextField label='Operador'
                                                {...params}
                                                fullWidth
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                                error={!!errors.operator_id?.type}
                                                helperTe xt={(errors.operator_id?.type === 'validate' || errors.operator_id?.type === 'required') && "El codigo de consumible es requerido"}
                                            />)
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onChange={(_, data) => field.onChange(data)}
                                />
                            )}
                        />

                        <Controller
                            name='number'
                            control={control}
                            rules={{ required: true, }}
                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    label='N??mero telef??nico' id='number' {...field}
                                    error={!!errors.number?.type}
                                    helperText={errors.number?.type === 'required' && "El N??mero es requerido"} />
                            }
                        />

                    </Stack>
                    <Stack direction={'row'} gap={2}>

                        <Controller
                            name='sim_card'
                            control={control}
                            rules={{ required: true, }}

                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    label='C??digo de SIM' id='sim_card' {...field}
                                    error={!!errors.sim_card?.type}
                                    helperText={errors.sim_card?.type === 'required' && "El numero de la tarjeta SIM es requerido"} />
                            }
                        />
                        <Controller
                            name='imsi'
                            control={control}
                            rules={{ required: true, }}

                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    label='IMSI' id='imsi' {...field}
                                    error={!!errors.imsi?.type}
                                    helperText={errors.imsi?.type === 'required' && "El imsi es requerido"} />
                            }
                        />
                    </Stack>
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
}
