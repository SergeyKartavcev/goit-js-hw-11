import  fetchImages  from '../js/fetch-images';
import  renderMarkup  from '../js/renderMarkup';
 import Notiflix from 'notiflix';
 import SimpleLightbox from "simplelightbox";
 import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')


let query = "";
let page = 1;
let perPage = 40;
const lightbox = new SimpleLightbox('.gallery a')
searchForm.addEventListener('submit', onSearchForm)

export default function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
   loadMoreBtn.classList.add('is-hidden')

       if (query === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
           return
          }
  
  fetchImages(query, page, perPage)
      .then(({ data }) => {
          if (data.totalHits === 0) {
            Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
          } else {
            console.log(data.hits)
            renderMarkup(data.hits)
              lightbox.refresh()
              Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
               if (data.totalHits > perPage) {
                   loadMoreBtn.classList.remove('is-hidden')
                                       }
              }
        })
  .catch(error => console.log(error))
}
