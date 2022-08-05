import { useForm } from "react-hook-form"
import { Form } from "../../components/Form/styles"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useHistory } from "react-router-dom"
import { api } from "../../services/api"
import { toast } from 'react-toastify';
import { Container, ContainerLogin, ContainerRegister } from "./styles.js"
import logo from '../../assets/logo.svg'

function Login({setUser}){

    const history = useHistory()

    const formSchema = yup.object({
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    console.log(errors)

    function onSubmit(data){
        console.log(data)
        api.post('sessions', data)
        .then(res => {
            localStorage.setItem('@token', res.data.token)
            localStorage.setItem('@userId', res.data.user.id)
            setUser(res.data.user)
            toast.success('Login realizado com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push('/')
            history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
            toast.error('Email e/ou senha incorreta', {
                position: "top-right",
                autoClose: 5000,
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
                    <input type="text" id="password" placeholder="Senha" {...register('password')}/>
                    <p>{errors.password?.message}</p>
                    <button type="submit">Entrar</button>
                </Form>
                <ContainerRegister>
                    <span>Ainda não possui uma conta?</span>
                    <button onClick={() => history.push('/registration')}>Cadastre-se</button>
                </ContainerRegister>
            </ContainerLogin>
        </Container>
    )
}
export default Login