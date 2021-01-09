import { Reducer } from 'redux';
import { SectorStates, SectorTypes } from './types';

const INITIAL_STATE: SectorStates = {
    data: [],
    loading: false,
    error: false,
    dialogIsOpen: false,
    url: '',
}

const reducer: Reducer<SectorStates> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SectorTypes.LOAD_REQUEST:
            return { ...state, loading: true, url: action.payload.url }
        case SectorTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case SectorTypes.LOAD_FAILURE:
            return { ...state, error: true, data: [] }
        case SectorTypes.SET_IS_OPEN: 
            return { ...state, dialogIsOpen: action.payload.isOpen }
        default : return state
    }
}

export default reducer