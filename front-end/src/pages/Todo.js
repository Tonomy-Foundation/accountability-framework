import React from 'react';
import TodoAdd from '../components/TodoAdd';
import TodoList from '../components/TodoList';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: 'Shampoo',
    }

    this.newItem = this.newItem.bind(this);
    this.newItemChange = this.newItemChange.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  async componentDidMount() {
    await this.refreshItems();
  }

  async refreshItems() {
    const todoContract = this.props.todoContract;
    // const accountName = todoContract.eosio.account.name
    // const items = await todoContract.todo(accountName)

    // let list = [];
    // items.rows.forEach((item) => {
    //   list.push({
    //     id: item.id,
    //     label: item.todo,
    //     done: item.completed === 0 ? false : true
    //   })
    // })

    // this.setState({
    //   list: list
    // })
  }

  async newItem() {
    const todoContract = this.props.todoContract;
    const accountName = todoContract.eosio.account.name

    await todoContract.createitem(accountName, this.state.newItem);

    await this.refreshItems();
  }

  newItemChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  async toggleItem(id) {
    const todoContract = this.props.todoContract;
    const accountName = todoContract.eosio.account.name

    await todoContract.toggledone(accountName, id);

    await this.refreshItems();
  }

  render() {
    if (this.props.todoContract) {
      return (
        <Container component="main" maxWidth="xs">
            <h1>Todo list</h1>
            <TodoAdd onSubmit={this.newItem} onChange={this.newItemChange} value={this.state.newItem}/>
            <TodoList list={this.state.list} toggleItem={this.toggleItem}/>
        </Container>
      );
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default Todo;