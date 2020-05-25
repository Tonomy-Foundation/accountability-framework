import React from 'react';
import TodoAdd from '../components/TodoAdd';
import TodoList from '../components/TodoList';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import Contract from '../services/Contract';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function mapStateToProps(state) {
  return {
    eosio: state.eosio
  };
}

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: 'christiaan',
    }

    this.newItem = this.newItem.bind(this);
    this.newItemChange = this.newItemChange.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.history = props.history
  }

  async componentDidMount() {
    const eosio = this.props.eosio;
    if (eosio) {
      const todoContract = new Contract("todolist", eosio)
      await todoContract.initializeContract();
      this.todoContract = todoContract;
  
      await this.refreshItems();
    }
  }

  async refreshItems() {
    const todoContract = this.todoContract;
    const accountName = todoContract.eosio.account.name
    const items = await todoContract.todo(accountName)

    let list = [];
    items.rows.forEach((item) => {
      list.push({
        id: item.id,
        label: item.todo,
        done: item.completed === 0 ? false : true
      })
    })

    this.setState({
      list: list
    })
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
    // if (this.props.eosio) {
      return (
        <>
          <Navbar history={this.history} />

          <Container component="main" maxWidth="xs">
              <h1>Todo list</h1>
              <TodoAdd onSubmit={this.newItem} onChange={this.newItemChange} value={this.state.newItem}/>
              <TodoList list={this.state.list} toggleItem={this.toggleItem}/>
          </Container>
        </>
      );
    // } else {
    //   return <Redirect to="/login" />
    // }
  }
}

export default connect(mapStateToProps)(Todo);