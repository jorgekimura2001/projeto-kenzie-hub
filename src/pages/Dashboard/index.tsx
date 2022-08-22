import { Container, ContainerLoad } from "./styles"
import Header from "../../components/Header"
import Main from '../../components/Main'
import {  useUser } from "../../contexts/Providers/UserContext/user"
import { Navigate } from "react-router-dom"

export default function Dashboard (){

    const {user, loading, logOut} = useUser()
    
    return(
        <>
        { 
            loading ? <ContainerLoad><span>Carregando ...</span></ContainerLoad>
            :
            user ? 
            <Container>
                <Header onClick={logOut} button='Sair'/>
                <Main />
            </Container>
            : 
            <Navigate to='/login' replace/>
        }
        </>
    )
}