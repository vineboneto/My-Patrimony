import React from 'react'
import Input from '../Input'

import './styles.css'

interface IpItemsProps {
    ipItem: {
        ip: string,
        mask: string,
        gateway: string
    }
    onIpChange: (ip: string) => void
    onMaskChange: (mask: string) => void
    onGatewayChange: (gateway: string) => void
}

const IpItems: React.FC<IpItemsProps> = ({ ipItem, onIpChange, onMaskChange, onGatewayChange }) => {
    
    return (
        <div className="ip-items">
            <Input 
                name="ip"
                label="Ip"
                value={ipItem.ip}
                onChange={(e) => onIpChange(e.target.value)}
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}"
                placeholder="192.168.1.55"
                required />
            <Input
                name="mask"
                label="Máscara de sub-rede"
                value={ipItem.mask}
                onChange={(e) => onMaskChange(e.target.value)}
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}"
                placeholder="255.255.255.0"
                required />
            <Input
                name="gateway"
                label="Gateway"
                value={ipItem.gateway}
                onChange={(e) => onGatewayChange(e.target.value)}
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}"
                placeholder="192.168.1.1"
                required />
        </div>
    )
}

export default IpItems