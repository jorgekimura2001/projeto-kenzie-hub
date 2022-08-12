import styled from "styled-components";

export const ContainerModal = styled.div`

    position: fixed;
    width: 100%;
    min-height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    inset: 0;

    background-color: rgba(0,0,0,.5);

    .modal-box{
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: white;
        padding: 10px;
        border-radius: 8px;

        p{
            color: black;
        }
    }
`