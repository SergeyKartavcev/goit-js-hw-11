 import axios from "axios";
 
 axios.defaults.baseURL = 'https://pixabay.com/api/'

 export default async function fetchImages(query, page){
   
 const KEY = '29432649-8ecc53e09c3218583a5f8b5f1';
    const params = {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_Page: 40
        
    };
 const response = await axios.get('/', {params})
console.log(response)
return response
}


