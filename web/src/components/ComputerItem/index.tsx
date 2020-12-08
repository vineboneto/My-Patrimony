import React from 'react'

import Input from '../Input'
import Textarea from '../Textarea'

import './styles.css'

interface ComputerItemProps {
    computerItem: {
        patrimony: string,
        model: string,
        description: string
    }
    onPatrimonyChange: Function
    onModelChange: Function
    onDescriptionChange: Function
}

const ComputerItem: React.FC<ComputerItemProps> = ({ computerItem, onPatrimonyChange, onModelChange, onDescriptionChange }) => {
    return (
        <div className="computer-item">
            <Input
                name="patrimony"
                label="Patrimônio"
                value={computerItem.patrimony}
                onChange={(e) => onPatrimonyChange(e.target.value)} />
            <Input
                name="model"
                label="Modelo"
                value={computerItem.model}
                onChange={(e) => onModelChange(e.target.value)} />

            <Textarea
                name="description"
                label="Descrição"
                value={computerItem.description}
                onChange={(e) => onDescriptionChange(e.target.value)} />
        </div>
    )
}

export default ComputerItem