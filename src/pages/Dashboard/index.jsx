import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Main from '../../components/Main'
import { Container } from "./styles"

function Dashboard ({user, setUser}){

    let navigate = useNavigate()

    function handleLogout(){
        localStorage.clear()
        setUser({})
        navigate('/login', {replace: true})
    }

    return(
        <Container>
            <Header onClick={handleLogout} button='Sair' />
            <Main user={user}/>
        </Container>
    )
}

export default Dashboard