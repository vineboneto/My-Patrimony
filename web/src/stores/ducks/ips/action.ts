import { action } from 'typesafe-actions'
import { Ip, IpsTypes } from './types';

export const loadRequest = (url: string) => action(IpsTypes.LOAD_REQUEST, { url }) 
export const loadSuccess = (data: Ip) => action(IpsTypes.LOAD_SUCCESS, { data }) 
export const loadFailure = () => action(IpsTypes.LOAD_FAILURE) 
export const setDialogIsOpen = (isOpen: boolean) => action(IpsTypes.SET_IS_OPEN, { isOpen }) 