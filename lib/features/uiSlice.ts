// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  toolActive: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
  modalOpen: false,
  toolActive: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    toggleActiveTool(state) {
      state.toolActive = !state.toolActive;
    },
    setActiveTool(state, action: PayloadAction<boolean>) {
      state.toolActive = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleModal, setModalOpen, toggleActiveTool, setActiveTool } = uiSlice.actions;
export default uiSlice.reducer;
