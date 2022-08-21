import { Container } from './styles'
import CardTech from '../CardTech'
import { useTech } from '../../contexts/Providers/TechContext/tech'
import { IoMdAdd} from 'react-icons/io'
import { Dispatch, SetStateAction } from 'react'

interface ITechsProps{
    setModalAddTech: Dispatch<SetStateAction<boolean>>
}

export default function Techs({setModalAddTech}: ITechsProps){

    const {techs} = useTech()
       
    return (
        <Container>
            <div className='header-tech'>
                <h3>Tecnologias</h3>
                <button onClick={() => setModalAddTech(true)}><IoMdAdd/></button>
            </div>
            {
                techs.map(({title, status, id}) => <CardTech key={id} title={title} status={status} idTech={id}/>)
            }
        </Container>
    )
}