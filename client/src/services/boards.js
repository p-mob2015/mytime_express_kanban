import axios from 'axios';
import { API_ROOT } from 'config';

import { loadColumns } from './columns';
import { loadTasks } from './tasks';

const BOARDS_API_ROOT = `${API_ROOT}/boards`;

export const loadBoards = async function() {
  try {
    const response = await axios.get(BOARDS_API_ROOT);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const loadBoardDetails = async function(boardId) {
  try {
    const arrResults = await Promise.all([
      loadColumns(boardId),
      loadTasks(boardId)
    ]);

    return {
      columns: arrResults[0],
      tasks: arrResults[1]
    };
  } catch (error) {
    throw error;
  }
}

export const createBoard = async function(board) {
  try {
    const response = await axios.post(BOARDS_API_ROOT, board);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateBoard = async function(id, board) {
  try {
    const response = await axios.put(`${BOARDS_API_ROOT}/${id}`, board);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteBoard = async function(id) {
  try {
    await axios.delete(`${BOARDS_API_ROOT}/${id}`);

    return true;
  } catch (error) {
    throw error;
  }
}
