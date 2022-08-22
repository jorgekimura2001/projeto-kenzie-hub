import { api } from "../../../services/api";
import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { toast } from 'react-toastify';

interface ITechProps{
    children: ReactNode;
}

interface ITechData{
    techs: ITech[]; 
    setTechs: Dispatch<SetStateAction<ITech[]>>;
    addTech: (data: ITech) => void; 
    modalAddTech: boolean; 
    setModalAddTech: Dispatch<SetStateAction<boolean>>; 
    loading: boolean; 
    uptadeTech: ({id, data}: IUpdateTech) => void; 
    removeTech: ({id}:IRemovedTech) => void; 
}

interface ITech{
    id?: string;
    title: string;
    status: string;
}

interface IUpdateTech{
    id?: string;
    data: ITechUp;
}

interface IRemovedTech{
    id?: string;
}

type ITechUp = Omit<ITech, 'title' | 'id'> 

export const TechContext = createContext<ITechData>({} as ITechData)

export function useTech() { return useContext(TechContext) }

export default function TechProvider ({children}: ITechProps){

    const [techs, setTechs] = useState<ITech[]>([])
    const [loading, setLoading] = useState(false)
    const [modalAddTech, setModalAddTech] = useState(false)

    const token = localStorage.getItem('@userToken')
    
    async function addTech(data: ITech){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

    async function uptadeTech({id, data}: IUpdateTech){
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

    async function removeTech({id}:IRemovedTech){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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