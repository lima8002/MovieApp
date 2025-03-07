import React from "react";
import { View, Image } from "react-native";
import { Card } from "../ui/card";
import { Movie } from "~/types/types";
import { useRouter } from "expo-router";

const CoverCard = ({ poster_path }: { poster_path: string }) => {
  const router = useRouter();
  return (
    <View className="p-1">
      <Card className="h-[187.5] overflow-hidden">
        <Image
          className="w-[125] h-[187.5]"
          source={
            poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                }
              : require("~/assets/images/no-movie.png")
          }
        />
      </Card>
    </View>
  );
};

export default CoverCard;
