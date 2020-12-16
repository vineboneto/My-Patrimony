import React, { MouseEvent, useState } from 'react'

import Input from '../../components/Input'
import closeIcon from '../../assets/images/icons/closeIcon.svg'

import api from '../../services/api'

import './styles.css'

interface NewSectorDialogProps {
    isOpen: boolean
    onClose: (isOpen: boolean) => void
}

const NewSectorDialog: React.FC<NewSectorDialogProps> = ({ isOpen, onClose }) => {
    const [value, setValue] = useState('')
    
    async function handleCreateSector(e: MouseEvent) {
        e.preventDefault()

        api.post('sectors', {
            name: value
        }).then(() => {
            setValue("")
            alert('Setor Cadastrado!!')
            onClose(false)
        }).catch(() => {
            alert('Erro ao cadastrar!!!')
        })
    }

    return (
        <div className="dialog-new-sector">
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
                            label="Nome"
                            value={value}
                            onChange={(e) => setValue(e.target.value)} />

                    

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

export default NewSectorDialog