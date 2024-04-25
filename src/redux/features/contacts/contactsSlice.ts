import { createSlice } from "@reduxjs/toolkit";

export type TContact = {
  _id?: string;
  name: string;
  email?: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  isFavorite: boolean;
};

const initialState: TContact = {
  name: "John Doe",
  email: "",
  phoneNumber: "1234567890",
  address: "123 Main St",
  profilePicture: "",
  isFavorite: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactsData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetContactsData: () => initialState,
  },
});

export const { setContactsData, resetContactsData } = contactsSlice.actions;

export default contactsSlice.reducer;
