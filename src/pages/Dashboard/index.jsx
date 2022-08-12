import { useContext } from "react"
import { Navigate } from "react-router-dom"
import Header from "../../components/Header"
import Main from '../../components/Main'
import Modal from "../../components/ModalAddTech"
import { TechContext } from "../../contexts/Providers/TechContext/tech"
import { UserContext } from "../../contexts/Providers/UserContext/user"

import { Container } from "./styles"

function Dashboard (){

    const {user, loading, logOut} = useContext(UserContext)
    const {modal} = useContext(TechContext)
    
    return(
        <>
        { 
            loading ? <div>Carregando ...</div>
            :
            user ? 
            <Container>
                <Header onClick={logOut} button='Sair'/>
                <Main />
            </Container>
            : 
            <Navigate to='/login' replace/>
        }
        {
            modal && <Modal/>
        }
        </>
    )
}

export default Dashboard