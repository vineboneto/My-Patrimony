import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useField } from "@unform/core";

import { Delete, Item } from './styled';
import { InputBlock } from '../styled';

import closeIcon from 'assets/images/icons/closeIcon.svg'

interface Field {
    name: string
    label: string
}

interface MultiInputsProps {
    name: string
    fields: Field[]
    newItem: any
}

export interface MultiInputsHandles {
    addLine: () => void
}


const MultiInputs: React.ForwardRefRenderFunction<MultiInputsHandles, MultiInputsProps> = ({ name, fields, newItem }, ref) => {
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [lines, setLines] = useState(defaultValue);
    const inputRef = useRef({ value: defaultValue })

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField])

    const updateLines = (newLines: any) => {
        console.log(newLines)
        inputRef.current.value = newLines   
        setLines(newLines)
    }

    const addLine = () => {
        console.log(inputRef.current.value)
        updateLines([...inputRef.current.value, newItem ]);
    }

    const removeLine = (index: number) => {
        const newLines = lines.filter((item: any, i: number) => i !== index);
        updateLines(newLines)
        setLines(newLines)
    }

    const handleChange = (field: string, newValue: string, index: number) => {
        const newLines = lines.map((line: any, i: number) => {
            return index !== i ? line : { ...line, [field]: newValue }
        });
        updateLines(newLines)
    }

    useImperativeHandle(ref, () => {
        return {
            addLine,
        }
    })

    return (         
        <>
            { lines.map((line: any, index: number) => (
                <Item key={index}>
                    { fields.map((field, indexField) => (
                        <InputBlock key={indexField}>
                            <label htmlFor={name}>{field.label}</label>
                            <input
                                name={field.name}
                                value={line[field.name]}
                                onChange={e => handleChange(field.name, e.target.value, index)}
                            />
                        </InputBlock>
                    )) }
                    <Delete>
                        { lines.length > 1 && <img src={closeIcon} alt="Excluir Ip" onClick={() => removeLine(index)} /> }
                    </Delete>
                </Item>
            )) }
            { error && <p>{error}</p> }
        </>
            
    );
};

export default forwardRef(MultiInputs);