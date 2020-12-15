import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Main from '../../components/Main'
import Form from '../../components/Form'
import OwnerItem from '../../components/OwnerItem'
import Footer from '../../components/Footer'
import NewOwnerDialog from '../../dialogs/NewOwnerDialog'

import powerIcon from '../../assets/images/icons/powerIcon.svg'

import api from '../../services/api'

import './styles.css'

interface OwnerProps {
    owner: string
    sector: string
}

const OwnerForm: React.FC = () => {
    const location = useLocation<OwnerProps>()
    const [sectorId, setSectorId] = useState('')
    const [owner, setOwner] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setSectorId(location.state.sector)
        setOwner(location.state.owner)
        getDataSector()
        getDataOwner()        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])
    
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    const [optionsOwner, setOpitonsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])

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
        setOpitonsOwner(options)
    }


    const handleOwnerChange = (owner: string) => {
        setOwner(owner)

        const sectorId = optionsOwner.find((ownerId) => {
            if (ownerId.value.toString() === owner) {
                console.log(ownerId.sectorId)
                return ownerId
            }
            return ''
        })

        setSectorId(sectorId?.sectorId || '')
    }
    
    return (
        <div id="page-owner-form">
            <PageHeader
                title="Selecione o Proprietário..."
                linkPrev="/" />

            <Main>
                <Form
                    legend="Proprietário" 
                    labelButton="+ Novo Proprietário"
                    addNew={() => setIsOpen(true)}>
                    <OwnerItem
                        sector={sectorId}
                        owner={owner}
                        onOwnerChange={handleOwnerChange}
                        optionsOwner={optionsOwner}
                        optionsSector={optionsSector}
                    />
                    <NewOwnerDialog 
                        title="Novo Propriétario"
                        isOpen={isOpen}
                        onClose={(isOpen: boolean) => setIsOpen(isOpen)}/>
                </Form>
                <Footer
                    toNext={
                        { 
                            pathname: '/computer-register', state: {
                                owner: owner, sector: sectorId}
                        }
                    }
                    iconNext={powerIcon}/>
            </Main>
        </div>
    )
}

export default OwnerForm