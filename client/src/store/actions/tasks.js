export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const REPOSITION_TASK = 'REPOSITION_TASK';
export const REORDER_TASKS = 'REORDER_TASKS';

export function createTask(task) {
  return { type: CREATE_TASK, task };
}

export function updateTask(task) {
  return { type: UPDATE_TASK, task };
}

export function deleteTask(taskId, columnId) {
  return { type: DELETE_TASK, id: taskId, columnId };
}

export function reorderTasks(columnId, startIndex, endIndex) {
  return { type: REORDER_TASKS, columnId, startIndex, endIndex };
}

export function repositionTask(taskId, position) {
  return { type: REPOSITION_TASK, id: taskId, position };
}
