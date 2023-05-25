import { configureStore } from '@reduxjs/toolkit';
import { hotelApi } from './api/hotelApi';
import { userApi } from './api/userApi';
import { reservationApi } from './api/reservationApi';


const store = configureStore({
    reducer: {
        [hotelApi.reducerPath]: hotelApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer
        // And other reducers
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(hotelApi.middleware)
            .concat(userApi.middleware)
            .concat(reservationApi.middleware)
});

export default store;
