import React from 'react'

interface MonitorFormProps {
    owner: string
    sector: Array<{
        id: number
        name: string
    }>
}

const MonitorForm: React.FC<MonitorFormProps> = ({ owner, sector }) => {
    return (
        <div>
            Monitor Form
        </div>
    )
}

export default MonitorForm