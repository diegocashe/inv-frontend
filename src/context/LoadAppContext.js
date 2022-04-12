import { createContext, useState } from "react";

export const LoadAppContext = createContext({
    loadingApp: true,
    setLoadingApp: ()=>{}
})

export const LoadAppContextProvider = ({value, children}) => {
    const [loadingApp, setLoadingApp] = useState(true)

    return (
        <LoadAppContext.Provider value={{ loadingApp, setLoadingApp }}>
            {children}
        </LoadAppContext.Provider>
    )
}
