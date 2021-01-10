/**
 * Action types
 */

export enum SectorTypes {
    LOAD_REQUEST = '@sector/LOAD_REQUEST',
    LOAD_SUCCESS = '@sector/LOAD_SUCCESS',
    LOAD_FAILURE = '@sector/LOAD_FAILURE',
    LOAD_CREATE = '@sector/LOAD_CREATE',
    SET_IS_OPEN = '@sector/SET_IS_OPEN'
}

/**
 * Data types
 */

export interface Sector {
    id?: number
    name: string
}

/**
 * Sector types
 */

export interface SectorStates {
    data: Sector[]
    loading: boolean,
    error: boolean,
    dialogIsOpen: boolean
}