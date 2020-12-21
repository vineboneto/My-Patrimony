import React, { useState } from 'react'
import Input from '../../components/Input'

import PageHeader from '../../components/PageHeader'
import PatrimonyItem from '../../components/PatrimonyItem'
import Select from '../../components/Select'

import './styles.css'

const PatrimonyList: React.FC = () => {

    const [owner, setOwner] = useState('')
    const [sector, setSector] = useState('')
    const [patrimony, setPatrimony] = useState('')

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
                        options={[
                            { value: '1', label: 'Vinicius Boneto' }
                        ]}
                    />

                    <Select
                        name="sector"
                        label="Setor"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        options={[
                            { value: '1', label: 'UPA' }
                        ]}
                    />

                    <Input
                        name="patrimony"
                        label="Patrimônio"
                        value={patrimony}
                        onChange={(e) => setPatrimony(e.target.value)}
                    />

                </div>

                
                <PatrimonyItem
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
                    info={{ type: 'Computador', patrimony: '666', model: 'Dell',}} />
                

        </div>
        
    )
}

export default PatrimonyList