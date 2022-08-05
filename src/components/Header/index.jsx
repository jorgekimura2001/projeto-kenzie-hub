import logo from '../../assets/logo.svg'
import { HeaderStyled } from './styles'

function Header ({onClick, button}){

    return (
        <HeaderStyled>
            <img src={logo} alt="Logo KenzieHub" />
            <button onClick={onClick}>{button}</button>
        </HeaderStyled>
    )
}

export default Header