/**
 * Action types
 */

export enum CategoriesTypes {
    LOAD_REQUEST = '@categories/LOAD_REQUEST',
    LOAD_SUCCESS = '@categories/LOAD_SUCCESS',
    LOAD_FAILURE = '@categories/LOAD_FAILURE',
    LOAD_CREATE = '@categories/LOAD_CREATE',
    SET_IS_OPEN = '@categories/SET_IS_OPEN'
}

/**
 * Data types
 */

export interface Category {
    id?: number
    name: string
}

/**
 * Sector types
 */

export interface CategoryStates {
    data: Category[]
    loading: boolean,
    error: boolean,
    dialogIsOpen: boolean
}