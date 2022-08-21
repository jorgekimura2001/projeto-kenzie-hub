import { ContainerModalEdit } from "./styles";
import { useTech } from "../../contexts/Providers/TechContext/tech";
import { Form } from "../Form/styles";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'

interface IModalEditProps{
  title: string;
  idTech?: string;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
}

interface IForm{
  status: string;
}

export default function ModalEdit({title, idTech, setModalEdit}: IModalEditProps) {

  const {uptadeTech, removeTech, loading} = useTech()

  const formSchema = yup.object({
    status: yup.string().required('Status da Tecnologia é obrigatório')
  })

  const { register, handleSubmit, formState: {errors} } = useForm<IForm>({
    resolver: yupResolver(formSchema)
  });

  const modalEditRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutClick(event: MouseEvent) {
      if (!modalEditRef.current?.contains(event.target as HTMLDivElement)) {
        setModalEdit(false);
      }
    }
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  function onSubmit(data: IForm){
    uptadeTech({id: idTech, data})
    setTimeout(() => {
      setModalEdit(false)
    }, 2000);
  }

  return (
    <ContainerModalEdit isLoading={loading}>
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
          {loading && <span className="uptade__load">Carregando ...</span>}
          <button type="submit">Atualizar Tecnologia</button>
        </Form>
          <button className="button__remove-tech" onClick={() => removeTech({id: idTech})}>Excluir</button>
      </div>
    </ContainerModalEdit>
  );
}