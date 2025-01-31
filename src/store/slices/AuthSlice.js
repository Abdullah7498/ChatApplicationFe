import { message } from "antd";
import { axiosMultipart, axiosSimple } from "../../api/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const SignUpApi = createAsyncThunk("SignUpApi", async (data) => {
  try {
    const respone = await axiosMultipart.post("api/v1/auth/signup", data);
    return respone.data;
  } catch (error) {
    message.error(error.response.data.data?.error);
  }
});
export const LoginApi = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosSimple.post("api/v1/auth/login", data);
    return response.data;
  } catch (error) {
    message.error(error.response.data.data?.error);
  }
});
export const VerifyOTPApi = createAsyncThunk("verifyOTP", async (data) => {
  try {
    const response = await axiosSimple.post("api/v1/auth/verify-otp", data);
    return response.data;
  } catch (error) {
    message.error(error.response.data.data?.error);
  }
});
export const ResetPasswordApi = createAsyncThunk(
  "resetPassword",
  async (data) => {
    try {
      const response = await axiosSimple.post(
        "api/v1/auth/reset-password",
        data
      );
      return response.data;
    } catch (error) {
      message.error(error.response.data.data?.error);
    }
  }
);
export const SendOtp = createAsyncThunk("sendOtp", async (data) => {
  try {
    const response = await axiosSimple.post("api/v1/auth/generate-otp", data);
    return response.data;
  } catch (error) {
    message.error(error.response.data.data?.error);
  }
});
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignUpApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(SignUpApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.message) {
        message.success(action?.payload?.data?.message);
      } else {
        message.error(action?.payload?.data?.error);
      }
    });
    builder.addCase(SignUpApi.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(LoginApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);

      if (action.payload.data?.message) {
        message.success(action?.payload?.data?.message);
        state.isAuthenticated = true;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      } else {
        message.error(action?.payload?.data?.error);
      }
    });
    builder.addCase(LoginApi.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(VerifyOTPApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(VerifyOTPApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.message) {
        message.success(action?.payload?.data?.message);
      } else {
        message.error(action?.payload?.data?.error);
      }
    });
    builder.addCase(VerifyOTPApi.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ResetPasswordApi.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ResetPasswordApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.message) {
        message.success(action?.payload?.data?.message);
      } else {
        message.error(action?.payload?.data?.error);
      }
    });
    builder.addCase(ResetPasswordApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(SendOtp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(SendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.message) {
        message.success(action?.payload?.data?.message);
      } else {
        message.error(action?.payload?.data?.error);
      }
    });
    builder.addCase(SendOtp.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
