import axios from "axios";

export async function getMovieData(movieId) {
  const API = `https://www.omdbapi.com/?apikey=ef927dda`;
  return await axios
    .get(`${API}&i=${movieId}`)
    .then((responce) => responce.data);
}
