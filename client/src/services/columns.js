import axios from 'axios';
import { API_ROOT } from 'config';

const COLUMNS_API_ROOT = `${API_ROOT}/columns`;

export const loadColumns = async function(boardId) {
  try {
    const response = await axios.get(`${COLUMNS_API_ROOT}?board=${boardId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createColumn = async function(column) {
  try {
    const response = await axios.post(COLUMNS_API_ROOT, column);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateColumn = async function(id, column) {
  try {
    const response = await axios.put(`${COLUMNS_API_ROOT}/${id}`, column);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteColumn = async function(id) {
  try {
    await axios.delete(`${COLUMNS_API_ROOT}/${id}`);

    return true;
  } catch (error) {
    throw error;
  }
}
