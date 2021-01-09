import React, { useState } from 'react'

import Collapse from 'components/Collapse'
import Form from 'components/Form'
import IpItems from 'components/IpItem'

import { ButtonCollapse } from './styled'

const CollapseIps = () => {

    const [ipItems, setIpItems] = useState([
        { id: '', ip: '', mask: '', gateway: '' }
    ])

    function setIpItemsValue(position: Number, field: string, value: string) {
        const updateIpItems = ipItems.map((ipItem, index) => {
            if (index === position) {
                return { ...ipItem, [field]: value }
            }
            return ipItem
        })
        setIpItems(updateIpItems)
    }

    const addNewIpItem = () => {
        setIpItems([
            ...ipItems,
            { id: '', ip: '', mask: '', gateway: '' }
        ])
    }

    return (
        <>
            <ButtonCollapse onClick={(e) => setIsOpenIp(!isOpenIp)}>
                            Adicionar Ip
                        </ButtonCollapse>

            <Collapse isOpen={isOpenIp}>
                <Form 
                    legend="Ips"
                    clickButton={addNewIpItem}
                    labelButton="+ Novo Ip">

                    
                    
                    {ipItems.map((ipItem, index) => {
                        return (
                            <IpItems
                                key={index}
                                ipItem={ipItem}
                                onIpChange={(ipValue: string) => setIpItemsValue(index, 'ip', ipValue) }
                                onMaskChange={(maskValue: string) => setIpItemsValue(index, 'mask', maskValue)} 
                                onGatewayChange={(gatewayValue: string) => setIpItemsValue(index, 'gateway', gatewayValue)} />
                        )
                    })}
                    
                </Form>
            </Collapse>
        </>
    )
}