

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_i3NAY7BaD2LktPyUjeSgJbe2AKuKqeSp9qAobJvv2uUxhKTD55QwmlyrWz8VQ08z';



function fetchBreeds() {

  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
return fetch(`${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(resp => {
  if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
})
}

export { fetchBreeds, fetchCatByBreed };
