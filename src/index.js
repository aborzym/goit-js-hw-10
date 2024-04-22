import { fetchBreeds, fetchCatByBreed, getCatPhotoByBreed } from './cat-api';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
	'live_i91leozVNIE98NugOCrDU2RPcZl4xEUJguzWlynsfs5mQeJI4TAskccLiIN1comy';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const display = document.querySelector('div.cat-info');

fetchBreeds()
	.then((data) => {
		loader.classList.add('hidden');
		select.innerHTML = data.map(
			(item) => `<option value="${item.id}">${item.name}</option>`
		);
	})
	.catch((err) => {
		loader.classList.add('hidden');
		select.classList.add('hidden');
		Notify.failure('Oops! Something went wrong! Try reloading the page!');
		console.error('Error', err);
		throw error;
	});

select.addEventListener('change', (ev) => {
	display.classList.add('hidden');
	let catData = {};
	const breedId = ev.target.value;
	loader.classList.remove('hidden');
	const promiseA = getCatPhotoByBreed(breedId)
		.then((photo) => {
			catData.url = photo[0].url;
		})
		.catch((err) => {
			select.classList.add('hidden');
			loader.classList.add('hidden');
			Notify.failure(
				`Oops! Something went wrong! Try reloading the page! (Error downloading photo)`
			);
			console.error('Error downloading photo.)', err);
			throw error;
		});
	const promiseB = fetchCatByBreed(breedId)
		.then((catDescription) => {
			const { name, description, temperament } = catDescription;
			catData.name = name;
			catData.description = description;
			catData.temperament = temperament;
		})
		.catch((err) => {
			loader.classList.add('hidden');
			Notify.failure(
				`Oops! Something went wrong! Try reloading the page! (Error downloading cat info.)`
			);
			console.error('Error downloading cat info', err);
			throw error;
		});
	Promise.all([promiseA, promiseB])
		.then(() => {
			display.classList.remove('hidden');
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
		})
		.catch((err) => {
			loader.classList.add('hidden');
			console.error('Error', err);
			// throw error;
		});
});
