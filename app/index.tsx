import * as React from "react";
import { View, Image } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

export default function StartScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-card">
      <Image
        source={require("../assets/images/Theatre-Transparent.png")}
        className="flex-1 w-screen p-3"
      />
      <Text className="text-2xl font-semibold">Welcome to the Movie App.</Text>
      <Text className="text-xl font-semibold">
        Here you will find what's trending in the movie industry. With the help
        of TMDB, we are able to bring you the latest on movies avaiable to
        watch. Have a pleasant experience.
      </Text>
      <Button
        variant="outline"
        className="shadow shadow-foreground/5 mb-[30%]"
        onPress={() => router.push("/home")}
      >
        <Text>Let's Go</Text>
      </Button>
    </View>
  );
}
