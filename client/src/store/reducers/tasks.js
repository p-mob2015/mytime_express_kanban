import reject from 'lodash/reject';
import {
  sortByPosition,
  reassignPosition,
  reorder,
  generateColsMap
} from 'utils';

import {
  LOAD_BOARD_DETAILS
} from '../actions/boards';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  REORDER_TASKS
} from '../actions/tasks';
import { tasks as initialState } from './initialState';

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case REORDER_TASKS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: reorder(state.columns[action.columnId], action.startIndex, action.endIndex)
        }
      };
    case CREATE_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${LOAD_BOARD_DETAILS}_SUCCESS`:
      return {
        ...state,
        columns: generateColsMap(action.result.tasks),
        loading: false
      };
    case `${CREATE_TASK}_SUCCESS`: {
      const task = action.result;

      return {
        ...state,
        columns: {
          ...state.columns,
          [task.column_id]: [
            ...(state.columns[task.column_id] || []),
            task
          ]
        },
        loading: false
      };
    }
    case `${UPDATE_TASK}_SUCCESS`: {
      const task = action.result;
      const taskList = state.columns[task.column_id];
      const slimList = reject(taskList, (t) => (
        t.id === task.id ));

      return {
        ...state,
        columns: {
          ...state.columns,
          [task.column_id]: sortByPosition([
            ...slimList,
            task
          ])
        },
        loading: false
      };
    }
    case `${DELETE_TASK}_SUCCESS`:
      const taskList = state.columns[action.columnId];
      const updatedList = reject(taskList, (t) => (
        t.id === action.id ));

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: reassignPosition(updatedList)
        },
        loading: false
      };
    case `${LOAD_BOARD_DETAILS}_FAILURE`:
    case `${CREATE_TASK}_FAILURE`:
    case `${UPDATE_TASK}_FAILURE`:
    case `${DELETE_TASK}_FAILURE`:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default tasksReducer;
