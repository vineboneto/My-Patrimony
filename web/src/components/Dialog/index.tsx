import React, { useState } from 'react'

import Input from '../Input'
import closeIcon from '../../assets/images/icons/closeIcon.svg'

import './styles.css'

interface DialogProps {
    isOpen: boolean
    onClose: Function
    onCloseFocus: Function
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, onCloseFocus }) => {
    const [sector, setSector] = useState('')

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
                        <img src={closeIcon} alt="Fechar"/>
                    </button>
                    <Input
                        name="sector"
                        label="Novo Setor"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)} />
                    
                    <button type="button" className="save-dialog">Salvar</button>
                </div>
            </div>
        }
        </div>
            
    )
}

export default Dialog