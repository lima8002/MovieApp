import { CastDetail, Movie, MovieDetail } from "~/types/types";
import { TYPE_CLASS } from "../constants";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

interface TMDBResponse {
  dates?: [];
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (type: number, query?: string) => {
  console.log("here---> " + TYPE_CLASS[type].fetch);
  let fetchType = TYPE_CLASS[type].fetch;
  console.log("fetchType " + fetchType);
  console.log("query " + query);

  const endpoint =
    fetchType === "query"
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query || "")}`
      : `${API_BASE_URL}/movie/${fetchType}?language=en-US&page=1`;

  try {
    const response = await fetch(endpoint, API_OPTIONS);
    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetail = async (id: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}?language=en-US&page=1`,
      API_OPTIONS
    );
    const movie: MovieDetail = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCastDetail = async (id: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/credits?language=en-US`,
      API_OPTIONS
    );
    const cast: CastDetail = await response.json();
    return cast;
  } catch (error) {
    console.log(error);
  }
};
