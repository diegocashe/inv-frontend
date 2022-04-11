import { useState, useEffect } from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
    Typography,
    Checkbox,
    Link
} from '@mui/material'
import { SERVER_DIR } from '../../../const/ServerUrl'

const LoginForm = () => {

    const [credentials, setCredentials] = useState({ user: '', password: '' })

    const setUser = (user) => setCredentials({ ...credentials, user: user })
    const setPassword = (password) => setCredentials({ ...credentials, password: password })

    /**
     * @param {Event} e 
     */
    const onLogin = (e) => {

    }

    useEffect(() => {
        // console.log(credentials)
    }, [credentials])

    return (
        <Card>
            <form action={`${SERVER_DIR}/login`} method='POST'>
                <CardContent>
                    <Stack>
                        <Typography variant='caption' color={'GrayText'} >Bienvenido</Typography>
                        <Typography align='center'>Ingresar</Typography>
                        <TextField
                            variant='outlined'
                            id='user'
                            label='Usuario'
                            margin='normal'
                            onChange={(e) => { setUser(e.target.value) }}
                        />
                        <TextField
                            variant='outlined'
                            id='password'
                            label='Contraseña'
                            margin='normal'
                            type={'password'}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <Stack direction={'row'} alignItems={'center'} justifyContent='space-between'>
                            <FormGroup >
                                <FormControlLabel
                                    control={<Checkbox size='small' />}
                                    label='Recuerdame'
                                />
                            </FormGroup>
                            <Link sx={{cursor:'pointer', fontSize:'0.7rem'}}>Recuperar contraseña</Link>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button size='small' variant='contained' color='success' type='submit' onSubmit={onLogin} >Ingresar</Button>
                </CardActions>
            </form>
        </Card >
    )
}

export const LoginView = () => {
    return (
        <Stack backgroundColor={'secundary'} height={'100%'} width='100%' alignItems={'center'} justifyContent={'center'}>
            <CardContent sx={{ width: ['80%', '40%', '30%', '27%'] }}>
                <LoginForm />
            </CardContent>
        </Stack>
    )
}
