import { call, put } from 'redux-saga/effects'
import { Action } from 'redux';

import { Owner } from 'stores/ducks/owners/types';
import { loadFailure, loadSuccess } from './action';

import api from 'services/api';

interface ActionProps extends Action {
    payload: {
        url: string,
        owner: Owner
    }
}

export function* load(action: ActionProps) {
    try {
        const response = yield call(api.get, action.payload.url)
        yield put(loadSuccess(response.data))
    }
    catch(err) {
        yield put(loadFailure())
    }
}

export function* create(action: ActionProps) {
    try {
        const url = action.payload.url
        const owner = action.payload.owner
        console.log(url)
        console.log(owner)
        yield call (api.post, url, { name: owner.name, sector_id: owner.sectorId })
    } catch(err) {
        yield put(loadFailure())
    }
}
