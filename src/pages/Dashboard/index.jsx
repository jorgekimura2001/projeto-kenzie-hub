import { useHistory } from "react-router-dom"

function Dashboard ({user, setUser}){

    const history = useHistory()

    function handleLogout(){
        localStorage.clear()
        setUser({})
        history.push('/')
    }

    return(
        <div> 
            <span>
            Bem vindo à homepage
            </span>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Dashboard