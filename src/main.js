import getImageByQuery from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";

import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearGallery();

  if (!searchInput.value) {
    alert("Введіть слово для пошуку");
    return;
  }
  showLoader();
  const query = searchInput.value.toLowerCase();
  //query - пошукове слово, РЯДОК// 1) робимо  ннтп запит і повертаємо значення властивості data з отриманої відповіді сервера
  getImageByQuery(query)
    .then((images) => {
      if (images.length === 0) {
        iziToast.error({
          title: "Oops",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
        return;
      }
      createGallery(images);
    })
    .catch((err) => {
      console.error(err);
      iziToast.error({
        title: "Error",
        message: "Something went wrong. Try again later!",
        position: "topRight",
      });
    })
    .finally(() => {
      // Сховати лоадер після завершення запиту
      hideLoader();
    });
});
