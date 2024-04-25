import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/apiSlice";
import contactsReducer from "./features/contacts/contactsSlice";
import { contactsApi } from "./features/contacts/contactsApi";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    contact: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, contactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
