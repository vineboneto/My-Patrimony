import React, { FormHTMLAttributes } from 'react'

import { FormContainer, Fieldset, Legend } from './styled'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    legend: string;
    labelButton?: string
    clickButton?: () => void
}

const Form: React.FC<FormProps> = ({ clickButton, legend, children, labelButton }) => {
    return (
        <FormContainer>
            <Fieldset>
                <Legend>
                    {legend}
                    
                    {labelButton && clickButton &&
                        <button  type="button" onClick={() => clickButton()}>
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
