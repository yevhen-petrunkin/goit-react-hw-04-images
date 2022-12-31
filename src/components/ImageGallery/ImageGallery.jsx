import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from '../Modal/Modal';

const BASE = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '32466560-6eda1bf61b5bca3a99277a0be',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class ImageGallery extends Component {
  state = {
    searchResults: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    image: '',
    info: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { searchResults, page } = this.state;

    if (this.normalizePrevQuery(prevProps) !== query.toLowerCase()) {
      this.setState({ status: 'pending' });
      if (!query) {
        this.setState({ status: 'idle' });
        return;
      }
      this.fetchSearchResults(BASE, query, page, searchParams)
        .then(r => {
          if (r.ok) {
            return r.json();
          }
        })
        .then(obj => {
          if (obj.hits.length === 0) {
            this.setState({ status: 'idle' });
            return;
          }
          this.setState({
            searchResults: obj.hits,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      this.fetchSearchResults(BASE, query, page, searchParams)
        .then(r => {
          if (r.ok) {
            return r.json();
          }
        })
        .then(obj =>
          this.setState({
            searchResults: [...searchResults, ...obj.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  normalizePrevQuery = prevProps => {
    const normalizedPrevQuery = prevProps.query
      ? prevProps.query.toLowerCase()
      : prevProps.query;
    return normalizedPrevQuery;
  };

  fetchSearchResults = (base, query, page, params) => {
    return fetch(`${base}?q=${query}&page=${page}&${params}`);
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  modalHandler = evt => {
    this.setState({
      image: evt.target.getAttribute('image'),
      info: evt.target.alt,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { searchResults, status, error, showModal, image, info } = this.state;

    return (
      <>
        {status === 'pending' && <Loader />}

        <ul className={css.ImageGallery}>
          {status === 'rejected' && <p>{error.message}</p>}

          {status === 'resolved' &&
            searchResults.map(result => {
              const { id, webformatURL, largeImageURL, tags } = result;
              return (
                <ImageGalleryItem
                  key={id}
                  address={webformatURL}
                  info={tags}
                  image={largeImageURL}
                  onClick={this.modalHandler}
                />
              );
            })}
        </ul>
        {status === 'resolved' && (
          <Button type="button" onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal image={image} info={info} onClick={this.toggleModal} />
        )}
      </>
    );
  }
}
