import React, { useState } from 'react'

import PageHeader from '../../components/PageHeader'
import Main from '../../components/Main'
import Form from '../../components/Form'
import OwnerItem from '../../components/OwnerItem'
import Footer from '../../components/Footer'

import powerIcon from '../../assets/images/icons/powerIcon.svg'

import './styles.css'

const OwnerForm: React.FC = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')


    return (
        <div id="page-owner-form">
            <PageHeader
                title="Selecine o Proprietário..."
                linkPrev="/" />

            <Main>
                <Form
                    legend="Proprietário" >
                    <OwnerItem
                        sector={sector}
                        owner={owner}
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        onOwnerChange={(owner: string) => setOwner(owner)}
                    />
                </Form>
                <Footer
                    toNext={
                        { 
                            pathname: '/computer-register', state: {
                                 sectorProps: sector, ownerProps: { owner: owner } }
                        }
                    }
                    iconNext={powerIcon}/>
            </Main>
        </div>
    )
}

export default OwnerForm