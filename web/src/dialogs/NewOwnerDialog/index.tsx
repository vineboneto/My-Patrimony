import React, { MouseEvent, useEffect, useState } from 'react'

import Input from '../../components/Input'
import closeIcon from '../../assets/images/icons/closeIcon.svg'
import plusIcon from '../../assets/images/icons/plusIcon.svg'

import api from '../../services/api'

import './styles.css'
import NewSectorDialog from '../NewSectorDialog'

interface NewOwnerDialogProps {
    isOpen: boolean
    title: string
    onClose: (isOpen: boolean) => void
}

const NewOwnerDialog: React.FC<NewOwnerDialogProps> = ({ isOpen, title, onClose }) => {
    const [owner, setOwner] = useState('')
    const [sector, setSector] = useState('')
    const [isOpenSector, setIsOpenSector] = useState(false)
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
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

    useEffect(() => {
        getDataSector()
    }, [isOpenSector])

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()

        api.post('owners', {
            name: owner,
            sector_id: sector
        }).then(() => {
            setOwner("")
            alert('Proprietário Cadastrado!!')
            onClose(false)
        }).catch((err) => {
            alert('Erro ao cadastrar!!!')
            console.log(err)
        })
    }

    return (
        <div className="dialog-new-owner">
        {isOpen === true &&
            <div className="dialog-block" role="dialog" tabIndex={-1}  >
                
                <div className="dialog-content">
                    <button 
                        type="button" 
                        className="close-dialog" 
                        onClick={() => onClose(false)}
                    >
                        {title}
                        <img src={closeIcon} alt="Fechar"/>
                    </button>
                    <Input
                        name="sector"
                        label="Nome"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)} />

                <div className="select-block" >
                    <label htmlFor="sector">

                        Setor
                        <button 
                            className="plusSector"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsOpenSector(true)
                        }}>      
                            <img src={plusIcon} alt="Novo Setor" />
                        </button>


                        <NewSectorDialog
                            isOpen={isOpenSector}
                            onClose={(isOpen: boolean) => setIsOpenSector(isOpen)}/>
                    </label>
                
                        <select 
                            value={sector}
                            id="sector"  
                            onChange={(e) => setSector(e.target.value)}>
                            <option value="" disabled hidden>Selecione o setor</option>

                            {optionsSector.map(option => {
                                return <option key={option.value} value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>

                    
                    
                    <button 
                        type="submit"
                        onClick={handleCreateOwner}
                        className="save-dialog">
                            Salvar
                    </button>
                </div>
            </div>
        }
        </div>
            
    )
}

export default NewOwnerDialog