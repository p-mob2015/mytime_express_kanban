import reject from 'lodash/reject';

import {
  LOAD_BOARDS,
  LOAD_BOARD_DETAILS,
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} from '../actions/boards';
import { boards as initialState } from './initialState';

function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOARDS:
    case LOAD_BOARD_DETAILS:
    case CREATE_BOARD:
    case UPDATE_BOARD:
    case DELETE_BOARD:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${LOAD_BOARDS}_SUCCESS`:
      return {
        ...state,
        list: action.result,
        loading: false
      };
    case `${CREATE_BOARD}_SUCCESS`:
      return {
        ...state,
        list: [...state.list, action.result],
        loading: false
      };
    case `${UPDATE_BOARD}_SUCCESS`:
      const slimList = reject(state.list, (board) => (
        board.id === action.result.id ));

      return {
        ...state,
        list: [...slimList, action.result],
        loading: false
      };
    case `${DELETE_BOARD}_SUCCESS`:
      const updatedList = reject(state.list, (board) => (
        board.id === action.id ));

      return {
        ...state,
        list: updatedList,
        loading: false
      };
    case `${LOAD_BOARDS}_FAILURE`:
    case `${CREATE_BOARD}_FAILURE`:
    case `${UPDATE_BOARD}_FAILURE`:
    case `${DELETE_BOARD}_FAILURE`:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default boardsReducer;
