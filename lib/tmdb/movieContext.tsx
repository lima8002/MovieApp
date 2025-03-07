import { createContext, useContext, useState, useEffect } from "react";
import { CastDetail, Movie, MovieDetail } from "~/types/types";
import { fetchMovieDetail, fetchMovies, fetchMovieCastDetail } from "./movie";

interface MovieContextType {
  isLoading: boolean;
  moviesPopular: Movie[];
  moviesNowPlaying: Movie[];
  moviesTopRated: Movie[];
  moviesUpComing: Movie[];
  onFetchMovies: (type: number) => void;
  movieDetail?: MovieDetail;
  onFetchMovieDetail: (id: number) => void;
  castDetail?: CastDetail;
  onFetchMovieCastDetail: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
  const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie[]>([]);
  const [moviesTopRated, setMoviesTopRated] = useState<Movie[]>([]);
  const [moviesUpComing, setMoviesUpComing] = useState<Movie[]>([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [castDetail, setCastDetail] = useState<CastDetail>();

  const onFetchMovies = (type: number) => {
    setIsLoading(true);
    fetchMovies(type)
      .then((result) => {
        if (type === 0 && result) {
          setMoviesPopular(result);
        } else if (type === 1 && result) {
          setMoviesNowPlaying(result);
        } else if (type === 2 && result) {
          setMoviesTopRated(result);
        } else if (type === 3 && result) {
          setMoviesUpComing(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFetchMovieDetail = (id: number) => {
    setIsLoading(true);
    fetchMovieDetail(id)
      .then((result) => {
        if (result) {
          setMovieDetail(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFetchMovieCastDetail = (id: number) => {
    setIsLoading(true);
    fetchMovieCastDetail(id)
      .then((result) => {
        if (result) {
          setCastDetail(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onFetchMovies(0);
    onFetchMovies(1);
    onFetchMovies(2);
    onFetchMovies(3);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        moviesPopular,
        moviesNowPlaying,
        moviesTopRated,
        moviesUpComing,
        onFetchMovies,
        movieDetail,
        onFetchMovieDetail,
        castDetail,
        onFetchMovieCastDetail,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
