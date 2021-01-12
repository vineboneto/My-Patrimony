import styled from 'styled-components'
import { Form as Unform } from '@unform/web'
  
interface StyleProps {
    padding?: string
}

export const Container = styled.div`
    width: 100vw;
`

export const Main = styled.main`
    background-color: #fff;
    max-width: 74rem;
    border-radius: 0.8rem;
    margin: -8.2rem auto 3.2rem;
    padding-top: 3.4rem;
    /* overflow: hidden; */
    z-index: 3;
`

export const Form = styled(Unform)`
`

export const Fieldset = styled.fieldset<StyleProps>`
    border: 0;
    padding: ${props => (props.padding ? props.padding : "3.4rem")};

    & + & {
        margin-top: 1.4rem;
    }

`

export const Legend = styled.legend<StyleProps>`
    font: 600 2.4rem 'Archivo';
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: ${props => (props.padding ? props.padding : "0 0 3.4rem 0")};
    padding-bottom: 2.6rem;
    border-bottom: 1px solid var(--color-border-input);
`


export const OwnerData = styled.div`
    display: grid;
    grid-template-columns: 300px 300px;
    
    grid-template-areas: "owner sector";
    justify-content: space-between;
    align-items: center;
`

export const PatrimonyData = styled.div`
    display: grid;
    grid-template-areas: 
        "category patrimony model"
        "description description description";
    grid-template-columns: repeat(3, 200px);
    justify-content: space-between;
    align-items: center;
    
    & > :nth-child(1), & :nth-child(2) {
        grid-area: category;
    }

    & > :nth-child(5) {
        margin-top: 2.4rem;
        grid-area: description
    }
`

export const Plus = styled.button`
    background-color: #fff;
    cursor: pointer;
    max-width: 30px;
    max-height: 30px;
    outline: 0;
    border: 0;
    z-index: 3;
    justify-self: flex-end;
    padding-left: 5px;
`

export const IpData = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 201px);
    grid-template-areas: "ip mask gateway";
    justify-content: space-between;
    padding: 3.4rem 0;

    & + & {
        margin-top: 2.4rem;
    }
`

export const Button = styled.button`
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

export const ButtonCollapse = styled.button`
    width: 100%;
    background-color: #808080;
    padding: 1rem 3.4rem;
    color: #fff;
    outline: 0;
    border: 0;
    cursor: pointer;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const Create = styled.button`
    background: none;
    border: 0;
    color: var(--color-primary);
    font: 700 1.6rem 'Archivo';
    transition: color 0.2s;
    cursor: pointer;
    z-index: 1;


    &:hover {
        color: #000;
    } 
`

export const Footer = styled.footer`
    height: 138px;
    background-color: var(--color-border-input);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 3.4rem;
`


