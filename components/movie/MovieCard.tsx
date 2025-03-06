import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Text } from "./../ui/text";
import { Movie } from "~/types/types";

import { useMovieContext } from "~/lib/tmdb/movieContext";
import CoverCard from "./CoverCard";

const MovieCard = () => {
  const { movies } = useMovieContext();

  const renderItem = ({ item }: { item: Movie }) => <CoverCard movie={item} />;

  return (
    <View>
      <Text>Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        initialNumToRender={19}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
