import React, { useEffect, useState } from 'react'
import Collapse from '../../components/Collapse'
import Select from '../../components/Select'

import api from '../../services/api'

const Test: React.FC = () => {

    const [value, setValue] = useState('')
    const [sectors, setSectors] = useState([
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
        setSectors(options)
    }

    
    return (
        <div>
            <Select
                name="sector"
                label="Setores"
                options={sectors}
                value={value}
                onChange={(e) => {
                    console.log(e.target.value)
                    setValue(e.target.value)
                }}
             />
            <Collapse
                title="Test">
                <p>Texto de teste</p>
            </Collapse>
        </div>
        
    )


    
}

export default Test