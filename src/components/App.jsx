import { useEffect, useState } from 'react';
import css from './App.module.css';

import { fetchSearchResults } from '../services/services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');

    fetchSearchResults(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          setStatus('idle');
          return;
        }

        const images = getNormalizedImages(data.hits);

        setSearchResults(prev => [...prev, ...images]);
        setStatus('resolved');
        setError('');
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [query, page]);

  function handleSubmit(newQuery) {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setSearchResults([]);
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
    setPage(page + 1);
  }

  function modalHandler(largeURL = '', alt = '') {
    setLargeImgURL(largeURL);
    setInfo(alt);
    toggleModal();
  }

  function toggleModal() {
    setShowModal(!showModal);
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
