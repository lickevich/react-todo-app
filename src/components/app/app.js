import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAddItem from '../todo-add-item';

import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++,
      };
    };

    this.maxId = 100;

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
      term: '',
      status: 'all',
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1),
        ];

        return {
          todoData: newArray,
        };
      });
    };

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem];

        return {
          todoData: newArray,
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important'),
        };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done'),
        };
      });
    };

    this.onChangeStatusFilter = (status) => {
      this.setState({ status });
    };

    this.statusFilterTodos = (items, status) => {
      if (status === 'active') {
        return items.filter((item) => !item.done);
      }
      if (status === 'done') {
        return items.filter((item) => item.done);
      }
      return items;
    };

    this.onSearchChange = (term) => {
      this.setState({ term });
    };

    this.searchTodos = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter((item) =>
        item.label.toLowerCase().includes(term.toLowerCase()),
      );
    };
  }

  render() {
    const { todoData, term, status } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const searchedTodos = this.searchTodos(todoData, term);
    const filteredTodos = this.statusFilterTodos(searchedTodos, status);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            onChangeStatusFilter={this.onChangeStatusFilter}
            status={status}
          />
        </div>
        <TodoList
          todos={filteredTodos}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <TodoAddItem onItemAdded={this.addItem} />
      </div>
    );
  }
}
