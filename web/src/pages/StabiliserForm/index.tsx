import React, { MouseEvent, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Footer from '../../components/Footer'
import Form from '../../components/Form'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import StabiliserItem from '../../components/StabiliserItem'

import printerIcon from '../../assets/images/icons/printerIcon.svg'
import homeIcon from '../../assets/images/icons/homeIcon.svg'

import './styles.css'
import api from '../../services/api'

interface OwnerProps {
    owner: string
    sector: string
}

const StabiliserForm: React.FC = () => {
    const location = useLocation<OwnerProps>()
    const history = useHistory()
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

    async function handleCreateStabiliser(e: MouseEvent) {
        api.post('/stabilisers', {
            patrimony,
            model,
            description,
            owner_id: parseInt(owner)
        }).then(() =>{
            alert('Estabilizador Cadastrado!')
            history.push('/')
        }).catch(() => alert('Erro ao realizar cadastro!'))
    }

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

                <Footer
                    toNext={{
                        pathname: '/'
                    }}
                    toPrev={{
                        pathname: '/printer-register',
                        state: { owner, sector }
                    }}
                    iconPrev={printerIcon}
                    iconNext={homeIcon} 
                    labelButtonSave="Salvar Estabilizador"
                    handleButton={(e) => handleCreateStabiliser(e)}
                />
            </Main>
        </div>
    )
}

export default StabiliserForm