import React from "react";
import { View, Image } from "react-native";
import { Card, CardFooter } from "../ui/card";
import { Text } from "./../ui/text";
import { Movie } from "~/types/types";

const CoverCard = ({ movie }: { movie: Movie }) => {
  return (
    <View className="p-1">
      <Card className="h-[187.5] overflow-hidden">
        <Image
          source={
            movie.poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
              : require("~/assets/images/no-movie.png")
          }
          width={125}
          height={187.5}
        />

        {/* <Text>
          ⭐️ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} •{" "}
          {movie.original_language.toUpperCase()} •{" "}
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </Text> */}
      </Card>
    </View>
  );
};

export default CoverCard;
