import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';




import { fetchBreeds, fetchCatByBreed } from "./cat-api";




const search = document.querySelector('.breed-select');
const containerCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
containerCatInfo.classList.add('is-hidden');

let storedBreeds = [];




fetchBreeds().then(data => {
    
    data.forEach(element => {
      storedBreeds.push({text: element.name, value: element.id});
  });

    new SlimSelect({
      select: search,
      data: storedBreeds  
    })
}).catch(onFetchError);

search.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    search.classList.add('is-hidden');
    containerCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        search.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        containerCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        containerCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};





function onFetchError(error) {
  search.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px'
  });
};