import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'

import PageHeader from '../../components/PageHeader'
import PatrimonyItem from '../../components/PatrimonyItem'
import Select from '../../components/Select'
import api from '../../services/api'

import './styles.css'

// interface Ips {
//     ip: string
//     mask: string
//     gateway: string
// }

interface Computer {
    ownerId: number
    ownerName: string
    sectorId: number
    sectorName: string
    computerId: number
    patrimony: string
    model: string
    description: string
    // ips: Ips[]
}



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
    const [computers, setComputers] = useState<Computer[]>()

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
                ownerId: data.owner_id,
                sectorId: data.sector_id,
                ownerName: data.owner_name,
                sectorName: data.sector_name,
                computerId: data.computer_id,
                patrimony: data.patrimony,
                model: data.model,
                description: data.description,
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


                {computers && computers.map((computer: Computer) => {
                    return <PatrimonyItem key={computer.computerId} owner={computer.ownerName} sector={computer.sectorName} 
                        info={{ type: 'Computador', patrimony: computer.patrimony, model: computer.model }} />
                })}
                {/* <PatrimonyItem
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
                    info={{ type: 'Computador', patrimony: '666', model: 'Dell',}} /> */}
            
                

        </div>
        
    )
}

export default PatrimonyList