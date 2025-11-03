import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";
import iziToast from "izitoast";

const form = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more-btn");

let query = "";
let page = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({ message: "Please enter a search term" });
    return;
  }

  // Скидання стану для нового пошуку
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  // Початкове завантаження (центральний лоадер)
  showLoader(true);

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({ message: "No images found" });
      hideLoader(); // важливо: гарантовано сховати перед раннім return
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({ message: "Something went wrong" });
    hideLoadMoreButton();
  } finally {
    hideLoader(); // завжди ховаємо лоадер
  }
}

async function onLoadMore() {
  page += 1;

  // Під час догрузки — ховаємо кнопку, показуємо лоадер під кнопкою
  hideLoadMoreButton();
  showLoader(false);

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    // Плавний скрол на 2 висоти картки
    smoothScroll();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({ message: "Something went wrong" });
    // Дати змогу повторити спробу
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector(".gallery-item");
  if (!card) return;
  const { height } = card.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: "smooth" });
}
