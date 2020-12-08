import React, { useState } from 'react'

import Input from '../Input'

import './styles.css'

interface DialogProps {
    isOpen: boolean
    onClose: Function
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
    const [sector, setSector] = useState('')

    return (
        <div>
        {isOpen === true &&
        <div className="dialog-block" role="dialog" tabIndex={-1}  >
            
                <form className="dialog-content">
                    <Input
                        name="sector"
                        label="Novo Setor"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)} />

                    <footer>
                        <button type="button" className="save-dialog">Salvar</button>
                        <button 
                            type="button" 
                            className="close-dialog" 
                            onClick={() => onClose(false)}>
                                Fechar
                        </button>
                    </footer>
                </form>
                </div>
        }
        </div>
            
    )
}

export default Dialog