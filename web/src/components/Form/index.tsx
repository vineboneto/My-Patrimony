import React, { FormHTMLAttributes } from 'react'

import './styles.css'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    legend: string;
    labelButton?: string
    addNew?: () => void
}

const Form: React.FC<FormProps> = ({ addNew, legend, children, labelButton="" }) => {
    return (
        <form className="form-block">
            <fieldset>
                <legend>
                    {legend}
                    
                    {labelButton && addNew &&
                        <button  type="button" onClick={() => addNew()}>
                            {labelButton}
                        </button> 
                    }

                    {}
                </legend>

                { children }
            </fieldset>
        </form>
    )
}

export default Form
