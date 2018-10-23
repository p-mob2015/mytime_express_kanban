import { call, put } from 'redux-saga/effects';
import {
  CREATE_COLUMN,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  REPOSITION_COLUMN
} from 'store/actions/columns';
import { ColumnsService } from 'services';

export function* createColumn(action) {
  try {
    const result = yield call(ColumnsService.createColumn, action.column);
    
    yield put({ type: `${CREATE_COLUMN}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${CREATE_COLUMN}_FAILURE`, error });
  }
}

export function* updateColumn(action) {
  try {
    const { id } = action.column;

    const result = yield call(ColumnsService.updateColumn, id, action.column);
    yield put({ type: `${UPDATE_COLUMN}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${UPDATE_COLUMN}_FAILURE`, error });
  }
}

export function* deleteColumn(action) {
  try {
    yield call(ColumnsService.deleteColumn, action.id);

    yield put({type: `${DELETE_COLUMN}_SUCCESS`, id: action.id});
  } catch (error) {
    yield put({type: `${DELETE_COLUMN}_FAILURE`, error});
  }
}

export function* repositionColumn(action) {
  try {
    yield call(ColumnsService.updateColumn, action.id, { position: action.position })

    yield put({type: `${REPOSITION_COLUMN}_SUCCESS`});
  } catch (error) {
    yield put({type: `${REPOSITION_COLUMN}_FAILURE`, error});
  }
}