import { combineReducers, configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { productAPI } from './api/productAPI';

const APIS = [productAPI];

const apiReducers = APIS.reduce((acc, { reducerPath, reducer }) => {
  return {
    ...acc,
    [reducerPath]: reducer,
  };
}, {});

const reducers = combineReducers({
  ...apiReducers,
});

const middlewares = APIS.map(({ middleware }) => middleware);

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares as ThunkMiddleware[]),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
