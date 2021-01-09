import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { SectorStates } from './ducks/sectors/types';
import { OwnerStates } from './ducks/owners/types'; 
import { CategoryStates } from './ducks/categories/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';


export interface ApplicationState {
    sectors: SectorStates
    owners: OwnerStates
    categories: CategoryStates
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store