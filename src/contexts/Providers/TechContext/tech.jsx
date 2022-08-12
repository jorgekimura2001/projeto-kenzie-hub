import { createContext, useState } from "react";
import { api } from "../../../services/api";

export const TechContext = createContext({})

export default function TechProvider ({children}){

    const [techs, setTechs] = useState([])
    const [modalAddTech, setModalAddTech] = useState(false)
    const [modalEditTech, setModalEditTech] = useState(false)
    
    async function addTech(){
    // const techAdded = await api.post('users/techs')
    }

    return (
        <TechContext.Provider value={{techs, setTechs, addTech, modalAddTech, setModalAddTech, modalEditTech, setModalEditTech}}>
            {children}
        </TechContext.Provider>
    )
}