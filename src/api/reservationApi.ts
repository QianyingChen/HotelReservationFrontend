import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Reservation = {
    map(arg0: (reservation: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id?:number;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    bookingDate: string;
    totalPrice: number;
    reservationStatus: string;
    roomId?: number;
    userId?:number;
  }

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        getAllReservations: builder.query<Reservation[], void>({
            query: () => '/reservations'
        }),
        getReservationById: builder.query<Reservation[], number>({
            query: id => `/reservations/${id}`
        }),
        getReservationsByUserId: builder.query<Reservation, number>({
            query: userId => `/reservations/users/${userId}`
        }),
        createReservation: builder.mutation<Reservation, Reservation>({
            query: (reservation) => {
                return {
                    method: 'POST',
                    url: '/reservations',
                    body: reservation
                }
            }
        }),
        updateReservation: builder.mutation<Reservation, Reservation>({
            query: reservation => {
                return {
                    method: 'PUT',
                    url: `/reservations/${reservation.id}`,
                    body: reservation
                }
            }
        }),
        deleteReservation: builder.mutation<void, number>({
            query: id => {
                return {
                    method: 'DELETE',
                    url: `/reservations/${id}`
                }
            }
        })

    })
});

export const {
    useGetAllReservationsQuery,
    useGetReservationByIdQuery,
    useGetReservationsByUserIdQuery,
    useCreateReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation
} = reservationApi;