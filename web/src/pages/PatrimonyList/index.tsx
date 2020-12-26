import React, { useEffect, useState } from 'react'

import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import PatrimonyItem, { Patrimony } from '../../components/PatrimonyItem'
import Select from '../../components/Select'
import api from '../../services/api'

import './styles.css'


const PatrimonyList: React.FC = () => {
    // Filters
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [sector, setSector] = useState('')
    // Selects
    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: ''}
    ])
    // List
    const [computers, setComputers] = useState([])

    useEffect(() => {
        getDataOwner()
        getDataSector()
        listComputers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function listComputers() {
        const response = await api.get('computer-list')
        const datas = response.data
        const list = datas.map((data: any) => {
            return {
                patrimonyId: data.computer_id,
                ownerId: data.owner_id,
                sectorId: data.sector_id,
                ownerName: data.owner_name,
                sectorName: data.sector_name,
                info: {
                    type: 'Computador',
                    patrimony: data.patrimony,
                    model: data.model,
                    description: data.description,
                    ips: data.ips
                }
            }
        })

        setComputers(list)
    }

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

                {}
            </div>
            {computers && computers.map((computer: Patrimony) => {
                return <PatrimonyItem
                            key={computer.patrimonyId} 
                            patrimony={computer}
                        />
                }
            )}
        </div>
        
    )
}

export default PatrimonyList