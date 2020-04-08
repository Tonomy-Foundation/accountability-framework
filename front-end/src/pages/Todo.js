import React from 'react';
import TodoAdd from '../components/TodoAdd';
import TodoList from '../components/TodoList';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import Eosio from '../services/Eosio';
import Contract from '../services/Contract';

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
    const network = {
      chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6',
      node: 'https://eos-studio.api.dfuse.dev'
    }

    // Get account and eosio from redux
    
    const account = {
      name: this.props.account,
      pkey: this.props.pkey,
      permission: "active"
    }

    // const eosio = new Eosio();
    // await eosio.initializeEosio(account, network);
    // const todoContract = new Contract("todolist", eosio)
    // await todoContract.initializeContract();
    // this.todoContract = todoContract;

    // await this.refreshItems();
  }

  async refreshItems() {
    const todoContract = this.todoContract;
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
    const todoContract = this.todoContract;
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
    const todoContract = this.todoContract;
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