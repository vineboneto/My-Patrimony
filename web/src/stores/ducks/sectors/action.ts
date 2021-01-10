import { Sector, SectorTypes } from './types';
import { action } from 'typesafe-actions'

export const loadRequest = (url: string) => action(SectorTypes.LOAD_REQUEST, { url }) 
export const loadCreate = (url: string, sector: Sector) => action(SectorTypes.LOAD_CREATE, { url, sector }) 
export const loadSuccess = (data: Sector[]) => action(SectorTypes.LOAD_SUCCESS, { data }) 
export const loadFailure = () => action(SectorTypes.LOAD_FAILURE) 
export const setDialogIsOpen = (isOpen: boolean) => action(SectorTypes.SET_IS_OPEN, { isOpen }) 