import { combineReducers } from 'redux'

import sectors from './sectors'
import owners from './owners'

export default combineReducers({
    sectors,
    owners,
})