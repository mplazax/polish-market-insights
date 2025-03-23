import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sector } from "../../types";

export const fetchSectors = createAsyncThunk(
  "sectors/fetchSectors",
  async () => {
    // Mock API call - would be a real API call to GUS or other data source
    const response = await new Promise<Sector[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Technology",
            companies: ["1"],
            trends: {
              growthRate: 12.5,
              averageRevenue: 2500000,
              averageProfitMargin: 18.3,
            },
          },
          {
            id: "2",
            name: "Retail",
            companies: ["2"],
            trends: {
              growthRate: 3.2,
              averageRevenue: 5800000,
              averageProfitMargin: 5.7,
            },
          },
          {
            id: "3",
            name: "Manufacturing",
            companies: [],
            trends: {
              growthRate: 2.1,
              averageRevenue: 12500000,
              averageProfitMargin: 8.2,
            },
          },
        ]);
      }, 1000);
    });
    return response;
  }
);

interface SectorsState {
  items: Sector[];
  loading: boolean;
  error: string | null;
}

const initialState: SectorsState = {
  items: [],
  loading: false,
  error: null,
};

const sectorsSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSectors.fulfilled,
        (state, action: PayloadAction<Sector[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sectors";
      });
  },
});

export default sectorsSlice.reducer;
