export const LOAD_BOARDS = 'LOAD_BOARDS';
export const LOAD_BOARD_DETAILS = 'LOAD_BOARD_DETAILS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';

export function loadBoards() {
  return { type: LOAD_BOARDS };
}

export function loadBoardDetails(boardId) {
  return { type: LOAD_BOARD_DETAILS, id: boardId };
}

export function createBoard(board) {
  return { type: CREATE_BOARD, board };
}

export function updateBoard(board) {
  return { type: UPDATE_BOARD, board };
}

export function deleteBoard(boardId) {
  return { type: DELETE_BOARD, id: boardId };
}
