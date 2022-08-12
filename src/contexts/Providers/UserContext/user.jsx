import { createContext, useContext, useEffect, useState} from "react";
import { api } from "../../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { TechContext } from "../TechContext/tech";

export const UserContext = createContext({})

export default function UserProvider({children}){ 

    const {setTechs} = useContext(TechContext)

    const [user, setUser] = useState()
   
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('@userToken')
       
        async function listUser(){
            if(token){
                try {
                    api.defaults.headers.authorization = `Bearer ${token}`
                    const {data} = await api.get(`profile`)
                    setUser(data)
                    setLoading(true)
                } catch (error) {
                    console.log(error)
                } 
            }
            setLoading(false)
            api.defaults.headers.authorization = `Bearer ${token}`
        }
        listUser()
    }, [])

    function logIn(data){
        setLoading(true)
        api.post('sessions', data)
        .then(res => {
            localStorage.setItem('@userToken', res.data.token)
            localStorage.setItem('@userId', res.data.user.id)
            setUser(res.data.user)
            setTechs(res.data.user.techs)
            setLoading(false)
            toast.success('Login realizado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/dashboard', {replace: true})
            }, 3000)
            
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            toast.error('Email e/ou senha incorreta', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    function logOut(){
        localStorage.clear()
        setUser()
        navigate('/login', {replace: true})
    }

    function registration (data){
        api.post('users', data)
        .then(res => {
            toast.success('Conta criada com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/login', {replace: true})
            }, 3000);
        })
        .catch(err => { 
            console.log(err)
            toast.error('Ops! Algo deu errado', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    function handleToLoginPage() {
        navigate("/", { replace: true });
      }

    return(
        <UserContext.Provider value={{user, setUser, loading, setLoading, logIn, logOut, registration, handleToLoginPage}}>
            {children}
        </UserContext.Provider>
    )
}
