export const CREATE_COLUMN = 'CREATE_COLUMN';
export const UPDATE_COLUMN = 'UPDATE_COLUMN';
export const DELETE_COLUMN = 'DELETE_COLUMN';
export const REORDER_COLUMNS = 'REORDER_COLUMNS';
export const REPOSITION_COLUMN = 'REPOSITION_COLUMN';

export function createColumn(column) {
  return { type: CREATE_COLUMN, column };
}

export function updateColumn(column) {
  return { type: UPDATE_COLUMN, column };
}

export function deleteColumn(columnId) {
  return { type: DELETE_COLUMN, id: columnId };
}

export function reorderColumns(startIndex, endIndex) {
  return { type: REORDER_COLUMNS, startIndex, endIndex };
}

export function repositionColumn(columnId, position) {
  return { type: REPOSITION_COLUMN, id: columnId, position };
}
