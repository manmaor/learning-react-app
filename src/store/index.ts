import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter'
import taskBoardReducer from './TaskBoard'
import { persist } from './persist'
import { persistStore, createMigrate } from "redux-persist";

export const store = configureStore({
    reducer: {
       counter: counterReducer,
       taskBoard: persist({key: 'persist'}, taskBoardReducer),
    }
});

export const persistor = persistStore(store)



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>