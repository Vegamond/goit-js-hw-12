import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");

let lightbox = null;

export function createGallery(images) {
  const html = images
    .map(
      (img) => `
    <div class="card gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" class="gallery-images">
      </a>
      <div class="info">
        <p class="name">Likes<span class="value">${img.likes}</span></p>
        <p class="name">Views<span class="value">${img.views}</span></p>
        <p class="name">Comments<span class="value">${img.comments}</span></p>
        <p class="name">Downloads<span class="value">${img.downloads}</span></p>
      </div>
    </div>
  `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", html);

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
}

export function showLoader(initial = true) {
  loader.classList.add("is-visible");
  if (initial) {
    loader.classList.add("initial");
    loader.classList.remove("load-more");
  } else {
    loader.classList.add("load-more");
    loader.classList.remove("initial");
  }
}

export function hideLoader() {
  loader.classList.remove("is-visible", "initial", "load-more");
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = "block";
}
export function hideLoadMoreButton() {
  loadMoreBtn.style.display = "none";
}
