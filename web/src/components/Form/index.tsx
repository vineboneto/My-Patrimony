import React, { FormHTMLAttributes } from 'react'

import { FormContainer, Fieldset, Legend } from './styled'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    legend: string;
    labelButton?: string
    addButton?: () => void
}

const Form: React.FC<FormProps> = ({ addButton, legend, children, labelButton }) => {
    return (
        <FormContainer>
            <Fieldset>
                <Legend>
                    {legend}
                    
                    {labelButton && addButton &&
                        <button  type="button" onClick={() => addButton()}>
                            {labelButton}
                        </button> 
                    }
                </Legend>

                { children }
            </Fieldset>
        </FormContainer>
    )
}

export default Form
