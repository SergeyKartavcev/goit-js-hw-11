import fetchImages from '../js/fetch-images';
import renderMarkup from '../js/renderMarkup';
import {loadMoreBtn, page, perPage,query} from "./refs"


 export default function onLoadMore () {
    page +=1
    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                loadMoreBtn.classList.add('is-hidden')
               
            } else {
             
              renderMarkup(data.hits)
                 if (data.totalHits > perPage) {
                    loadMoreBtn.classList.add('is-hidden')
                    Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                                         }
                }
          })
    .catch(error => error)
  }