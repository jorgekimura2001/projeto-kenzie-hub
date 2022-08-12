import { api } from "../../../services/api";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const TechContext = createContext({})

export default function TechProvider ({children}){

    const [techs, setTechs] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalAddTech, setModalAddTech] = useState(false)
    const token = localStorage.getItem('@userToken')
    
    async function addTech(data){
        api.defaults.headers.authorization = `Bearer ${token}`
        setLoading(true)
        try {
            const techAdded = await api.post('users/techs', data)
            setLoading(false)
            setModalAddTech(false)
            toast.success('Tecnologia adicionada com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTechs(oldTechs => [...oldTechs, techAdded.data])
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    async function uptadeTech(id, data){
        api.defaults.headers.authorization = `Bearer ${token}`
        setLoading(true)
        try {
            const techUpdated = await api.put(`users/techs/${id}`, data)
            setLoading(false)
            toast.success('Tecnologia atualizada com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const filter = techs.filter(tech => tech.id !== id)
            setTechs(() => [techUpdated.data, ...filter])
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    async function removeTech(id){
        api.defaults.headers.authorization = `Bearer ${token}`
        setLoading(true)
        try {
            await api.delete(`users/techs/${id}`)
            setLoading(false)
            toast.success('Tecnologia excluída com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const filter = techs.filter(tech => tech.id !== id)
            setTechs(filter)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return (
        <TechContext.Provider value={{techs, setTechs, addTech, modalAddTech, setModalAddTech, loading, uptadeTech, removeTech}}>
            {children}
        </TechContext.Provider>
    )
}