import React, { useEffect, useState } from 'react'

import Input from '../Input'
import Select from '../Select'

import api from '../../services/api'

import './styles.css'

interface OwnerProps {
    sector: string
    owner: string
    onSectorChange: Function
    onOwnerChange: Function
}

const OwnerItem: React.FC<OwnerProps> = ({ sector, owner, onSectorChange, onOwnerChange}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState([
        { value: '', label: '' }
    ])

    useEffect(() => {
        getDataSector()
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
        setOptions(options)
    }

    return (
        <div className="owner-item">
            <Select
                name="sector"
                label="Setor"
                value={sector}
                isOpen={isOpen}
                onChange={(e) => onSectorChange(e.target.value)}
                onIsOpenClick={(isOpen: boolean) => setIsOpen(isOpen)}
                options={options} />

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