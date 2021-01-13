import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useField } from "@unform/core";

import { Ip } from 'pages/PatrimonyForm'
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
    newItem: Ip
}

export interface MultiInputsHandles {
    addLine: () => void
}

const MultiInputs: React.ForwardRefRenderFunction<MultiInputsHandles, MultiInputsProps> = ({ name, fields, newItem }, ref) => {
    const { fieldName, defaultValue, registerField, error } = useField(name);
    
    const [lines, setLines] = useState<Ip[]>([ { ip: '', mask: '', gateway: '' } ]);
    const inputRef = useRef({ value: [] });

    useEffect(() => {

        registerField({
            name: fieldName,
            ref: inputRef.current,
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
        const newLines = lines.filter((item, i: number) => i !== index);
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
                        <img src={closeIcon} alt="Excluir Ip" onClick={() => removeLine(index)} />
                    </Delete>
                </Item>
            )) }
            { error && <p>{error}</p> }
        </>
            
    );
};

export default forwardRef(MultiInputs);