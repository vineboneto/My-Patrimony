/**
 * Action types
 */

export enum IpsTypes {
    ADD_IP = '@ips/ADD_NEW_IP',
    SET_IS_OPEN = '@ips/SET_IS_OPEN',
    SET_IP = '@ips/SET_IP',
}

/**
 * Data types
 */

export interface Ip  {
    id: string
    ip: string
    mask: string
    gateway: string
}

/**
 * Sector types
 */

export interface IpState {
    data: Ip[]
    collapseIsOpen: boolean
}