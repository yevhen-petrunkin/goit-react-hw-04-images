import css from './ImageGalleryItem.module.css';

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
