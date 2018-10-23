import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Item from 'components/common/Item';
import AddItem from 'components/common/AddItem';
import {
  loadBoards,
  createBoard,
  updateBoard,
  deleteBoard
} from 'store/actions/boards';

import { Container } from './Boards.styles.js';

class Boards extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props._loadBoards();
  }

  handleUpdate(id, title) {
    this.props._updateBoard({
      id,
      title
    });
  }

  handleDelete(id) {
    this.props._deleteBoard(id);
  }

  handleCreate(title) {
    this.props._createBoard({
      title
    });
  }

  render() {
    const { _boards } = this.props;

    return (
      <Container>
        {_boards.list.map((board) => (
          <Item
            title={board.title}
            key={board.id}
            onClick={() => this.props.history.push(`/board/${board.id}`)}
            onEdit={(newTitle) => this.handleUpdate(board.id, newTitle)}
            onDelete={() => this.handleDelete(board.id)}
          />
        ))}
        <AddItem
          subject="Board"
          onAdd={(title) => this.handleCreate(title)}
        />
      </Container>
    )
  }
}

Boards.propTypes = {
  history: PropTypes.any.isRequired,
  _boards: PropTypes.any.isRequired,
  _loadBoards: PropTypes.func.isRequired,
  _createBoard: PropTypes.func.isRequired,
  _updateBoard: PropTypes.func.isRequired,
  _deleteBoard: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  _boards: state.boards
});
const mapDispatchToProps = (dispatch) => ({
  _loadBoards: () => {
    dispatch(loadBoards());
  },
  _createBoard: (title) => {
    dispatch(createBoard(title));
  },
  _updateBoard: (board) => {
    dispatch(updateBoard(board));
  },
  _deleteBoard: (boardId) => {
    dispatch(deleteBoard(boardId));
  }
});

const routeEnabled = withRouter(Boards);
export default connect(mapStateToProps, mapDispatchToProps)(routeEnabled);
