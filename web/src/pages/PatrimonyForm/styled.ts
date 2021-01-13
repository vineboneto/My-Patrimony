import styled from 'styled-components'

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

export const Footer = styled.footer`
    height: 138px;
    background-color: var(--color-border-input);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 3.4rem;
`

export const DialogContainer = styled.div`
    width: 60rem;
    height: auto;
`


