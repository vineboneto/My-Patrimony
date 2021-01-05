import styled from 'styled-components'

export const FormContainer = styled.form`

`

export const Fieldset = styled.fieldset`
    
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
