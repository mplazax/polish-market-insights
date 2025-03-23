import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../store/hooks";

// Screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import CompanyDetailsScreen from "../screens/CompanyDetailsScreen";
import SectorDetailsScreen from "../screens/SectorDetailsScreen";

// Placeholder screens (to be implemented later)
const SearchResultsScreen = () => <></>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  const userLanguage = useAppSelector(
    (state) => state.user.data?.preferences.language
  );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0066cc",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: userLanguage === "pl" ? "Polski Rynek" : "Polish Market",
        }}
      />
      <Stack.Screen
        name="CompanyDetails"
        component={CompanyDetailsScreen}
        options={{
          title: userLanguage === "pl" ? "Szczegóły Firmy" : "Company Details",
        }}
      />
      <Stack.Screen
        name="SectorDetails"
        component={SectorDetailsScreen}
        options={{
          title: userLanguage === "pl" ? "Szczegóły Sektora" : "Sector Details",
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          title:
            userLanguage === "pl" ? "Wyniki Wyszukiwania" : "Search Results",
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  const userLanguage = useAppSelector(
    (state) => state.user.data?.preferences.language
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0066cc",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
          title: userLanguage === "pl" ? "Start" : "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          title: userLanguage === "pl" ? "Obserwowane" : "Watchlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: userLanguage === "pl" ? "Ustawienia" : "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
