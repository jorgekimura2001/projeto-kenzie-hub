import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 0 12px;
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: var(--color-grey-0);
    background-color: var(--color-grey-4);

`

export const ContainerForm = styled.div`
    min-height: 402px;
    width: 296px;
    padding-top: 33px;
    padding-bottom: 20px;
    margin-bottom: 46px;

    background-color: var(--color-grey-3);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    box-shadow: 0px 3.20867px 32.0867px -8.02168px rgba(0, 0, 0, 0.25);
    border-radius: 3.20867px;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p{
            color: var(--color-grey-0);
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 17px;
        }
        span{
            color: var(--color-grey-1);
            font-size: 9.5px;
            font-weight: 400;
            margin-bottom: 22px;
        }
    }

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
        input, select{
            background-color: var(--color-grey-2);
            height: 38.5px;
            padding-left: 16px;
            border-radius: 3.20867px;
            color: var(--color-grey-0);
            font-size: 12px;
            font-weight: 400;
            width: 80%;
            outline: none;
        }
        select{
            margin-bottom: 16px;
            color: var(--color-grey-1);
        }
        input::placeholder, option{
            color: var(--color-grey-1);
            font-weight: 400;
            font-size: 14px;
        }
        input:focus, select:focus{
            border: 1px solid var(--color-primary-focus);
        }
        input:first-of-type{
            margin-bottom: 18px;
        }
        input ~ input{
            margin-bottom: 16px;
        }
        p{
            font-size: 10px;
            color: var(--color-primary-negative);
            margin: 0 20px 10px 20px;
        }
        button{
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 12px;
            font-weight: 500;

            width: 80%;
            height: 38.5px;

            border: 1.2182px solid var(--color-primary-disable);
            border-radius: 4.06066px;

            background-color: var(--color-primary-disable);
            color: var(--color-grey-0);
        }
        button:hover{
            border: 1.2182px solid var(--color-primary);
            background-color: var(--color-primary);
        }
    }
`
