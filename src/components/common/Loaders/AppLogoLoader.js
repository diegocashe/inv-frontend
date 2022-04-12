import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { LinearGradientLoader } from './LinearGradientLoader'

export const AppLogoLoader = (topSpace = 0) => {
    const height = (topSpace !== 0 && typeof topSpace === 'number') ? `calc(100vh - ${topSpace})` : `100vh`
    return (
        <Stack sx={{ height: height }} justifyContent='center'>
            <Container sx={{ width: '50%' }}>
                <Typography variant="h3" textAlign={'center'}>Uork</Typography>
                <LinearGradientLoader />
            </Container>
        </Stack>
    )
}
