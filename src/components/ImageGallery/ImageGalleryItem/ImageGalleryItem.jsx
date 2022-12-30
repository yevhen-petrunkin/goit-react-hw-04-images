import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ address, info }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={address} alt={info} />
    </li>
  );
};
