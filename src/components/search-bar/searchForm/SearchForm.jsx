import React, { useState } from 'react';
import '../../../styles/searchForm.css';
import PropTypes from 'prop-types';

const SearchForm = ({ submitFn }) => {
  const [search, setSearch] = useState('');

  const onSearchInput = e => {
    const value = e.currentTarget.value;
    setSearch(value);
  };
  return (
    <form
    className="searchForm"
    onSubmit={e => {
      e.preventDefault();
      submitFn(search);
    }}
  >
    <button type="submit" className="searchFormButton">
      <span className="searchFormLabel">Search</span>
    </button>

    <input
      className="searchFormInput"
      type="text"
      value={search}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={onSearchInput}
    />
  </form>
  );
};

export default SearchForm;
SearchForm.propTypes = {
  submitFn: PropTypes.func,
};
