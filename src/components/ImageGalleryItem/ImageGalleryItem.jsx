import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = e => {
    const photoId = parseInt(e.target.id, 10);
    const { photos, onClick } = this.props;
    const selectedPhoto = photos.find(photo => photo.id === photoId);
    onClick(selectedPhoto);
  };

  render() {
    const { photos } = this.props;
    return (
      <>
        {photos.map(photo => (
          <li className={css.galleryItem} key={photo.id}>
            <img
              className={css.galleryImage}
              id={photo.id}
              src={photo.webformatURL}
              alt={photo.tags}
              onClick={this.handleClick}
            />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
