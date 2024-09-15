import { createSlice } from '@reduxjs/toolkit';
import { getFavorites, removeFavorite } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
};

const recipesSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
        state.items = payload.recipeData;
        state.total = payload.metaData.total;
        state.isLoading = false;
      })
      .addCase(getFavorites.pending, state => {
        state.isLoading = true;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, { payload }) => {
        state.items = payload.recipeData;
        state.total = payload.metaData.total;
        state.isLoading = false;
      })
      .addCase(removeFavorite.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const favoritesReducer = recipesSlice.reducer;
