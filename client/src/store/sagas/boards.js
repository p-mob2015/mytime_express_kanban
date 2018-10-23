import { call, put } from 'redux-saga/effects';
import {
  LOAD_BOARDS,
  LOAD_BOARD_DETAILS,
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} from 'store/actions/boards';
import { BoardsService } from 'services';

export function* loadBoards() {
  try {
    const result = yield call(BoardsService.loadBoards);

    yield put({ type: `${LOAD_BOARDS}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${LOAD_BOARDS}_FAILURE`, error });
  }
}

export function* loadBoardDetails(action) {
  try {
    const result = yield call(BoardsService.loadBoardDetails, action.id);

    yield put({ type: `${LOAD_BOARD_DETAILS}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${LOAD_BOARD_DETAILS}_FAILURE`, error });
  }
}

export function* createBoard(action) {
  try {
    const result = yield call(BoardsService.createBoard, action.board);
    
    yield put({ type: `${CREATE_BOARD}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${CREATE_BOARD}_FAILURE`, error });
  }
}

export function* updateBoard(action) {
  try {
    const { id } = action.board;

    const result = yield call(BoardsService.updateBoard, id, action.board);
    yield put({ type: `${UPDATE_BOARD}_SUCCESS`, result });
  } catch (error) {
    yield put({ type: `${UPDATE_BOARD}_FAILURE`, error });
  }
}

export function* deleteBoard(action) {
  try {
    yield call(BoardsService.deleteBoard, action.id);

    yield put({type: `${DELETE_BOARD}_SUCCESS`, id: action.id});
  } catch (error) {
    yield put({type: `${DELETE_BOARD}_FAILURE`, error});
  }
}
