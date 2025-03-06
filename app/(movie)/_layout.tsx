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
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
