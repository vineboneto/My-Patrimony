import React, { ChangeEvent, SelectHTMLAttributes, useEffect, useState } from 'react'

import api from '../../services/api'

import './styles.css'

interface OwnerProps extends SelectHTMLAttributes<HTMLSelectElement> {
    sector: string
    owner: string
    readOnly?: boolean

    optionsOwner?: Array<{
        value: string,
        label: string,
        sectorId: string
    }>
    optionsSector?: Array<{
        value: string,
        label: string
    }>
    onOwnerChange?: (owner: string) => void
    onSectorChange?: (sector: string) => void
}

const OwnerItem: React.FC<OwnerProps> = ({ sector, owner, onOwnerChange, onSectorChange,
     optionsOwner, optionsSector, readOnly = false, ...rest}) => {

    const [optionsSector2, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    const [optionsOwner2, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])

    useEffect(() => {
        if (optionsOwner === undefined && optionsSector === undefined) {
            
            getDataSector()
            getDataOwner()
        }
    }, [])

    
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


    const handleSectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onSectorChange !== undefined) {
            onSectorChange(e.target.value)
        }
    }

    const handleOwnerChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onOwnerChange !== undefined) {
            onOwnerChange(e.target.value)
        }
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

                    {optionsOwner !== undefined && optionsOwner.map((option: any) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                    {optionsOwner === undefined && optionsOwner2.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>

            <div className="select-block" >
                <label htmlFor="sector">Setor</label>
                
                <select 
                    value={sector}
                    id="sector"  
                    onChange={handleSectorChange}
                    disabled={true}
                    {...rest}>
                    <option value="" disabled hidden>Selecione o setor</option>

                    {optionsSector !== undefined && optionsSector.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                    {optionsSector === undefined && optionsSector2.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default OwnerItem