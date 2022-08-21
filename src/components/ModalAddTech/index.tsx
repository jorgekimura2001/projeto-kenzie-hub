import { ContainerModal } from "./styles";
import { useTech } from "../../contexts/Providers/TechContext/tech";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../Form/styles";
import {yupResolver} from '@hookform/resolvers/yup'

interface IForm{
  title: string;
  status: string;
}

interface IModalProps{
  setModalAddTech: Dispatch<SetStateAction<boolean>>
}

export default function Modal({setModalAddTech}: IModalProps) {
  const { loading, addTech } = useTech();
 
  const formSchema = yup.object({
    title: yup.string().required('Nome da Tecnologia é obrigatório'),
    status: yup.string().required('Status da Tecnologia é obrigatório')
  })

  const { register, handleSubmit, formState: {errors} } = useForm<IForm>({
    resolver: yupResolver(formSchema)
  });

  const modalRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
      function handleOutClick(event: MouseEvent) {
          if (!modalRef.current?.contains(event.target as HTMLDivElement)) {
            setModalAddTech(false);
          }
      }
      document.addEventListener("mousedown", handleOutClick);
      return () => {
        document.removeEventListener("mousedown", handleOutClick);
      };
  }, []);

  function onSubmit(data: IForm) {
    addTech(data)
    setTimeout(() => {
      setModalAddTech(false)
    }, 2000);
  }

  return (
    <ContainerModal>
      <div className="modal-box" ref={modalRef}>
        <div className="header-modal">
          <h3>Cadastrar Tecnologia</h3>
          <button onClick={() => setModalAddTech(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title-tech">Nome</label>
          <input
            type="text"
            id="title-tech"
            placeholder="Digite uma tecnologia"
            {...register("title")}
          />
          <p>{errors.title?.message}</p>

          <label htmlFor="status-tech">Selecionar status</label>
          <select id="status-tech" {...register("status")}>
            <option value="">Selecione o status da tecnologia</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <p>{errors.status?.message}</p>

        <button type="submit">Cadastrar Tecnologia</button>
        </Form>
        {
          loading && <span>Carregando ...</span>
        }
      </div>
    </ContainerModal>
  );
}