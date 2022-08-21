import { Form } from "../../components/Form/styles"
import { Container, ContainerLogin, ContainerRegister } from "./styles"
import logo from '../../assets/logo.svg'
import { useUser } from "../../contexts/Providers/UserContext/user"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"

interface IForm{
    email: string;
    password: string;
}

export default function Login(){

    const {loading, logIn} = useUser()

    const navigate = useNavigate()

    const formSchema = yup.object({
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
    })

    const {register, handleSubmit, formState: {errors}} = useForm<IForm>({
        resolver: yupResolver(formSchema)
    })

    function onSubmit(data: IForm){
       logIn(data)
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
                    <button type="submit">Entrar</button>
                </Form>
                {
                    loading && <span>Carregando ...</span>
                }
                <ContainerRegister>
                    <span>Ainda não possui uma conta?</span>
                    <button onClick={() => navigate('/registration', {replace: true})}>Cadastre-se</button>
                </ContainerRegister>
            </ContainerLogin>
        </Container>
    )
}