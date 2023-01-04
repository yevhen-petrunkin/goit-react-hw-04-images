import { useEffect, useReducer } from 'react';
import css from './App.module.css';

import { fetchSearchResults, reducer } from '../services/services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    query: '',
    searchResults: [],
    error: '',
    status: 'idle',
    page: 1,
    showModal: false,
    largeImgURL: '',
    info: '',
  });

  const {
    query,
    page,
    searchResults,
    status,
    error,
    showModal,
    largeImgURL,
    info,
  } = state;

  useEffect(() => {
    if (query === '') {
      return;
    }
    dispatch({ type: 'setStatus', status: 'pending' });

    fetchSearchResults(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          dispatch({ type: 'setStatus', status: 'idle' });
          return;
        }

        const images = getNormalizedImages(data.hits);

        dispatch({
          type: 'renderResults',
          searchResults: images,
          status: 'resolved',
          error: '',
        });
      })
      .catch(error =>
        dispatch({
          type: 'showError',
          error: error.message,
          status: 'rejected',
        })
      );
  }, [query, page]);

  function handleSubmit(query) {
    dispatch({ type: 'handleSubmit', query, page: 1, searchResults: [] });
  }

  function getNormalizedImages(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  function loadMore() {
    dispatch({ type: 'loadMore', page: page + 1 });
  }

  function modalHandler(largeURL = '', alt = '') {
    dispatch({ type: 'handleModal', largeImgURL: largeURL, info: alt });
    toggleModal();
  }

  function toggleModal() {
    dispatch({ type: 'toggleModal', showModal: !showModal });
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>{error}</p>}
      {searchResults.length > 0 && (
        <ImageGallery results={searchResults} onClick={modalHandler} />
      )}
      {status === 'resolved' && <Button type="button" onClick={loadMore} />}
      {showModal && (
        <Modal largeUrl={largeImgURL} info={info} onClose={modalHandler} />
      )}
    </div>
  );
};
