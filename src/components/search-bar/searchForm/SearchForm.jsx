import React, { Component } from 'react';
import '../../../styles/searchForm.css';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  state = {
    search: '',
  };
  onSearchInput = e => {
    const value = e.currentTarget.value;
    this.setState({ search: value });
  };
  render() {
    const { submitFn } = this.props;
    const { search } = this.state;
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
          value={this.state.search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.onSearchInput}
        />
      </form>
    );
  }
}
export default SearchForm;
SearchForm.propTypes = {
  submitFn: PropTypes.func,
};
