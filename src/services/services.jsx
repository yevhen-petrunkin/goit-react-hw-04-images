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
