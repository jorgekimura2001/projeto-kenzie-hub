import { ContainerModalEdit } from "./styles";
import { TechContext } from "../../contexts/Providers/TechContext/tech";
import { useEffect, useRef, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../Form/styles";
import {yupResolver} from '@hookform/resolvers/yup'

export default function ModalEdit({title, idTech, setModalEdit}) {

  const {uptadeTech, removeTech} = useContext(TechContext)

  const formSchema = yup.object({
    status: yup.string().required('Status da Tecnologia é obrigatório')
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(formSchema)
  });

  const modalEditRef = useRef();

  useEffect(() => {
    function handleOutClick(event) {
      if (!modalEditRef.current.contains(event.target)) {
        setModalEdit(false);
      }
    }
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  function onSubmit(data){
    uptadeTech(idTech, data)
    setTimeout(() => {
      setModalEdit(false)
    }, 2000);
  }

  return (
    <ContainerModalEdit>
      <div className="modal-box" ref={modalEditRef}>
        <div className="header-modal">
          <h3>Tecnologia Detalhes</h3>
          <button onClick={() => setModalEdit(false)}>
            <AiOutlineClose />
          </button>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title-tech">Nome da Tecnologia</label>
          <input
            type="text"
            id="title-tech"
            value={title}
            disabled
            onChange={() => {}}
          />

          <label htmlFor="status-tech">Selecionar status</label>
          <select id="status-tech" {...register("status")}>
            <option value="">Selecionar o status da tecnologia</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <p>{errors.status?.message}</p>
          
          <button type="submit">Atualizar Tecnologia</button>
        </Form>
          <button className="button__remove-tech" onClick={() => removeTech(idTech)}>Excluir</button>
      </div>
    </ContainerModalEdit>
  );
}