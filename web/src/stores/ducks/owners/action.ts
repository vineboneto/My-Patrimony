import { Owner, OwnersTypes } from './types';
import { action } from 'typesafe-actions'

export const loadRequest = (url: string) => action(OwnersTypes.LOAD_REQUEST, { url }) 
export const loadSuccess = (data: Owner) => action(OwnersTypes.LOAD_SUCCESS, { data }) 
export const loadFailure = () => action(OwnersTypes.LOAD_FAILURE) 
export const setDialogIsOpen = (isOpen: boolean) => action(OwnersTypes.SET_IS_OPEN, { isOpen }) 