import React, { useEffect, useState } from 'react'

import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import PatrimonyItem, { Patrimony } from '../../components/PatrimonyItem'
import Select from '../../components/Select'

import api from '../../services/api'

import { Container, Search, Pagination, Pages, Page } from './styled'

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
    const limit = 5
    const [pages, setPages] = useState([0])
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        getDataOwner()
        getDataSector()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {

        getDataPatrimony()
       // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    useEffect(() => {
        const setPagination = () => {
            console.log('total: ' + total)
            const totalPages = Math.ceil(total / limit)
            console.log(totalPages)
            const arrayPages = []
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i)
            }
            setPages(arrayPages)
        }

        setPagination()
    }, [total])

    

    async function getDataPatrimony() {
        const response = await api.get(`patrimonies?page=${currentPage}&limit=${limit}`)
        console.log('header: ')        
        setPatrimonies(response.data)
        setTotal(response.headers['x-total-count'] || 0)
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
        <Container>
            <PageHeader
                title="O que procura ?"
                linkPrev="/"
                titleStyle={{margin: "5rem auto", justifyContent: "flex-start" }}
            />

            <Search>
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

            </Search>
            
            {patrimonies && patrimonies.map((patrimony: Patrimony) => {
                return <PatrimonyItem
                key={patrimony.id}
                patrimony={patrimony}
                />
                }
            )}
            

            <Pagination>
                
                <Pages>
                    
                    <Page>Anterior</Page>
                    {pages.map((page) => {
                        return <Page key={page} onClick={() => setCurrentPage(page)} >{page}</Page>
                    })}
                    <Page>Próxima</Page>
                    
                </Pages>
            </Pagination>
        </Container>
        
    )
}

export default PatrimonyList