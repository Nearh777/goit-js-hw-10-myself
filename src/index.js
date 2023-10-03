import SlimSelect from 'slim-select';


import { fetchBreeds } from "./cat-api";

//  https://api.thecatapi.com/v1/breeds
// https://api.thecatapi.com/v1/images/search?api_key=live_i3NAY7BaD2LktPyUjeSgJbe2AKuKqeSp9qAobJvv2uUxhKTD55QwmlyrWz8VQ08z

//  https://api.thecatapi.com/v1/breeds?api_key=live_i3NAY7BaD2LktPyUjeSgJbe2AKuKqeSp9qAobJvv2uUxhKTD55QwmlyrWz8VQ08z


const search = document.querySelector('.breed-select')

new SlimSelect({
  select: '.breed-select'
})

// search.addEventListener('change', onChangeBreedsCet);

// function onChangeBreedsCet(e) {
//     console.log(e.currentTarget.value)
    
// }
let storedBreeds = []

fetchBreeds().then(data => {
    data = data.filter(img => img.image?.url != null)
    storedBreeds = data;
    
     for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     //skip any breeds that don't have an image
     if(!breed.image)continue
     
    //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
document.getElementById('breed_selector').appendChild(option);
    
    }
   //show the first breed by default
   showBreedImage(0)

 
}).catch(err => console.log(err));




function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
  document.getElementById("breed_json").textContent= storedBreeds[index].temperament
  
  
  document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url
  document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url
}