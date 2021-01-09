import { combineReducers } from 'redux'

import sectors from './sectors'
import owners from './owners'
import categories from './categories'
import ips from './ips'

export default combineReducers({
    sectors,
    owners,
    categories,
    ips,
})