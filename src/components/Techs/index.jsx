import { useContext } from 'react'

import { TechContext } from '../../contexts/Providers/TechContext/tech'
import { VscDiffAdded} from 'react-icons/vsc'
import Modal from '../ModalAddTech'
import CardTech from '../CardTech'

function Techs(){

    const {techs, setModalAddTech} = useContext(TechContext)
   
    return (
        <div>
            <p>Tecnologias</p>
            <button onClick={() => setModalAddTech(true)}><VscDiffAdded/></button>
            {
                techs.map(({title, status, id}) => <CardTech key={id} title={title} status={status} idTech={id}/>)
            }
        
        </div>
    )
}
export default Techs