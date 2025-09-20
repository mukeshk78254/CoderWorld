// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import axiosClient from './utils/axiosClient'

// // export const registerUser = createAsyncThunk(
// //   'auth/register',
// //   async (userData, { rejectWithValue }) => {
// //     try {
// //     const response =  await axiosClient.post('/user/register', userData);
// //     return response.data.user1;
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );


// // export const loginUser = createAsyncThunk(
// //   'auth/login',
// //   async (credentials, { rejectWithValue }) => {
// //     try {
// //       const response = await axiosClient.post('/user/login', credentials);
// //       return response.data.people1;
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // export const checkAuth = createAsyncThunk(
// //   'auth/check',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const { data } = await axiosClient.get('/user/check');
// //       return data.user;
// //     } catch (error) {
// //       if (error.response?.status === 401) {
// //         return rejectWithValue(null); // Special case for no session
// //       }
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // export const logoutUser = createAsyncThunk(
// //   'auth/logout',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       await axiosClient.post('/user/logout');
// //       return null;
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState: {
// //     user: null,
// //     isAuthenticated: false,
// //     loading: false,
// //     error: null
// //   },
// //   reducers: {
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Register User Cases
// //       .addCase(registerUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(registerUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.isAuthenticated = !!action.payload;
// //         state.user = action.payload;
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || 'Something went wrong';
// //         state.isAuthenticated = false;
// //         state.user = null;
// //       })
  
// //       // Login User Cases
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.isAuthenticated = !!action.payload;
// //         state.user = action.payload;
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || 'Something went wrong';
// //         state.isAuthenticated = false;
// //         state.user = null;
// //       })
  
// //       // Check Auth Cases
// //       .addCase(checkAuth.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(checkAuth.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.isAuthenticated = !!action.payload;
// //         state.user = action.payload;
// //       })
// //       .addCase(checkAuth.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || 'Something went wrong';
// //         state.isAuthenticated = false;
// //         state.user = null;
// //       })
  
// //       // Logout User Cases
// //       .addCase(logoutUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(logoutUser.fulfilled, (state) => {
// //         state.loading = false;
// //         state.user = null;
// //         state.isAuthenticated = false;
// //         state.error = null;
// //       })
// //       .addCase(logoutUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || 'Something went wrong';
// //         state.isAuthenticated = false;
// //         state.user = null;
// //       });
// //   }
// // });

// // export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient'

// // Helper function to extract serializable error data from AxiosError
// const getSerializableError = (error) => {
//   return {
//     message: error.message,
//     statusCode: error.response?.status,
//     data: error.response?.data, // This often contains the server's specific error message
//     // You can add other serializable parts if needed, e.g., error.code
//   };
// };

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//     const response =  await axiosClient.post('/user/register', userData);
//     return response.data.user;
//     } catch (error) {
//       // FIX: Return only serializable parts of the error
//       return rejectWithValue(getSerializableError(error));
//     }
//   }
// );


// // export const loginUser = createAsyncThunk(
// //   'auth/login',
// //   async (credentials, { rejectWithValue }) => {
// //     try {
// //       const response = await axiosClient.post('/user/login', credentials);
// //       return response.data.user;
// //     } catch (error) {
// //       // FIX: Return only serializable parts of the error
// //       return rejectWithValue(getSerializableError(error));
// //     }
// //   }
// // );
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials);
      
//       // ✅ FIX: Store the token received from backend
//       const { token, user } = response.data;
//       localStorage.setItem('token', token); // <------ VERY IMPORTANT

//       return user;
//     } catch (error) {
//       return rejectWithValue(getSerializableError(error));
//     }
//   }
// );
// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check');
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         return rejectWithValue(null); // Special case for no session, still serializable
//       }
//       // FIX: Return only serializable parts of the error
//       return rejectWithValue(getSerializableError(error));
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout');
//       return null;
//     } catch (error) {
//       // FIX: Return only serializable parts of the error
//       return rejectWithValue(getSerializableError(error));
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null // This error state will now always hold a serializable value
//   },
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register User Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         // FIX: Access serializable properties from the payload
//         // action.payload now contains { message, statusCode, data }
//         state.error = action.payload?.data || action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Login User Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         // FIX: Access serializable properties from the payload
//         state.error = action.payload?.data || action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Check Auth Cases
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.loading = false;
//         // FIX: Access serializable properties from the payload
//         state.error = action.payload?.data || action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Logout User Cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         localStorage.removeItem('token');
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         // FIX: Access serializable properties from the payload
//         state.error = action.payload?.data || action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   }
// });

// export default authSlice.reducer;




// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import axiosClient from './utils/axiosClient';

// // const extractErrorMessage = (error) => { return (error.response?.data?.message) || error.message || error.toString(); };

// // export const sendOtp = createAsyncThunk('auth/sendOtp', async (userData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/send-otp-for-registration', userData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const verifyOtpAndRegister = createAsyncThunk('auth/verifyOtpAndRegister', async (otpData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/verify-otp-and-register', otpData); return res.data.user; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/login', credentials); return res.data.user; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => { try { const { data } = await axiosClient.get('/user/check'); return data.user; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => { try { await axiosClient.post('/user/logout'); return null; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const forgotPasswordSendOtp = createAsyncThunk('auth/forgotPasswordSendOtp', async (emailData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/forgot-password-send-otp', emailData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const resetPasswordWithOtp = createAsyncThunk('auth/resetPasswordWithOtp', async (resetData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/reset-password-with-otp', resetData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const resendOtp = createAsyncThunk('auth/resendOtp', async (emailData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/send-otp-for-registration', emailData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});

// // const authSlice = createSlice({
// //     name: 'auth',
// //     initialState: {
// //         user: null, isAuthenticated: false, loading: false, error: null,
// //         otpSent: false, emailForVerification: null, resendLoading: false,
// //         forgotPasswordStep: 'idle', emailForReset: null, forgotPasswordLoading: false, successMessage: null,
// //     },
// //     reducers: {
// //         resetOtpState: (state) => { state.otpSent = false; state.error = null; state.loading = false; state.resendLoading = false; state.emailForVerification = null; },
// //         resetForgotPasswordState: (state) => { state.forgotPasswordStep = 'idle'; state.emailForReset = null; state.error = null; state.successMessage = null; state.forgotPasswordLoading = false; },
// //         clearError: (state) => { state.error = null; }
// //     },
// //     extraReducers: (builder) => {
// //         const createPendingReducer = (state) => { state.loading = true; state.error = null; };
// //         const createFulfilledReducer = (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; };
// //         const createRejectedReducer = (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticated = false; state.user = null; };
// //         builder
// //             .addCase(sendOtp.pending, (state) => { state.loading = true; state.error = null; })
// //             .addCase(sendOtp.fulfilled, (state, action) => { state.loading = false; state.otpSent = true; state.emailForVerification = action.meta.arg.emailId; })
// //             .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
// //             .addCase(verifyOtpAndRegister.pending, createPendingReducer).addCase(verifyOtpAndRegister.fulfilled, (state, action) => { createFulfilledReducer(state, action); state.otpSent = false; state.emailForVerification = null; }).addCase(verifyOtpAndRegister.rejected, createRejectedReducer)
// //             .addCase(resendOtp.pending, (state) => { state.resendLoading = true; state.error = null; }).addCase(resendOtp.fulfilled, (state) => { state.resendLoading = false; }).addCase(resendOtp.rejected, (state, action) => { state.resendLoading = false; state.error = action.payload; })
// //             .addCase(loginUser.pending, createPendingReducer).addCase(loginUser.fulfilled, createFulfilledReducer).addCase(loginUser.rejected, createRejectedReducer)
// //             .addCase(forgotPasswordSendOtp.pending, (state) => { state.forgotPasswordLoading = true; state.error = null; state.successMessage = null; }).addCase(forgotPasswordSendOtp.fulfilled, (state, action) => { state.forgotPasswordLoading = false; state.forgotPasswordStep = 'otpSent'; state.emailForReset = action.meta.arg.emailId; state.successMessage = action.payload.message; }).addCase(forgotPasswordSendOtp.rejected, (state, action) => { state.forgotPasswordLoading = false; state.error = action.payload; })
// //             .addCase(resetPasswordWithOtp.pending, (state) => { state.forgotPasswordLoading = true; state.error = null; state.successMessage = null; }).addCase(resetPasswordWithOtp.fulfilled, (state, action) => { state.forgotPasswordLoading = false; state.forgotPasswordStep = 'success'; state.successMessage = action.payload.message; }).addCase(resetPasswordWithOtp.rejected, (state, action) => { state.forgotPasswordLoading = false; state.error = action.payload; })
// //             .addCase(checkAuth.pending, (state) => { state.loading = true; }).addCase(checkAuth.fulfilled, createFulfilledReducer).addCase(checkAuth.rejected, createRejectedReducer)
// //             .addCase(logoutUser.pending, (state) => { state.loading = true; }).addCase(logoutUser.fulfilled, (state) => { Object.assign(state, { user: null, isAuthenticated: false, loading: false, error: null, otpSent: false, emailForVerification: null, resendLoading: false, forgotPasswordStep: 'idle', emailForReset: null, forgotPasswordLoading: false, successMessage: null }); }).addCase(logoutUser.rejected, createRejectedReducer);
// //     }
// // });
// // export const { resetOtpState, resetForgotPasswordState, clearError } = authSlice.actions;
// // export default authSlice.reducer;


// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import axiosClient from './utils/axiosClient'; // Ensure this path is correct relative to authSlice.js

// // const extractErrorMessage = (error) => { return (error.response?.data?.message) || error.message || error.toString(); };

// // // --- Async Thunks: Add localStorage handling ---

// // export const sendOtp = createAsyncThunk('auth/sendOtp', async (userData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/send-otp-for-registration', userData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});

// // // IMPORTANT: Your backend's /user/verify-otp-and-register MUST return { user: {}, token: '...' }
// // export const verifyOtpAndRegister = createAsyncThunk('auth/verifyOtpAndRegister', async (otpData, { rejectWithValue }) => {
// //     try {
// //         const res = await axiosClient.post('/user/verify-otp-and-register', otpData);
// //         // Save token and user data to localStorage
// //         localStorage.setItem('token', res.data.token);
// //         localStorage.setItem('user', JSON.stringify(res.data.user));
// //         return res.data; // Return full response data (user and token)
// //     } catch (e) {
// //         return rejectWithValue(extractErrorMessage(e));
// //     }
// // });

// // // IMPORTANT: Your backend's /user/login MUST return { user: {}, token: '...' }
// // export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
// //     try {
// //         const res = await axiosClient.post('/user/login', credentials);
// //         // Save token and user data to localStorage
// //         localStorage.setItem('token', res.data.token);
// //         localStorage.setItem('user', JSON.stringify(res.data.user));
// //         return res.data; // Return full response data (user and token)
// //     } catch (e) {
// //         return rejectWithValue(extractErrorMessage(e));
// //     }
// // });

// // // `checkAuth` is for re-validating the session or getting fresh user data.
// // // If it fails, it means the token is likely invalid/expired, so clear localStorage.
// // export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
// //     try {
// //         const { data } = await axiosClient.get('/user/check');
// //         // Update user data in localStorage (optional, but good for keeping it fresh)
// //         localStorage.setItem('user', JSON.stringify(data.user));
// //         // If your backend also sends a new token with /user/check, save it:
// //         // if (data.token) localStorage.setItem('token', data.token);
// //         return data.user; // checkAuth typically returns just the user object
// //     } catch (e) {
// //         // If checkAuth fails, the current token is likely invalid. Clear it.
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('user');
// //         return rejectWithValue(extractErrorMessage(e));
// //     }
// // });

// // export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
// //     try {
// //         // Call backend logout endpoint (optional, if your backend invalidates sessions)
// //         await axiosClient.post('/user/logout');
// //     } catch (e) {
// //         // Log warning but proceed to clear client-side data
// //         console.warn("Backend logout failed, but clearing client data anyway:", extractErrorMessage(e));
// //     } finally {
// //         // Always clear client-side storage regardless of backend response
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('user');
// //     }
// //     return null; // No payload needed 4for logout success
// // });

// // export const forgotPasswordSendOtp = createAsyncThunk('auth/forgotPasswordSendOtp', async (emailData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/forgot-password-send-otp', emailData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const resetPasswordWithOtp = createAsyncThunk('auth/resetPasswordWithOtp', async (resetData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/reset-password-with-otp', resetData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});
// // export const resendOtp = createAsyncThunk('auth/resendOtp', async (emailData, { rejectWithValue }) => { try { const res = await axiosClient.post('/user/send-otp-for-registration', emailData); return res.data; } catch (e) { return rejectWithValue(extractErrorMessage(e)); }});

// // // --- Auth Slice Definition ---

// // const authSlice = createSlice({
// //     name: 'auth',
// //     initialState: {
// //         // Initialize state by reading from localStorage
// //         user: JSON.parse(localStorage.getItem('user')) || null,
// //         isAuthenticated: !!localStorage.getItem('token'), // True if token exists in localStorage
// //         loading: false,
// //         error: null,
// //         otpSent: false,
// //         emailForVerification: null,
// //         resendLoading: false,
// //         forgotPasswordStep: 'idle',
// //         emailForReset: null,
// //         forgotPasswordLoading: false,
// //         successMessage: null,
// //     },
// //     reducers: {
// //         resetOtpState: (state) => { state.otpSent = false; state.error = null; state.loading = false; state.resendLoading = false; state.emailForVerification = null; },
// //         resetForgotPasswordState: (state) => { state.forgotPasswordStep = 'idle'; state.emailForReset = null; state.error = null; state.successMessage = null; state.forgotPasswordLoading = false; },
// //         clearError: (state) => { state.error = null; }
// //     },
// //     extraReducers: (builder) => {
// //         const createPendingReducer = (state) => { state.loading = true; state.error = null; };

