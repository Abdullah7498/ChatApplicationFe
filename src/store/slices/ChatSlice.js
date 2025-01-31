import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (queryParams = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/users?${new URLSearchParams(queryParams)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  chatID: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    addChatId(state, action) {
      state.chatID = action.chatID;
    },
  },
});

export const { addChatId } = chatSlice.actions;
export default chatSlice.reducer;
