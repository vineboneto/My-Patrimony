import styled from 'styled-components'

export const DialogContent = styled.div`
    padding: 3rem ;
    display: grid;
    grid-template-areas: 
        "title title"
        "owner sector"
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
        grid-area: owner;
    }

    & > :nth-child(3) {
        grid-area: sector;
    }

    & > :nth-child(4) {
        grid-area: button;
        width: 250px;
        justify-self: flex-end;
    }
`

export const Title = styled.div`
    color: var(--color-label-input);
`