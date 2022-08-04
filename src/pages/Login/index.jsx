import { useForm } from "react-hook-form"
import { Form } from "../../components/Form/styles"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useHistory } from "react-router-dom"
import { api } from "../../services/api"
import { toast } from 'react-toastify';

function Login({setUser}){

    const history = useHistory()

    const formSchema = yup.object({
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
        // .matches('[A-Z]', "Deve conter ao menos 1 letra maiúscula")
        // .matches('([a-z])', "Deve conter ao menos 1 letra minúscula")
        // .matches('([0-9])', "Deve conter ao menos 1 número")
        // .matches('(\W)|_', "Deve conter ao menos 1 caracter especial")
        // .matches('.{8,}', "Deve conter ao menos 8 caracteres"),
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
            toast.error('Email ou senha incorretos', {
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
        <>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...register('email')}/>
            <p>{errors.email?.message}</p>
            <label htmlFor="password">Senha</label>
            <input type="text" id="password" {...register('password')}/>
            <p>{errors.password?.message}</p>
            <button type="submit">Entrar</button>
        </Form>
        <div>
            <span>Ainda não possui uma conta?</span>
            <button onClick={() => history.push('/registration')}>Cadastre-se</button>
        </div>
        </>
    )
}
export default Login