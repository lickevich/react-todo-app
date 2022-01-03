import React, { useState } from 'react';
import './styles.css';

const SearchPanel = (props) => {
  const { onSearchChange } = props;

  const [term, setTerm] = useState();

  const onChange = (e) => {
    const inputValue = e.target.value;
    setTerm(inputValue);
    onSearchChange(inputValue);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Type to search"
      value={term}
      onChange={onChange}
    />
  );
};

export default SearchPanel;
