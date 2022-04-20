import { Box, Container, Stack, Typography, Paper, Avatar, Divider, Chip } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { PROFILE } from '../../../const/routes';
import { useFetch } from '../../../hooks/useFetch';
import useFormFetch from '../../../hooks/useFormFetch';
import { useUser } from '../../../hooks/useUser';
import { AppLogoLoader } from '../../common/Loaders/AppLogoLoader';
import { Form } from './Form';
import { beforeEditFormater } from './Profile';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '1.5rem'
}));


const Asignacion = ({ type = 'Teclado', image, enterprise = 'CBZ - 0000', origin = 'Erick', date = '02/03/2022' }) => (

    <Box sx={{ p: 1 }}>
        <Stack gap={2} sx={{ flexDirection: 'row', alignItems: 'center' }} >
            <Box sx={{ height: 70, width: 70, position: 'relative', overflow: 'hidden' }}>

                {
                    (image)
                        ? <Avatar
                            alt={type}
                            src={image}
                            sx={{ width: 70, height: 70, margin: 'auto' }} />
                        : <Avatar sx={{ width: 70, height: 70, margin: 'auto', color: 'text.primary', bgcolor: 'secondary.light' }} >{type.slice(0, 2).toLocaleUpperCase()}</Avatar>

                }
            </Box>
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" color='text.primary' align='left'>
                    {type}
                </Typography>
                <Typography color="text.secondary" align='left'>
                    {enterprise}
                </Typography>
                <Typography variant="body2" align='left'>
                    Asignado por: {origin}
                </Typography>
                <Typography variant="caption" align='left'>
                    Fecha de Asignacion: {date}
                </Typography>
            </Box>

        </Stack>
    </Box>
)

export const ProfileView = () => {
    const { user, setUser } = useUser()

    const image = (user?.image) ? user.image : null // "https://api.lorem.space/image/furniture?w=70&h=70"
    const enterprise = 'Carbozulia S.A.'
    const skills = ['Feadtured on construction']

    const { person } = user

    const { get, put, settings } = useFormFetch({ route: PROFILE })

    const { positions, departments, headquarters, department_headquarter } = settings
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email || '',
            nacional_identify: person.nacional_identify || '',
            position_id: (person.position_id)
                ? { id: person.position_id, label: person.position.name }
                : { id: -1, label: '' },
            department_id: (person.department_headquarter_id)
                ? { id: person.department_headquarter.department_id, label: person.department_headquarter.department.name }
                : { id: -1, label: '' },

            headquarters_id: (person.department_headquarter_id)
                ? { id: person.department_headquarter.headquarters_id, label: person.department_headquarter.headquarters.name }
                : { id: -1, label: '' },

            department_headquarter_id: (person.department_headquarter_id)
                ? {
                    id: person.department_headquarter.id,
                    label: `${person.department_headquarter.headquarters.name} en ${person.department_headquarter.department.name}`
                }
                : { id: -1, label: '' }
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            const userActual = await get(user.id)
            return userActual;
        })()
            .then(e => {
                setUser(e)
            })
    }, [setUser])


    const onSubmit = async (data) => {
        setIsLoading(true)
        data.id = user.id
        const editedUser = await put(beforeEditFormater(data))
        setUser(editedUser)
        setIsLoading(false)
    }

    // const positions = 

    if (positions && departments && headquarters && department_headquarter) {

        const name = `${person.first_name} ${person.last_name}`
        const position = `${(person?.position) ? person?.position.name : 'No agregado'}`
        const department = `${(person?.department_headquarter_id !== null )
            ? `${person.department_headquarter.headquarters.name} en ${person.department_headquarter.department.name}`
            : 'No agregado'}`

        return (
            <Box padding={4}>
                <Container>
                    <Typography variant='h5' sx={{ mb: '16px', color: '#f1f1f1' }} >Perfil del usuario</Typography>
                    <Stack direction='row' gap={2} alignItems='flex-start'>
                        <Item sx={{ width: '30%', position: 'sticky', top: 16 }}>
                            <Stack gap={1}>
                                <Box >
                                    {
                                        (image)
                                            ? <Avatar
                                                alt={name}
                                                src={image}
                                                sx={{ width: 70, height: 70, margin: 'auto' }} />
                                            : <Avatar sx={{ width: 70, height: 70, margin: 'auto', color: 'text.primary', bgcolor: 'secondary.light' }} >{name.slice(0, 2).toLocaleUpperCase()}</Avatar>

                                    }
                                </Box>
                                <Typography variant='h6' color='text.primary' >{name}</Typography>
                                <Box>
                                    <Typography variant='body1' color='text.secondary' align='left'>Unidad</Typography>
                                    <Typography variant='body2' color='text.primary' align='left'>{department}</Typography>

                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant='body1' color='text.secondary' align='left'>Cargo</Typography>
                                    <Typography variant='body2' color='text.primary' align='left'>{position}</Typography>

                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant='body1' color='text.secondary' align='left'>Skills</Typography>
                                    <Stack flexWrap={'wrap'} direction={'row'} gap={1}>
                                        {skills.map((e, index) => <Chip key={index} label={e} sx={{ bgcolor: 'secondary.light' }} />)}
                                    </Stack>
                                </Box>
                                <Divider />
                            </Stack>
                        </Item>
                        <Item sx={{ width: '70%' }}>
                            <Stack gap={2}>
                                <Typography variant='h5' color='text.primary'>Información</Typography>
                                {/* <Typography variant='body1' color='text.secondary'>Formulario</Typography> */}
                                {/* <Typography variant='h6' color='text.primary' align='left' >Asignaciones</Typography> */}

                                <Container >
                                    <Form
                                        onSubmit={handleSubmit(onSubmit)}
                                        settings={settings}
                                        control={control}
                                        errors={errors}
                                        isLoading={isLoading}
                                    />

                                </Container>
                            </Stack>
                        </Item>
                    </Stack>
                </Container>
            </Box>
        )
    }
    return <AppLogoLoader />

}
