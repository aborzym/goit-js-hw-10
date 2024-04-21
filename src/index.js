import { fetchBreeds, fetchCatByBreed, getCatPhotoByBreed } from './cat-api';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
	'live_i91leozVNIE98NugOCrDU2RPcZl4xEUJguzWlynsfs5mQeJI4TAskccLiIN1comy';

const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const display = document.querySelector('div.cat-info');
select.classList.add('hidden');
error.classList.add('hidden');

fetchBreeds()
	.then((data) => {
		select.innerHTML = data.map(
			(item) => `<option value="${item.id}">${item.name}</option>`
		);
		select.classList.remove('hidden');
		loader.classList.add('hidden');
	})
	.catch()
	.finally();

select.addEventListener('change', (ev) => {
	let catData = {};
	const breedID = ev.target.value;
	getCatPhotoByBreed(breedID)
		.then((photo) => {
			catData.url = photo[0].url;
		})
		.catch();
	fetchCatByBreed(breedID)
		.then((catDescription) => {
			const { name, description, temperament } = catDescription;
			catData.name = name;
			catData.description = description;
			catData.temperament = temperament;
		})
		.catch();
});

// innerHTML:

// `<img
// 				class="cat-info__photo"
// 				src="${catData.url}"
// 				alt="cat image"
// 			/><div class="cat-info__description">
// 				<h2 class="cat-name">${catData.name}</h2>
// 				<p class="cat-description">
// 					${catData.description}
// 				</p>
// 				<p class="cat-temperament">
// 					<span class="cat-temperament__name">Temperament: </span>${catData.description}
// 				</p>`;
