import styled from 'styled-components'

export const DialogOwner = styled.div`
    display: grid;
    grid-template-columns: 300px 300px;
    height: 100%;
    grid-template-areas: "owner sector";
    justify-content: space-between;
    align-items: center;

    & > :nth-child(2), & > :nth-child(3) {
        grid-area: sector;
    }
`