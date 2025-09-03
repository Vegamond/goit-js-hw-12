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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ message: "Please enter a search term" });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader(true);

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({ message: "No images found" });
      return;
    }

    createGallery(data.hits);

    if (totalHits > perPage) showLoadMoreButton();
  } catch {
    iziToast.error({ message: "Something went wrong" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader(false);

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page < totalPages) showLoadMoreButton();
    else
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });

    smoothScroll();
  } catch {
    iziToast.error({ message: "Something went wrong" });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector(".gallery-item");
  if (card) {
    const { height } = card.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
  }
}
