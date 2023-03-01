// управляемый компонент для отображения короткометражек

import './FilterCheckbox.css';

import React from 'react';

const FilterCheckbox = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="filter-checkbox__checkbox"
        id={`switch-short-film`}
        type="checkbox"
      />
      <label className="filter-checkbox__label" htmlFor={`switch-short-film`}>
        {' '}
        <span
          style={{ background: isOn && '#2be080' }}
          className={`filter-checkbox__button`}
        />
      </label>
    </>
  );
};

export default FilterCheckbox;
