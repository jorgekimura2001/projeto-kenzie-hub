import { useContext} from "react"
import Modal from "../ModalAddTech"
import { UserContext } from "../../contexts/Providers/UserContext/user"
import { Container, ContainerNoneTechs, ContainerTechs, MainStyled } from "./styles"
import { TechContext } from "../../contexts/Providers/TechContext/tech"
import Techs from "../Techs"

export default function Main(){

    const {user} = useContext(UserContext)
    const {techs, setModalAddTech, modalAddTech} = useContext(TechContext)
   
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
                    <Techs/>
                }
                {
                    modalAddTech && <Modal/>
                }
            </ContainerTechs>
        </MainStyled>
    )
}