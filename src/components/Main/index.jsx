import { Container, ContainerDesk, MainStyled } from "./styles"

function Main({user}){
    
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