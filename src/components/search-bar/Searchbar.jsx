import React from 'react';
import '../../styles/Searchbar.css';

const Searchbar = ({ children }) => {
  return <header className="searchbar">{children}</header>;
};

export default Searchbar;
