import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ photos, onClick }) => {
  const handleClick = e => {
    const photoId = parseInt(e.target.id, 10);
    const selectedPhoto = photos.find(photo => photo.id === photoId);
    onClick(selectedPhoto);
  };

  return (
    <>
      {photos.map(photo => (
        <li className={css.galleryItem} key={photo.id}>
          <img
            className={css.galleryImage}
            id={photo.id}
            src={photo.webformatURL}
            alt={photo.tags}
            onClick={handleClick}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  photos: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
