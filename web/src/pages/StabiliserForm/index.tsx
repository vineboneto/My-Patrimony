import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Form from '../../components/Form'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import StabiliserItem from '../../components/StabiliserItem'

import './styles.css'

interface OwnerProps {
    owner: string
    sector: string
}

const StabiliserForm: React.FC = () => {
    const location = useLocation<OwnerProps>()
    const [owner, setOwner] = useState('')
    const [sector, setSector] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setOwner(location.state.owner)
        setSector(location.state.sector)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="page-stabiliser-form">
            <PageHeader
                title="Cadastre o estabilizador..."
                linkPrev={{
                    pathname: '/printer-register',
                    state: { owner, sector }
                }} 
            />

            <Main>
                <Form
                    legend="Proprietário">
                    <OwnerItem
                        owner={owner}
                        sector={sector}
                        readOnly={true}
                    />
                </Form>
                <Form
                    legend="Estabilizador">
                    <StabiliserItem
                        stabiliserProps={{ patrimony, model, description }}
                        onChangePatrimony={(patrimony: string) => setPatrimony(patrimony)}
                        onChangeModel={(model: string) => setModel(model)}
                        onChangeDescription={(description: string) => setDescription(description)}
                    />

                </Form>
            </Main>
        </div>
    )
}

export default StabiliserForm