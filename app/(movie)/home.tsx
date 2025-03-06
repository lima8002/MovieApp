import React from "react";
import { View } from "react-native";
import MovieCard from "~/components/movie/MovieCard";

const MovieScreen = () => {
  return (
    <View className="gap-5 p-6 bg-secondary/30">
      <MovieCard />
    </View>
  );
};

export default MovieScreen;
