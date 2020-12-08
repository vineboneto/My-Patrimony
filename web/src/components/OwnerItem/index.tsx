import React, { useState } from 'react'

import Input from '../Input'
import Select from '../Select'

import './styles.css'

interface OwnerProps {
    sector: string
    owner: string
    onSectorChange: Function
    onOwnerChange: Function
    // onIsOpenClick: Function
    // isOpen: boolean
}

const OwnerItem: React.FC<OwnerProps> = ({sector, owner, onSectorChange, onOwnerChange}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="owner-item">
            <Select
                name="sector"
                label="Setor"
                value={sector}
                onChange={(e) => onSectorChange(e.target.value)}
                isOpen={isOpen}         
                onIsOpenClick={(isOpen: boolean) => setIsOpen(isOpen)}
                options={[
                    { value: 'UPA', label: 'UPA' }
                ]} />

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