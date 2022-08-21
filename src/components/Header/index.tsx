import { ReactNode } from 'react';
import logo from '../../assets/logo.svg'
import { HeaderStyled } from './styles'

interface IHeaderProps{
    onClick: () => void;
    button: ReactNode
}

export default function Header ({onClick, button}: IHeaderProps){
    return (
        <HeaderStyled>
            <img src={logo} alt="Logo KenzieHub" />
            <button onClick={onClick}>{button}</button>
        </HeaderStyled>
    )
}