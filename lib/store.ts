// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/uiSlice';
import searchReducer from './features/searchSlice';

import appDataReducer from './features/toolSlice';
import activeToolReducer from './features/activeToolSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    
    appData: appDataReducer,
    search: searchReducer,
    activeTool: activeToolReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore non-serializable actions if needed
      //   // ignoredActions: ['yourActionType'],
      //   // ignoredPaths: ['yourSlice.nonSerializableField'],
        
      // },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
