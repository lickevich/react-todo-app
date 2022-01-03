import React from 'react';
import { filters } from './item-status-filter.constants';
import './styles.css';

const ItemStatusFilter = (props) => {
  const { status, onChangeStatusFilter } = props;

  return (
    <div className="btn-group">
      {filters.map((filter) => {
        const isActive = filter.status === status;
        const classNames = isActive ? 'btn-info' : 'btn-outline-secondary';

        return (
          <button
            key={filter.id}
            type="button"
            className={`btn ${classNames}`}
            onClick={() => onChangeStatusFilter(filter.status)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ItemStatusFilter;
