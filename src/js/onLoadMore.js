import fetchImages from '../js/fetch-images';
import renderMarkup from '../js/renderMarkup';
import {loadMoreBtn, page, perPage} from "./refs"

export default function onLoadMore() {
    page += 1;
   
    fetchImages(query, page)
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
      .catch(error => (error));
  }