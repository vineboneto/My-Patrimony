import { all, takeEvery } from 'redux-saga/effects'
import { load } from './sectors/saga';

import { SectorTypes } from './sectors/types';

export default function* rootSaga() {
    return yield all([
        takeEvery(SectorTypes.LOAD_REQUEST, load),
    ])
}