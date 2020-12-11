import React from 'react'
import { useLocation } from 'react-router-dom'

interface MonitorFormProps {
    owner: string,
    sector: string
}

const MonitorForm: React.FC<MonitorFormProps> = ({ owner, sector }) => {
    const location = useLocation<MonitorFormProps>()
    owner = location.state.owner
    sector = location.state.sector

    return (
        <div>
            Monitor Form

            <h1>Cavalo: {owner}</h1>
        </div>
    )
}

export default MonitorForm