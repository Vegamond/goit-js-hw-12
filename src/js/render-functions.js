// створити екземляр сімпл лайт бокс для роботи з модальним вікном

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
let lightbox = null;

export function createGallery(images) {
  const htmlToInsert = images
    .map(
      (image) =>
        `<div class="card">
              <a href=${image.largeImageURL}><img src="${image.webformatURL}" alt="${image.tags}" class="gallery-images"></a>
              <div class="info">
                <p class="name">Likes<span class="value">${image.likes}</span></p>
                <p class="name">Views<span class="value">${image.views}</span></p>
                <p class="name">Comments<span class="value">${image.comments}</span></p>
                <p class="name">Downloads<span class="value">${image.downloads}</span></p>
              </div>
            </div>`
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", htmlToInsert);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = "";
  //очищає вміст контейнера галереї. нічого не повертає
}

export function showLoader() {
  loader.classList.add("is-visible");
  //додає клас для відображення лоадера. нічого не повертає
}

export function hideLoader() {
  loader.classList.remove("is-visible");
  //прибирає клас для відображення лоадера. нічого не повертає
}
