import { StyledPaper } from "../../common/Surfaces/Papers/Paper"
import { useState, useEffect } from 'react'
import {
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
    Typography,
    Checkbox,
    Link,
    Box
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from "@mui/lab"
import { Login } from "@mui/icons-material"

export const Fields = (control, errors, seePassword = false) => (
    <Stack direction={'column'} gap={2}>
        <Controller
            name="username"
            control={control}
            rules={{ required: true, }}
            render={({ field }) =>
                <TextField
                    fullWidth
                    label='Nombre de Usuario' id='username' {...field}
                    error={!!errors.username?.type}
                    helperText={errors.username?.type === 'required' && "El nombre de usuario es requerido"}
                />
            }
        />
        <Controller
            name="password"
            control={control}
            rules={{ required: true, }}
            render={({ field }) =>
                <TextField
                    fullWidth
                    type={(!seePassword) ? 'password' : 'text'}
                    label='Contraseña' id='password' {...field}
                    error={!!errors.password?.type}
                    helperText={errors.password?.type === 'required' && "Por favor, ingresa tus nombres"}
                />
            }
        />
    </Stack>
)

export const Form = ({ onSubmit, loading }) => {

    const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const [visiblePassword, setVisiblePassword] = useState(false)

    const onLogin = (e) => {

    }

    const handlerOnSubmit = (data = {}) => {
        onSubmit(data)
        return
    }

    const handlerOnChangePasswordVisibility = (event) => {
        setVisiblePassword(event.target.checked)
    }

    useEffect(() => {
        // console.log(credentials)
    }, [])

    return (
        <form onSubmit={handleSubmit(handlerOnSubmit)}>
            <StyledPaper>
                <Stack gap={2}>
                    <Typography variant='caption' color={'GrayText'} >Bienvenido</Typography>
                    <Typography align='center' variant='h6' >Ingresa a tu cuenta de Inv</Typography>
                    <Stack direction={'column'} gap={2}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true, }}
                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    label='Nombre de Usuario' id='username' {...field}
                                    error={!!errors.username?.type}
                                    helperText={errors.username?.type === 'required' && "El nombre de usuario es requerido"}
                                />
                            }
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, }}
                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    type={(!visiblePassword) ? 'password' : 'text'}
                                    label='Contraseña' id='password' {...field}
                                    error={!!errors.password?.type}
                                    helperText={errors.password?.type === 'required' && "Por favor, ingresa la contraseña"}
                                />
                            }
                        />
                    </Stack>
                    <FormGroup >
                        <Stack direction={'row'} alignItems={'center'} justifyContent='space-between'>
                            <FormControlLabel
                                defaultChecked
                                control={<Checkbox size='small' />}
                                label='Recuerdame'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size='small'
                                        value={visiblePassword}
                                        onChange={handlerOnChangePasswordVisibility}
                                    />}
                                label='Ver contraseña'
                            />
                        </Stack>
                    </FormGroup>
                    <Link sx={{ cursor: 'pointer', fontSize: '0.7rem' }}>Recuperar contraseña</Link>
                    <Stack justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <Box>
                        <LoadingButton
                            size="small"
                            type='submit'
                            endIcon={<Login />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Ingresar
                        </LoadingButton>
                        </Box>
                    </Stack>
                </Stack>
            </StyledPaper>
        </form>
    )
}