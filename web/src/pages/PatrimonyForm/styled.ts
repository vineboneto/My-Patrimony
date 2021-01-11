import styled from 'styled-components'
import { Form as Unform } from '@unform/web'

export const Container = styled.div`
    width: 100vw;
`

export const Main = styled.main`
    background-color: #fff;
    max-width: 74rem;
    border-radius: 0.8rem;
    margin: -8.2rem auto 3.2rem;
    padding-top: 3.4rem;
    overflow: hidden;
`

export const Form = styled(Unform)`
        border: 0;
        padding: 3.4rem;

        & + & {
            margin-top: 6.4rem;
        }
`

export const Legend = styled.legend`
    font: 600 2.4rem 'Archivo';
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 2.6rem;
    border-bottom: 1px solid var(--color-border-input);

    button {
        background: none;
        border: 0;
        color: var(--color-primary);
        font: 700 1.6rem 'Archivo';
        transition: color 0.2s;
        cursor: pointer;
        z-index: 1;
    }

    button:hover {
        color: #000;
    }
`

// export const OwnerData = styled.div`
//     display: grid;
//     grid-template-columns: 300px 300px;
//     height: 100%;
//     grid-template-areas: "owner sector";
//     justify-content: space-between;
//     align-items: center;

// `

// export const PatrimonyData = styled.div`
//     display: grid;
//     grid-template-areas: "type patrimony model"
//         "description description description";
//     grid-template-columns: repeat(3, 200px);
//     justify-content: space-between;

//     & > :nth-child(2), & > :nth-child(3)  {
//         grid-area: type;
//     }
    
//     & > :nth-child(2) {
//         justify-self: flex-end;
//         align-self: center;
//     }

//     & > :nth-child(4) {
//         grid-area: patrimony;
//     }    

//     & > :nth-child(5) {
//         grid-area: model;
//     }

//     & > :nth-child(6) {
//         margin-top: 2.4rem;
//         grid-area: description
//     }
// `

// export const ButtonFooter = styled.button`
//     width: 23.1rem;
//     height: 5.4rem;
//     border-radius: 0.8rem;
//     border: 1px solid var(--color-border-input);
//     background-color: var(--color-primary);
//     color: #fff;
//     outline: 0;
//     padding: 0 1.6rem;
//     font: 1.6rem 'Archivo';
//     cursor: pointer;
// `
