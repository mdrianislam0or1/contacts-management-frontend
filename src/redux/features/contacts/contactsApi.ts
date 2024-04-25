import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TResponseRedux } from "../../../types";
import { TContact } from "./contactsSlice";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (contactsData) => ({
        url: "/add-contact",
        method: "POST",
        body: contactsData,
      }),
    }),

    getSingleContact: builder.query<TResponseRedux<TContact>, string>({
      query: (contactId) => ({
        url: `/contact/${contactId}`,
        method: "GET",
      }),
    }),

    updateContact: builder.mutation({
      query: ({ contactId, contactsData }) => ({
        url: `/update-contact/${contactId}`,
        method: "PUT",
        body: contactsData,
      }),
    }),

    markAsFavorite: builder.mutation({
      query: ({ contactId, markAsFavoriteData }) => ({
        url: `/mark-as-favorite/${contactId}`,
        method: "PUT",
        body: markAsFavoriteData,
      }),
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/delete-contact/${contactId}`,
        method: "DELETE",
      }),
    }),

    getAllContacts: builder.query<TResponseRedux<TContact[]>, void>({
      query: () => ({
        url: "/get-contacts",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetAllContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useGetSingleContactQuery,
  useMarkAsFavoriteMutation,
} = contactsApi;
