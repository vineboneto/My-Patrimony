import { call, put } from 'redux-saga/effects'
import { Action } from 'redux';

import { loadFailure, loadSuccess } from './action';
import api from 'services/api';

interface ActionProps extends Action {
    payload: {
        url: string
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
