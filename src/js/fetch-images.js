 import axios from "axios";
 axios.defaults.baseURL = 'https://pixabay.com/api/';
 const KEY = '29432649-8ecc53e09c3218583a5f8b5f1';

export default async function fetchImages(query, page, perPage){
const response = await axios.get(`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}&per_page=${perPage}`)
return response

}

