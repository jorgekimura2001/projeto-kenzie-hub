import Modal from "../ModalAddTech"
import { useUser } from "../../contexts/Providers/UserContext/user"
import { Container, ContainerNoneTechs, ContainerTechs, MainStyled } from "./styles"
import { useTech } from "../../contexts/Providers/TechContext/tech"
import Techs from "../Techs"
import { useState } from "react"

export default function Main(){

    const {user} = useUser()
    const {techs} = useTech()
    const [modalAddTech, setModalAddTech] = useState(false)
   
    return(
        <MainStyled>
            <Container>
                <p>Olá, {user.name}</p>
                <span>{user.course_module}</span>
            </Container>
            <ContainerTechs>
                {
                    !techs.length ?  
                    <ContainerNoneTechs>
                    <p>Que pena! Você não possui nenhuma tecnologia :(</p>
                    <span>Gostaria de adicionar?</span>
                    <button onClick={() => setModalAddTech(true)}>Clique me</button>
                    </ContainerNoneTechs>
                    :
                    <Techs setModalAddTech={setModalAddTech}/>
                }
                {
                    modalAddTech && <Modal setModalAddTech={setModalAddTech}/>
                }
            </ContainerTechs>
        </MainStyled>
    )
}