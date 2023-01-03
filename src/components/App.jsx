import { Component } from 'react';
import css from './App.module.css';
import { fetchSearchResults } from '../services/services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    searchResults: [],
    error: '',
    status: 'idle',
    page: 1,
    showModal: false,
    largeImgURL: '',
    info: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' });

      fetchSearchResults(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({ status: 'idle' });
            return;
          }

          const images = this.getNormalizedImages(data.hits);

          this.setState(prev => ({
            searchResults: [...prev.searchResults, ...images],
            status: 'resolved',
            error: '',
          }));
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  handleSubmit = query => this.setState({ query, page: 1, searchResults: [] });

  getNormalizedImages = array => {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  modalHandler = (largeURL = '', alt = '') => {
    this.setState({
      largeImgURL: largeURL,
      info: alt,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { searchResults, status, error, showModal, largeImgURL, info } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>{error}</p>}
        {searchResults.length > 0 && (
          <ImageGallery results={searchResults} onClick={this.modalHandler} />
        )}
        {status === 'resolved' && (
          <Button type="button" onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal
            largeurl={largeImgURL}
            info={info}
            onClose={this.modalHandler}
          />
        )}
      </div>
    );
  }
}
