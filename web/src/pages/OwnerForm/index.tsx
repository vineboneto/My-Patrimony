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
        
        setSectorId(location.state?.sector)
        setOwner(location.state?.owner)      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])
    

    const handleOwnerChange = (owner: string) => {
        setOwner(owner)
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
                        owner={owner}
                        onOwnerChange={handleOwnerChange}
                        isOpen={isOpen}
                        
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