import styled from 'styled-components'

export const Item = styled.div`
    display: grid;
    grid-template-columns: 201px 201px 201px;
    grid-template-areas: "ip mask gateway";
    justify-content: space-between;

    & + & {
        margin-top: 2.4rem;
    }
`