import { useEffect, useRef, useContext } from "react";
import { TechContext } from "../../contexts/Providers/TechContext/tech";
import { ContainerModal } from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../Form/styles";

function Modal() {
  const { setModalAddTech, addTech } = useContext(TechContext);

  const { register, handleSubmit } = useForm();

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
    console.log(data);
    // addTech(data)
  }

  return (
    <ContainerModal>
      <div className="modal-box" ref={modalRef}>
        <div>
          <p>Cadastrar Tecnologia</p>
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

          <label htmlFor="status-tech">Selecionar status</label>
          <select id="status-tech" {...register("status")}>
            <option value="">Selecionar o status da tecnologia</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediário</option>
            <option value="Avancado">Avançado</option>
          </select>

        <button type="submit">Cadastrar Tecnologia</button>
        </Form>
      </div>
    </ContainerModal>
  );
}
export default Modal;
