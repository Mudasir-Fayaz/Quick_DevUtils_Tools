// store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '@/types';

const initialState: SearchState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Action to update the search term
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
