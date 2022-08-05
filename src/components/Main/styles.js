import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 131px;
    padding-left: 12px;

    border-top: 1px solid var(--color-grey-3);
    border-bottom: 1px solid var(--color-grey-3);

    display: flex;
    flex-direction: column;
    justify-content: center;

    p{
        color: var(--color-grey-0);
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 10px;
    }
    span{
        color: var(--color-grey-1);
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
    }
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        p{
            margin-bottom: 0;
        }
    }
`

export const ContainerDesk = styled.div`
    display: none;

    p{
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        color: var(--color-grey-0);
    }

    span{
        margin-top: 23px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-grey-0);
    }

    @media (min-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 37px;

        
    }
`

export const MainStyled = styled.main`
    width: 100%;

    @media (min-width: 1024px){
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
`
