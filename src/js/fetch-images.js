 import axios from "axios";
 
export const variables = {
   page :1,
   per_page: 40,
   query: ""
 }


 const baseURL =  axios.defaults.baseURL = 'https://pixabay.com/api/'
 const KEY = '29432649-8ecc53e09c3218583a5f8b5f1';
 export default async function fetchImages(query, page){
   

    const params = {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
         per_page: 40,
         page: 1
        
    };
    return await axios.get('/', {params})

}


