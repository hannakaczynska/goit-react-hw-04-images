import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  const step = 1;

  const handleClick = () => {
    onClick(step);
  };

  return (
    <button className={css.button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
