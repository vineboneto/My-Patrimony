import { combineReducers } from 'redux'

import sectors from './sectors'
import owners from './owners'
import categories from './categories'
import ips from './ips'
import patrimonies from './patrimonies'

export default combineReducers({
    sectors,
    owners,
    categories,
    ips,
    patrimonies
})