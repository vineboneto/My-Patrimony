import { Reducer } from 'redux';
import { CategoryStates, CategoriesTypes } from './types';

const INITIAL_STATE: CategoryStates = {
    data: [],
    loading: false,
    error: false,
    dialogIsOpen: false,
    url: '',
}

const reducer: Reducer<CategoryStates> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CategoriesTypes.LOAD_REQUEST:
            return { ...state, loading: true, url: action.payload.url }
        case CategoriesTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case CategoriesTypes.LOAD_CREATE :
            return { ...state, loading: false, error: false, url: action.payload.url, category: action.payload.category }
        case CategoriesTypes.LOAD_FAILURE:
            return { ...state, error: true, data: [] }
        case CategoriesTypes.SET_IS_OPEN:
            return { ...state, dialogIsOpen: action.payload.isOpen }
        default : return state
    }
}

export default reducer