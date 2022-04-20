import { Container, Box, Button, Stack, TextField, DialogActions, DialogContent, Autocomplete, Typography, LinearProgress } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Fields as TelephonyFormFields } from '../Telephony/Form'
import { Fields as PhonelinesFormFields } from '../Phonelines/Form'
import { TELEPHONY, PHONELINES } from '../../../const/routes'
import useFormFetch from '../../../hooks/useFormFetch';
export const Form = ({ onSubmit, control, errors, settings, isLoading }) => {

    const positions = (settings?.positions) ? settings.positions.map(e => ({ id: e.id, label: e.name })) : []
    const departments = (settings?.departments) ? settings.departments.map(e => ({ id: e.id, label: e.name })) : []
    const headquarters = (settings?.headquarters) ? settings.headquarters.map(e => ({ id: e.id, label: e.name })) : []

    const department_headquarter = (settings?.department_headquarter)
        ? settings.department_headquarter.map(e => ({ id: e.id, label: `${headquarters.find}` }))
        : []

    const handlerOnSubmit = (e) => {
        onSubmit(e)
    }

    return (
        <form onSubmit={handlerOnSubmit}>
            <Stack gap={2}>
                <Stack direction={'row'} gap={2}>
                    <Controller
                        name='first_name'
                        control={control}
                        rules={{ required: true, }}

                        render={({ field }) =>
                            <TextField
                                sx={{ flexGrow: 1 }}
                                label='Nombres' id='first_name' {...field}
                                error={!!errors.first_name?.type}
                                helperText={errors.first_name?.type === 'required' && "El primer nombre es requerido"} />
                        }
                    />
                    <Controller
                        name='last_name'
                        control={control}
                        rules={{ required: true, }}

                        render={({ field }) =>
                            <TextField
                                sx={{ flexGrow: 1 }}
                                label='Apellidos' id='last_name' {...field}
                                error={!!errors.last_name?.type}
                                helperText={errors.last_name?.type === 'required' && "El apellido es requerido"} />
                        }
                    />
                </Stack>
                <Controller
                    name='email'
                    control={control}
                    rules={{ required: true, }}

                    render={({ field }) =>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            label='Correo electrónico' id='email' {...field}
                            error={!!errors.email?.type}
                            helperText={errors.email?.type === 'required' && "El correo es requerido"} />
                    }
                />
                <Controller
                    name='nacional_identify'
                    control={control}
                    rules={{ required: true, }}

                    render={({ field }) =>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            label='Cédula de identidad' id='nacional_identify' {...field}
                            error={!!errors.nacional_identify?.type}
                            helperText={errors.nacional_identify?.type === 'required' && "La cédula de identidad es requerida"} />
                    }
                />
                <Stack direction={'row'} gap={2}>
                    <Controller
                        name='department_id'
                        control={control}
                        rules={{
                            required: true,
                            validate: value => Object.keys(value).includes('id')
                        }}
                        render={({ field }) => (
                            <Autocomplete
                                // disabled={!itemType.enabled}
                                {...field}
                                id='department_id'
                                options={departments}
                                disableClearable
                                // options={b}
                                getOptionLabel={option => {
                                    if (option.label === undefined) return ''
                                    return option.label
                                }}
                                sx={{ width: 200 }}
                                renderInput={(params) => {
                                    return (
                                        <TextField label='Departamento'
                                            {...params}
                                            fullWidth
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                            error={!!errors.department_id?.type}
                                            helperText={errors.department_id?.type === 'validate' && "El departamento es requerido"}
                                        />)
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(_, data) => { field.onChange(data) }}
                            />
                        )
                        }
                    />
                    <Controller
                        name='headquarters_id'
                        control={control}
                        rules={{
                            required: true,
                            validate: value => Object.keys(value).includes('id')
                        }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                id='headquarters_id'
                                options={headquarters}
                                disableClearable
                                getOptionLabel={option => {
                                    if (option.label === undefined) return ''
                                    return option.label
                                }}
                                sx={{ width: 200 }}
                                renderInput={(params) => {
                                    return (
                                        <TextField label='Sede'
                                            {...params}
                                            fullWidth
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                            error={!!errors.headquarters_id?.type}
                                            helperText={errors.headquarters_id?.type === 'validate' && "La sede es requerida"}
                                        />)
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(_, data) => { field.onChange(data) }}
                            />
                        )
                        }
                    />
                </Stack>
                <Controller
                    name='position_id'
                    control={control}
                    rules={{
                        required: true,
                        validate: value => Object.keys(value).includes('id')
                    }}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            id='position_id'
                            options={positions}
                            disableClearable
                            getOptionLabel={option => {
                                if (option.label === undefined) return ''
                                return option.label
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => {
                                return (
                                    <TextField label='Cargo'
                                        {...params}
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        error={!!errors.position_id?.type}
                                        helperText={errors.position_id?.type === 'validate' && "El cargo es requerido"}
                                    />)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(_, data) => { field.onChange(data) }}
                        />
                    )
                    }
                />

                <LoadingButton
                    loading={isLoading}
                    endIcon={<Edit />}
                    type='submit'
                    loadingPosition="end"
                    variant="contained"
                >Editar Valores</LoadingButton>
            </Stack>
        </form>
    )
}
