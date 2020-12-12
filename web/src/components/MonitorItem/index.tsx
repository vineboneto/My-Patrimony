import React from 'react'

import Input from '../Input'
import Textarea from '../Textarea'

import './styles.css'

interface MonitorItemProps {
    monitorItem: {
        patrimony: string
        model: string
        inch: string
        description: string
    }
    onChangePatrimony: (patrimony: string) => void
    onChangeModel: (model: string) => void
    onChangeInch: (inch: string) => void
    onChangeDescription: (description: string) =>  void
}

const MonitorItem: React.FC<MonitorItemProps> = ({ monitorItem, onChangeDescription, onChangeInch, onChangeModel, onChangePatrimony }) => {
    return (
        <div className="monitor-item">
            <Input
                name="patrimony"
                label="Patrimônio"
                value={monitorItem.patrimony}
                onChange={(e) => onChangePatrimony(e.target.value)} />
            <Input
                name="model"
                label="Modelo"
                value={monitorItem.model}
                onChange={(e) => onChangeModel(e.target.value)} />
            <Input
                name="inch"
                label="Polegadas"
                value={monitorItem.inch}
                onChange={(e) => onChangeInch(e.target.value)} />

            <Textarea
                name="description"
                label="Descrição"
                value={monitorItem.description}
                onChange={(e) => onChangeDescription(e.target.value)} />
        </div>       
    )
}

export default MonitorItem