import { ContainerModal } from "./styles";
import { TechContext } from "../../contexts/Providers/TechContext/tech";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../Form/styles";
import {yupResolver} from '@hookform/resolvers/yup'

export default function Modal() {
  const { setModalAddTech, loading, addTech } = useContext(TechContext);
 
  const formSchema = yup.object({
    title: yup.string().required('Nome da Tecnologia é obrigatório'),
    status: yup.string().required('Status da Tecnologia é obrigatório')
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(formSchema)
  });

  const modalRef = useRef();

  useEffect(() => {
    function handleOutClick(event) {
      if (!modalRef.current.contains(event.target)) {
        setModalAddTech(false);
      }
    }
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  function onSubmit(data) {
    addTech(data)
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
            <option value="Intermediario">Intermediário</option>
            <option value="Avancado">Avançado</option>
          </select>
          <p>{errors.status?.message}</p>

        <button type="submit">Cadastrar Tecnologia</button>
        </Form>
        {
          loading && <span>Carregando...</span>
        }
      </div>
    </ContainerModal>
  );
}