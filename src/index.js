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
	console.log(ev.target.value);
});
//te poniżej są, żeby sprawdzić, czy działa
getCatPhotoByBreed('awir').then((data) => {
	console.log(data[0].url);
});

fetchCatByBreed('awir').then((cat) => {
	console.log(cat.name);
});
