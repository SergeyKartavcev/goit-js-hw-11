import card from '../template/card.hbs'



const galleryEl = document.querySelector('.gallery');

export default function renderMarkup(images) {
   const markup = card(images)

    galleryEl.insertAdjacentHTML('beforeend', markup)
}