// //         // This fulfilled reducer expects action.payload to contain { user: {}, token: '' }
// //         const createAuthFulfilledReducer = (state, action) => {
// //             state.loading = false;
// //             state.isAuthenticated = true;
// //             state.user = action.payload.user; // Access user from the payload's 'user' property
// //             // localStorage already handled in the specific thunk (loginUser, verifyOtpAndRegister)
// //         };

// //         const createRejectedReducer = (state, action) => {
// //             state.loading = false;
// //             state.error = action.payload;
// //             state.isAuthenticated = false;
// //             state.user = null; // Clear user on rejection
// //             // localStorage should be cleared by the thunk's catch/finally block if it's an auth-related failure
// //         };

// //         builder
// //             .addCase(sendOtp.pending, (state) => { state.loading = true; state.error = null; })
// //             .addCase(sendOtp.fulfilled, (state, action) => { state.loading = false; state.otpSent = true; state.emailForVerification = action.meta.arg.emailId; })
// //             .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

// //             // Use the common fulfilled reducer for auth actions that return user & token
// //             .addCase(verifyOtpAndRegister.pending, createPendingReducer)
// //             .addCase(verifyOtpAndRegister.fulfilled, (state, action) => {
// //                 createAuthFulfilledReducer(state, action);
// //                 state.otpSent = false;
// //                 state.emailForVerification = null;
// //             })
// //             .addCase(verifyOtpAndRegister.rejected, createRejectedReducer)

// //             .addCase(resendOtp.pending, (state) => { state.resendLoading = true; state.error = null; })
// //             .addCase(resendOtp.fulfilled, (state) => { state.resendLoading = false; }).addCase(resendOtp.rejected, (state, action) => { state.resendLoading = false; state.error = action.payload; })

// //             // Use the common fulfilled reducer for auth actions that return user & token
// //             .addCase(loginUser.pending, createPendingReducer)
// //             .addCase(loginUser.fulfilled, createAuthFulfilledReducer)
// //             .addCase(loginUser.rejected, createRejectedReducer)

// //             .addCase(forgotPasswordSendOtp.pending, (state) => { state.forgotPasswordLoading = true; state.error = null; state.successMessage = null; })
// //             .addCase(forgotPasswordSendOtp.fulfilled, (state, action) => { state.forgotPasswordLoading = false; state.forgotPasswordStep = 'otpSent'; state.emailForReset = action.meta.arg.emailId; state.successMessage = action.payload.message; })
// //             .addCase(forgotPasswordSendOtp.rejected, (state, action) => { state.forgotPasswordLoading = false; state.error = action.payload; })

// //             .addCase(resetPasswordWithOtp.pending, (state) => { state.forgotPasswordLoading = true; state.error = null; state.successMessage = null; })
// //             .addCase(resetPasswordWithOtp.fulfilled, (state, action) => { state.forgotPasswordLoading = false; state.forgotPasswordStep = 'success'; state.successMessage = action.payload.message; })
// //             .addCase(resetPasswordWithOtp.rejected, (state, action) => { state.forgotPasswordLoading = false; state.error = action.payload; })

// //             // Check Auth:
// //             .addCase(checkAuth.pending, (state) => { state.loading = true; })
// //             .addCase(checkAuth.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.isAuthenticated = true;
// //                 state.user = action.payload; // checkAuth usually returns just the user object
// //             })
// //             .addCase(checkAuth.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.payload;
// //                 state.isAuthenticated = false;
// //                 state.user = null; // Clear user if check fails
// //                 // localStorage already cleared in the thunk's catch block
// //             })

// //             // Logout: Clear state completely. localStorage already handled in thunk.
// //             .addCase(logoutUser.pending, (state) => { state.loading = true; })
// //             .addCase(logoutUser.fulfilled, (state) => {
// //                 // Reset ALL auth-related state to initial values
// //                 Object.assign(state, {
// //                     user: null, isAuthenticated: false, loading: false, error: null,
// //                     otpSent: false, emailForVerification: null, resendLoading: false,
// //                     forgotPasswordStep: 'idle', emailForReset: null, forgotPasswordLoading: false, successMessage: null,
// //                 });
// //             })
// //             .addCase(logoutUser.rejected, (state, action) => {
// //                 // If logout fails on backend, still clear local state and storage
// //                 state.loading = false;
// //                 state.error = action.payload;
// //                 state.user = null;
// //                 state.isAuthenticated = false;
// //             });
// //     }
// // });

