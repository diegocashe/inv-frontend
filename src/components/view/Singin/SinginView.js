import { useState, useEffect } from 'react'
import { CardContent, Stack, Box, } from '@mui/material'
import { Form } from './Form'
import { useFetch } from '../../../hooks/useFetch'
import { PROFILE, SINGIN } from '../../../const/routes'
import { useAuthToken } from '../../../hooks/useAuthToken'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { useLoadApp } from '../../../hooks/useLoadApp'

export const SinginView = () => {

    const [onLoading, setOnLoading] = useState(false)
    const { loadingApp, setLoadingApp } = useLoadApp()
    const { refreshProfile } = useUser()

    const [token, setAuthToken] = useAuthToken()
    const { post } = useFetch({ route: SINGIN })
    const { get: getProfile } = useFetch({ route: PROFILE })

    const navigate = useNavigate()
    
    const handlerOnSingin = async (data) => {
        setOnLoading(true)
        const { access_token , id} = await post(data)
        if (access_token) {
            
            setAuthToken(access_token)
            await refreshProfile(id);
            setOnLoading(false)
            navigate('/')
        }
    }

    return (
        <Stack sx={{
            backgroundColor: 'secondary',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
        }}
        >
            <Box sx={{ position: 'absolute', zIndex: '-1', width: '100%', height: '100%', background: 'linear-gradient(to bottom,  rgba(0, 0, 0, 0), #083973)' }}>

            </Box>
            <Box sx={{ width: ['80%', '40%', '40%', '35%'] }}>
                <Form onSubmit={handlerOnSingin} loading={onLoading} />
            </Box>
        </Stack>
    )
}
