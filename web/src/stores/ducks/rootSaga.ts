import { all, takeLatest } from 'redux-saga/effects'

import * as SectorsSaga from './sectors/saga';
import * as OwnersSaga from './owners/saga';
import * as CategoriesSaga from './categories/saga';

import { SectorTypes } from './sectors/types';
import { CategoriesTypes } from './categories/types';
import { OwnersTypes } from './owners/types';

export default function* rootSaga() {
    return yield all([
        takeLatest(SectorTypes.LOAD_REQUEST, SectorsSaga.load),
        takeLatest(OwnersTypes.LOAD_REQUEST, OwnersSaga.load),
        takeLatest(CategoriesTypes.LOAD_REQUEST, CategoriesSaga.load),
        takeLatest(CategoriesTypes.LOAD_CREATE, CategoriesSaga.create),
        takeLatest(OwnersTypes.LOAD_CREATE, OwnersSaga.create),
    ])
}