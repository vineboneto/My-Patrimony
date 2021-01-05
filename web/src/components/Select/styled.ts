import styled from 'styled-components'

export const Container = styled.div`
    position: relative;

    label {
        font-size: 1.4rem;
        color: var(--color-label-input);

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 100%;
        height: 4rem;
        margin-top: 0.8rem;
        border-radius: 0.8rem;
        border: 1px solid var(--color-border-input);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
        outline: 0;
        padding: 0 1.6rem;
        font: 1.6rem 'Archivo';
        background: url('../../assets/images/icons/moreIcon.svg') no-repeat right #fff;
        background-position-x: 98%;
        font-weight: 700;
    }

    &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: var(--color-success);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
}
`
