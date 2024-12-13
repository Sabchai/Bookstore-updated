import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  favoriteBooks: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const bookExists = state.favoriteBooks.some(fav => fav._id === action.payload._id);
      
      if (bookExists) {
        Swal.fire({
          title: 'Already in Favorites',
          text: 'You cannot add this book again!',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      } else {
        state.favoriteBooks.push(action.payload);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Book added to your favorites!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    removeFavorite: (state, action) => {
      state.favoriteBooks = state.favoriteBooks.filter(fav => fav._id !== action.payload._id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Book removed from your favorites!',
        showConfirmButton: false,
        timer: 1500,
      });
    },

    clearFavorites: (state) => {
      state.favoriteBooks = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'All favorites cleared!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
