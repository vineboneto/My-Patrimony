import React, { MouseEvent, useState } from 'react'

import Input from '../Input'
import closeIcon from '../../assets/images/icons/closeIcon.svg'

import api from '../../services/api'

import './styles.css'

interface DialogProps {
    isOpen: boolean
    onClose: Function
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
    const [sector, setSector] = useState('')


    async function handleCreateSector(e: MouseEvent) {
        e.preventDefault()

        api.post('sectors', {
            name: sector
        }).then(() => {
            alert('Setor Cadastrado!!')
            onClose(false)
        }).catch(() => {
            alert('Erro ao cadastrar!!!')
        })
    }


    return (
        <div>
        {isOpen === true &&
            <div className="dialog-block" role="dialog" tabIndex={-1}  >
                
                <div className="dialog-content">
                    <button 
                        type="button" 
                        className="close-dialog" 
                        onClick={() => onClose(false)}
                        >
                        Novo Setor
                        <img src={closeIcon} alt="Fechar"/>
                    </button>
                    <Input
                        name="sector"
                        label=""
                        value={sector}
                        onChange={(e) => setSector(e.target.value)} />
                    
                    <button 
                        type="submit"
                        onClick={handleCreateSector}
                        className="save-dialog">
                            Salvar
                    </button>
                </div>
            </div>
        }
        </div>
            
    )
}

export default Dialog