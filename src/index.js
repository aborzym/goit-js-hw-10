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
		select.classList.remove('hidden');
		loader.classList.add('hidden');
		select.innerHTML = data.map(
			(item) => `<option value="${item.id}">${item.name}</option>`
		);
	})
	.catch((err) => {
		loader.classList.add('hidden');
		error.classList.remove('hidden');
		console.error('Error', err);
		throw error;
	});

select.addEventListener('change', (ev) => {
	if (!display.classList.contains('hidden')) display.classList.add('hidden');
	let catData = {};
	const breedID = ev.target.value;
	loader.classList.remove('hidden');
	const promiseA = getCatPhotoByBreed(breedID)
		.then((photo) => {
			catData.url = photo[0].url;
		})
		.catch((err) => {
			loader.classList.add('hidden');
			error.classList.remove('hidden');
			console.error('Error', err);
			throw error;
		});
	const promiseB = fetchCatByBreed(breedID)
		.then((catDescription) => {
			const { name, description, temperament } = catDescription;
			catData.name = name;
			catData.description = description;
			catData.temperament = temperament;
		})
		.catch((err) => {
			loader.classList.add('hidden');
			error.classList.remove('hidden');
			console.error('Error', err);
			throw error;
		});
	Promise.all([promiseA, promiseB]).then(() => {
		loader.classList.add('hidden');

		display.innerHTML = `<img
				class="cat-info__photo"
				src="${catData.url}"
				alt="cat image"
			/><div class="cat-info__description">
				<h2 class="cat-name">${catData.name}</h2>
				<p class="cat-description">
					${catData.description}
				</p>
				<p class="cat-temperament">
					<span class="cat-temperament__name">Temperament: </span>${catData.temperament}
				</p>`;
	});
});
