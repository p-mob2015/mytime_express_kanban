import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import AddItem from 'components/common/AddItem';
import {
  loadBoardDetails
} from 'store/actions/boards';
import {
  createColumn,
  repositionColumn,
  reorderColumns
} from 'store/actions/columns';
import {
  repositionTask,
  reorderTasks
} from 'store/actions/tasks';

import Column from './Column';
import { Container } from './Board.styles.js';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props._loadBoard(this.props.id);
  }

  handleCreate(title) {
    this.props._createColumn({
      title,
      board_id: this.props.id
    });
  }

  onDragEnd(result) {
    const { draggableId, type } = result;

    if (draggableId > 0) {
      // Column movement
      this.props._reorderColumns(
        result.source.index,
        result.destination.index
      );
      this.props._repositionColumn(
        result.draggableId,
        result.destination.index + 1
      );
    } else {
      // Task movement
      const taskId = -draggableId;
      const columnId = +type.split('-')[1];

      this.props._reorderTasks(
        columnId,
        result.source.index,
        result.destination.index
      );
      this.props._repositionTask(
        taskId,
        result.destination.index + 1
      );
    }
  }

  render() {
    const { _columns } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableBoard" direction="horizontal" type="board">
          {(provided, snapshot) => (
            <Container ref={provided.innerRef}>
              {_columns.list.map((column, index) => (
                <Draggable key={column.id} draggableId={column.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Column
                        dragHandleProps={provided.dragHandleProps}
                        content={column}
                        key={`column-${column.id}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <AddItem
                subject="Column"
                onAdd={(title) => this.handleCreate(title)}
              />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

Board.propTypes = {
  id: PropTypes.string.isRequired,
  _columns: PropTypes.any.isRequired,
  _loadBoard: PropTypes.func.isRequired,
  _createColumn: PropTypes.func.isRequired,
  _repositionColumn: PropTypes.func.isRequired,
  _reorderColumns: PropTypes.func.isRequired,
  _repositionTask: PropTypes.func.isRequired,
  _reorderTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  _columns: state.columns
});
const mapDispatchToProps = (dispatch) => ({
  _loadBoard: (id) => {
    dispatch(loadBoardDetails(id));
  },
  _createColumn: (column) => {
    dispatch(createColumn(column));
  },
  _repositionColumn: (id, position) => {
    dispatch(repositionColumn(id, position));
  },
  _reorderColumns: (start, end) => {
    dispatch(reorderColumns(start, end));
  },
  _repositionTask: (id, position) => {
    dispatch(repositionTask(id, position));
  },
  _reorderTasks: (columnId, start, end) => {
    dispatch(reorderTasks(columnId, start, end));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
