/**
 * Action types
 */

export enum OwnersTypes {
    LOAD_REQUEST = '@owners/LOAD_REQUEST',
    LOAD_SUCCESS = '@owners/LOAD_SUCCESS',
    LOAD_FAILURE = '@owners/LOAD_FAILURE',
    LOAD_CREATE = '@owners/LOAD_CREATE',
    SET_IS_OPEN = '@owners/SET_IS_OPEN'
}

/**
 * Data types
 */

export interface Owner {
    id?: number
    name: string
    sectorId: number
}

/**
 * Sector types
 */

export interface OwnerStates {
    data: Owner[]
    loading: boolean,
    error: boolean,
    dialogIsOpen: boolean
}