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
            image={largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};
