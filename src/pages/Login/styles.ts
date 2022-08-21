import styled from "styled-components";

export const Container = styled.div`
    background-color: black;
    width: 100%;
    height: 100vh;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-0);

    img{
        margin-bottom: 20px;
        width: 101px;
        height: 14px;
    }
`

export const ContainerLogin = styled.div`
    min-height: 402px;
    width: 296px;
    background-color: var(--color-grey-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0px 3.20867px 32.0867px -8.02168px rgba(0, 0, 0, 0.25);
    border-radius: 3.20867px;

    span{
        font-weight: 700;
        font-size: 14.439px;
        line-height: 22px;
    }
    form {
        label{
            font-size: 10px;
            margin-bottom: 18px;
        }
        input{
            background-color: var(--color-grey-2);
            height: 38.5px;
            padding-left: 16px;
            border: 0.9772px solid var(--color-grey-0);
            border-radius: 3.20867px;
            color: var(--color-grey-0);
            font-size: 12px;
            font-weight: 400;
            width: 80%;
            outline: none;
        }
        input::placeholder{
            color: var(--color-grey-1);
            font-weight: 400;
            font-size: 14px;
        }
        input:focus{
            border: 1px solid var(--color-primary-focus);
        }
        input:first-of-type{
            margin-bottom: 18px;
        }
        input ~ input{
            margin-bottom: 16px;
        }
        p{
            font-size: 12px;
            color: var(--color-primary-negative);
            margin-bottom: 10px;
        }
        button{
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 12px;
            font-weight: 500;

            width: 80%;
            height: 38.5px;

            border: 1.2182px solid var(--color-primary);
            border-radius: 4.06066px;

            background-color: var(--color-primary);
            color: var(--color-grey-0);
        }
    }

`

export const ContainerRegister = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    span{
        color: var(--color-grey-1);
        font-weight: 600;
        font-size: 9.5px;
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;
        font-weight: 500;

        width: 80%;
        height: 38.5px;

        border: 1.2182px solid var(--color-grey-1);
        border-radius: 4.06066px;

        background-color: var(--color-grey-1);
        color: var(--color-grey-0);
    }
`