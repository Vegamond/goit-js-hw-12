import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get("", {
    params: {
      key: "52056130-db9fbcb72f3bb5afb21255a47", // встав свій ключ
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}
