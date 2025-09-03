//functions for HTTP запитів
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
  key: "52056130-db9fbcb72f3bb5afb21255a47",
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

export default function getImageByQuery(query) {
  return axios
    .get("", { params: { q: query } })
    .then((response) => response.data.hits);
}
