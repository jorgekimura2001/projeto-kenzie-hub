import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const UserContext = createContext()

export default function UserProvider({children}){ 

    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const id = localStorage.getItem('@userId')
        const token = localStorage.getItem('@userToken')
       
        async function listUser(){
            if(token){
                try {
                    api.defaults.headers.authorization = `Bearer ${token}`
                    const {data} = await api.get(`users/${id}`)
                    setUser(data)
                    setLoading(true)
                } catch (error) {
                    console.log(error)
                } 
            }
            setLoading(false)
            api.defaults.headers.authorization = `Bearer ${token}`
        }
        listUser()
    }, [])

    return(
        <UserContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}
