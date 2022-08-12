import { Container } from './styles'
import CardTech from '../CardTech'
import { TechContext } from '../../contexts/Providers/TechContext/tech'
import { useContext } from 'react'
import { IoMdAdd} from 'react-icons/io'

export default function Techs(){

    const {techs, setModalAddTech} = useContext(TechContext)
   
    return (
        <Container>
            <div className='header-tech'>
                <h3>Tecnologias</h3>
                <button onClick={() => setModalAddTech(true)}><IoMdAdd/></button>
            </div>
            {
                techs.map(({title, status, id}) => {
                return <CardTech key={id} title={title} status={status} idTech={id}/>})
            }
        </Container>
    )
}