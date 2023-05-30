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

export  type SignUpFormData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
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
        getUserByUsername:builder.query<User, string>({
            query: username => `users/username/${username}`
        }),
        getUserIdByUsername: builder.query<number, string>({
            query: (username) => `users//username/${username}/userId`,
        }),

         createUser: builder.mutation<User, SignUpFormData>({
            query:(user) => {
                return {
                    method: 'POST',
                    url:'/users',
                    body: user
                }
            }
        }),
        // createUser: builder.mutation<any, SignUpFormData>({
        //     query: (data) => ({
        //       url: '/users',
        //       method: 'POST',
        //       body: data,
        //     }),
        //     transformResponse: (response: Response) => {  
        //       if (!response.ok) {
        //         return response.text();  // return text instead of JSON
        //       }
        //       return response.json();
        //     }
        //   }),

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
        }),
        logInUser: builder.mutation<User, SignInFormData>({
            query: (formData) => ({
              method: 'POST',
              url: '/users/login',
              body: formData
            })
        })
    })
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    // useGetUserByUsernameQuery,
    // useGetUserIdByUsernameQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSignInUserMutation,
    useLogInUserMutation,
} = userApi;