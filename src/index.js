import fetchImages from './js/fetch-images';
import renderMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import{searchForm,gallery,loadMoreBtn,page,perPage,} from "./js/refs"
// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let page = 1;
// let perPage = 40;
// let newSerchQuery = '';

const lightbox = new SimpleLightbox('.gallery a').refresh();
searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  //  newSerchQuery = e.currentTarget.searchQuery.value.trim();;
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
        console.log(data.hits);
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

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  page += 1;
 
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderMarkup(data.hits);
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      if (data.totalHits < perPage) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'We `re sorry, but you`ve reached the end of search results.'
        );
      }
    })
    .catch(error => error);
}
