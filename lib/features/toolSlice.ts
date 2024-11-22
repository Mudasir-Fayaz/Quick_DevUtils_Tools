// store/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataState, ToolCategory } from '@/types';

const initialState: DataState = {
  categories: [],  // This will hold the full list of tool categories and tools
  filteredCategories: [],  // This holds the filtered list based on search
};

const dataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    // Action to set the full categories list
    setCategories(state, action: PayloadAction<ToolCategory[]>) {
      state.categories = action.payload;
      state.filteredCategories = action.payload;
    },
    // Action to set the filtered list based on search results
    setFilteredCategories(state, action: PayloadAction<ToolCategory[]>) {
      state.filteredCategories = action.payload;
    },
  },
 
    
});

export const { setCategories, setFilteredCategories } = dataSlice.actions;
export default dataSlice.reducer;
