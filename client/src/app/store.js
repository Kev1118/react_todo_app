import { configureStore } from "@reduxjs/toolkit";
import  { apiSlice  } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'

import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    // whitelist: ['authReducer.token'],
    version: 1,
    storage,
    
}

const reducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
})

// const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({serializableCheck:{ignoreActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]}}).concat(apiSlice.middleware),
        devTools: true
})