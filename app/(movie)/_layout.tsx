import { Stack } from "expo-router";
import * as React from "react";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function MovieLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          animation: "fade",
          title: "Movies Directory",
          headerBackTitle: "Back",
          headerBackVisible: true,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="(detail)"
        options={{
          title: "Movie Detail",
          headerBackTitle: "Back",
          headerBackVisible: true,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
