import React, { useEffect, useState } from 'react'


import PageHeader from '../../components/PageHeader'
import Form from '../../components/Form'
import Main from '../../components/Main'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'

const PatrimonyForm: React.FC = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')

    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])

    useEffect(() => {
        getDataOwner()
        getDataSector()
    }, [])

    async function getDataOwner() {
        const response = await api.get('owners')
        const datas = response.data
        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name,
                sectorId: data.sector_id
            }
        })
        setOptionsOwner(options)
    }

    async function getDataSector() {
        const response =  await api.get('sectors')
        const datas = response.data
        
        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOptionsSector(options)
    }



    return (
        <div id="page-patrimony-form">
            <PageHeader
                title="Novo Patrimônio"
                linkPrev="/" />

                <Main>
                    <Form
                        legend="Proprietário">
                        <div className="owner-block">
                            <Select
                                name="owner"
                                label="Proprietário"
                                options={optionsOwner}
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />

                            <Select
                                name="sector"
                                label="Setor"
                                options={optionsSector}
                                value={sector}
                                onChange={(e) => setSector(e.target.value)} />
                        </div>
                    </Form>

                    
                </Main>
        </div>
    )
}

export default PatrimonyForm