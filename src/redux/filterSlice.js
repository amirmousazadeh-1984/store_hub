import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  selectedMake: [],
  selectedColor: [],
  sortOption: "",
  minPrice: "",
  maxPrice: "",
  selectedType: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedMake: (state, action) => {
      state.selectedMake = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const {
  setSelectedType,
  setSearchQuery,
  setSelectedMake,
  setSelectedColor,
  setSortOption,
  setMinPrice,
  setMaxPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
