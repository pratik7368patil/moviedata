import axios from "axios";

export async function getResult(movieName) {
  const API = `https://www.omdbapi.com/?apikey=ef927dda`;
  return await axios
    .get(`${API}&s=${movieName}`)
    .then((responce) => responce.data);
}
