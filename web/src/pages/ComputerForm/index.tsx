import React, { useState, FormEvent } from 'react'

import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Textarea from '../../components/Textarea'

import './styles.css'

export default function ComputerForm() {

    const [sector, setSector] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [user, setUser] = useState('')
    const [description, setDescription] = useState('')
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
    ])
    const [monitorItems, setMonitorItems] = useState([
        { patrimony: '', model: '', inch: '' }
    ])
    const [printerItem, setPrinterItem] = useState(
        { patrimony: '', model: '', ip: '', mask: '', gateway: '' }
    )

    function setIpItemsValue(position: Number, field: string, value: string) {
        const updateIpItems = ipItems.map((ipItem, index) => {
            if (index === position) {
                return { ...ipItem, [field]: value }
            }
            return ipItem
        })
        setIpItems(updateIpItems)
    }

    function setMonitorItemsValue(position: Number, field: string, value: string) {
        const updateMonitorItems = monitorItems.map((monitorItem, index) => {
            if (index === position) {
                return { ...monitorItem, [field]: value }
            }
            return monitorItem
        })
        setMonitorItems(updateMonitorItems)
    }

    function handleCreatePatrimony(e: FormEvent) {
        e.preventDefault()

    }

    return (
        <div id="page-computer-form" className="container">
            <PageHeader 
                title={"Meu patrimônio"} />

            <main>

                <form onSubmit={handleCreatePatrimony}>
                    <fieldset>
                        <legend>Computador</legend>
                        <div className="computer-items">
                            <Input 
                                name="sector"
                                label="Setor"
                                value={sector}
                                onChange={(e) => setSector(e.target.value)} />
                            <Input 
                                name="patrimony"
                                label="Patrimônio"
                                value={patrimony}
                                onChange={(e) => setPatrimony(e.target.value)} />
                            <Input 
                                name="sector"
                                label="Usuário"
                                value={user}
                                onChange={(e) => setUser(e.target.value)} />
                            <Textarea 
                                name="description"
                                label="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        
                        <div className="fieldset-computer-ip">
                            <div className="legend">
                                Ips
                                <button>
                                    + Novo Ip
                                </button>
                            </div>
                            {ipItems.map((ipItem, index) => {
                                return (
                                    <div key={index} className="ip-items">
                                        <Input 
                                            name="ip"
                                            label="Ip"
                                            value={ipItem.ip}
                                            onChange={(e) => setIpItemsValue(index, 'ip', e.target.value)}/>
                                        <Input
                                            name="mask"
                                            label="Máscara de sub-rede"
                                            value={ipItem.mask}
                                            onChange={(e) => setIpItemsValue(index, 'mask', e.target.value)} />
                                        <Input
                                            name="gateway"
                                            label="Gateway"
                                            value={ipItem.gateway}
                                            onChange={(e) => setIpItemsValue(index, 'gateway', e.target.value)} />
                                    </div>
                                )
                            })}
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="legend">
                            Monitores
                            <button>
                                + Novo Monitor
                            </button>
                        </div>
                        {monitorItems.map((monitorItem, index) => {
                            return (
                                <div key={index} className="monitor-items">
                                    <Input
                                        name="patrimonyMonitor"
                                        label="Patrimônio"
                                        value={monitorItem.patrimony}
                                        onChange={(e) => setMonitorItemsValue(index, 'patrimony', e.target.value)} />
                                    <Input
                                        name="modelMonitor"
                                        label="Modelo"
                                        value={monitorItem.model}
                                        onChange={(e) => setMonitorItemsValue(index, 'model', e.target.value)} />
                                    <Input
                                        name="inch"
                                        label="Polegadas"
                                        value={monitorItem.inch}
                                        onChange={(e) => setMonitorItemsValue(index, 'inch', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>

                    <fieldset>
                        <legend>Impressoras</legend>

                        <div className="printer-item">
                            <Input
                                name={printerItem.patrimony}
                                label="Patrimônio"
                                value={printerItem.patrimony}
                                onChange={(e) => setPrinterItem({ ...printerItem, patrimony: e.target.value })} />
                            <Input
                                name={printerItem.model}
                                label="Modelo"
                                value={printerItem.model}
                                onChange={(e) => setPrinterItem({ ...printerItem, model: e.target.value })} />
                            <Input
                                name={printerItem.ip}
                                label="Ip"
                                value={printerItem.ip}
                                onChange={(e) => setPrinterItem({ ...printerItem, ip: e.target.value })} />
                            <Input
                                name={printerItem.mask}
                                label="Máscara de sub-rede"
                                value={printerItem.mask}
                                onChange={(e) => setPrinterItem({ ...printerItem, mask: e.target.value })} />
                            <Input
                                name={printerItem.gateway}
                                label="Gateway"
                                value={printerItem.gateway}
                                onChange={(e) => setPrinterItem({ ...printerItem, gateway: e.target.value })} />
                        </div>
                    </fieldset>

                    <footer>
                        <button>
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>

            </main>
        </div>
    )
}