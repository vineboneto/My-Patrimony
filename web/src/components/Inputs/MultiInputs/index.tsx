import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Scope } from '@unform/core'

import Input from '../Input'

import closeIcon from 'assets/images/icons/closeIcon.svg'
import { Delete } from './styled'

export interface MultiInputsHandles {
    addLine: () => void
}

export interface Field {
    name: string
    label: string
    placeholder: string
}

interface MultiInputsProps {
    name: string
    fields: Field[]
    itemData: {}
}

const MultiInputs: React.ForwardRefRenderFunction<MultiInputsHandles, MultiInputsProps> =
    ({ name, fields, itemData }, ref) => {

        const [lines, setLines] = useState([
            itemData
        ])

        const addLine = () => {
            setLines([
                ...lines,
                itemData
            ])
        }

        useImperativeHandle(ref, () => {
            return {
                addLine,
            }
        })

        const removeLine = (index: number) => {
            const __lines__ = lines.splice(index, 1)
            setLines(__lines__)
        }

        return (
            <>
                {
                    lines?.map((line, index) =>
                        <Scope key={index} path={`${name}[${index}]`}>
                            {
                                fields.map((field, indexField) =>
                                    <Input
                                        key={indexField}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                    />
                                )
                            }
                            <Delete type="button" onClick={() => removeLine(index)}>
                                <img src={closeIcon} alt="Excluir Ip" />
                            </Delete>
                        </Scope>
                    )
                }
            </>
        )
    }

export default forwardRef(MultiInputs)
