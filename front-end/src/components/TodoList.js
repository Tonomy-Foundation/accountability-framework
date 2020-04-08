import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    let list = null;
    if (this.props.list && this.props.list.length > 0) {
      list = this.props.list.map((item) => {
        return <TodoListItem
          key={item.id}
          name={item.label}
          onClick={() => this.props.toggleItem(item.id)}
          checked={item.done}
        />
      })
    }
    return (
      <div style={{width:'70%'}}>
        {list}
      </div>
    );
  }
}

export default TodoList;