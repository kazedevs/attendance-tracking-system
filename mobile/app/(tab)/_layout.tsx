import { Tabs, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../components/Header";
import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isScannerTab = pathname === "/scanner";

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2B8C4F"
        translucent={false}
      />
      {!isScannerTab && <Header />}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2B8C4F",
          tabBarInactiveTintColor: "#A0AEC0",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 54 + insets.bottom,
            paddingBottom: insets.bottom / 2,
            ...(Platform.OS === "ios" && {
              borderTopWidth: 0.2,
              borderTopColor: "rgba(0,0,0,0.1)",
            }),
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginBottom: 2,
            fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
          },
          tabBarItemStyle: {
            paddingVertical: 2,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="dashboard" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="scanner"
          options={{
            title: "Scanner",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="qrcode" color={color}/>
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 54 + insets.bottom,
              paddingBottom: insets.bottom / 2,
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="bell" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
