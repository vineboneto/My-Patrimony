import { action } from 'typesafe-actions'
import { Ip, IpsTypes } from './types';

export const setCollapseIsOpen = (isOpen: boolean) => action(IpsTypes.SET_IS_OPEN, { isOpen }) 
export const addNewIp = (ips: Ip[]) => action(IpsTypes.ADD_IP, { ips })
export const setIp = (ips: Ip[]) => action(IpsTypes.SET_IP, {  ips })