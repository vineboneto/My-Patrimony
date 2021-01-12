import styled from 'styled-components'

interface Content {
    visible: boolean
}

export const Container = styled.div<Content>`
    position: relative;
    padding: ${props => (props.visible ? "3.4rem" : "#0")};
    background: ${props => (props.visible ? "#333" : "#f2f2f2")};
    transition: height 5s;
`