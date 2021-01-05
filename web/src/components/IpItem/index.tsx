import React from 'react'
import Input from '../Input'

import { Item } from './styled'

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
        <Item>
            <Input 
                name="ip"
                label="Ip"
                value={ipItem.ip}
                onChange={(e) =>  onIpChange(e.target.value)}
                placeholder="192.168.1.55"
                />
            <Input
                name="mask"
                label="Máscara de sub-rede"
                value={ipItem.mask}
                onChange={(e) => onMaskChange(e.target.value)}
                placeholder="255.255.255.0"
                />
            <Input
                name="gateway"
                label="Gateway"
                value={ipItem.gateway}
                onChange={(e) => onGatewayChange(e.target.value)}
                placeholder="192.168.1.1"
                />
        </Item>
    )
}

export default IpItems