import { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Stack
        screenOptions={{
          headerStyle: {},
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
