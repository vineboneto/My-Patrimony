import styled from 'styled-components'

export const DialogContainer = styled.div`
    position: fixed;   
    z-index: 999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);

    &:before {
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 999;
    }
`

export const Content = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 700px;
    height: 250px;
    transform: translate3d(-50%,-50%,0);
    overflow: hidden;

    padding: 20px 20px 40px 20px;
    border: 1px solid #CCC;
    background: #fff;
    z-index: 1000;
    display: grid;
    
    grid-template-rows: 30px 1fr 30px;
    align-items: center;

    button {
        justify-self: flex-end;
        max-height: 30px;
        outline: 0;
        border: none;
        cursor: pointer;
    }
`

export const ButtonClose = styled.button`
    background-color: #fff;
`

export const ButtonSave = styled.button`
    color: #fff;
    background-color: var(--color-success); 
    padding: 2.4rem;
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
`