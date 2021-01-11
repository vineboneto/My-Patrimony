import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
`

export const OwnerData = styled.div`
    display: grid;
    grid-template-columns: 300px 300px;
    height: 100%;
    grid-template-areas: "owner sector";
    justify-content: space-between;
    align-items: center;

`

export const PatrimonyData = styled.div`
    display: grid;
    grid-template-areas: "type patrimony model"
        "description description description";
    grid-template-columns: repeat(3, 200px);
    justify-content: space-between;

    & > :nth-child(2), & > :nth-child(3)  {
        grid-area: type;
    }
    
    & > :nth-child(2) {
        justify-self: flex-end;
        align-self: center;
    }

    & > :nth-child(4) {
        grid-area: patrimony;
    }    

    & > :nth-child(5) {
        grid-area: model;
    }

    & > :nth-child(6) {
        margin-top: 2.4rem;
        grid-area: description
    }
`

export const ButtonFooter = styled.button`
    width: 23.1rem;
    height: 5.4rem;
    border-radius: 0.8rem;
    border: 1px solid var(--color-border-input);
    background-color: var(--color-primary);
    color: #fff;
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem 'Archivo';
    cursor: pointer;
`
