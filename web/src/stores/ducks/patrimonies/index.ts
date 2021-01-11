import { Reducer } from 'redux';
import { PatrimonyStates, PatrimonyTypes } from './types';

const INITIAL_STATE: PatrimonyStates = {
    data: [],
    loading: false,
    error: false,
}

const reducer: Reducer<PatrimonyStates> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PatrimonyTypes.LOAD_REQUEST:
            return { ...state, loading: true, url: action.payload.url }
        case PatrimonyTypes.LOAD_CREATE:
            return { ...state, error: false, loading: false, sector: action.payload.sector, url: action.payload.url }
        case PatrimonyTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case PatrimonyTypes.LOAD_FAILURE:
            return { ...state, error: true, data: [] }
        default : return state
    }
}

export default reducer