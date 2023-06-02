import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    this.setState({ [inputName]: inputValue });
  };

  handleSubmit = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const { searchValue } = this.state;
    const { onSubmit } = this.props;
    onSubmit(searchValue);
  };

  render() {
    const { searchValue } = this.state;
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <span className={css.searchButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchInput}
            type="text"
            name="searchValue"
            value={searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
