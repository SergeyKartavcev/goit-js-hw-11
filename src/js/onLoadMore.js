import  fetchImages  from '../js/fetch-images';
import  renderMarkup  from '../js/renderMarkup';
import Notiflix from 'notiflix';

const loadMoreBtn = document.querySelector('.load-more')
loadMoreBtn.addEventListener('click', onLoadMore)

let query = "";
let page = 1;
let perPage = 40;

export default function onLoadMore () {
    page +=1
    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
              Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
            } else {
              console.log(data.hits)
              renderMarkup(data.hits)
                 if (data.totalHits > perPage) {
                     loadMoreBtn.classList.remove('is-hidden')
                                         }
                }
          })
    .catch(error => console.log(error))
  }