import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  data: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  data: {
    id: "user1",
    watchlist: {
      companies: [],
      sectors: [],
    },
    preferences: {
      language: "pl",
      notifications: true,
    },
  },
  isLoggedIn: true, // For demo purposes, in a real app this would be false initially
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      if (state.data) {
        state.data.preferences.language =
          state.data.preferences.language === "pl" ? "en" : "pl";
      }
    },
    toggleNotifications: (state) => {
      if (state.data) {
        state.data.preferences.notifications =
          !state.data.preferences.notifications;
      }
    },
    addCompanyToWatchlist: (state, action: PayloadAction<string>) => {
      if (
        state.data &&
        !state.data.watchlist.companies.includes(action.payload)
      ) {
        state.data.watchlist.companies.push(action.payload);
      }
    },
    removeCompanyFromWatchlist: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.watchlist.companies = state.data.watchlist.companies.filter(
          (id) => id !== action.payload
        );
      }
    },
    addSectorToWatchlist: (state, action: PayloadAction<string>) => {
      if (
        state.data &&
        !state.data.watchlist.sectors.includes(action.payload)
      ) {
        state.data.watchlist.sectors.push(action.payload);
      }
    },
    removeSectorFromWatchlist: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.watchlist.sectors = state.data.watchlist.sectors.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

export const {
  toggleLanguage,
  toggleNotifications,
  addCompanyToWatchlist,
  removeCompanyFromWatchlist,
  addSectorToWatchlist,
  removeSectorFromWatchlist,
} = userSlice.actions;

export default userSlice.reducer;
