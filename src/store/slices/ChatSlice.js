import { createSlice } from "@reduxjs/toolkit";

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
