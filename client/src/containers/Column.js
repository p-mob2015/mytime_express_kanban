import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Item from 'components/common/Item';
import AddItem from 'components/common/AddItem';
import {
  updateColumn,
  deleteColumn
} from 'store/actions/columns';
import {
  createTask,
  updateTask,
  deleteTask
} from 'store/actions/tasks';

const TaskItemStyle = {
  backgroundColor: 'white',
  marginBottom: 10
};
const AddTaskItemStyle = {
  backgroundColor: 'none',
  border: 'none'
};

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
  }

  handleUpdate(id, title) {
    this.props._updateColumn({
      id,
      title
    });
  }

  handleDelete(id) {
    this.props._deleteColumn(id);
  }

  handleTaskUpdate(id, title) {
    this.props._updateTask({
      id,
      title
    });
  }

  handleTaskCreate(title) {
    const column = this.props.content;

    this.props._createTask({
      title,
      column_id: column.id
    });
  }

  handleTaskDelete(id) {
    const column = this.props.content;

    this.props._deleteTask(id, column.id);
  }

  render() {
    const column = this.props.content;
    const tasks = this.props._tasks;

    return (
      <Item
        dragHandleProps={this.props.dragHandleProps}
        title={column.title}
        onEdit={(newTitle) => this.handleUpdate(column.id, newTitle)}
        onDelete={() => this.handleDelete(column.id)}
      >
        <div>
          <Droppable droppableId={`column-${column.id}`} type={`column-${column.id}`}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {(tasks || []).map((task, index) => (
                  <Draggable key={-task.id} draggableId={-task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Item
                          title={task.title}
                          key={`task-${task.id}`}
                          style={TaskItemStyle}
                          onEdit={(newTitle) => this.handleTaskUpdate(task.id, newTitle)}
                          onDelete={() => this.handleTaskDelete(task.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddItem
                  subject="Task"
                  style={AddTaskItemStyle}
                  onAdd={(title) => this.handleTaskCreate(title)}
                />
              </div>
            )}
          </Droppable>
        </div>
      </Item>
    );
  }
}

Column.propTypes = {
  content: PropTypes.any.isRequired,
  dragHandleProps: PropTypes.any.isRequired,
  _tasks: PropTypes.any,
  _updateColumn: PropTypes.func.isRequired,
  _deleteColumn: PropTypes.func.isRequired,
  _createTask: PropTypes.func.isRequired,
  _updateTask: PropTypes.func.isRequired,
  _deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  _tasks: state.tasks.columns[ownProps.content.id]
});
const mapDispatchToProps = (dispatch) => ({
  _updateColumn: (column) => {
    dispatch(updateColumn(column));
  },
  _deleteColumn: (columnId) => {
    dispatch(deleteColumn(columnId));
  },
  _createTask: (title) => {
    dispatch(createTask(title));
  },
  _updateTask: (task) => {
    dispatch(updateTask(task));
  },
  _deleteTask: (taskId, columnId) => {
    dispatch(deleteTask(taskId, columnId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);
