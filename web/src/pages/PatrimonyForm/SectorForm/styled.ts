import styled from 'styled-components'

export const Content = styled.div`
    padding: 3rem ;
    display: grid;
    grid-template-areas: 
        "title title"
        "sector sector"
        "button button";
    grid-template-columns: repeat(2, 250px);
    justify-content: space-between;
    align-items: center;
    column-gap: 3rem;
    row-gap: 3rem;

    & > :nth-child(1) {
        grid-area: title;
    }

    & > :nth-child(2) {
        grid-area: sector;
    }

    & > :nth-child(3) {
        grid-area: button;
        width: 250px;
        justify-self: flex-end;
    } 
`