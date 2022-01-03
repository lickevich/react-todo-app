import React, { useState } from 'react';
import './styles.css';

const TodoAddItem = (props) => {
  const { onItemAdded } = props;

  const [label, setLabel] = useState();

  const onLabelChange = (e) => setLabel(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    onItemAdded(label);
    setLabel('');
  };

  return (
    <form className="todo-add-item d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        onChange={onLabelChange}
        placeholder="What needs to be done"
        value={label}
      />
      <button className="btn btn-outline-secondary">Add Item</button>
    </form>
  );
};

export default TodoAddItem;
