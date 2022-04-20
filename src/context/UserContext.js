import { CookieSharp } from '@mui/icons-material'
import { createContext, useState, useEffect } from 'react'
import { PROFILE } from '../const/routes'
import { useFetch } from '../hooks/useFetch'

export const defaultContext = {
    user: {
        id: -1,
        username: "",
        active: false,
        rol_id: -1,
        created: "",
        modified: "",
        role: {
            id: -1,
            name: "",
            description: "",
            created: "",
            modified: "2022-04-12T10:56:37+00:00"
        },
        person: {
            id: -1,
            first_name: "",
            last_name: "",
            email: "",
            nacional_identify: "",
            position_id: '',
            user_id: 1,
            department_headquarter_id: -1,
            created: "",
            modified: ""
        }
    },
    setUser: () => { },
    refreshProfile: async (id) => { },
}

export const UserContext = createContext(defaultContext)

export const UserContextProvider = ({ value, children }) => {

    const [user, setUser] = useState(defaultContext.user)

    const { get: getProfile } = useFetch({ route: PROFILE })

    const refreshProfile = async (id) => {
        const profile = await getProfile((id)&&id)
        setUser(profile)
    }

    return (
        <UserContext.Provider value={{ user, setUser, refreshProfile}}>
            {children}
        </UserContext.Provider>
    )
}