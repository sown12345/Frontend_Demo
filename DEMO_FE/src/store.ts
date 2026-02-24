import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer: { user: userReducer },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

