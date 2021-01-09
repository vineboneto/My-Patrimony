import { Reducer } from 'redux';
import { IpState, IpsTypes } from './types';

const INITIAL_STATE: IpState = {
    data: [
       { id: '', ip: '', mask: '', gateway: '' }
    ],
    collapseIsOpen: false,
}

const reducer: Reducer<IpState> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case IpsTypes.SET_IS_OPEN: 
            return { ...state, collapseIsOpen: action.payload.isOpen }
        case IpsTypes.ADD_IP:
            return { ...state, data: [...action.payload.ips, { id: '', ip: '', mask: '', gateway: '' }] }
        case IpsTypes.SET_IP: {
            console.log('Entrou')
            console.log(action.payload.ips)
            return {  ...state, data: action.payload.ips }
        }
        default : return state
    }
}

export default reducer