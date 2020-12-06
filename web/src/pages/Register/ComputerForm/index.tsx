import React, { useState } from 'react'
import Footer from '../../../components/Footer'

import Form from '../../../components/Form'
import Input from '../../../components/Input'
import PageHeader from '../../../components/PageHeader'
import Select from '../../../components/Select'
import Textarea from '../../../components/Textarea'

import './styles.css'

const ComputerForm = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div id="page-computer-form">
            <PageHeader
                title="Cadastre o computador..." />

            <main>
                <Form legend="Proprietário">

                    <div className="owner-item">
                        <Select
                            name="sector"
                            label="Setor"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            options={[
                                { value: 'UPA', label: 'UPA' }
                            ]} />

                        <Input
                            name="owner"
                            label="Usuário"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)} />
                    </div>
                </Form>

                <Form legend="Computador">
                    <div className="computer-item">
                        <Input
                            name="patrimony"
                            label="Patrimônio"
                            value={patrimony}
                            onChange={(e) => setPatrimony(e.target.value)} />
                        <Input
                            name="model"
                            label="Modelo"
                            value={model}
                            onChange={(e) => setModel(e.target.value)} />

                        <Textarea
                            name="description"
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </Form>

                <Footer next="/" />
            </main>
        </div>
    )
}

export default ComputerForm 