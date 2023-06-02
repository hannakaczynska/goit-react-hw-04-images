import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    selectedPhoto: PropTypes.object,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { onClick } = this.props;
    const selectedPhoto = null;
    onClick(selectedPhoto);
  };

  handleKeyDown = e => {
    const { onClick } = this.props;
    const selectedPhoto = null;
    if (e.key === 'Escape') {
      onClick(selectedPhoto);
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

    componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { selectedPhoto } = this.props;
    if (selectedPhoto !== null) {
      return (
        <div
          className={css.overlay}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <div className={css.modal}>
            <img
              className={css.image}
              src={selectedPhoto.largeImageURL}
              alt={selectedPhoto.tags}
            />
          </div>
        </div>
      );
    }
  }
}

export default Modal;
