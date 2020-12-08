import React from 'react'
import Input from '../Input'

import './styles.css'

interface IpItemsProps {
    ipItem: {
        ip: string,
        mask: string,
        gateway: string
    }
    onIpChange: Function
    onMaskChange: Function
    onGatewayChange: Function
}

const IpItems: React.FC<IpItemsProps> = ({ ipItem, onIpChange, onMaskChange, onGatewayChange }) => {
    
    return (
        <div className="ip-items">
            <Input 
                name="ip"
                label="Ip"
                value={ipItem.ip}
                onChange={(e) => onIpChange(e.target.value)}/>
            <Input
                name="mask"
                label="Máscara de sub-rede"
                value={ipItem.mask}
                onChange={(e) => onMaskChange(e.target.value)} />
            <Input
                name="gateway"
                label="Gateway"
                value={ipItem.gateway}
                onChange={(e) => onGatewayChange(e.target.value)} />
        </div>
    )
}

export default IpItems