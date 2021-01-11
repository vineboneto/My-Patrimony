import { Patrimony, PatrimonyTypes } from './types';
import { action } from 'typesafe-actions'

export const loadRequest = (url: string) => action(PatrimonyTypes.LOAD_REQUEST, { url }) 
export const loadCreate = (url: string, patrimony: Patrimony) => action(PatrimonyTypes.LOAD_CREATE, { url, patrimony }) 
export const loadSuccess = (data: Patrimony[]) => action(PatrimonyTypes.LOAD_SUCCESS, { data }) 
export const loadFailure = () => action(PatrimonyTypes.LOAD_FAILURE) 