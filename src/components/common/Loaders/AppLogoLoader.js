import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { StyledPaper } from '../Surfaces/Papers/Paper'
import { LinearGradientLoader } from './LinearGradientLoader'

export const AppLogoLoader = (topSpace = 0) => {
    const height = (topSpace !== 0 && typeof topSpace === 'number') ? `calc(100vh - ${topSpace})` : `100vh`
    return (
        <Stack sx={{ height: height }} justifyContent='center'>
            <Container sx={{ width: '50%' }}>
                <StyledPaper>
                    <Typography variant="h3" textAlign={'center'}>Inv</Typography>
                    <LinearGradientLoader />
                </StyledPaper>
            </Container>
        </Stack>
    )
}
