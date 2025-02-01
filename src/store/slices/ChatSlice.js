import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/config";
import { message } from "antd";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (queryParams = {}, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        `/api/v1//fetch-users?${new URLSearchParams(queryParams)}`
      );
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);
export const AddContact = createAsyncThunk(
  "users/addContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(`/api/v1/add-contact`, data);
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);
export const getUerContacts = createAsyncThunk(
  "users/getContact",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(`/api/v1/contacts/${userId}`);
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);
export const startConversation = createAsyncThunk(
  "users/startConversation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(`/api/v1/create-conversation`, {
        participants: data,
      });
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);
export const getConversationById = createAsyncThunk(
  "users/startConversationId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(`/api/v1/get-conversation/${id}`);
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);
export const getConversationMessagesById = createAsyncThunk(
  "users/startConversationmessaages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        `/api/v1/get-conversation-messages/${id}`
      );
      return response?.data;
    } catch (err) {
      message.error(err.response?.data?.error);
      return;
    }
  }
);

const initialState = {
  users: [],
  chatID: null,
  isLoading: false,
  userContacts: [],
  chat: [],
  conversations: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload?.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(AddContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(AddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.message) {
          message.success(action.payload?.message);
        }
      })
      .addCase(AddContact.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUerContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUerContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userContacts = action.payload;
        if (action?.payload?.message) {
          message.success(action.payload?.message);
        }
      })
      .addCase(getUerContacts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(startConversation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(startConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatID = action.payload;
        if (action.payload.message) {
          message.success(action.payload?.message);
        }
      })
      .addCase(startConversation.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getConversationById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getConversationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
        if (action.payload.message) {
          message.success(action.payload?.message);
        }
      })
      .addCase(getConversationById.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getConversationMessagesById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getConversationMessagesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
        if (action.payload.message) {
          message.success(action.payload?.message);
        }
      })
      .addCase(getConversationMessagesById.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default chatSlice.reducer;
