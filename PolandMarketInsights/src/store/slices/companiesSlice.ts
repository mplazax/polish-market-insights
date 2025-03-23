import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Company, SearchQuery } from "../../types";

// Example async thunk for fetching companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    // In a real app, this would be an API call to the KRS database
    const response = await new Promise<Company[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Sample Polish Company",
            krsNumber: "KRS0000123456",
            address: "ul. Example 123, 00-000 Warsaw",
            industry: "Technology",
            legalStatus: "Active",
            financials: {
              revenue: [1200000, 1500000, 1800000],
              profit: [200000, 300000, 450000],
              years: ["2020", "2021", "2022"],
              profitMargin: [16.7, 20, 25],
              marketShare: 5.2,
            },
          },
          {
            id: "2",
            name: "Another Polish Business",
            krsNumber: "KRS0000789012",
            address: "ul. Sample 456, 00-000 Krakow",
            industry: "Retail",
            legalStatus: "Active",
          },
        ]);
      }, 1000);
    });
    return response;
  }
);

export const searchCompanies = createAsyncThunk(
  "companies/searchCompanies",
  async (query: SearchQuery) => {
    // In a real app, this would search the KRS database
    const response = await new Promise<Company[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Sample Polish Company",
            krsNumber: "KRS0000123456",
            address: "ul. Example 123, 00-000 Warsaw",
            industry: "Technology",
            legalStatus: "Active",
          },
        ]);
      }, 500);
    });
    return response;
  }
);

interface CompaniesState {
  items: Company[];
  searchResults: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  items: [],
  searchResults: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<Company[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies";
      })
      .addCase(searchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchCompanies.fulfilled,
        (state, action: PayloadAction<Company[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search companies";
      });
  },
});

export const { clearSearchResults } = companiesSlice.actions;
export default companiesSlice.reducer;
