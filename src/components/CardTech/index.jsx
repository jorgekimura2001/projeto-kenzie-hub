import { useContext } from "react"
import { FaTrashAlt } from 'react-icons/fa'
import { TechContext } from "../../contexts/Providers/TechContext/tech"
import ModalEdit from "../ModalEditTech"

export default function CardTech({title, status, idTech}){

    const {setModalEditTech, modalEditTech} = useContext(TechContext)

    return (
        <>
        <div>
            <p>{title}</p>
            <p>{status}</p>
            <button onClick={() => setModalEditTech(true)}><FaTrashAlt/></button>
        </div>
        {
            modalEditTech && <ModalEdit title={title} idTech={idTech}/>    
        }
        </>
    )
}