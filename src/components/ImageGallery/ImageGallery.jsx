import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ results, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {results.map(result => {
        const { id, webformatURL, largeImageURL, tags } = result;
        return (
          <ImageGalleryItem
            key={id}
            address={webformatURL}
            info={tags}
            largeURL={largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
