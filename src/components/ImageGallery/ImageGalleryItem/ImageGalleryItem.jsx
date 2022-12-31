import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ address, image, info, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={address}
        alt={info}
        image={image}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  address: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
