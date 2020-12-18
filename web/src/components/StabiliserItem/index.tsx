import React from 'react'

import Input from '../Input'
import Textarea from '../Textarea'

import './styles.css'

interface StabiliserItemProps {
    stabiliserProps: {
        patrimony: string
        model: string
        description: string
    }
    onChangePatrimony: (patrimony: string) => void
    onChangeModel: (model: string) => void
    onChangeDescription: (description: string) => void
}

const StabiliserItem: React.FC<StabiliserItemProps> =({ stabiliserProps, onChangePatrimony, onChangeModel, onChangeDescription }) => {
    return (
        <div className="stabiliser-block">
            <Input
                name="patrimony"
                label="Patrimônio"
                value={stabiliserProps.patrimony}
                onChange={(e) => onChangePatrimony(e.target.value)}
            />
            <Input
                name="model"
                label="Modelo"
                value={stabiliserProps.model}
                onChange={(e) => onChangeModel(e.target.value)}
            />
            <Textarea
                name="description"
                label="Descrição"
                value={stabiliserProps.description}
                onChange={(e) => onChangeDescription(e.target.value)}
            />
        </div>
    )
}

export default StabiliserItem