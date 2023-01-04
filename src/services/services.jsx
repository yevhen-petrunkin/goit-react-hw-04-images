const BASE = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '32466560-6eda1bf61b5bca3a99277a0be',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchSearchResults = (query, page) => {
  return fetch(`${BASE}?q=${query}&page=${page}&${searchParams}`).then(r => {
    if (r.ok) {
      return r.json();
    }
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setStatus':
      return { ...state, status: action.status };
    case 'renderResults':
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.searchResults],
        status: action.status,
        error: action.error,
      };
    case 'showError':
      return { ...state, error: action.error, status: action.status };
    case 'handleSubmit':
      return {
        ...state,
        query: action.query,
        page: action.page,
        searchResults: action.searchResults,
      };
    case 'loadMore':
      return { ...state, page: action.page };
    case 'handleModal':
      return {
        ...state,
        largeImgURL: action.largeImgURL,
        info: action.info,
      };
    case 'toggleModal':
      return { ...state, showModal: action.showModal };
    default:
      return;
  }
}
