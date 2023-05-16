import { configureStore } from '@reduxjs/toolkit';
import { hotelApi } from './api/hotelApi';


const store = configureStore({
    reducer: {
        [hotelApi.reducerPath]: hotelApi.reducer,
        // And other reducers
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
});

export default store;
