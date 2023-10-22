import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const emailListSlice = createSlice({
  name: "emailList",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload.map((email) => ({
        ...email,
        isRead: false,
        isFavorite: false,
      }));
    },
    toggleReadStatus: (state, action) => {
      const email = state.list.find((item) => item.id === action.payload);
      if (email) {
        email.isRead = !email.isRead;
      }
    },
    toggleFavoriteStatus: (state, action) => {
      const email = state.list.find((item) => item.id === action.payload);
      if (email) {
        email.isFavorite = !email.isFavorite;
      }
    },
  },
});

export const { setList, toggleReadStatus, toggleFavoriteStatus } =
  emailListSlice.actions;

export default emailListSlice.reducer;
