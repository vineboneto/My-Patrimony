import React, { FormHTMLAttributes } from 'react'

import './styles.css'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    legend: string;
}

const Form: React.FC<FormProps> = (props) => {
    return (
        <form className="form-block">
            <fieldset>
                <legend>
                    {props.legend}
                </legend>

                {props.children}
            </fieldset>
        </form>
    )
}

export default Form
