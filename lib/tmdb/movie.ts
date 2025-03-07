import { Movie, MovieDetail } from "~/types/types";

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
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
      API_OPTIONS
    );
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
    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
