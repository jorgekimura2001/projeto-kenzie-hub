import { useForm } from "react-hook-form"
import { Form } from "../../components/Form/styles"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { api } from "../../services/api"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { Container, ContainerForm } from "./styles"

function Registration(){

    let navigate = useNavigate()

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

    function handleToLoginPage(){
        setTimeout(() => {
            navigate('/', {replace: true})
        }, 1000)
    }

    return (
        <Container>
            <Header onClick={handleToLoginPage} button='Voltar' />
            <ContainerForm>
                <div>
                    <p>Crie sua conta</p>
                    <span>Rapido e grátis, vamos nessa</span>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" placeholder="Digite seu nome" {...register('name')}/>
                    <p>{errors.name?.message}</p>

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Digite seu email" {...register('email')}/>
                    <p>{errors.email?.message}</p>

                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="Digite uma senha" {...register('password')}/>
                    <p>{errors.password?.message}</p>

                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" id="confirmPassword" placeholder="Confirme sua senha" {...register('confirmPassword')}/>
                    <p>{errors.confirmPassword?.message}</p>

                    <label htmlFor="bio">Bio</label>
                    <input type="text" id="bio" placeholder="Fale sobre você" {...register('bio')}/>
                    <p>{errors.bio?.message}</p>

                    <label htmlFor="contact">Contato</label>
                    <input type="text" id="contact" placeholder="Opção de contato" {...register('contact')}/>
                    <p>{errors.contact?.message}</p>

                    <label htmlFor="course_module">Selecionar módulo</label>
                    <select id="course_module" {...register('course_module')}>
                        <option value="">Selecione um módulo</option>
                        <option value="Primeiro Módulo (FrontEnd Iniciante)">M1</option>
                        <option value="Segundo Módulo (FrontEnd Intermediário)">M2</option>
                        <option value="Terceiro Módulo (FrontEnd Avançado)">M3</option>
                        <option value="Quarto Módulo (BackEnd Iniciante)">M4</option>
                        <option value="Quinto Módulo (BackEnd Intermediário/Avançado)">M5</option>
                        <option value="Sexto Módulo (Empregabilidade)">M6</option>
                    </select>
                    <p>{errors.course_module?.message}</p>
                    <button type="submit">Cadastrar</button>
                </Form>
            </ContainerForm>
        </Container>
    )
}
export default Registration