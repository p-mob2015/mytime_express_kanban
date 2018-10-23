import { combineReducers } from 'redux';

import boardsReducer from './boards';
import columnsReducer from './columns';
import tasksReducer from './tasks';

export default combineReducers({
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer
});
