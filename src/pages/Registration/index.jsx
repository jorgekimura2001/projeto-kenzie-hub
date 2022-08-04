import { useForm } from "react-hook-form"
import { Form } from "../../components/Form/styles"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { api } from "../../services/api"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom"

function Registration(){

    const history = useHistory()

    const formSchema = yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
            .matches('[A-Z]', "Deve conter ao menos 1 letra maiúscula")
            .matches('([a-z])', "Deve conter ao menos 1 letra minúscula")
            .matches('([0-9])', "Deve conter ao menos 1 número")
            .matches('(\W)|_', "Deve conter ao menos 1 caracter especial")
            .matches('.{8,}', "Deve conter ao menos 8 caracteres"),
        confirmPassword: yup
            .string()
            .required('Confirmação de senha é obrigatória')
            .oneOf([yup.ref('password')], 'Confirmação de senha está incorreta'),
        bio: yup.string().required('Biografia é obrigatória').min(20, 'No mínimo 20 caracteres'),
        contact: yup.string().required('Contato é obrigatório'),
        course_module: yup.string().required('Seleção de módulo obrigatória')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    function onSubmit(data){
        api.post('users', data)
        .then(res => {
            console.log(res)
            toast.success('Conta criada com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push('/')
        })
        .catch(err => { 
            console.log(err)
            toast.error('Ops! Algo deu errado', {
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
        <header>
            <img src="" alt="Logo" />
            <button onClick={() => history.push('/')}>Voltar</button>
        </header>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" {...register('name')}/>
            <p>{errors.name?.message}</p>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...register('email')}/>
            <p>{errors.email?.message}</p>

            <label htmlFor="password">Senha</label>
            <input type="text" id="password" {...register('password')}/>
            <p>{errors.password?.message}</p>

            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input type="text" id="confirmPassword" {...register('confirmPassword')}/>
            <p>{errors.confirmPassword?.message}</p>

            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" {...register('bio')}/>
            <p>{errors.bio?.message}</p>

            <label htmlFor="contact">Contato</label>
            <input type="text" id="contact" {...register('contact')}/>
            <p>{errors.contact?.message}</p>

            <select {...register('course_module')}>
                <option value="">Selecione um módulo</option>
                <option value="m1">M1</option>
                <option value="m2">M2</option>
                <option value="m3">M3</option>
                <option value="m4">M4</option>
                <option value="m5">M5</option>
                <option value="m6">M6</option>
            </select>
            <p>{errors.course_module?.message}</p>
            <button type="submit">Entrar</button>
        </Form>
        </>
    )
}
export default Registration