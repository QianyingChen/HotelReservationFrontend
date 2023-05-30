import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export type User = {
    id: any;
    userId?: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface SignInFormData {
    username: string;
    password: string;
  }
  
  const apiUrl = import.meta.env.VITE_API_URL;
export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    // API endpints
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => '/users'
        }),
        getUserById: builder.query<User, number>({
            query: userId => `users/${userId}`
        }),
        createUser: builder.mutation<User, User>({
            query:(user) => {
                return {
                    method: 'POST',
                    url:'/users',
                    body: user
                }
            }
        }),
        updateUser: builder.mutation<User, User>({
            query: user => ({
                method:'PUT',
                url:`/users/${user.userId}`,
                body: user
            })
        }),
        deleteUser: builder.mutation<void, number>({
            query: userId => {
                return {
                    method: 'DELETE',
                    url:`/users/${userId}`
                }
            }
        }),
        signInUser: builder.mutation<User, SignInFormData>({
            query: (formData) => ({
              method: 'POST',
              url: '/users/signin',
              body: formData
            })
        })
    })
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSignInUserMutation
} = userApi;