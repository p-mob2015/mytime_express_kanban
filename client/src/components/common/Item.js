import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Main,
  Children,
  Content,
  ContentStatic,
  ContentEditable,
  Actions
} from './Item.styles';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });

    if (!this.state.editing) {
      this.input.value = this.props.title;
    }
  }

  handleEdit() {
    const newTitle = this.input.value;

    if (newTitle === '') {
      return;
    }

    this.toggleEdit();
    this.props.onEdit(newTitle);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    const {
      title,
      onDelete,
      children,
      style
    } = this.props;
    const { editing } = this.state;

    return (
      <Container style={style}>
        <Main {...this.props.dragHandleProps}>
          <Content>
            <ContentStatic
              className={[editing ? 'hidden': '', this.props.onClick ? 'clickable' : ''].join(' ')}
              onClick={this.handleClick}
            >
              {title}
            </ContentStatic>
            <ContentEditable
              className={editing ? '': 'hidden'}
              ref={(node) => this.input = node}
            />
          </Content>
          <Actions>
            {editing ? 
              <React.Fragment>
                <button onClick={this.handleEdit}>&#10003;</button>
                <button onClick={this.toggleEdit}>&#10005;</button>
              </React.Fragment> :
              <React.Fragment>
                <button onClick={this.toggleEdit}>&#9998;</button>
                <button onClick={onDelete}>&#10005;</button>
              </React.Fragment>
            }
          </Actions>
        </Main>
        {children &&
          <Children>
            {children}
          </Children>
        }
      </Container>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  dragHandleProps: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func
};
Item.defaultProps = {
  style: {},
  dragHandleProps: null
};

export default Item;
