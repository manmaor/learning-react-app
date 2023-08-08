
import { persistReducer, PersistState } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { Reducer, AnyAction } from 'redux'

// interface MyPersistReducer<T> {
//   t?: T,
//   _persist: PersistState
// }

export const persist = <T> (persistConfig: any, reducer: Reducer<T, AnyAction>) =>
  persistReducer<T>({ ...persistConfig, storage }, reducer); //as MyPersistReducer<T>;