import sortBy from 'lodash/sortBy';

export const sortByPosition = (list) => sortBy(list, ['position']);

export const reassignPosition = (list) => {
  return list.map((column, index) => ({
      ...column,
      position: index+1
    }));
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return reassignPosition(result);
};

export const generateColsMap = (tasks) => {
  const columns = {};
  const sortedColumns = {};

  for (let i in tasks) {
    const task = tasks[i];

    if (!columns[task.column_id]) {
      columns[task.column_id] = [];
    }
    columns[task.column_id].push(task);
  }

  for (let columnId in columns) {
    const taskList = columns[columnId];

    sortedColumns[columnId] = sortByPosition(taskList);
  }

  return sortedColumns;
};
