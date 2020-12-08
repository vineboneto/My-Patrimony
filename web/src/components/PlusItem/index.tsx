import React from 'react'

import Dialog from '../Dialog'

import plusIcon from '../../assets/images/icons/plusIcon.svg'

import './styles.css'

interface PlusProps {
    isOpen: boolean
    onIsOpenClick: Function
}

const PlusItem: React.FC<PlusProps> = ({ isOpen, onIsOpenClick }) => {
    return (
        <div className="plusSector">
            <button 
                className="plusSector"
                onClick={(e) => {
                    e.preventDefault()
                    onIsOpenClick(true)
                }}>
                    
                <img src={plusIcon} alt="Novo Setor" />
                
            </button>
            <Dialog 
                isOpen={isOpen}
                onClose={(isOpen: boolean) => onIsOpenClick(isOpen)}/>
        </div>
    )
}

export default PlusItem