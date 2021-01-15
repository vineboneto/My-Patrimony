import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useField } from "@unform/core";

import { Delete, Item } from './styled';
import { InputBlock } from '../styled';

import closeIcon from 'assets/images/icons/closeIcon.svg'
import Input from '../index';

export interface Field {
    name: string
    label: string
    placeholder: string
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
    
    const [lines, setLines] = useState(defaultValue)
    const inputRef = useRef({ value: defaultValue })
    const refs = useRef<HTMLInputElement[]>([ defaultValue ])

    useEffect(() => {

        registerField({
            name: fieldName,
            ref: refs.current,
            path: 'value'
        });
    }, [fieldName, registerField])

    const updateLines = (newLines: any) => {
        inputRef.current.value = newLines;
        setLines(newLines);
    }

    const addLine = () => {
        updateLines([...lines, newItem ]);
    }

    const removeLine = (index: number) => {
        const newLines = lines.filter((item: any, i: number) => i !== index);
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

    const addRefItem = (ref: any) => {
        if (!!ref && !refs.current.includes(ref)) {
            console.log(ref.value)
            refs.current.push(ref)
        }
        
    }

    return (         
        <>
            { lines.map((line: any, index: number) => (
                <Item key={index}>
                    { fields.map((field, indexField) => (
                        <InputBlock key={indexField}>
                            <label htmlFor={name}>{error ? error : field.label}</label>
                            <input
                                ref={addRefItem}
                                name={field.name}
                                value={line[field.name]}
                                placeholder={field.placeholder}
                                onChange={e => handleChange(field.name, e.target.value, index)}
                            />
                        </InputBlock>
                    )) }
                    <Delete>
                        <img src={closeIcon} alt="Excluir Ip" onClick={() => removeLine(index)} />
                    </Delete>
                </Item>
            )) }
        </>
            
    );
};

export default forwardRef(MultiInputs);