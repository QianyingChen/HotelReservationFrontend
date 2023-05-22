import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Hotel = {
  hotelId?: number; 
  hotelName: string;
  streetName: string;
  postalCode: string;
  phoneNumber:string;
  email:string;
  description:string;
  rating: number;
  imageUrl:string,
  location:{
    locationId?:number,
    city:string,
    stateProvince:string
    country:string
  }
}

export type Room = {
  roomId?:number;
  roomType:string;
  roomDescription:string;
  price:number;
  availability:boolean;
  reservationId?:number;
  hotelId?:number;
  imageUrl:string;
}

export type Amenities={
  amenitiesId?:number,
  amenitiesType:string,
  hotel:{
    hotelId?: number; 
    hotelName: string;
    streetName: string;
    postalCode: string;
    phoneNumber:string;
    email:string;
    description:string;
    rating: number;
    imageUrl:string,
    location:{
      locationId?:number,
      city:string,
      stateProvince:string
      country:string
    }
  }
}


export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
      getAllHotels: builder.query<Hotel[], void>({
        query: () => '/hotels',
      }),
      getHotelsByLocation: builder.query<Hotel[], String>({
        query: (locationName) => `/hotels/${locationName}`,
      }),
      getAllRoomsInHotel:builder.query({
        query: (hotelId) => `/hotels/${hotelId}/rooms`,
      }),
      
      getAllAmenitiesInHotel:builder.query({
        query: (hotelId) => `/hotels/${hotelId}/amenities`,
      }),   
    }),
  });


  
  export const {
    useGetAllHotelsQuery,
    useGetHotelsByLocationQuery,
    useGetAllRoomsInHotelQuery,
    useGetAllAmenitiesInHotelQuery,
    
  } = hotelApi;