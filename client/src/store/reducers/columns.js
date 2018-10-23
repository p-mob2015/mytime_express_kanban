import reject from 'lodash/reject';
import { sortByPosition, reassignPosition, reorder } from 'utils';

import {
  LOAD_BOARD_DETAILS
} from '../actions/boards';
import {
  CREATE_COLUMN,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  REORDER_COLUMNS
} from '../actions/columns';
import { columns as initialState } from './initialState';

function columnsReducer(state = initialState, action) {
  switch (action.type) {
    case REORDER_COLUMNS:
      return {
        ...state,
        list: reorder(state.list, action.startIndex, action.endIndex)
      };
    case CREATE_COLUMN:
    case UPDATE_COLUMN:
    case DELETE_COLUMN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_BOARD_DETAILS:
      return initialState;
    case `${LOAD_BOARD_DETAILS}_SUCCESS`:
      return {
        ...state,
        list: sortByPosition(action.result.columns),
        loading: false
      };
    case `${CREATE_COLUMN}_SUCCESS`:
      return {
        ...state,
        list: [...state.list, action.result],
        loading: false
      };
    case `${UPDATE_COLUMN}_SUCCESS`:
      const slimList = reject(state.list, (column) => (
        column.id === action.result.id ));

      return {
        ...state,
        list: sortByPosition([...slimList, action.result]),
        loading: false
      };
    case `${DELETE_COLUMN}_SUCCESS`:
      const updatedList = reject(state.list, (column) => (
        column.id === action.id ));

      return {
        ...state,
        list: reassignPosition(updatedList),
        loading: false
      };
    case `${LOAD_BOARD_DETAILS}_FAILURE`:
    case `${CREATE_COLUMN}_FAILURE`:
    case `${UPDATE_COLUMN}_FAILURE`:
    case `${DELETE_COLUMN}_FAILURE`:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default columnsReducer;
