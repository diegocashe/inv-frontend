import { Box, Container, Stack, Typography, Paper, Avatar, Divider, Chip } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react'
import { ALLOCATIONSPEOPLE } from '../../../const/routes';
import { useFetch } from '../../../hooks/useFetch';
import { useUser } from '../../../hooks/useUser';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '1.5rem'
}));



const Asignacion = ({ type = 'Teclado', image, activeCode = 'CBZ - 0000', assignor = 'Erick', date = '02/03/2022' }) => (

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
                    {activeCode}
                </Typography>
                <Typography variant="body2" align='left'>
                    Asignado por: {assignor}
                </Typography>
                <Typography variant="caption" align='left'>
                    Fecha de Asignacion: {date}
                </Typography>
            </Box>

        </Stack>
    </Box>
)



export const ProfileAllocationsView = () => {

    dayjs.extend(relativeTime);

    const { user } = useUser()
    const { get } = useFetch({ route: ALLOCATIONSPEOPLE })
    const [allocations, setAllocations] = React.useState({})

    console.log(allocations)

    useEffect(() => {
        ; ((async () => {
            const all = await get(user.person.id);
            return all;
        })())
            .then(e => setAllocations(e));
    }, [])


    return (
        <Box padding={4}>
            <Container>
                <Typography variant='h5' sx={{ mb: '16px', color: '#f1f1f1' }} >Asignaciones del usuario</Typography>
                <Stack direction='row' gap={2} alignItems='flex-start'>
                    {/* <Item sx={{ width: '30%', position: 'sticky', top: 16 }}>
                        <Stack gap={1}>
                            <Box >
                                <Avatar
                                    alt={name}
                                    src={imgSrc}
                                    sx={{ width: 70, height: 70, margin: 'auto' }}
                                />
                            </Box>
                            <Typography variant='h6' color='text.primary' >{name}</Typography>
                            <Box>
                                <Typography variant='body1' color='text.secondary' align='left'>Unidad</Typography>
                                <Typography variant='body2' color='text.primary' align='left'>{department}</Typography>

                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant='body1' color='text.secondary' align='left'>Skills</Typography>
                                <Stack flexWrap={'wrap'} direction={'row'} gap={1}>
                                    {skills.map((e, index )=> <Chip key={index} label={e} sx={{bgcolor:'secondary.light'}} />)}
                                </Stack>
                            </Box>
                            <Divider />
                        </Stack>
                    </Item> */}
                    <Item sx={{ width: '100%' }}>
                        <Stack gap={1}>
                            {/* 
                            <Typography variant='h5' color='text.primary'>{position}</Typography>
                            <Typography variant='body1' color='text.secondary'>{enterprise}</Typography> */}
                            <Typography variant='h6' color='text.primary' align='left' >Asignaciones</Typography>

                            <Container >
                                {(Array.isArray(allocations) && allocations.length > 0) &&
                                    allocations.map(e => (
                                        <>
                                            <Asignacion {...e}
                                                type={e.item.model.item_type.name}
                                                activeCode={e.item.active_code}
                                                assignor={`${e.assignor.first_name} ${e.assignor.last_name}`}
                                                date={`${dayjs(e.assigment_date).format('DD/MM/YYYY')} -- ${dayjs(e.assigment_date).toNow()}`} 
                                            />
                                            <Divider />
                                        </>
                                    ))
                                }

                            </Container>
                        </Stack>
                    </Item>
                </Stack>
            </Container>
        </Box>
    )
}
