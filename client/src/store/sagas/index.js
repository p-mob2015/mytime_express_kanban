import { takeLatest } from 'redux-saga/effects';

import {
  LOAD_BOARDS,
  LOAD_BOARD_DETAILS,
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} from 'store/actions/boards';
import {
  CREATE_COLUMN,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  REPOSITION_COLUMN
} from 'store/actions/columns';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  REPOSITION_TASK
} from 'store/actions/tasks';
import {
  loadBoards,
  loadBoardDetails,
  createBoard,
  updateBoard,
  deleteBoard
} from './boards';
import {
  createColumn,
  updateColumn,
  deleteColumn,
  repositionColumn
} from './columns';
import {
  createTask,
  updateTask,
  deleteTask,
  repositionTask
} from './tasks';


export default function* trelloSaga() {
  yield takeLatest(LOAD_BOARDS, loadBoards);
  yield takeLatest(LOAD_BOARD_DETAILS, loadBoardDetails);
  yield takeLatest(CREATE_BOARD, createBoard);
  yield takeLatest(UPDATE_BOARD, updateBoard);
  yield takeLatest(DELETE_BOARD, deleteBoard);
  yield takeLatest(CREATE_COLUMN, createColumn);
  yield takeLatest(UPDATE_COLUMN, updateColumn);
  yield takeLatest(DELETE_COLUMN, deleteColumn);
  yield takeLatest(REPOSITION_COLUMN, repositionColumn);
  yield takeLatest(CREATE_TASK, createTask);
  yield takeLatest(UPDATE_TASK, updateTask);
  yield takeLatest(DELETE_TASK, deleteTask);
  yield takeLatest(REPOSITION_TASK, repositionTask);
}
