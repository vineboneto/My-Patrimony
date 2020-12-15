import React, { SelectHTMLAttributes, useEffect, useState } from 'react'

import Input from '../Input'
import Dialog from '../../components/Dialog'

import plusIcon from '../../assets/images/icons/plusIcon.svg'

import api from '../../services/api'

import './styles.css'

interface OwnerProps extends SelectHTMLAttributes<HTMLSelectElement> {
    sector: string
    owner: string
    readOnly?: boolean
    onOwnerChange: (owner: string) => void
}

const OwnerItem: React.FC<OwnerProps> = ({ sector, owner, onOwnerChange, readOnly = false, ...rest}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    const [optionsOwner, setOpitonsOwner] = useState([
        { value: '', label: '' }
    ])

    useEffect(() => {
        getDataSector()
        getDataOwner()
    }, [isOpen])
    

    async function getDataSector() {
        const response =  await api.get('sectors')
        const datas = response.data
        

        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOptionsSector(options)
    }

    async function getDataOwner() {
        const response = await api.get('owners')
        const datas = response.data
        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOpitonsOwner(options)
    }

    return (
        <div className="owner-item">
            <div className="select-block" >
                <label htmlFor="sector">

                    Setor
                    <button 
                        className="plusSector"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsOpen(true)
                    }}>      
                        <img src={plusIcon} alt="Novo Setor" />
                    </button>


                    <Dialog 
                        isOpen={isOpen}
                        onClose={(isOpen: boolean) => setIsOpen(isOpen)}/>
                       
                    
                    
                </label>
                
                <select value="" id="sector" {...rest} disabled={readOnly}>
                    <option value="" disabled hidden>Selecione o setor</option>

                    {optionsSector.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>

            <Input
                name="owner"
                label="Usuário"
                value={owner}
                onChange={(e) => onOwnerChange(e.target.value)}
                disabled={readOnly}
            />
        </div>
    )
}

export default OwnerItem