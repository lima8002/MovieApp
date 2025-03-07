import { createContext, useContext, useState, useEffect } from "react";
import { CastDetail, Movie, MovieDetail } from "~/types/types";
import { fetchMovieDetail, fetchMovies, fetchMovieCastDetail } from "./movie";

interface MovieContextType {
  isLoading: boolean;
  movies: Movie[];
  onFetchMovies: () => void;
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [castDetail, setCastDetail] = useState<CastDetail>();

  const onFetchMovies = () => {
    setIsLoading(true);
    fetchMovies()
      .then((result) => {
        if (result) {
          setMovies(result);
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
    onFetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        movies,
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
