import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();

  const handleChange = () => {
    setSearchValue(inputRef.current.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    onSubmit(searchValue);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchButton}>
          <span className={css.searchButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchInput}
          ref={inputRef}
          type="text"
          name="searchValue"
          value={searchValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
