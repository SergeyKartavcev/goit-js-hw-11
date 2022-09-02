import fetchImages from './js/fetch-images';
import renderMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchForm, gallery, loadMoreBtn, page, perPage } from './js/refs';
import onLoadMore from './js/onLoadMore'
const lightbox = new SimpleLightbox('.gallery a').refresh();
searchForm.addEventListener('submit', onSearchForm);


let newSerchQuery = "";

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

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
       
      }
    })
    .catch(error => console.log(error));
}

loadMoreBtn.addEventListener('click', onLoadMore)

 