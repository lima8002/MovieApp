import { createContext, useContext, useState, useEffect } from "react";
import { CastDetail, Movie, MovieDetail } from "~/types/types";
import { fetchMovieDetail, fetchMovies, fetchMovieCastDetail } from "./movie";

interface MovieContextType {
  isLoading: boolean;
  moviesPopular: Movie[];
  moviesNowPlaying: Movie[];
  moviesTopRated: Movie[];
  moviesUpComing: Movie[];
  search: Movie[];
  onFetchMovies: (type: number, query?: string) => void;
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
  const [search, setSearch] = useState<Movie[]>([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [castDetail, setCastDetail] = useState<CastDetail>();

  const onFetchMovies = async (type: number, query?: string) => {
    setIsLoading(true);

    console.log("another === > ", type, "query---> ", query);
    try {
      const result = await fetchMovies(type, query);
      if (result) {
        switch (type) {
          case 0:
            setMoviesPopular(result);
            break;
          case 1:
            setMoviesNowPlaying(result);
            break;
          case 2:
            setMoviesTopRated(result);
            break;
          case 3:
            setMoviesUpComing(result);
            break;
          case 4:
            setSearch(result);
            break;
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
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
        search,
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
