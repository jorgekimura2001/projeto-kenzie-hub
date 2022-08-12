import { useState } from "react"
import { BsPencilFill } from 'react-icons/bs'
import ModalEdit from "../ModalEditTech"

import { Container } from "./styles"

export default function CardTech({title, status, idTech}){

    const [modalEdit, setModalEdit] = useState(false)

    return (
        <>
        <Container>
            <div className="tech-info">
                <p>{title}</p>
                <p>{status}</p>
            </div>
            <button className="button__edit-tech" onClick={() => setModalEdit(true)}><BsPencilFill/></button>
        </Container>
        {
            modalEdit && <ModalEdit title={title} idTech={idTech} setModalEdit={setModalEdit}/>    
        }
        </>
    )
}