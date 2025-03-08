import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import CoverCard from "~/components/movie/CoverCard";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useMovieContext } from "~/lib/tmdb/movieContext";
import { CastArray } from "~/types/types";

const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    isLoading,
    movieDetail,
    castDetail,
    onFetchMovieDetail,
    onFetchMovieCastDetail,
  } = useMovieContext();
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    setHeaderHeight(height);
    setHeaderWidth(width);
  };

  useEffect(() => {
    onFetchMovieDetail(parseInt(id));
    onFetchMovieCastDetail(parseInt(id));
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  const renderItem = ({ item }: { item: CastArray }) => {
    return (
      <View className="mr-3 max-h-[435] max-w-[125] min-h-[187.5] min-w-[125] pb-10">
        <Card className="mr-5 overflow-hidden max-h-[187.5] max-w-[125] min-h-[187.5] min-w-[125]">
          {item?.profile_path ? (
            <Image
              className="w-[125] h-[187.5]"
              source={
                item?.profile_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500/${item?.profile_path}`,
                    }
                  : undefined
              }
            />
          ) : (
            <View className="bg-gray-300 max-h-[187.5] max-w-[125] min-h-[187.5] min-w-[125] justify-center items-center">
              <Image
                source={require("assets/images/avatar.png")}
                style={{ width: 96, height: 96 }}
                tintColor={"gray"}
              />
            </View>
          )}
        </Card>
        <Text
          className="text-xl h-full mb-5"
          style={{ height: "100%", width: "100%" }}
        >
          {item?.name}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      onLayout={onLayout}
      style={{
        minHeight: 750,
        maxHeight: headerHeight + 350,
        paddingBottom: 500,
      }}
    >
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
                  {movieDetail?.release_date && (
                    <Text className="text-2xl">
                      ({movieDetail?.release_date.slice(0, 4)}){" "}
                    </Text>
                  )}
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="text-xl"
                  style={{ height: "auto", width: "80%" }}
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
                  style={{ height: "auto", width: "78%" }}
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
          <View className="pr-2 pl-2">
            <Text className="text-2xl pt-2">Overview:</Text>
            <Text className="text-xl">{movieDetail?.overview}</Text>

            <View>
              <Text className="text-2xl mt-1">Extras:</Text>
              {movieDetail?.production_companies[0] && (
                <Text className="text-xl">
                  Studio: {movieDetail?.production_companies[0].name},{" "}
                  {movieDetail?.production_companies[0].origin_country}
                </Text>
              )}
              <Text className="text-xl">
                Release date: {movieDetail?.release_date.slice(8, 10)}-
                {movieDetail?.release_date.slice(5, 7)}-
                {movieDetail?.release_date.slice(0, 4)}
              </Text>
              <Text className="text-xl">
                Budget: ${movieDetail?.budget.toLocaleString("en-US") || "0"}.00
              </Text>
              <Text className="text-xl">
                Revenue: ${movieDetail?.revenue.toLocaleString("en-US") || "0"}
                .00
              </Text>
            </View>
            <View className="h-[290] mb-2 overflow-auto">
              {castDetail && castDetail?.cast.length > 0 ? (
                <Text className="text-2xl pt-2">Cast:</Text>
              ) : undefined}
              <FlatList
                data={castDetail?.cast}
                renderItem={renderItem}
                keyExtractor={(index, id) => index.toString() + id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View className="pb-40" />
    </ScrollView>
  );
};

export default DetailScreen;
