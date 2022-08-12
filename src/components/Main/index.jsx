import { useContext} from "react"
import { TechContext } from "../../contexts/Providers/TechContext/tech"
import { UserContext } from "../../contexts/Providers/UserContext/user"
import Modal from "../ModalAddTech"
import { Container, ContainerTechs, MainStyled } from "./styles"
import Techs from "../Techs"
import ModalEdit from "../ModalEditTech"

function Main(){

    const {user} = useContext(UserContext)
    const {techs, setModalAddTech, modalAddTech, modalEditTech} = useContext(TechContext)
   
    return(
        <MainStyled>
            <Container>
                <p>Olá, {user.name}</p>
                <span>{user.course_module}</span>
            </Container>
            <ContainerTechs>
                {
                    !techs.length ?  
                    <>
                    <p>Que pena! Você não possui nenhuma tecnologia :(</p>
                    <span>Gostaria de adicionar?</span>
                    <button onClick={() => setModalAddTech(true)}>Clique me</button>
                    </>
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
export default Main