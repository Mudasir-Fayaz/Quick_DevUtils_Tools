// store/activeToolSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveToolState } from '@/types';

const initialState: ActiveToolState = {
  slug: null, // No tool selected by default
};

const activeToolSlice = createSlice({
  name: 'activeTool',
  initialState,
  reducers: {
    // Action to set the active tool by slug
    setActiveTool(state, action: PayloadAction<string | string[] | undefined | null>) {
      state.slug = action.payload;
    },
    // Action to clear the active tool
    clearActiveTool(state) {
      state.slug = null;
    },
  },
});

export const { setActiveTool, clearActiveTool } = activeToolSlice.actions;
export default activeToolSlice.reducer;
