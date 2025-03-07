import { useLocalSearchParams } from "expo-router";
import { Link } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, ImageBackground } from "react-native";
import CoverCard from "~/components/movie/CoverCard";
import { Text } from "~/components/ui/text";
import { useMovieContext } from "~/lib/tmdb/movieContext";
import { MovieDetail } from "~/types/types";

// import GENRE_IDS from "~/lib/constants"

const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movieDetail, onFetchMovieDetail } = useMovieContext();

  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    setHeaderHeight(height);
    setHeaderWidth(width);
  };

  useEffect(() => {
    onFetchMovieDetail(parseInt(id));
  }, []);

  return (
    <ScrollView onLayout={onLayout} style={{ height: 750 }}>
      <ImageBackground
        style={{
          width: headerWidth,
          height: headerHeight,
        }}
        imageStyle={{ opacity: 0.25 }}
        source={
          movieDetail?.backdrop_path
            ? {
                uri: `https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`,
              }
            : undefined
        }
      >
        <View className="h-full p-3 ">
          <View className="flex-row">
            <View className="pr-3">
              <CoverCard poster_path={movieDetail?.poster_path || ""} />
            </View>
            <View className="flex-col align-bottom justify-end ">
              <View className="flex-row">
                <Text
                  className="text-3xl"
                  style={{ height: "auto", width: "85%" }}
                >
                  {movieDetail?.title}{" "}
                  <Text className="text-2xl">
                    ({movieDetail?.release_date.slice(0, 4)}){" "}
                  </Text>
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="text-xl"
                  style={{ height: "auto", width: "85%" }}
                >
                  {movieDetail?.genres.map(
                    (genre, index) =>
                      genre.name +
                      (index < movieDetail.genres.length - 1 ? " • " : "")
                  )}
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="text-xl italic"
                  style={{ height: "auto", width: "85%" }}
                >
                  {movieDetail?.tagline}
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="text-xl"
                  style={{ height: "auto", width: "85%" }}
                >
                  {"⭐️ "}
                  {movieDetail?.vote_average.toFixed(1)}
                  {" • "}
                  {movieDetail?.original_language.toUpperCase()}
                  {" • "}
                  {movieDetail?.origin_country[0]}
                  {" • "}
                  {movieDetail?.runtime} min
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-2xl pt-2">Overview:</Text>
          <Text className="text-xl">{movieDetail?.overview}</Text>

          <Text className="text-2xl pt-2">Studio:</Text>
          <Text className="text-xl">
            {movieDetail?.production_companies[0].name},{" "}
            {movieDetail?.production_companies[0].origin_country}
          </Text>
          <Text className="text-xl">
            Release date: {movieDetail?.release_date.slice(8, 10)}-
            {movieDetail?.release_date.slice(5, 7)}-
            {movieDetail?.release_date.slice(0, 4)}
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default DetailScreen;
