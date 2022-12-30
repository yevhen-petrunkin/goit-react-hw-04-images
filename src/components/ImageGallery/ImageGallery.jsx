import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

const BASE = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '32466560-6eda1bf61b5bca3a99277a0be',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class ImageGallery extends Component {
  state = { searchResults: null, error: null, status: 'idle', page: 1 };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (
      this.normalizePrevQuery(prevProps) !== query.toLowerCase() ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(`${BASE}?q=${query}&page=${page}&${searchParams}`)
          .then(r => {
            if (r.ok) {
              return r.json();
            }
          })
          .then(obj =>
            this.setState({ searchResults: obj.hits, status: 'resolved' })
          )
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  normalizePrevQuery = prevProps => {
    const normalizedPrevQuery = prevProps.query
      ? prevProps.query.toLowerCase()
      : prevProps.query;
    return normalizedPrevQuery;
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { searchResults, status, error } = this.state;

    return (
      <>
        <ul className={css.ImageGallery}>
          {status === 'pending' && <p>Loading...</p>}

          {status === 'rejected' && <p>{error.message}</p>}

          {status === 'resolved' &&
            searchResults.map(result => {
              const { id, webformatURL, tags } = result;
              return (
                <ImageGalleryItem key={id} address={webformatURL} info={tags} />
              );
            })}
        </ul>
        {status === 'resolved' && (
          <Button type="button" onCLick={this.loadMore} />
        )}
      </>
    );
  }
}
