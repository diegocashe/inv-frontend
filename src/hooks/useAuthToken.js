import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

export const useAuthToken = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
    const [token, setToken] = useState(cookies.authorization)

    useEffect(() => {
        setToken(cookies.authorization)
        return () => {
        }
    }, [ cookies.authorization ])

    useEffect(() => {
        setToken(cookies.authorization)
        return () => {
        }
    }, [])

    const setAuthToken = (authToken = '') => {
        if (authToken && authToken !== '') {
            removeCookie('authorization')
            setCookie('authorization', authToken)
            setToken(cookies.authorization)
        }
    }

    return [token, setAuthToken]
}
