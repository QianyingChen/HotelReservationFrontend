import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Hotel = {
    id?: number; 
    hotelName: string;
    streetName: string;
    postalCode: string;
    phoneNumber:string;
    email:string;
    description:String;
    rating: number;
}

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
      findAllHotels: builder.query<Hotel[], void>({
        query: () => '/hotels',
      }),
      findHotelById: builder.query<Hotel, number>({
        query: (id) => `/hotels/${id}`,
      }),
      createHotel: builder.mutation<Hotel, Hotel>({
        query: (hotel) => ({
          method: 'POST',
          url: '/hotels',
          body: hotel,
        }),
      }),
      updateHotel: builder.mutation<Hotel, Hotel>({
        query: (hotel) => ({
          method: 'PUT',
          url: `/hotels/${hotel.id}`,
          body: hotel,
        }),
      }),
      deleteHotel: builder.mutation<void, number>({
        query: (id) => ({
          method: 'DELETE',
          url: `/hotels/${id}`,
        }),
      }),
    }),
  });
  
  export const {
    useFindAllHotelsQuery,
    useFindHotelByIdQuery,
    useCreateHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
  } = hotelApi;