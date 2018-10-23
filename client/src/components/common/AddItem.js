import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Content,
  ContentEditable,
  Actions
} from './Item.styles';
import {
  ContentStatic
} from './AddItem.styles';

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });

    if (!this.state.editing) {
      this.input.value = '';
    }
  }

  handleAdd() {
    const newTitle = this.input.value;

    if (newTitle === '') {
      return;
    }

    this.toggleEdit();
    this.props.onAdd(newTitle);
  }

  render() {
    const { subject, style } = this.props;
    const { editing } = this.state;

    return (
      <Container style={style}>
        <Content>
          <ContentStatic
            className={editing ? 'hidden text-btn': 'text-btn'}
            onClick={this.toggleEdit}
          >Add New {subject}</ContentStatic>
          <ContentEditable
            className={editing ? '': 'hidden'}
            placeholder={`${subject} name`}
            ref={(node) => this.input = node}
          />
        </Content>
        <Actions>
          {editing &&
            <React.Fragment>
              <button onClick={this.handleAdd}>&#10003;</button>
              <button onClick={this.toggleEdit}>&#10005;</button>
            </React.Fragment>
          }          
        </Actions>
      </Container>
    );
  }
}

AddItem.propTypes = {
  style: PropTypes.object,
  subject: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired
};
AddItem.defaultProps = {
  style: {}
};

export default AddItem;