// // export const { resetOtpState, resetForgotPasswordState, clearError } = authSlice.actions;
// // export default authSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient'; // Ensure this path is correct relative to authSlice.js

// Helper function to extract serializable error data from AxiosError
// This is crucial because Axios errors are not directly serializable and
// will cause Redux Toolkit warnings/errors.
const getSerializableError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data?.message || error.message,
      statusCode: error.response.status,
      data: error.response.data, // This often contains the server's specific error message or details
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response from server. Please check your internet connection.',
      statusCode: null,
      data: null,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message,
      statusCode: null,
      data: null,
    };
  }
};

// --- Async Thunks ---

// Register User: Sends OTP, then verifies OTP to register
// Assuming your backend's /user/verify-otp-and-register (from previous convo)
// or /user/register (if direct) returns { user: {}, token: '...' }
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // If you're using the sendOtp and verifyOtpAndRegister flow,
      // this thunk would typically call the *verify-otp-and-register* endpoint.
      // If direct registration, it calls /user/register.
      // Make sure response.data contains `user` and `token`.
      const response = await axiosClient.post('/user/register', userData);
      
      // Store token and user data in localStorage upon successful registration
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data.user; // Return the user object
    } catch (error) {
      return rejectWithValue(getSerializableError(error));
    }
  }
);

// Login User: Authenticates user and stores token
// Your backend's /user/login should return { user: {}, token: '...' }
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);
      
      // FIX: Store the token received from backend in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data too

      return response.data.user; // Return the user object
    } catch (error) {
      return rejectWithValue(getSerializableError(error));
    }
  }
);

// Check Auth: Verifies current session (e.g., on app load)
// Your backend's /user/check should return { user: {} } if authenticated
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/user/check');
      // Update user data in localStorage, but don't overwrite the token unless backend sends a new one
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      // If checkAuth fails, it means the token is likely invalid or expired.
      // Clear client-side storage to ensure the user is logged out.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (error.response?.status === 401) {
        // Special case for unauthorized, you might want to specifically handle this
        // e.g., redirect to login page without displaying a generic error message
        return rejectWithValue(getSerializableError(error)); // Still pass the error for debugging
      }
      return rejectWithValue(getSerializableError(error));
    }
  }
);

// Logout User: Clears session on backend and client
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Call backend logout endpoint. This is optional but good if your backend
      // maintains server-side sessions or token blacklists.
      await axiosClient.post('/user/logout');
    } catch (error) {
      console.warn("Backend logout failed, but client-side data will still be cleared:", getSerializableError(error));
      // You can decide if you want to reject here or always resolve after clearing client data
      // For most cases, clearing client data is the priority for logout.
      // If backend failure is critical, then return rejectWithValue(getSerializableError(error));
    } finally {
      // Always clear client-side storage regardless of backend's response for a full logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return null; // No payload needed for logout success
  }
);

// --- Auth Slice Definition ---
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Initialize state by trying to read from localStorage.
    // This allows the user to remain logged in across page refreshes.
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'), // True if token exists in localStorage
    loading: false,
    error: null // This error state will now always hold a serializable value or null
  },
  reducers: {
    // Reducer to manually clear the error state from the UI
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Register User Cases ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Payload is the user object, so it implies authenticated
        state.user = action.payload;
        // localStorage is handled in the thunk itself
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // action.payload now contains the serializable error object { message, statusCode, data }
        state.error = action.payload; // Store the full serializable error object
        state.isAuthenticated = false;
        state.user = null;
        // localStorage is handled in the thunk's catch block
      })
  
      // --- Login User Cases ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Payload is the user object
        state.user = action.payload;
        // localStorage is handled in the thunk itself
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the full serializable error object
        state.isAuthenticated = false;
        state.user = null;
        // localStorage is handled in the thunk's catch block
      })
  
      // --- Check Auth Cases ---
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload; // `action.payload` is the user object or null from rejectWithValue(null)
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        // action.payload can be a serializable error object or null from rejectWithValue(null)
        state.error = action.payload; 
        state.isAuthenticated = false;
        state.user = null;
        // localStorage is handled in the thunk's catch block
      })
  
      // --- Logout User Cases ---
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null; // Clear any previous errors on successful logout
        // localStorage is handled in the thunk's finally block
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the full serializable error object
        // Despite backend error, assume client-side is logged out as localStorage is cleared
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const { clearError } = authSlice.actions; // Export actions
export default authSlice.reducer;