import { configureStore } from '@reduxjs/toolkit';
import { hotelApi } from './api/hotelApi';
import { userApi } from './api/userApi';


const store = configureStore({
    reducer: {
        [hotelApi.reducerPath]: hotelApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        // And other reducers
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(hotelApi.middleware)
            .concat(userApi.middleware),
});

export default store;
