import React, { SelectHTMLAttributes, useEffect, useState } from 'react'

import Input from '../Input'
import Dialog from '../../components/Dialog'

import plusIcon from '../../assets/images/icons/plusIcon.svg'

// import api from '../../services/api'

import './styles.css'
import api from '../../services/api'

interface OwnerProps extends SelectHTMLAttributes<HTMLSelectElement> {
    sector: string
    owner: string
    onOwnerChange: (owner: string) => void
}

const OwnerItem: React.FC<OwnerProps> = ({ sector, owner, onOwnerChange, ...rest}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState([
        { value: '', label: '' }
    ])

    useEffect(() => {
        getDataSector()
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
        setOptions(options)
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
                
                <select value="" id="sector" {...rest}>
                    <option value="" disabled hidden>Selecione o setor</option>

                    {options.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>

            <Input
                name="owner"
                label="Usuário"
                value={owner}
                onChange={(e) => onOwnerChange(e.target.value)}
                
            />
        </div>
    )
}

export default OwnerItem