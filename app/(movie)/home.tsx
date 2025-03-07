import React from "react";
import { ScrollView, View } from "react-native";
import MovieCard from "~/components/movie/MovieCard";

const MovieScreen = () => {
  return (
    <ScrollView className="gap-5 p-6 bg-secondary/30">
      <MovieCard type={1} />
      <MovieCard type={2} />
      <MovieCard type={0} />
      <MovieCard type={3} />
      <View className="pb-20" />
    </ScrollView>
  );
};

export default MovieScreen;
