import axios from 'axios';

//Napisz funkcję fetchBreeds(), która wysyła żądanie HTTP i zwraca obietnicę z tablicą ras - wynikiem żądania. Umieść ją w pliku cat-api.js i dokonaj nazwanego eksportu.

export function fetchBreeds() {
	return axios.get('https://api.thecatapi.com/v1/breeds').then((breeds) => {
		return breeds.data;
	});
}

//Napisz funkcję fetchCatByBreed(breedId), która oczekuje identyfikatora rasy, wykonuje żądanie HTTP i zwraca obietnicę z danymi o kocie - wynikiem żądania. Umieść ją w pliku cat-api.js i dokonaj nazwanego eksportu.

export function fetchCatByBreed(breedId) {
	return axios.get('https://api.thecatapi.com/v1/breeds').then((breeds) => {
		return breeds.data.find((el) => el.id === breedId);
	});
	// .catch((error) => {
	// 	console.error('Error downloading cat data', error);
	// 	throw error;
	// });
}

export function getCatPhotoByBreed(breedId) {
	return axios
		.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
		.then((info) => {
			return info.data;
		});
	// .catch((error) => {
	// 	console.error('Error downloading photo', error);
	// 	throw error;
	// });
}
