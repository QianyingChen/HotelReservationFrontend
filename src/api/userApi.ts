import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from "../store";

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    // API endpints
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => '/users'
        }),
        getUserById: builder.query<User, number>({
            query: id => `users/${id}`
        }),
        createUser: builder.mutation<User, User>({
            query:(user) => {
                return {
                    method: 'POST',
                    url:'users',
                    body: user
                }
            }
        }),
        updateUser: builder.mutation<User, User>({
            query: user => ({
                method:'PUT',
                url:`/users/${user.id}`,
                body: user
            })
        }),
        deleteUser: builder.mutation<void, number>({
            query: id => {
                return {
                    method: 'DELETE',
                    url:`/users/${id}`
                }
            }
        })
    })
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;