import { Reducer } from 'redux';
import { OwnerStates, OwnersTypes } from './types';

const INITIAL_STATE: OwnerStates = {
    data: [],
    loading: false,
    error: false,
    dialogIsOpen: true,
    url: '',
}

const reducer: Reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case OwnersTypes.LOAD_REQUEST:
            return { ...state, loading: true, url: action.payload.url }
        case OwnersTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case OwnersTypes.LOAD_FAILURE:
            return { ...state, error: true, data: [] }
        case OwnersTypes.SET_IS_OPEN: 
            return { ...state, dialogIsOpen: action.payload.isOpen }
        default : return state
    }
}

export default reducer