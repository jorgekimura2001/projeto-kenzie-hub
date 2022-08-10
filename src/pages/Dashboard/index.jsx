import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Main from '../../components/Main'
import { UserContext } from "../../contexts/user"
import { Container } from "./styles"

function Dashboard (){

    const {user, setUser, loading} = useContext(UserContext)
    console.log(loading)
   
    const navigate = useNavigate()

    function handleLogout(){
        localStorage.clear()
        setUser()
        navigate('/login', {replace: true})
    }

    return(
        <>
        { 
            loading ? <div>Carregando ...</div>
            :
            user ? 
            <Container>
                <Header onClick={handleLogout} button='Sair'/>
                <Main user={user}/>
            </Container>
            : 
            <Navigate to='/login' replace/>
        }
        </>
    )
}

export default Dashboard