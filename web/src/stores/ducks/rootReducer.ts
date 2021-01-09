import { combineReducers } from 'redux'

import sectors from './sectors'
import owners from './owners'
import categories from './categories'

export default combineReducers({
    sectors,
    owners,
    categories,
})