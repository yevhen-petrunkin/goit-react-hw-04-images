import css from './ImageGallery.module.css';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ results }) => {
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
            onClick={this.modalHandler}
          />
        );
      })}
    </ul>
  );
};

// state = {
//   searchResults: [],
//   error: null,
//   status: 'idle',
//   page: 1,
//   showModal: false,
//   image: '',
//   info: '',
// };

// componentDidUpdate(prevProps, prevState) {
//   const { query } = this.props;
//   const { searchResults, page } = this.state;

//   if (this.normalizePrevQuery(prevProps) !== query.toLowerCase()) {
//     this.setState({ status: 'pending' });
//     if (!query) {
//       this.setState({ status: 'idle' });
//       return;
//     }
//     fetchSearchResults(query, page)
//       .then(obj => {
//         if (obj.hits.length === 0) {
//           this.setState({ status: 'idle' });
//           return;
//         }
//         this.setState({
//           searchResults: obj.hits,
//           status: 'resolved',
//         });
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   }

//   if (prevState.page !== page) {
//     this.setState({ status: 'pending' });
//     fetchSearchResults(query, page)
//       .then(obj =>
//         this.setState({
//           searchResults: [...searchResults, ...obj.hits],
//           status: 'resolved',
//         })
//       )
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   }
// }

// normalizePrevQuery = prevProps => {
//   const normalizedPrevQuery = prevProps.query
//     ? prevProps.query.toLowerCase()
//     : prevProps.query;
//   return normalizedPrevQuery;
// };

// fetchSearchResults = (base, query, page, params) => {
//   return fetch(`${base}?q=${query}&page=${page}&${params}`).then(r => {
//     if (r.ok) {
//       return r.json();
//     }
//   });
// };

// loadMore = () => {
//   this.setState({ page: this.state.page + 1 });
// };

// modalHandler = evt => {
//   this.setState({
//     image: evt.target.getAttribute('image'),
//     info: evt.target.alt,
//   });
//   this.toggleModal();
// };

// toggleModal = () => {
//   this.setState(({ showModal }) => ({ showModal: !showModal }));
// };
