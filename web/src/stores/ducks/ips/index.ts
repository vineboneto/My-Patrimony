import { Reducer } from 'redux';
import { IpState, IpsTypes } from './types';

const INITIAL_STATE: IpState = {
    data: [],
    loading: false,
    error: false,
    dialogIsOpen: false,
    url: '',
}

const reducer: Reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case IpsTypes.LOAD_REQUEST:
            return { ...state, loading: true, url: action.payload.url }
        case IpsTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case IpsTypes.LOAD_FAILURE:
            return { ...state, error: true, data: [] }
        case IpsTypes.SET_IS_OPEN:
            return { ...state, dialogIsOpen: action.payload.isOpen }
        default : return state
    }
}

export default reducer