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
    const [patrimonies, setPatrimonies] = useState([])
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(5)
    const [pages, setPages] = useState([0])
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        getDataOwner()
        getDataSector()
        getDataPatrimony()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, total])

    async function getDataPatrimony() {
        const response = await api.get(`patrimonies?page=${currentPage}&limit=${limit}`)        
        const datas = response.data
        const list = datas.map((data: any) => {
            return {
                id: data.id,
                patrimony: data.patrimony,
                model: data.model,
                ownerName: data.owner_name,
                sectorName: data.sector_name,
                typeName: data.type_name,
                ips: data.ips
            }
        })
        setPatrimonies(list)
        setPagination(response.data.length)
    }

    const setPagination = (t: number) => {
        setTotal(t)
        const totalPages = Math.ceil(total / limit)
        const arrayPages = []
        for (let i = 0; i <= totalPages; i++) {
            arrayPages.push(i)
        }
        setPages(arrayPages)
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
            {patrimonies && patrimonies.map((patrimony: Patrimony) => {
                return <PatrimonyItem
                key={patrimony.id}
                patrimony={patrimony}
                />
                }
            )}

            <div className="pagination-block">
                <div>Qtd: {total} </div>
                <div>
                    <button>
                        <div>Previous</div>
                        {pages.map((page,) => {
                            return <div key={page} onClick={() => setCurrentPage(page)} >{page}</div>
                        })}
                        <div>Next</div>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default PatrimonyList