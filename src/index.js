import fetchImages, { variables } from './js/fetch-images';
import renderMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchForm, gallery, loadMoreBtn } from './js/refs';

const lightbox = new SimpleLightbox('.gallery a').refresh();

searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  let newserchQuery = e.currentTarget.searchQuery.value.trim();
  if (newserchQuery === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  if (newserchQuery === variables.query) {
    Notiflix.Notify.failure('sdfkjhfjakef');
    return;
  }

  variables.page = 1;
  variables.query = newserchQuery;
  fetchImages(variables.query, variables.page, variables.per_page)
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
    .catch(error => Notiflix.Notify.warning(error));
  variables.page = 1;
  variables.query = e.currentTarget.searchQuery.value.trim();
}

function onLoadMore() {
  variables.page += 1;
  fetchImages(variables.query, variables.page, variables.per_page)
    .then(({ data }) => {
      renderMarkup(data.hits);
      lightbox.refresh();

      const totalPages = Math.ceil(data.totalHits / variables.per_page);
      if (variables.page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'We are sorry, but you have reached the end of search results.'
        );
        if (data.totalHits <= variables.per_page) {
          loadMoreBtn.classList.add('is-hidden');
          Notiflix.Notify.failure(
            'We are sorry, but you have reached the end of search results.'
          );
        }
      }
    })
    .catch(error => Notiflix.Notify.warning(error));
}

loadMoreBtn.addEventListener('click', onLoadMore);
