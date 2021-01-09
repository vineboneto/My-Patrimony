import { action } from 'typesafe-actions'
import { Category, CategoriesTypes } from './types';

export const loadRequest = (url: string) => action(CategoriesTypes.LOAD_REQUEST, { url }) 
export const loadCreate = (url: string, category: Category) => action(CategoriesTypes.LOAD_CREATE, { url, category}) 
export const loadSuccess = (data: Category) => action(CategoriesTypes.LOAD_SUCCESS, { data }) 
export const loadFailure = () => action(CategoriesTypes.LOAD_FAILURE) 
export const setDialogIsOpen = (isOpen: boolean) => action(CategoriesTypes.SET_IS_OPEN, { isOpen }) 