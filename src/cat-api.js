

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const API_KEY =
    'live_i3NAY7BaD2LktPyUjeSgJbe2AKuKqeSp9qAobJvv2uUxhKTD55QwmlyrWz8VQ08z';

  return fetch(`${BASE_URL}?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

export { fetchBreeds };
