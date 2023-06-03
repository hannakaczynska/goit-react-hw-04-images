import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect, useRef } from 'react';

const Modal = ({ selectedPhoto, onClick }) => {
  const handleClick = () => {
    const selectedPhoto = null;
    onClick(selectedPhoto);
  };

  const keyRef = useRef();

  useEffect(() => {
    const handleKeyDown = e => {
      const selectedPhoto = null;
      if (e.key === 'Escape') {
        onClick(selectedPhoto);
      }
    };

    keyRef.current = handleKeyDown;
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  if (selectedPhoto !== null) {
    return (
      <div
        className={css.overlay}
        onClick={handleClick}
        onKeyDown={keyRef.current}
        tabIndex={0}
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
};

Modal.propTypes = {
  selectedPhoto: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
