import axios from 'axios';
import { API_ROOT } from 'config';

const TASKS_API_ROOT = `${API_ROOT}/tasks`;

export const loadTasks = async function(boardId) {
  try {
    const response = await axios.get(`${TASKS_API_ROOT}?board=${boardId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createTask = async function(task) {
  try {
    const response = await axios.post(TASKS_API_ROOT, task);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateTask = async function(id, task) {
  try {
    const response = await axios.put(`${TASKS_API_ROOT}/${id}`, task);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteTask = async function(id) {
  try {
    await axios.delete(`${TASKS_API_ROOT}/${id}`);

    return true;
  } catch (error) {
    throw error;
  }
}

