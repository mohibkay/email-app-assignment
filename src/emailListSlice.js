import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "emailStates",
  storage,
  whitelist: ["emailStatus", "selectedEmail"],
};

const initialState = {
  list: [],
  emailStatus: [],
  selectedEmail: null,
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
      const emailIndex = state.emailStatus.findIndex(
        (item) => item.id === action.payload
      );

      if (emailIndex !== -1) {
        state.emailStatus[emailIndex].isRead = true;
      } else {
        state.emailStatus.push({
          id: action.payload,
          isRead: true,
          isFavorite: false,
        });
      }
    },
    toggleFavoriteStatus: (state, action) => {
      const emailIndex = state.emailStatus.findIndex(
        (item) => item.id === action.payload
      );

      if (emailIndex !== -1) {
        state.emailStatus[emailIndex].isFavorite =
          !state.emailStatus[emailIndex].isFavorite;
      } else {
        state.emailStatus.push({
          id: action.payload,
          isRead: false,
          isFavorite: true,
        });
      }
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
  },
});

export const {
  setList,
  toggleReadStatus,
  toggleFavoriteStatus,
  setSelectedEmail,
} = emailListSlice.actions;

export default emailListSlice.reducer;
