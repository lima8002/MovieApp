import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "./../ui/text";
import { Movie } from "~/types/types";
import { useRouter } from "expo-router";
import { useMovieContext } from "~/lib/tmdb/movieContext";
import { TYPE_CLASS } from "~/lib/constants";
import CoverCard from "./CoverCard";

const MovieCard = ({ type }: { type: number }) => {
  const { moviesPopular, moviesNowPlaying, moviesTopRated, moviesUpComing } =
    useMovieContext();
  const router = useRouter();
  let data;
  let title;
  switch (type) {
    case 0:
      data = moviesPopular;
      title = TYPE_CLASS[type].name;
      break;

    case 1:
      data = moviesNowPlaying;
      title = TYPE_CLASS[type].name;
      break;

    case 2:
      data = moviesTopRated;
      title = TYPE_CLASS[type].name;
      break;

    case 3:
      data = moviesUpComing;
      title = TYPE_CLASS[type].name;
      break;

    default:
      break;
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
      <CoverCard poster_path={item.poster_path} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text className="text-xl">{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id.toString() +
          new Date().getTime().toString() +
          new Date().getMilliseconds().toString()
        }
        horizontal
        initialNumToRender={19}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
