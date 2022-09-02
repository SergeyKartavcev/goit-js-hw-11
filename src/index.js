import fetchImages from './js/fetch-images';
import renderMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// import { searchForm, gallery, loadMoreBtn, page, perPage } from './js/refs';
import onLoadMore from './js/onLoadMore'
const lightbox = new SimpleLightbox('.gallery a').refresh();

searchForm.addEventListener('submit', onSearchForm);

// let newSerchQuery = "";
let page = 1;

let query = "";
let newSerchQuery="";
function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
 
  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
if (newSerchQuery===e.currentTarget.searchQuery.value.trim()){
  Notiflix.Notify.failure("dkwwcwem")
  return
}
newSerchQuery===e.currentTarget.searchQuery.value.trim()
  fetchImages(query, page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.innerHTML = '';
        renderMarkup(data.hits);
       
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        
        if (data.totalHits > 40) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

// searchForm.addEventListener('submit', newRequest);
// function newRequest(e){
//   if(newSerchQuery===e.currentTarget.elements.value){
//       Notiflix.Notify.failure("samcacmas")
//       return
//      }
//      newSerchQuery===e.currentTarget.elements.value;
// }

 loadMoreBtn.addEventListener('click', onLoadMore)

