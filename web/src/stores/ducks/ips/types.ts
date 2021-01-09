/**
 * Action types
 */

export enum IpsTypes {
    LOAD_REQUEST = '@ips/LOAD_REQUEST',
    LOAD_SUCCESS = '@ips/LOAD_SUCCESS',
    LOAD_FAILURE = '@ips/LOAD_FAILURE',
    SET_IS_OPEN = '@ips/SET_IS_OPEN'
}

/**
 * Data types
 */

export interface Ip {
    id: number
    ip: string
    mask: string
    gateway: string
}

/**
 * Sector types
 */

export interface IpState {
    data: Ip[]
    loading: boolean,
    error: boolean,
    url: string,
    dialogIsOpen: boolean
}