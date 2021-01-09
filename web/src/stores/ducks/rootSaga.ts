import { all, takeEvery } from 'redux-saga/effects'

import * as SectorsSaga from './sectors/saga';
import * as OwnersSaga from './owners/saga';
import * as CategoriesSaga from './categories/saga';

import { SectorTypes } from './sectors/types';
import { CategoriesTypes } from './categories/types';
import { OwnersTypes } from './owners/types';

export default function* rootSaga() {
    return yield all([
        takeEvery(SectorTypes.LOAD_REQUEST, SectorsSaga.load),
        takeEvery(OwnersTypes.LOAD_REQUEST, OwnersSaga.load),
        takeEvery(CategoriesTypes.LOAD_REQUEST, CategoriesSaga.load),
    ])
}