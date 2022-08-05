import { useForm } from "react-hook-form"
import { Form } from "../../components/Form/styles"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { toast } from 'react-toastify';
import { Container, ContainerLogin, ContainerRegister } from "./styles.js"
import logo from '../../assets/logo.svg'

function Login({setUser, loading, setLoading}){

    let navigate = useNavigate()

    const formSchema = yup.object({
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    function onSubmit(data){
        setLoading(true)
        api.post('sessions', data)
        .then(res => {
            localStorage.setItem('@token', res.data.token)
            localStorage.setItem('@userId', res.data.user.id)
            setUser(res.data.user)
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

    return (
        <Container>
            <img src={logo} alt="Logo KenzieHub" />
            <ContainerLogin>
                <span>Login</span>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Email" {...register('email')}/>
                    <p>{errors.email?.message}</p>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="Senha" {...register('password')}/>
                    <p>{errors.password?.message}</p>
                    <button type="submit" disabled={loading}>{loading ? 'Carregando...'
                    : 'Entrar'}</button>
                </Form>
                <ContainerRegister>
                    <span>Ainda não possui uma conta?</span>
                    <button onClick={() => navigate('/registration', {replace: true})}>Cadastre-se</button>
                </ContainerRegister>
            </ContainerLogin>
        </Container>
    )
}
export default Login