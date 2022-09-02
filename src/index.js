import fetchImages from './js/fetch-images';
import renderMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


const lightbox = new SimpleLightbox('.gallery a').refresh();

searchForm.addEventListener('submit', onSearchForm);

 
let page = 1;
let per_Page = 40;
let query = "";

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

  fetchImages(query, page, per_Page)
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




 function onLoadMore(){
 page += 1
        fetchImages(query, page, per_Page)
            .then(({ data }) => {
              renderMarkup(data.hits)
            lightbox.refresh()
        
        const totalPages = Math.ceil(data.totalHits / perPage)
                if (page > totalPages) {
                
                loadMoreBtn.classList.add('is-hidden')
            

                Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                }
            })
    .catch(error => (error))
}

 loadMoreBtn.addEventListener('click', onLoadMore)

