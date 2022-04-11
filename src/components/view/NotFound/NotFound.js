import { Container, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import img1 from '../../../static/notFound.svg'

export const NotFound = () => {
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'primary.dark' }} >
            <Box sx={{ overflow: 'hidden', width: '100%' }} >
                <Stack sx={{bgcolor:'secondary.main', borderRadius:'100%', p:'2em', width:'300px', height:'300px', mx:'auto', justifyContent:'center', alignItems:'center'}}>

                    <Container sx={{ margin: 'auto' }}>
                            <img alt='Not Found' src={img1} width='90%' style={{ margin: 'auto' }} />
                    <Typography variant='h3' textAlign={'center'} color={'text.primary'}>Error 404</Typography>
                    <Typography variant='h6' textAlign={'center'}>No se encuentra lo que buscas</Typography>

                    </Container>

                </Stack>
            </Box>
        </Stack>
    )
}