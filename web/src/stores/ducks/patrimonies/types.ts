/**
 * Action types
 */

import { Ip } from "../ips/types";

export enum PatrimonyTypes {
    LOAD_REQUEST = '@patrimonies/LOAD_REQUEST',
    LOAD_SUCCESS = '@patrimonies/LOAD_SUCCESS',
    LOAD_FAILURE = '@patrimonies/LOAD_FAILURE',
    LOAD_CREATE = '@patrimonies/LOAD_CREATE',
}

/**
 * Data types
 */

export interface Patrimony {
    id?: number
    patrimony: string
    ownerId: number
    categoryId: number
    model?: string
    description?: string
    ips?: Ip[]
}

/**
 * State types
 */

export interface PatrimonyStates {
    data: Patrimony[]
    loading: boolean
    error: boolean
}