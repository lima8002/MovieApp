import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "./../ui/text";
import { Movie } from "~/types/types";
import { useRouter } from "expo-router";
import { useMovieContext } from "~/lib/tmdb/movieContext";
import CoverCard from "./CoverCard";

const MovieCard = () => {
  const { movies } = useMovieContext();
  const router = useRouter();

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
      <CoverCard poster_path={item.poster_path} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        initialNumToRender={19}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
