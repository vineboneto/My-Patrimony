import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'

import PageHeader from '../../components/PageHeader'
import PatrimonyItem from '../../components/PatrimonyItem'
import Select from '../../components/Select'
import api from '../../services/api'

import './styles.css'



const PatrimonyList: React.FC = () => {

    const [owner, setOwner] = useState('')
    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [sector, setSector] = useState('')
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: ''}
    ])
    const [patrimony, setPatrimony] = useState('')


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
        <div id="page-patrimony-list">
            <PageHeader
                title="O que procura ?"
                linkPrev="/"
            />

            <div className="search-block">
                    <Select
                        name="owner"
                        label="Proprietário"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        options={optionsOwner}
                    />

                    <Select
                        name="sector"
                        label="Setor"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        options={optionsSector}
                    />

                    <Input
                        name="patrimony"
                        label="Patrimônio"
                        value={patrimony}
                        onChange={(e) => setPatrimony(e.target.value)}
                    />

            </div>

            
                <PatrimonyItem
                    owner="Viniicus Gazolla Boneto"
                    sector="UPA"
                    info={{ type: 'Computador', patrimony: '666', model: 'Dell', ips: ['192.168.1.54', '192.168.2.54'] }} />

                        
                <PatrimonyItem
                    owner="Viniicus Gazolla Boneto"
                    sector="UPA"
                    info={{ type: 'Computador', patrimony: '666', model: 'Dell', ips: ['192.168.1.54', '192.168.2.54'] }} />
                
                <PatrimonyItem
                    owner="Viniicus Gazolla Boneto"
                    sector="UPA"
                    info={{ type: 'Computador', patrimony: '666', model: 'Dell',}} />
            
                

        </div>
        
    )
}

export default PatrimonyList