import React, {Component} from 'react';

import Header from './Header.js';
import Todos from './Todos.js';
import Footer from './Footer.js';

import io from 'socket.io-client';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            filter: 'all',
            inputValue: '',
            connected: false,
        };

        this.socket = io('http://localhost:4000');

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onItemDelete = this.onItemDelete.bind(this);
        this.onToggleItem = this.onToggleItem.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
    }

    componentDidMount() {
        this.socket.on('connect', () => this.setState({connected: true}));
        this.socket.on('disconnect', () => this.setState({connected: false}));
        this.socket.on('refresh', (todos) => {
            console.log('refresh');
            this.setState({todos: todos})
        });
        this.socket.on('newTodo', (id) =>  {
            console.log('newtodo'+id);
            this.state.todos.push({
                name: this.state.inputValue,
                done: false,
                id: id,
            });
            this.setState({  inputValue: ''});
        });
    }

    onInputChange(event) {
        this.setState({ inputValue: event.target.value});
        // TODO: update the inputValue in the state according to the event
    }

    onInputKeyDown(event) {
        const ENTER_KEY = 13;
        if (event.which === ENTER_KEY && this.state.inputValue.trim() !== '') {
            this.socket.emit('addTodo', this.state.inputValue);


            // TODO: if we press enter, the todo needs to be added and the event needs to be sent to the server
            // And do not forget to set the inputValue of the state to empty!
        }
    }

    onItemDelete(id) {
        this.socket.emit('removeTodo', id );
        var newTodos = this.state.todos.filter(function (todo) {
            return todo.id !== id;
        });
        this.setState( {todos: newTodos} );

    }


    onToggleItem(id) {
        this.socket.emit('toggleTodo', id );
        var newTodos = this.state.todos.map(function (todo) {
            if (todo.id == id) {
                todo.done = !todo.done;
            }
            return todo;
        });
        this.setState( {todos: newTodos} );
    }

    clearCompletedTodos() {
        this.socket.emit('clearCompletedTodos');
        var newTodos = this.state.todos.filter(function (todo) {
            return todo.done !== true;
        });
        this.setState( {todos: newTodos} );
    }

    getOpenTodoCount() {
        return this.state.todos.filter( (todo) => {
            return todo.done == false;
        }).length;
    }

    setFilter(filter) {
       this.setState({filter: filter});
    }

    render() {
        let className = "todoapp "
        className += this.state.connected ? 'connected' : '';

        return (
            <section className={className}>
                <Header
                    inputValue={this.state.inputValue}
                    onInputChange={this.onInputChange}
                    onInputKeyDown={this.onInputKeyDown}
                />
                <Todos
                    todos={this.state.todos}
                    filter={this.state.filter}
                    onToggleItem={this.onToggleItem}
                    onItemDelete={this.onItemDelete}
                />
                <Footer
                    filter={this.state.filter}
                    getOpenTodoCount={this.getOpenTodoCount()}
                    setFilter={this.setFilter}
                    clearCompletedTodos={this.clearCompletedTodos}
                />
                {/* TODO: render the Footer Section, similarly to the above Header and Todo Tags */}
            </section>
        );
    }
}

export default App;
