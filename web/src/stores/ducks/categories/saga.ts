import { call, put } from 'redux-saga/effects'
import { Action } from 'redux';

import { Category } from 'stores/ducks/categories/types';
import { loadFailure, loadSuccess } from './action';


import api from 'services/api';

interface ActionProps extends Action {
    payload: {
        url: string,
        category: Category
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
        const category = action.payload.category
        yield call(api.post, url, category)

    } catch(error) {
        yield put(loadFailure())
    }
}
