import { Stack } from "expo-router";
import * as React from "react";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function DetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          //   animation: "fade",
          //   title: "Movies Directory",
          //   headerBackTitle: "Back",
          //   headerBackVisible: true,
          //   headerTintColor: "red",

          //   headerRight: () => <ThemeToggle />,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
