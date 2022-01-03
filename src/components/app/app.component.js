import React, { useState } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAddItem from '../todo-add-item';
import { initialTodoData } from './app.constants';
import { createTodoItem } from './app.utils';
import './styles.css';

const AppComponent = () => {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [status, setStatus] = useState('all');
  const [term, setTerm] = useState('');

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);

      return [...data.slice(0, idx), ...data.slice(idx + 1)];
    });
  };

  const addItem = (text) => {
    const newItem = createTodoItem(text);
    setTodoData((data) => [...data, newItem]);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleImportant = (id) => {
    setTodoData((data) => toggleProperty(data, id, 'important'));
  };

  const onToggleDone = (id) => {
    setTodoData((data) => toggleProperty(data, id, 'done'));
  };

  const onChangeStatusFilter = (status) => {
    setStatus(status);
  };

  const statusFilterTodos = (items, status) => {
    if (status === 'active') {
      return items.filter((item) => !item.done);
    }
    if (status === 'done') {
      return items.filter((item) => item.done);
    }
    return items;
  };

  const onSearchChange = (term) => {
    setTerm(term);
  };

  const searchTodos = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) =>
      item.label.toLowerCase().includes(term.toLowerCase()),
    );
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  const searchedTodos = searchTodos(todoData, term);
  const filteredTodos = statusFilterTodos(searchedTodos, status);

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter
          onChangeStatusFilter={onChangeStatusFilter}
          status={status}
        />
      </div>
      <TodoAddItem onItemAdded={addItem} />
      <TodoList
        todos={filteredTodos}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
      />
    </div>
  );
};

export default AppComponent;
