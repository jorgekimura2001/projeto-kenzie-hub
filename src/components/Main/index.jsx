import { useContext } from "react"
import { UserContext } from "../../contexts/user"
import { Container, ContainerDesk, MainStyled } from "./styles"

function Main(){

    const {user} = useContext(UserContext)
    
    return(
        <MainStyled>
            <Container>
                <p>Olá, {user.name}</p>
                <span>{user.course_module}</span>
            </Container>
            <ContainerDesk>
                <p>Que pena! Estamos em desenvolvimento :(</p>
                <span>Nossa aplicação está em desenvolvimento, em breve teremos novidades</span>
            </ContainerDesk>
        </MainStyled>
    )
}
export default Main