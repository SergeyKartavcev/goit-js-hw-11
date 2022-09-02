const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let per_Page = 40;
let query = "";

export {searchForm,gallery,loadMoreBtn,page,per_Page,query,currentHits}