import React, { ChangeEvent, SelectHTMLAttributes, useEffect, useState } from 'react'

import api from '../../services/api'

import './styles.css'

interface OwnerProps extends SelectHTMLAttributes<HTMLSelectElement> {
    owner: string
    sector?: string
    readOnly?: boolean
    onOwnerChange?: (owner: string) => void
    onSectorChange?: (sector: string) => void
    isOpen?: boolean
}

const OwnerItem: React.FC<OwnerProps> = ({ isOpen, owner, sector, onOwnerChange, onSectorChange, readOnly = false, ...rest}) => {

    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
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
                label: data.name,
                sectorId: data.sector_id
            }
        })
        setOptionsOwner(options)
    }

    const handleOwnerChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onOwnerChange !== undefined) {
            onOwnerChange(e.target.value)
        }

        const owner = e.target.value
        const sectorId = optionsOwner.find((ownerId) => {
            if (ownerId.value.toString() === owner) {
                return ownerId
            }
            return ''
        })
        console.log(owner)
        if (onSectorChange) onSectorChange(sectorId?.sectorId || '')
    }

    return (
        <div className="owner-item">

            <div className="select-block" >
                <label htmlFor="owner">
                    Nome
                </label>
                
                <select 
                    value={owner} 
                    id="owner" 
                    onChange={handleOwnerChange} 
                    disabled={readOnly}
                    {...rest}
                >
                    <option value="" disabled hidden>Selecione o Proprietário</option>

                    {optionsOwner.map((option: any) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                </select>
            </div>

            <div className="select-block" >
                <label htmlFor="sector">Setor</label>
                
                <select 
                    value={sector}
                    id="sector"  
                    disabled={true}
                    {...rest}>
                    <option value="" disabled hidden>Selecione o setor</option>

                    {optionsSector.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                </select>
            </div>
        </div>
    )
}

export default OwnerItem