import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {loginUser} from "../authSlice"
import { useEffect } from 'react';

const signupSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Leetcode</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.emailId && 'input-error'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;




// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, NavLink } from 'react-router-dom';
// // import { loginUser, forgotPasswordSendOtp, resetPasswordWithOtp, resetForgotPasswordState, clearError } from "../authSlice"; // Corrected path
// // import { useEffect, useState, useRef } from 'react';
// // import Captcha from '../components/Captcha'; // Assuming this path is correct

// // // --- ZOD SCHEMAS for validation ---
// // const loginSchema = z.object({
// //   emailId: z.string().email("Invalid Email"),
// //   password: z.string().min(1, "Password is required"), 
// //   captcha: z.string().min(6, "Please enter the 6 characters from the image"),
// // });

// // const forgotPasswordEmailSchema = z.object({
// //   emailId: z.string().email("A valid email is required"),
// // });

// // const resetPasswordSchema = z.object({
// //   otp: z.string().length(6, "OTP must be 6 digits."),
// //   newPassword: z.string().min(8, "Password must be at least 8 characters."),
// //   confirmPassword: z.string(),
// // }).refine(data => data.newPassword === data.confirmPassword, {
// //   message: "Passwords do not match",
// //   path: ["confirmPassword"],
// // });

// // function Login() {
// //   const [view, setView] = useState('login'); // 'login' | 'forgotPasswordEmail' | 'resetPassword' | 'success' (handled by Redux state)
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const captchaRef = useRef(null);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const { 
// //     isAuthenticated, loading, error,
// //     forgotPasswordStep, emailForReset, forgotPasswordLoading, successMessage
// //   } = useSelector((state) => state.auth);

// //   // Separate form instances for each view
// //   const loginForm = useForm({ resolver: zodResolver(loginSchema) });
// //   const forgotPasswordEmailForm = useForm({ resolver: zodResolver(forgotPasswordEmailSchema) });
// //   const resetPasswordForm = useForm({ resolver: zodResolver(resetPasswordSchema) });

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       navigate('/'); // Redirect to dashboard or home page
// //     }
// //   }, [isAuthenticated, navigate]);

// //   useEffect(() => {
// //     // This effect listens to the Redux state and changes the UI view automatically for forgot password flow
// //     if (forgotPasswordStep === 'otpSent') {
// //       setView('resetPassword');
// //       // No need to clear error here, as the new view might have its own errors,
// //       // and a success message for OTP sent might be useful.
// //     } else if (forgotPasswordStep === 'success') {
// //         setView('success');
// //     } else if (forgotPasswordStep === 'idle' && view !== 'login') {
// //         // If state goes back to idle (e.g., after returning from reset process),
// //         // ensure the view is reset to login, unless already on login.
// //         setView('login');
// //     }
// //   }, [forgotPasswordStep, view]);

// //   // --- SUBMIT HANDLERS ---
// //   const onLoginSubmit = (data) => {
// //     dispatch(clearError()); // Clear any previous error
// //     const correctCaptchaText = captchaRef.current.getCaptchaText();
// //     if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
// //       loginForm.setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// //       captchaRef.current.refresh();
// //       loginForm.resetField('captcha');
// //       return;
// //     }
// //     const { captcha, ...loginData } = data; // Remove captcha from data sent to backend
// //     dispatch(loginUser(loginData));
// //   };

// //   const onForgotPasswordEmailSubmit = (data) => {
// //     dispatch(clearError()); // Clear any previous error
// //     dispatch(forgotPasswordSendOtp(data));
// //   };

// //   const onResetPasswordSubmit = (data) => {
// //     dispatch(clearError()); // Clear any previous error
// //     dispatch(resetPasswordWithOtp({ ...data, emailId: emailForReset }));
// //   };

// //   const handleReturnToLogin = () => {
// //     dispatch(resetForgotPasswordState()); // Resets all forgot password specific states
// //     setView('login'); // Force view back to login
// //     // Also reset form fields for login to clear any previous inputs
// //     loginForm.reset(); 
// //     forgotPasswordEmailForm.reset();
// //     resetPasswordForm.reset();
// //   };

// //   // --- STYLES (Your original styles are preserved) ---
// //   const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752462793/hhmrvshdumbixuuaijig.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// //   const cardStyle = { backgroundImage: `linear-gradient(rgba(10, 20, 35, 0.9), rgba(10, 20, 35, 0.9)), url("https://as1.ftcdn.net/v2/jpg/08/53/71/35/1000_F_853713570_rZkEwOFu3vB3fF9IqWvUj1fTpvTTOm0J.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// //   // --- RENDER LOGIC ---
// //   const renderContent = () => {
// //     // Show a loading spinner if the main login process is active and not a specific forgot password step
// //     if (loading && view === 'login') {
// //         return (
// //             <div className="flex flex-col items-center justify-center h-full">
// //                 <span className="loading loading-spinner loading-lg text-primary"></span>
// //                 <p className="mt-4 text-xl text-white">Logging in...</p>
// //             </div>
// //         );
// //     }

// //     if (view === 'success' && forgotPasswordStep === 'success') {
// //       return (
// //           <div className="text-center text-white">
// //             <h2 className="card-title justify-center text-2xl mb-4 text-success">Success!</h2>
// //             <p className="mb-6 text-gray-300">{successMessage}</p>
// //             <button onClick={handleReturnToLogin} className="btn btn-primary w-full">
// //               Return to Login
// //             </button>
// //           </div>
// //       );
// //     }
    
// //     switch (view) {
// //       case 'forgotPasswordEmail':
// //         return (
// //           <>
// //             <h2 className="card-title justify-center text-white text-2xl mb-4">Forgot Password</h2>
// //             <p className="text-center text-sm text-gray-300 mb-6">Enter your email, and we'll send you an OTP to reset your password.</p>
            
// //             {successMessage && !error && <div className="alert alert-info shadow-lg mb-4"><div><span className="text-sm">{successMessage}</span></div></div>}
// //             {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}

// //             <form onSubmit={forgotPasswordEmailForm.handleSubmit(onForgotPasswordEmailSubmit)} noValidate>
// //               <div className="form-control">
// //                 <label className="label"><span className="label-text text-gray-300">Email Address</span></label>
// //                 <input type="email" placeholder="you@example.com" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${forgotPasswordEmailForm.formState.errors.emailId ? 'input-error border-error' : ''}`} {...forgotPasswordEmailForm.register('emailId')} />
// //                 {forgotPasswordEmailForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{forgotPasswordEmailForm.formState.errors.emailId.message}</span>}
// //               </div>
// //               <div className="form-control mt-8">
// //                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>
// //                   {forgotPasswordLoading ? 'Sending...' : 'Send OTP'}
// //                 </button>
// //               </div>
// //             </form>
// //             <div className="text-center mt-6">
// //               <button onClick={handleReturnToLogin} className="link link-accent text-sm text-gray-400 hover:text-primary transition-colors duration-200">Back to Login</button>
// //             </div>
// //           </>
// //         );

// //       case 'resetPassword':
// //         return (
// //           <>
// //             <h2 className="card-title justify-center text-white text-2xl mb-4">Reset Password</h2>
// //             <p className="text-center text-sm text-gray-300 mb-6">An OTP was sent to <strong>{emailForReset}</strong>. Enter it below.</p>

// //             {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
// //             {successMessage && !error && <div className="alert alert-info shadow-lg mb-4"><div><span className="text-sm">{successMessage}</span></div></div>}
            
// //             <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} noValidate>
// //               <div className="form-control">
// //                 <label className="label"><span className="label-text text-gray-300">6-Digit OTP</span></label>
// //                 <input type="text" placeholder="123456" maxLength="6" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.otp ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('otp')} />
// //                 {resetPasswordForm.formState.errors.otp && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.otp.message}</span>}
// //               </div>
// //               <div className="form-control mt-4">
// //                 <label className="label"><span className="label-text text-gray-300">New Password</span></label>
// //                    <div className="relative">
// //                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.newPassword ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('newPassword')} />
// //                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
// //                          {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// //                      </button>
// //                  </div>
// //                 {resetPasswordForm.formState.errors.newPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.newPassword.message}</span>}
// //               </div>
// //               <div className="form-control mt-4">
// //                 <label className="label"><span className="label-text text-gray-300">Confirm New Password</span></label>
// //                 <div className="relative">
// //                      <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.confirmPassword ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('confirmPassword')} />
// //                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
// //                          {showConfirmPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// //                      </button>
// //                  </div>
// //                 {resetPasswordForm.formState.errors.confirmPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.confirmPassword.message}</span>}
// //               </div>
// //               <div className="form-control mt-8">
// //                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>
// //                   {forgotPasswordLoading ? 'Resetting...' : 'Reset Password'}
// //                 </button>
// //               </div>
// //             </form>
// //                <div className="text-center mt-6">
// //                  <button onClick={handleReturnToLogin} className="link link-accent text-sm text-gray-400 hover:text-primary transition-colors duration-200">Back to Login</button>
// //                </div>
// //           </>
// //         );
          
// //       default: // 'login' view
// //         return (
// //           <>
// //             <h2 className="card-title justify-center text-white text-3xl mb-6">Login</h2>
// //             {error && !loginForm.formState.errors.captcha && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
            
// //             <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} noValidate>
// //               <div className="form-control">
// //                 <label className="label"><span className="label-text text-gray-300">Email</span></label>
// //                 <input type="email" placeholder="john@example.com" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.emailId ? 'input-error border-error' : ''}`} {...loginForm.register('emailId')} />
// //                 {loginForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{loginForm.formState.errors.emailId.message}</span>}
// //               </div>
// //               <div className="form-control mt-4">
// //                 <label className="label flex justify-between">
// //                   <span className="label-text text-gray-300">Password</span>
// //                   <button type="button" onClick={() => { dispatch(clearError()); setView('forgotPasswordEmail'); }} className="text-xs link link-hover link-primary">Forgot Password?</button>
// //                 </label>
// //                    <div className="relative">
// //                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.password ? 'input-error border-error' : ''}`} {...loginForm.register('password')} />
// //                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
// //                            {showPassword ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// //                        </button>
// //                    </div>
// //                    {loginForm.formState.errors.password && <span className="text-error text-sm mt-1">{loginForm.formState.errors.password.message}</span>}
// //               </div>
// //               <div className="form-control mt-4">
// //                 <label className="label"><span className="label-text text-gray-300">Verify You Are Human</span></label>
// //                 <div className="flex items-start space-x-2">
// //                    <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.captcha ? 'input-error border-error' : ''}`} {...loginForm.register('captcha')} />
// //                    <Captcha ref={captchaRef} />
// //                 </div>
// //                 {loginForm.formState.errors.captcha && <span className="text-error text-sm mt-1">{loginForm.formState.errors.captcha.message}</span>}
// //               </div>
// //               <div className="form-control mt-8">
// //                    <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
// //                        {loading ? 'Logging in...' : 'Login'}
// //                    </button>
// //               </div>
// //             </form>
// //             <div className="text-center mt-6">
// //               <p className="text-sm text-gray-400">Don't have an account?{' '}<NavLink to="/signup" className="link link-primary">Sign Up</NavLink></p>
// //             </div>
// //           </>
// //         );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// //       <div className="card w-96 shadow-xl text-white" style={cardStyle}>
// //         <div className="card-body">
// //           {renderContent()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { loginUser, forgotPasswordSendOtp, resetPasswordWithOtp, resetForgotPasswordState, clearError } from "../authSlice"; // Corrected Redux path
// import { useEffect, useState, useRef } from 'react';
// import Captcha from '../components/Captcha'; // Assuming this path is correct

// // --- ZOD SCHEMAS for validation ---
// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(1, "Password is required"), 
//   captcha: z.string().min(6, "Please enter the 6 characters from the image"),
// });

// const forgotPasswordEmailSchema = z.object({
//   emailId: z.string().email("A valid email is required"),
// });

// const resetPasswordSchema = z.object({
//   otp: z.string().length(6, "OTP must be 6 digits."),
//   newPassword: z.string().min(8, "Password must be at least 8 characters."),
//   confirmPassword: z.string(),
// }).refine(data => data.newPassword === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// function Login() {
//   const [view, setView] = useState('login'); // 'login' | 'forgotPasswordEmail' | 'resetPassword' | 'success' (handled by Redux state)
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const captchaRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { 
//     isAuthenticated, loading, error,
//     forgotPasswordStep, emailForReset, forgotPasswordLoading, successMessage
//   } = useSelector((state) => state.auth);

//   // Separate form instances for each view
//   const loginForm = useForm({ resolver: zodResolver(loginSchema) });
//   const forgotPasswordEmailForm = useForm({ resolver: zodResolver(forgotPasswordEmailSchema) });
//   const resetPasswordForm = useForm({ resolver: zodResolver(resetPasswordSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/'); // Redirect to dashboard or home page
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     // This effect listens to the Redux state and changes the UI view automatically for forgot password flow
//     if (forgotPasswordStep === 'otpSent') {
//       setView('resetPassword');
//     } else if (forgotPasswordStep === 'success') {
//         setView('success');
//     } else if (forgotPasswordStep === 'idle' && view !== 'login') {
//         // If state goes back to idle (e.g., after returning from reset process),
//         // ensure the view is reset to login, unless already on login.
//         setView('login');
//     }
//   }, [forgotPasswordStep, view]);

//   // --- SUBMIT HANDLERS ---
//   const onLoginSubmit = (data) => {
//     dispatch(clearError()); // Clear any previous error
//     const correctCaptchaText = captchaRef.current.getCaptchaText();
//     if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
//       loginForm.setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
//       captchaRef.current.refresh();
//       loginForm.resetField('captcha'); // Clear the captcha input field
//       return;
//     }
//     const { captcha, ...loginData } = data; // Remove captcha from data sent to backend
//     dispatch(loginUser(loginData));
//   };

//   const onForgotPasswordEmailSubmit = (data) => {
//     dispatch(clearError()); // Clear any previous error
//     dispatch(forgotPasswordSendOtp(data));
//   };

//   const onResetPasswordSubmit = (data) => {
//     dispatch(clearError()); // Clear any previous error
//     dispatch(resetPasswordWithOtp({ ...data, emailId: emailForReset }));
//   };

//   const handleReturnToLogin = () => {
//     dispatch(resetForgotPasswordState()); // Resets all forgot password specific states
//     setView('login'); // Force view back to login
//     // Also reset form fields for login to clear any previous inputs
//     loginForm.reset(); 
//     forgotPasswordEmailForm.reset();
//     resetPasswordForm.reset();
//   };

//   // --- STYLES (Your original styles are preserved) ---
//   const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752462793/hhmrvshdumbixuuaijig.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
//   const cardStyle = { backgroundImage: `linear-gradient(rgba(10, 20, 35, 0.9), rgba(10, 20, 35, 0.9)), url("https://as1.ftcdn.net/v2/jpg/08/53/71/35/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

//   // --- RENDER LOGIC ---
//   const renderContent = () => {
//     // Show a loading spinner if the main login process is active and not a specific forgot password step
//     if (loading && view === 'login') {
//         return (
//             <div className="flex flex-col items-center justify-center h-full">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//                 <p className="mt-4 text-xl text-white">Logging in...</p>
//             </div>
//         );
//     }

//     if (view === 'success' && forgotPasswordStep === 'success') {
//       return (
//           <div className="text-center text-white">
//             <h2 className="card-title justify-center text-2xl mb-4 text-success">Success!</h2>
//             <p className="mb-6 text-gray-300">{successMessage}</p>
//             <button onClick={handleReturnToLogin} className="btn btn-primary w-full">
//               Return to Login
//             </button>
//           </div>
//       );
//     }
    
//     switch (view) {
//       case 'forgotPasswordEmail':
//         return (
//           <>
//             <h2 className="card-title justify-center text-white text-2xl mb-4">Forgot Password</h2>
//             <p className="text-center text-sm text-gray-300 mb-6">Enter your email, and we'll send you an OTP to reset your password.</p>
            
//             {successMessage && !error && <div className="alert alert-info shadow-lg mb-4"><div><span className="text-sm">{successMessage}</span></div></div>}
//             {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}

//             <form onSubmit={forgotPasswordEmailForm.handleSubmit(onForgotPasswordEmailSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text text-gray-300">Email Address</span></label>
//                 <input type="email" placeholder="you@example.com" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${forgotPasswordEmailForm.formState.errors.emailId ? 'input-error border-error' : ''}`} {...forgotPasswordEmailForm.register('emailId')} />
//                 {forgotPasswordEmailForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{forgotPasswordEmailForm.formState.errors.emailId.message}</span>}
//               </div>
//               <div className="form-control mt-8">
//                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>
//                   {forgotPasswordLoading ? 'Sending...' : 'Send OTP'}
//                 </button>
//               </div>
//             </form>
//             <div className="text-center mt-6">
//               <button onClick={handleReturnToLogin} className="link link-accent text-sm text-gray-400 hover:text-primary transition-colors duration-200">Back to Login</button>
//             </div>
//           </>
//         );

//       case 'resetPassword':
//         return (
//           <>
//             <h2 className="card-title justify-center text-white text-2xl mb-4">Reset Password</h2>
//             <p className="text-center text-sm text-gray-300 mb-6">An OTP was sent to <strong>{emailForReset}</strong>. Enter it below.</p>

//             {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
//             {successMessage && !error && <div className="alert alert-info shadow-lg mb-4"><div><span className="text-sm">{successMessage}</span></div></div>}
            
//             <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text text-gray-300">6-Digit OTP</span></label>
//                 <input type="text" placeholder="123456" maxLength="6" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.otp ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('otp')} />
//                 {resetPasswordForm.formState.errors.otp && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.otp.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text text-gray-300">New Password</span></label>
//                    <div className="relative">
//                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.newPassword ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('newPassword')} />
//                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
//                          {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
//                      </button>
//                  </div>
//                 {resetPasswordForm.formState.errors.newPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.newPassword.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text text-gray-300">Confirm New Password</span></label>
//                 <div className="relative">
//                      <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${resetPasswordForm.formState.errors.confirmPassword ? 'input-error border-error' : ''}`} {...resetPasswordForm.register('confirmPassword')} />
//                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
//                          {showConfirmPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
//                      </button>
//                  </div>
//                 {resetPasswordForm.formState.errors.confirmPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.confirmPassword.message}</span>}
//               </div>
//               <div className="form-control mt-8">
//                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>
//                   {forgotPasswordLoading ? 'Resetting...' : 'Reset Password'}
//                 </button>
//               </div>
//             </form>
//                <div className="text-center mt-6">
//                  <button onClick={handleReturnToLogin} className="link link-accent text-sm text-gray-400 hover:text-primary transition-colors duration-200">Back to Login</button>
//                </div>
//           </>
//         );
          
//       default: // 'login' view
//         return (
//           <>
//             <h2 className="card-title justify-center text-white text-3xl mb-6">Login</h2>
//             {error && !loginForm.formState.errors.captcha && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
            
//             <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text text-gray-300">Email</span></label>
//                 <input type="email" placeholder="john@example.com" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.emailId ? 'input-error border-error' : ''}`} {...loginForm.register('emailId')} />
//                 {loginForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{loginForm.formState.errors.emailId.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label flex justify-between">
//                   <span className="label-text text-gray-300">Password</span>
//                   <button type="button" onClick={() => { dispatch(clearError()); setView('forgotPasswordEmail'); }} className="text-xs link link-hover link-primary">Forgot Password?</button>
//                 </label>
//                    <div className="relative">
//                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.password ? 'input-error border-error' : ''}`} {...loginForm.register('password')} />
//                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white">
//                            {showPassword ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
//                        </button>
//                    </div>
//                    {loginForm.formState.errors.password && <span className="text-error text-sm mt-1">{loginForm.formState.errors.password.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text text-gray-300">Verify You Are Human</span></label>
//                 {/* Ensure flex items are vertically aligned for visual appeal */}
//                 <div className="flex items-center space-x-2">
//                    <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${loginForm.formState.errors.captcha ? 'input-error border-error' : ''}`} {...loginForm.register('captcha')} />
//                    <Captcha ref={captchaRef} />
//                 </div>
//                 {loginForm.formState.errors.captcha && <span className="text-error text-sm mt-1">{loginForm.formState.errors.captcha.message}</span>}
//               </div>
//               <div className="form-control mt-8">
//                    <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
//                        {loading ? 'Logging in...' : 'Login'}
//                    </button>
//               </div>
//             </form>
//             <div className="text-center mt-6">
//               <p className="text-sm text-gray-400">Don't have an account?{' '}<NavLink to="/signup" className="link link-primary">Sign Up</NavLink></p>
//             </div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
//       <div className="card w-96 shadow-xl text-white" style={cardStyle}>
//         <div className="card-body">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default Login;
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { loginUser, forgotPasswordSendOtp, resetPasswordWithOtp, resetForgotPasswordState, clearError } from "../authSlice";
// import { useEffect, useState, useRef } from 'react';
// import Captcha from '../components/Captcha';

// // --- Reusable Social Icon SVG Components ---
// const GoogleIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> );
// const FacebookIcon = () => ( <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg> );
// const EyeOpenIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> );
// const EyeClosedIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> );


// // --- ZOD SCHEMAS for validation ---
// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(1, "Password is required"),
//   captcha: z.string().min(6, "Please enter at least 6 characters"),
// });

// const forgotPasswordEmailSchema = z.object({
//   emailId: z.string().email("A valid email is required"),
// });

// const resetPasswordSchema = z.object({
//   otp: z.string().length(6, "OTP must be 6 digits."),
//   newPassword: z.string().min(8, "Password must be at least 8 characters."),
//   confirmPassword: z.string(),
// }).refine(data => data.newPassword === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// function Login() {
//   const [view, setView] = useState('login'); // 'login' | 'forgotPasswordEmail' | 'resetPassword'
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const captchaRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { 
//     isAuthenticated, loading, error,
//     forgotPasswordStep, emailForReset, forgotPasswordLoading, successMessage
//   } = useSelector((state) => state.auth);

//   const loginForm = useForm({ resolver: zodResolver(loginSchema) });
//   const forgotPasswordEmailForm = useForm({ resolver: zodResolver(forgotPasswordEmailSchema) });
//   const resetPasswordForm = useForm({ resolver: zodResolver(resetPasswordSchema) });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     if (forgotPasswordStep === 'otpSent') {
//       setView('resetPassword');
//       dispatch(clearError());
//     }
//   }, [forgotPasswordStep, dispatch]);

//   const onLoginSubmit = (data) => {
//     const correctCaptchaText = captchaRef.current.getCaptchaText();
//     if (data.captcha !== correctCaptchaText) {
//       loginForm.setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
//       captchaRef.current.refresh();
//       loginForm.resetField('captcha');
//       return;
//     }
//     const { captcha, ...loginData } = data;
//     dispatch(loginUser(loginData));
//   };

//   const onForgotPasswordEmailSubmit = (data) => { dispatch(forgotPasswordSendOtp(data)); };
//   const onResetPasswordSubmit = (data) => { dispatch(resetPasswordWithOtp({ ...data, emailId: emailForReset })); };
//   const handleReturnToLogin = () => { dispatch(resetForgotPasswordState()); setView('login'); };
//   const handleSocialLogin = (provider) => { window.location.href = `http://localhost:3000/user/auth/${provider}`; };

//   const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752462793/hhmrvshdumbixuuaijig.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
//   const cardStyle = { backgroundImage: `linear-gradient(rgba(10, 20, 35, 0.9), rgba(10, 20, 35, 0.9)), url("https://as1.ftcdn.net/v2/jpg/08/53/71/35/1000_F_853713570_rZkEwOFu3vB3fF9IqWvUj1fTpvTTOm0J.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

//   const renderContent = () => {
//     if (forgotPasswordStep === 'success') {
//       return (
//           <div className="text-center">
//             <h2 className="card-title justify-center text-2xl mb-4 text-success">Success!</h2>
//             <p className="mb-6 text-white">{successMessage}</p>
//             <button onClick={handleReturnToLogin} className="btn btn-primary w-full">Return to Login</button>
//           </div>
//       );
//     }
    
//     switch (view) {
//       case 'forgotPasswordEmail':
//         return (
//           <>
//             <h2 className="card-title justify-center text-2xl mb-4">Forgot Password</h2>
//             <p className="text-center text-sm mb-6 text-neutral-content">Enter your email, and we'll send an OTP to reset your password.</p>
//             {successMessage && !error && <div className="alert alert-info shadow-lg mb-4"><div><span>{successMessage}</span></div></div>}
//             {error && <div className="alert alert-error shadow-lg mb-4"><div><span>{error}</span></div></div>}
//             <form onSubmit={forgotPasswordEmailForm.handleSubmit(onForgotPasswordEmailSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text">Email Address</span></label>
//                 <input type="email" placeholder="you@example.com" className={`input input-bordered w-full ${forgotPasswordEmailForm.formState.errors.emailId ? 'input-error' : ''}`} {...forgotPasswordEmailForm.register('emailId')} />
//                 {forgotPasswordEmailForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{forgotPasswordEmailForm.formState.errors.emailId.message}</span>}
//               </div>
//               <div className="form-control mt-8">
//                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>
//                   {forgotPasswordLoading ? 'Sending...' : 'Send OTP'}
//                 </button>
//               </div>
//             </form>
//             <div className="text-center mt-6"><button onClick={handleReturnToLogin} className="link link-accent text-sm">Back to Login</button></div>
//           </>
//         );

//       case 'resetPassword':
//         return (
//           <>
//             <h2 className="card-title justify-center text-2xl mb-4">Reset Password</h2>
//             <p className="text-center text-sm mb-6 text-neutral-content">An OTP was sent to <strong>{emailForReset}</strong>.</p>
//             {error && <div className="alert alert-error shadow-lg mb-4"><div><span>{error}</span></div></div>}
//             <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text">6-Digit OTP</span></label>
//                 <input type="text" placeholder="123456" maxLength="6" className={`input input-bordered w-full ${resetPasswordForm.formState.errors.otp ? 'input-error' : ''}`} {...resetPasswordForm.register('otp')} />
//                 {resetPasswordForm.formState.errors.otp && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.otp.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text">New Password</span></label>
//                  <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 ${resetPasswordForm.formState.errors.newPassword ? 'input-error' : ''}`} {...resetPasswordForm.register('newPassword')} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">{showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}</button></div>
//                 {resetPasswordForm.formState.errors.newPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.newPassword.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text">Confirm New Password</span></label>
//                 <div className="relative"><input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 ${resetPasswordForm.formState.errors.confirmPassword ? 'input-error' : ''}`} {...resetPasswordForm.register('confirmPassword')} /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">{showConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}</button></div>
//                 {resetPasswordForm.formState.errors.confirmPassword && <span className="text-error text-sm mt-1">{resetPasswordForm.formState.errors.confirmPassword.message}</span>}
//               </div>
//               <div className="form-control mt-8">
//                 <button type="submit" className={`btn btn-primary ${forgotPasswordLoading ? 'loading' : ''}`} disabled={forgotPasswordLoading}>{forgotPasswordLoading ? 'Resetting...' : 'Reset Password'}</button>
//               </div>
//             </form>
//              <div className="text-center mt-6"><button onClick={handleReturnToLogin} className="link link-accent text-sm">Back to Login</button></div>
//           </>
//         );
      
//       default: // 'login' view
//         return (
//           <>
//             <h2 className="card-title justify-center text-3xl mb-6">Login</h2>
//             {error && !loginForm.formState.errors.captcha && <div className="alert alert-error shadow-lg mb-4"><div><span>{error}</span></div></div>}
//             <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} noValidate>
//               <div className="form-control">
//                 <label className="label"><span className="label-text">Email</span></label>
//                 <input type="email" placeholder="john@example.com" className={`input input-bordered w-full ${loginForm.formState.errors.emailId ? 'input-error' : ''}`} {...loginForm.register('emailId')} />
//                 {loginForm.formState.errors.emailId && <span className="text-error text-sm mt-1">{loginForm.formState.errors.emailId.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label flex justify-between"><span className="label-text">Password</span><button type="button" onClick={() => { dispatch(clearError()); setView('forgotPasswordEmail'); }} className="text-xs link link-hover link-primary">Forgot Password?</button></label>
//                  <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full pr-10 ${loginForm.formState.errors.password ? 'input-error' : ''}`} {...loginForm.register('password')} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">{showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}</button></div>
//                  {loginForm.formState.errors.password && <span className="text-error text-sm mt-1">{loginForm.formState.errors.password.message}</span>}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label"><span className="label-text">Verify You Are Human</span></label>
//                 <div className="flex items-start space-x-2"><input type="text" placeholder="Enter text" className={`input input-bordered w-full ${loginForm.formState.errors.captcha ? 'input-error' : ''}`} {...loginForm.register('captcha')} /><Captcha ref={captchaRef} /></div>
//                 {loginForm.formState.errors.captcha && <span className="text-error text-sm mt-1">{loginForm.formState.errors.captcha.message}</span>}
//               </div>
//               <div className="form-control mt-8"><button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button></div>
//             </form>
//             <div className="divider text-sm my-4">OR</div>
//             <div className="flex justify-center gap-4">
//                 <button onClick={() => handleSocialLogin('google')} className="btn btn-outline w-full"><GoogleIcon /> Google</button>
//                 <button onClick={() => handleSocialLogin('facebook')} className="btn btn-outline w-full"><FacebookIcon /> Facebook</button>
//             </div>
//             <div className="text-center mt-6"><p className="text-sm">Don't have an account?{' '}<NavLink to="/signup" className="link link-primary">Sign Up</NavLink></p></div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
//       <div className="card w-96 shadow-xl" style={cardStyle}>
//         <div className="card-body">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;