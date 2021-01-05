import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    max-width: 1100vw;
`

export const Header = styled.header`
    height: 50vh;

    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
`

export const TopBar = styled.div`
    width: 100%;
    padding: 1.6rem;
    font: 700 2.4rem 'Poppins';
    color: #fff;
    background-color: var(--color-primary-dark);
    
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        max-width: 1100px;
        margin: 0 auto;
    }
`

export const Title = styled.div`
    width: 90%;
    flex: 1;
    margin: 0 auto;
    position: relative;
    max-width: 100%;
    padding-bottom: 48px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    strong {
        font: 700 8.7rem 'Poppins';
        line-height: 4.2rem;
        color: #fff
    }
`

export const Content = styled.main`
    height: 50vh;
    max-width: 90%;
    margin: 0 auto;
    display: grid;
    align-items: center;
    grid-template-rows: 1fr 1fr;
    row-gap: 30px;

    h1 {
        align-self: flex-end;
    }
`

export const Actions = styled.div`
    display: grid;
    grid-template-areas: "new search update";
    grid-template-columns: repeat(3, 42.7rem);
    column-gap: 30px;
    justify-content: space-between;

    & > :nth-child(1) {
        background-color: var(--color-success);
    }

    & > :nth-child(2) {
        background-color: var(--color-primary);
    }

    & > :nth-child(3) {
        background-color: var(--color-danger);
    }

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 9.9rem;
        max-width: 427px;
        margin-top: 0.8rem;
        border-radius: 0.8rem;
        border: 1px solid var(--color-border-input);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
        outline: 0;
        padding: 0 1.6rem;
        color: #fff;
        font: 2.6rem 'Archivo';
    }
`