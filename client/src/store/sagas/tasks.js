import { call, put } from 'redux-saga/effects';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  REPOSITION_TASK
} from 'store/actions/tasks';
import { TasksService } from 'services';

export function* createTask(action) {
  try {
    const result = yield call(TasksService.createTask, action.task);
    
    yield put({ type: `${CREATE_TASK}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${CREATE_TASK}_FAILURE`, error });
  }
}

export function* updateTask(action) {
  try {
    const { id } = action.task;

    const result = yield call(TasksService.updateTask, id, action.task);
    yield put({ type: `${UPDATE_TASK}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${UPDATE_TASK}_FAILURE`, error });
  }
}

export function* deleteTask(action) {
  try {
    yield call(TasksService.deleteTask, action.id);

    yield put({type: `${DELETE_TASK}_SUCCESS`, id: action.id, columnId: action.columnId });
  } catch (error) {
    yield put({type: `${DELETE_TASK}_FAILURE`, error});
  }
}

export function* repositionTask(action) {
  try {
    yield call(TasksService.updateTask, action.id, { position: action.position })

    yield put({type: `${REPOSITION_TASK}_SUCCESS`});
  } catch (error) {
    yield put({type: `${REPOSITION_TASK}_FAILURE`, error});
  }
}