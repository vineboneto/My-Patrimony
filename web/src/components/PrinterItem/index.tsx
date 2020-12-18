import React from 'react'

import Input from '../Input'
import Textarea from '../Textarea'

import './styles.css'

interface PrinterItemProps {
    printerProps: {
        patrimony: string
        model: string
        description: string
    }
    onChangePatrimony: (patrimony: string) => void
    onChangeModel: (model: string) => void
    onChangeDescription: (description: string) => void
}

const PrinterItem: React.FC<PrinterItemProps> = ({ printerProps, onChangePatrimony, onChangeModel, onChangeDescription }) => {
    return (
        <div className="printer-block">
            <Input
                name="patrimony"
                label="Patrimônio"
                value={printerProps.patrimony}
                onChange={(e) => onChangePatrimony(e.target.value)}
            />
            <Input
                name="model"
                label="Modelo"
                value={printerProps.model}
                onChange={(e) => onChangeModel(e.target.value)} 
            />
            <Textarea
                name="description"
                label="Descrição"
                value={printerProps.description}
                onChange={(e) => onChangeDescription(e.target.value)}
            />
        </div>
    )
}

export default PrinterItem