import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  static defaultProps = {
    step: 1,
  };

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { step, onClick } = this.props;
    onClick(step);
  };

  render() {
    return (
      <button className={css.button} type="button" onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

export default Button;
