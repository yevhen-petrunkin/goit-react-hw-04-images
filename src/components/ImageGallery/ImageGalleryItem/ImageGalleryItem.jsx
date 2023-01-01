import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ address, largeURL, info, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={address}
        alt={info}
        onClick={() => onClick(largeURL, info)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  address: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
