import React from 'react';
import '../../styles/button.css';
import PropTypes from 'prop-types';

const Button = ({ loadMore }) => {
  return (
    <button type="button" className="button" onClick={loadMore}>
      Load more
    </button>
  );
};

export default Button;
Button.propTypes = {
  loadMore: PropTypes.func,
};
