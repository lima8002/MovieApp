import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import MovieCard from "~/components/movie/MovieCard";
import { Input } from "~/components/ui/input";
import { useMovieContext } from "~/lib/tmdb/movieContext";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const MovieScreen = () => {
  const { onFetchMovies, search } = useMovieContext();
  const { isDarkColorScheme } = useColorScheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleTextChange = (text: string) => {
    setSearchTerm(text);
    setIsSearching(text.length > 0);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      onFetchMovies(4, searchTerm);
    } else {
      onFetchMovies(4, ""); //added this to get no results
    }
  }, [searchTerm]);

  return (
    <View className="flex-1">
      <ScrollView className="pl-5 pr-5">
        <View className="flex-row items-center mt-5">
          <Input
            placeholder="Search"
            className="flex-1" // Take up available space
            onChangeText={handleTextChange}
            value={searchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} className="ml-2">
              <Image
                source={require("assets/images/close.png")}
                tintColor={
                  isDarkColorScheme
                    ? NAV_THEME.dark.primary
                    : NAV_THEME.light.primary
                }
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Display search results */}
        {isSearching && search.length > 0 && (
          <MovieCard type={4} query={searchTerm} />
        )}

        {!isSearching && (
          <>
            <MovieCard type={0} />
            <MovieCard type={2} />
            <MovieCard type={3} />
            <MovieCard type={1} />
          </>
        )}
        <View className="pb-20" />
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
