import React, { useCallback } from 'react'

import Collapse from 'components/Collapse'
import Form from 'components/Form'
import IpItems from 'components/IpItem'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { addNewIp, setCollapseIsOpen, setIp } from 'stores/ducks/ips/action'

import { ButtonCollapse } from './styled'

const CollapseIps = () => {

    const ips = useSelector((state: ApplicationState) => state.ips)
    const dispatch = useDispatch()

    function setIpItemsValue(position: Number, field: string, value: string) {
        const updateIpItems = ips.data.map((ipItem, index) => {
            if (index === position) {
                return { ...ipItem, [field]: value }
            }
            return ipItem
        })
        dispatch(setIp(updateIpItems))
    }

    const addNewIpItem = () => {
        dispatch(addNewIp(ips.data))
    }

    const handleOpenCollapse  = useCallback(() => {
        dispatch(setCollapseIsOpen(!ips.collapseIsOpen))
    }, [dispatch, ips.collapseIsOpen])

    return (
        <>
            <ButtonCollapse onClick={handleOpenCollapse}>
                Adicionar Ip
            </ButtonCollapse>

            <Collapse isOpen={ips.collapseIsOpen}>
                <Form 
                    legend="Ips"
                    clickButton={addNewIpItem}
                    labelButton="+ Novo Ip">

                    
                    
                    {ips.data.map((ipItem, index) => {
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

export default CollapseIps