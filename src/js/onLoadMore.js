import fetchImages from '../js/fetch-images';
import renderMarkup from '../js/renderMarkup';
// import {loadMoreBtn, page, per_Page} from "./refs"
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;

let query = "";

const lightbox = new SimpleLightbox('.gallery a').refresh();


 export default   function onLoadMore() {
   page += 1;
   fetchImages(page)
            .then(({ data }) => {
            if (totalHits > per_Page) {
                loadMoreBtn.classList.remove('is-hidden')
                renderMarkup(data.hits)
                lightbox.refresh()
                Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                }
                if(totalHits< per_Page){
                  loadMoreBtn.classList.add('is-hidden')
                  Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                }
            })
    .catch(error => console.log(error))
}