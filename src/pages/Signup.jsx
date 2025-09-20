// // // // // // // // import { useForm } from 'react-hook-form';
// // // // // // // // import { zodResolver } from '@hookform/resolvers/zod';
// // // // // // // // import { z } from 'zod';
// // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // import { useNavigate } from 'react-router';
// // // // // // // // import {registerUser} from '../authSlice'
// // // // // // // // import { useEffect } from 'react';

// // // // // // // // const signupSchema = z.object({
// // // // // // // //   firstname: z.string().min(3, "Minimum character should be 3"),
// // // // // // // //   emailId: z.string().email("Invalid Email"),
// // // // // // // //   password: z.string().min(8, "Password is to weak")
// // // // // // // // });

// // // // // // // // function Signup() {
   
// // // // // // // //   const dispatch = useDispatch();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

// // // // // // // //   const {register,   handleSubmit,   formState: { errors }, } = useForm({ resolver: zodResolver(signupSchema) });

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (isAuthenticated) {
// // // // // // // //       navigate('/');
// // // // // // // //     }
// // // // // // // //   }, [isAuthenticated,navigate]);  // may not need to write navigate

// // // // // // // //   const onSubmit = (data) => {
// // // // // // // //     dispatch(registerUser(data));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
// // // // // // // //       <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
// // // // // // // //         <div className="card-body">
// // // // // // // //           <h2 className="card-title justify-center text-3xl">Leetcode</h2> {/* Centered title */}
// // // // // // // //           <form onSubmit={handleSubmit(onSubmit)}>
// // // // // // // //             {/* Existing form fields */}
// // // // // // // //             <div className="form-control">
// // // // // // // //               <label className="label mb-1">
// // // // // // // //                 <span className="label-text">First Name</span>
// // // // // // // //               </label>
// // // // // // // //               <input
// // // // // // // //                 type="text"
// // // // // // // //                 placeholder="John"
// // // // // // // //                 className={`input input-bordered ${errors.firstname && 'input-error'}`}
// // // // // // // //                 {...register('firstname')}
// // // // // // // //               />
// // // // // // // //               {errors.firstname && (
// // // // // // // //                 <span className="text-error">{errors.firstname.message}</span>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             <div className="form-control  mt-4">
// // // // // // // //               <label className="label mb-1">
// // // // // // // //                 <span className="label-text">Email</span>
// // // // // // // //               </label>
// // // // // // // //               <input
// // // // // // // //                 type="email"
// // // // // // // //                 placeholder="john@example.com"
// // // // // // // //                 className={`input input-bordered ${errors.emailId && 'input-error'}`}
// // // // // // // //                 {...register('emailId')}
// // // // // // // //               />
// // // // // // // //               {errors.emailId && (
// // // // // // // //                 <span className="text-error">{errors.emailId.message}</span>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             <div className="form-control mt-4">
// // // // // // // //               <label className="label mb-1">
// // // // // // // //                 <span className="label-text">Password</span>
// // // // // // // //               </label>
// // // // // // // //               <input
// // // // // // // //                 type="password"
// // // // // // // //                 placeholder="••••••••"
// // // // // // // //                 className={`input input-bordered ${errors.password && 'input-error'}`}
// // // // // // // //                 {...register('password')}
// // // // // // // //               />
// // // // // // // //               {errors.password && (
// // // // // // // //                 <span className="text-error">{errors.password.message}</span>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             <div className="form-control mt-6 flex justify-center">
// // // // // // // //               <button
// // // // // // // //                 type="submit"
// // // // // // // //                 className="btn btn-primary"
// // // // // // // //               >
// // // // // // // //                 Sign Up
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </form>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default Signup;








// // // // // // // // // THIS WILL NOT TAKE BCOZ HM FUTURE AISE BHUT SARE DATA LESKTE HAI LET RE ENTER PASSWORD KR LIYE CAPTCHA AND SOON TO USKE LIYE BAR BAR HMKO USESSTATE LEKR KRNA PADEGA SO HM REACT HOOK KA USE LRTE HAI


// // // // // // // // // import { useState } from "react";

// // // // // // // // // function Signup(){

// // // // // // // // //   const [name,setname]=useState('');
// // // // // // // // //   const [email,setemail]=useState('');
// // // // // // // // //   const [password,setpassword]=useState('');

  

// // // // // // // // //      const handlesubmit=(e)=>{
// // // // // // // // //         e.preventDefault(); // yha se form by default submit ho jata hai but hme valiadte check krna padega bcoz aisa bhi hi skta hai postman se koi bhi hm ye sb de skte hai at the end backend ke pass jayega json ke form me to wha pr data change ho skta ghai
   


// // // // // // // // //         // validation 


// // // // // // // // //         // form mo submit kr do
    
// // // // // // // // //    }
// // // // // // // // //     return (
// // // // // // // // //      /*signup me name email password likho bs kewal whi userschema me reuired kiye hau jisse hm db me pahuch jaye bs utna jyada nhi dalna hai mi user interface khrab ho jayer  */  
  
// // // // // // // // //     <form onSubmit={handlesubmit}>
// // // // // // // // //   <input  type="text"  value={name} placeholder="Enter Your FirstName" onChange={(e)=>setname(e.target.value)}></input>

// // // // // // // // //   <input  type="text"  value={email} placeholder="Enter Your EmailId" onChange={(e)=>setemail(e.target.value)}></input>
// // // // // // // // //   <input  type="text"  value={password} placeholder="Enter Your Password" onChange={(e)=>setpassword(e.target.value)}></input>
// // // // // // // // //   <button type="button">Submit</button>
  

// // // // // // // // //     </form>
// // // // // // // // //     )
// // // // // // // // // }


// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Minimum character should be 3"),
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added a light bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">Leetcode</h2> {/* Added mb-6 for spacing */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* First Name Field */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">First Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John"
//                 className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`} 
//                 {...register('firstName')}
//               />
//               {errors.firstName && (
//                 <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} // Ensure w-full for consistency
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             {/* Password Field with Toggle */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   // Added pr-10 (padding-right) to make space for the button
//                   className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-error text-sm mt-1">{errors.password.message}</span>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="form-control mt-8 flex justify-center"> 
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </div>
//           </form>

//           {/* Login Redirect */}
//           <div className="text-center mt-6"> {/* Increased mt for spacing */}
//             <span className="text-sm">
//               Already have an account?{' '}
//               <NavLink to="/login" className="link link-primary">
//                 Login
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom'; // Changed from 'react-router'
import { registerUser } from '../authSlice'; // Adjust path if necessary

// Zod schema for validation, no changes needed here.
const signupSchema = z.object({
  firstname: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  // --- THIS IS THE KEY MODIFICATION ---
  // This effect runs when the 'isAuthenticated' state changes in Redux.
  useEffect(() => {
    if (isAuthenticated) {
      // After a successful registration, 'isAuthenticated' becomes true.
      // We now redirect the new user to the onboarding wizard instead of the dashboard.
      // { replace: true } prevents the user from going back to the signup page.
      navigate('/onboarding', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  // --- END OF MODIFICATION ---

  // This function dispatches your Redux action. No changes needed.
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-6">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered w-full ${errors.firstname ? 'input-error' : ''}`} 
                {...register('firstname')}
              />
              {errors.firstname && (
                <span className="text-error text-sm mt-1">{errors.firstname.message}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
              )}
            </div>

            {/* Password Field with Toggle */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8 flex justify-center"> 
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-6">
            <span className="text-sm">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary">
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

// // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { useForm } from 'react-hook-form';
// // // // // // import { zodResolver } from '@hookform/resolvers/zod';
// // // // // // import { z } from 'zod';
// // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // import { useNavigate, NavLink } from 'react-router-dom';
// // // // // // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../authSlice'; // Corrected path
// // // // // // import Captcha from '../components/Captcha'; // Assuming this path is correct

// // // // // // // --- Reusable Social Icon SVG Components (as provided by you) ---
// // // // // // const GoogleIcon = () => (
// // // // // //     <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
// // // // // // );
// // // // // // const FacebookIcon = () => (
// // // // // //     <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
// // // // // // );
// // // // // // const InstagramIcon = () => (
// // // // // //     <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><radialGradient id="insta-gradient" cx=".396" cy=".98" r="1.725"><stop offset="0" stopColor="#fd5"/><stop offset=".48" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient></defs><path fill="url(#insta-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546a4.928 4.928 0 011.82 1.82c.298.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855a4.928 4.928 0 01-1.82 1.82c-.75.298-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546a4.928 4.928 0 01-1.82-1.82c-.298-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248-2.105.546-2.855a4.928 4.928 0 011.82-1.82c.75-.298 1.597-.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.18 0-3.552.012-4.788.07-1.12.048-1.782.23-2.22.39a3.48 3.48 0 00-1.28 1.28c-.16.438-.342 1.1-.39 2.22-.058 1.236-.07 1.608-.07 4.788s.012 3.552.07 4.788c.048 1.12.23 1.782.39 2.22a3.48 3.48 0 001.28 1.28c.438.16 1.1.342 2.22.39 1.236.058 1.608.07 4.788.07s3.552-.012 4.788-.07c1.12-.048 1.782-.23 2.22-.39a3.48 3.48 0 001.28-1.28c.16-.438.342-1.1.39-2.22.058-1.236.07-1.608-.07-4.788s-.012-3.552-.07-4.788c-.048-1.12-.23-1.782-.39-2.22a3.48 3.48 0 00-1.28-1.28c-.438-.16-1.1-.342-2.22-.39-1.236-.058-1.608-.07-4.788-.07zm0 2.88c-2.923 0-5.286 2.363-5.286 5.286s2.363 5.286 5.286 5.286 5.286-2.363 5.286-5.286S14.923 6.485 12 6.485zm0 8.571c-1.815 0-3.286-1.47-3.286-3.286s1.47-3.286 3.286-3.286 3.286 1.47 3.286 3.286-1.47 3.286-3.286 3.286zm4.65-8.877a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
// // // // // // );

// // // // // // const signupSchema = z.object({
// // // // // //     firstname: z.string().min(3, "Minimum character should be 3"),
// // // // // //     emailId: z.string().email("Invalid Email"),
// // // // // //     password: z.string().min(8, "Password is too weak"),
// // // // // //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // // // // // });

// // // // // // function Signup() {
// // // // // //     const [showPassword, setShowPassword] = useState(false);
// // // // // //     const captchaRef = useRef(null);
// // // // // //     const dispatch = useDispatch();
// // // // // //     const navigate = useNavigate();

// // // // // //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading, successMessage } = useSelector((state) => state.auth);

// // // // // //     const [otp, setOtp] = useState(new Array(6).fill(""));
// // // // // //     const [timer, setTimer] = useState(60); // Set initial timer for 60 seconds
// // // // // //     const inputRefs = useRef([]);

// // // // // //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// // // // // //     useEffect(() => {
// // // // // //         if (isAuthenticated) {
// // // // // //             navigate('/onboarding', { replace: true }); // Redirect to onboarding on successful registration
// // // // // //         }
// // // // // //         // Cleanup: Reset OTP state when component unmounts or isAuthenticated changes
// // // // // //         return () => { dispatch(resetOtpState()); };
// // // // // //     }, [isAuthenticated, navigate, dispatch]);

// // // // // //     useEffect(() => {
// // // // // //         let interval;
// // // // // //         if (otpSent && timer > 0) {
// // // // // //             // Focus on the first OTP input when the OTP step is shown
// // // // // //             // A small delay helps ensure the input is rendered before focusing
// // // // // //             setTimeout(() => inputRefs.current[0]?.focus(), 100); 
// // // // // //             interval = setInterval(() => {
// // // // // //                 setTimer((prevTimer) => prevTimer - 1);
// // // // // //             }, 1000);
// // // // // //         } else if (timer === 0) {
// // // // // //             clearInterval(interval);
// // // // // //         }
// // // // // //         return () => clearInterval(interval);
// // // // // //     }, [otpSent, timer]);

// // // // // //     const handleOtpChange = (element, index) => {
// // // // // //         if (isNaN(element.value)) return;
// // // // // //         const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
// // // // // //         setOtp(newOtp);

// // // // // //         // Move to next input if a digit is entered and there's a next sibling
// // // // // //         if (element.value && element.nextSibling) {
// // // // // //             element.nextSibling.focus();
// // // // // //         }
// // // // // //         // If it's the last input and a digit is entered, attempt verification
// // // // // //         if (index === 5 && element.value) {
// // // // // //             onVerifyOtp();
// // // // // //         }
// // // // // //     };

// // // // // //     const handleOtpKeyDown = (e, index) => {
// // // // // //         if (e.key === "Backspace") {
// // // // // //             // Clear current input if it has a value, otherwise move to previous
// // // // // //             if (otp[index]) {
// // // // // //                 const newOtp = [...otp];
// // // // // //                 newOtp[index] = "";
// // // // // //                 setOtp(newOtp);
// // // // // //             } else if (index > 0) {
// // // // // //                 inputRefs.current[index - 1].focus();
// // // // // //             }
// // // // // //         }
// // // // // //     };

// // // // // //     const onSendOtp = async (data) => {
// // // // // //         dispatch(clearError()); // Clear any previous errors
// // // // // //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// // // // // //         if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
// // // // // //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// // // // // //             captchaRef.current.refresh();
// // // // // //             resetField('captcha');
// // // // // //             return;
// // // // // //         }
// // // // // //         const { captcha, ...registrationData } = data; // Remove captcha from data sent to backend
// // // // // //         dispatch(sendOtp(registrationData));
// // // // // //     };

// // // // // //     const onVerifyOtp = () => {
// // // // // //         dispatch(clearError()); // Clear any previous errors
// // // // // //         const combinedOtp = otp.join("");
// // // // // //         if (combinedOtp.length === 6) {
// // // // // //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// // // // // //         } else {
// // // // // //             // Optionally set a local error for incomplete OTP
// // // // // //             // setError('otp', { type: 'manual', message: 'Please enter the full 6-digit OTP.' });
// // // // // //         }
// // // // // //     };

// // // // // //     const handleResendOtp = () => {
// // // // // //         dispatch(clearError());
// // // // // //         // Resend OTP only requires the email, assuming backend handles the rest based on stored registration info.
// // // // // //         dispatch(resendOtp({ emailId: emailForVerification }));
// // // // // //         setTimer(60); // Reset timer
// // // // // //         setOtp(new Array(6).fill("")); // Clear OTP input fields
// // // // // //     };
    
// // // // // //     // Placeholder for social sign-up - you'll need actual backend routes for this
// // // // // //     const handleSocialSignUp = (provider) => {
// // // // // //         alert(`Redirecting to ${provider} for authentication... (This feature requires backend integration)`);
// // // // // //         // Example: window.location.href = `http://localhost:3000/user/auth/${provider}`;
// // // // // //     };

// // // // // //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// // // // // //     // Using a darker overlay for better readability on top of the image
// // // // // //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// // // // // //     const renderContent = () => {
// // // // // //         // Show a loading spinner if the initial OTP sending or verification is in progress
// // // // // //         if (loading && !otpSent) {
// // // // // //             return (
// // // // // //                 <div className="flex flex-col items-center justify-center h-full">
// // // // // //                     <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // // //                     <p className="mt-4 text-xl text-white">Creating Account...</p>
// // // // // //                 </div>
// // // // // //             );
// // // // // //         }

// // // // // //         // OTP Verification Step
// // // // // //         if (otpSent) {
// // // // // //             return (
// // // // // //                 <>
// // // // // //                     {/* Back button to re-enter details */}
// // // // // //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm text-gray-400 hover:text-primary transition-colors duration-200">← Back</button>
// // // // // //                     <h2 className="card-title justify-center text-white text-2xl mt-4">Enter OTP</h2>
// // // // // //                     <p className="text-center text-sm text-gray-300 mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
                    
// // // // // //                     {/* OTP Input Fields */}
// // // // // //                     <div className="flex justify-center space-x-2 my-4">
// // // // // //                         {otp.map((data, index) => (
// // // // // //                             <input
// // // // // //                                 key={index}
// // // // // //                                 type="tel" // Use tel for numeric keypad on mobile
// // // // // //                                 className={`input input-bordered w-12 h-14 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
// // // // // //                                     ${error && !loading ? 'input-error border-error' : ''}`}
// // // // // //                                 maxLength="1"
// // // // // //                                 value={data}
// // // // // //                                 onChange={(e) => handleOtpChange(e.target, index)}
// // // // // //                                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
// // // // // //                                 onFocus={e => e.target.select()} // Select current digit on focus
// // // // // //                                 ref={(el) => (inputRefs.current[index] = el)}
// // // // // //                                 autoFocus={index === 0} // Auto-focus first input
// // // // // //                             />
// // // // // //                         ))}
// // // // // //                     </div>
                    
// // // // // //                     {/* Error Message for OTP */}
// // // // // //                     {error && !loading && <div className="text-center text-error mt-2">{error}</div>}
// // // // // //                     {successMessage && !error && <div className="text-center text-success mt-2">{successMessage}</div>}


// // // // // //                     {/* Resend OTP Timer/Button */}
// // // // // //                     <div className="mt-4 text-center text-sm text-gray-400 min-h-[20px]">
// // // // // //                         {timer > 0 ? (
// // // // // //                             <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p>
// // // // // //                         ) : (
// // // // // //                             <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>
// // // // // //                                 {resendLoading ? 'Sending...' : 'Resend OTP'}
// // // // // //                             </button>
// // // // // //                         )}
// // // // // //                     </div>
                    
// // // // // //                     {/* Verify OTP Button */}
// // // // // //                     <div className="form-control mt-6">
// // // // // //                         <button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>
// // // // // //                             {loading ? 'Verifying...' : 'Verify & Continue'}
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 </>
// // // // // //             );
// // // // // //         }

// // // // // //         // Initial Signup Form Step
// // // // // //         return (
// // // // // //             <>
// // // // // //                 <h2 className="card-title justify-center text-white text-3xl mb-4">Create Account</h2>
// // // // // //                 {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
                
// // // // // //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// // // // // //                     {/* First Name */}
// // // // // //                     <div className="form-control">
// // // // // //                         <label className="label py-1"><span className="label-text text-gray-300">First Name</span></label>
// // // // // //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.firstname ? 'input-error border-error' : ''}`} {...register('firstname')} />
// // // // // //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// // // // // //                     </div>
                    
// // // // // //                     {/* Email */}
// // // // // //                     <div className="form-control mt-2">
// // // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Email</span></label>
// // // // // //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.emailId ? 'input-error border-error' : ''}`} {...register('emailId')} />
// // // // // //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// // // // // //                     </div>
                    
// // // // // //                     {/* Password with Toggle */}
// // // // // //                     <div className="form-control mt-2">
// // // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Password</span></label>
// // // // // //                         <div className="relative">
// // // // // //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 bg-gray-700 text-white border-gray-600 ${errors.password ? 'input-error border-error' : ''}`} {...register('password')} />
// // // // // //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
// // // // // //                                 {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// // // // // //                             </button>
// // // // // //                         </div>
// // // // // //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// // // // // //                     </div>
                    
// // // // // //                     {/* Captcha */}
// // // // // //                     <div className="form-control mt-2">
// // // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Verify You Are Human</span></label>
// // // // // //                         <div className="flex items-start space-x-3">
// // // // // //                             <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${errors.captcha ? 'input-error border-error' : ''}`} {...register('captcha')} />
// // // // // //                             <Captcha ref={captchaRef} />
// // // // // //                         </div>
// // // // // //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// // // // // //                     </div>
                    
// // // // // //                     {/* Submit Button */}
// // // // // //                     <div className="form-control mt-4">
// // // // // //                         <button type="submit" className="btn btn-primary" disabled={loading}>
// // // // // //                             {loading ? 'Sending OTP...' : 'Sign Up with Email'}
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 </form>

// // // // // //                 <div className="divider text-sm text-gray-400 my-6">OR CONTINUE WITH</div>

// // // // // //                 {/* Social Sign-up Buttons */}
// // // // // //                 <div className="flex justify-center items-center gap-4">
// // // // // //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Google"><GoogleIcon /></button>
// // // // // //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// // // // // //                     <button onClick={() => alert("Instagram login is not supported for this type of application.")} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 opacity-50 cursor-not-allowed" aria-label="Sign up with Instagram (disabled)" disabled><InstagramIcon /></button>
// // // // // //                 </div>

// // // // // //                 {/* Login Redirect */}
// // // // // //                 <div className="text-center mt-6">
// // // // // //                     <p className="text-sm text-gray-400">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// // // // // //                 </div>
// // // // // //             </>
// // // // // //         );
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// // // // // //             <div className="card w-96 shadow-xl text-white" style={cardFinalStyle}>
// // // // // //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '550px' }}>
// // // // // //                     {renderContent()}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // export default Signup;

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useForm } from 'react-hook-form';
// // // // // import { zodResolver } from '@hookform/resolvers/zod';
// // // // // import { z } from 'zod';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { useNavigate, NavLink } from 'react-router-dom';
// // // // // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../redux/authSlice'; // Corrected Redux path
// // // // // import Captcha from '../components/Captcha'; // Assuming this path is correct

// // // // // // --- Reusable Social Icon SVG Components ---
// // // // // const GoogleIcon = () => (
// // // // //     <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
// // // // // );
// // // // // const FacebookIcon = () => (
// // // // //     <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
// // // // // );
// // // // // const InstagramIcon = () => (
// // // // //     <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><radialGradient id="insta-gradient" cx=".396" cy=".98" r="1.725"><stop offset="0" stopColor="#fd5"/><stop offset=".48" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient></defs><path fill="url(#insta-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546a4.928 4.928 0 011.82 1.82c.298.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855a4.928 4.928 0 01-1.82 1.82c-.75.298-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546a4.928 4.928 0 01-1.82-1.82c-.298-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248-2.105.546-2.855a4.928 4.928 0 011.82-1.82c.75-.298 1.597-.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.18 0-3.552.012-4.788.07-1.12.048-1.782.23-2.22.39a3.48 3.48 0 00-1.28 1.28c-.16.438-.342 1.1-.39 2.22-.058 1.236-.07 1.608-.07 4.788s.012 3.552.07 4.788c.048 1.12.23 1.782.39 2.22a3.48 3.48 0 001.28 1.28c.438.16 1.1.342 2.22.39 1.236.058 1.608.07 4.788.07s3.552-.012 4.788-.07c1.12-.048 1.782-.23 2.22-.39a3.48 3.48 0 001.28-1.28c.16-.438.342-1.1.39-2.22.058-1.236.07-1.608-.07-4.788s-.012-3.552-.07-4.788c-.048-1.12-.23-1.782-.39-2.22a3.48 3.48 0 00-1.28-1.28c-.438-.16-1.1-.342-2.22-.39-1.236-.058-1.608-.07-4.788-.07zm0 2.88c-2.923 0-5.286 2.363-5.286 5.286s2.363 5.286 5.286 5.286 5.286-2.363 5.286-5.286S14.923 6.485 12 6.485zm0 8.571c-1.815 0-3.286-1.47-3.286-3.286s1.47-3.286 3.286-3.286 3.286 1.47 3.286 3.286-1.47 3.286-3.286 3.286zm4.65-8.877a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
// // // // // );

// // // // // const signupSchema = z.object({
// // // // //     firstname: z.string().min(3, "Minimum character should be 3"),
// // // // //     emailId: z.string().email("Invalid Email"),
// // // // //     password: z.string().min(8, "Password is too weak"),
// // // // //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // // // // });

// // // // // function Signup() {
// // // // //     const [showPassword, setShowPassword] = useState(false);
// // // // //     const captchaRef = useRef(null);
// // // // //     const dispatch = useDispatch();
// // // // //     const navigate = useNavigate();

// // // // //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading, successMessage } = useSelector((state) => state.auth);

// // // // //     const [otp, setOtp] = useState(new Array(6).fill(""));
// // // // //     const [timer, setTimer] = useState(60); // Set initial timer for 60 seconds
// // // // //     const inputRefs = useRef([]);

// // // // //     // Use form for initial signup fields and captcha
// // // // //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// // // // //     useEffect(() => {
// // // // //         if (isAuthenticated) {
// // // // //             navigate('/onboarding', { replace: true }); // Redirect to onboarding on successful registration
// // // // //         }
// // // // //         // Cleanup: Reset OTP state when component unmounts or isAuthenticated changes
// // // // //         return () => { dispatch(resetOtpState()); };
// // // // //     }, [isAuthenticated, navigate, dispatch]);

// // // // //     useEffect(() => {
// // // // //         let interval;
// // // // //         if (otpSent && timer > 0) {
// // // // //             // Focus on the first OTP input when the OTP step is shown
// // // // //             // A small delay helps ensure the input is rendered before focusing
// // // // //             setTimeout(() => inputRefs.current[0]?.focus(), 100); 
// // // // //             interval = setInterval(() => {
// // // // //                 setTimer((prevTimer) => prevTimer - 1);
// // // // //             }, 1000);
// // // // //         } else if (timer === 0) {
// // // // //             clearInterval(interval);
// // // // //         }
// // // // //         return () => clearInterval(interval);
// // // // //     }, [otpSent, timer]);

// // // // //     const handleOtpChange = (element, index) => {
// // // // //         if (isNaN(element.value)) return; // Only allow numbers
// // // // //         const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
// // // // //         setOtp(newOtp);

// // // // //         // Move to next input if a digit is entered and there's a next sibling
// // // // //         if (element.value && element.nextSibling) {
// // // // //             element.nextSibling.focus();
// // // // //         }
// // // // //         // If it's the last input and a digit is entered, attempt verification
// // // // //         if (index === 5 && element.value) {
// // // // //             // Delay slightly to allow the last digit to register in state before dispatching
// // // // //             setTimeout(onVerifyOtp, 100); 
// // // // //         }
// // // // //     };

// // // // //     const handleOtpKeyDown = (e, index) => {
// // // // //         if (e.key === "Backspace") {
// // // // //             // Clear current input if it has a value, otherwise move to previous
// // // // //             if (otp[index]) {
// // // // //                 const newOtp = [...otp];
// // // // //                 newOtp[index] = "";
// // // // //                 setOtp(newOtp);
// // // // //             } else if (index > 0) {
// // // // //                 inputRefs.current[index - 1].focus();
// // // // //             }
// // // // //         }
// // // // //     };

// // // // //     const onSendOtp = async (data) => {
// // // // //         dispatch(clearError()); // Clear any previous errors
// // // // //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// // // // //         if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
// // // // //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// // // // //             captchaRef.current.refresh();
// // // // //             resetField('captcha'); // Clear the captcha input field
// // // // //             return;
// // // // //         }
// // // // //         const { captcha, ...registrationData } = data; // Remove captcha from data sent to backend
// // // // //         dispatch(sendOtp(registrationData));
// // // // //     };

// // // // //     const onVerifyOtp = () => {
// // // // //         dispatch(clearError()); // Clear any previous errors
// // // // //         const combinedOtp = otp.join("");
// // // // //         if (combinedOtp.length === 6) {
// // // // //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// // // // //         } else {
// // // // //             // Set a local form error for incomplete OTP
// // // // //             setError('otp', { type: 'manual', message: 'Please enter the full 6-digit OTP.' });
// // // // //         }
// // // // //     };

// // // // //     const handleResendOtp = () => {
// // // // //         dispatch(clearError()); // Clear any previous errors
// // // // //         dispatch(resendOtp({ emailId: emailForVerification }));
// // // // //         setTimer(60); // Reset timer
// // // // //         setOtp(new Array(6).fill("")); // Clear OTP input fields
// // // // //     };
    
// // // // //     // Placeholder for social sign-up - you'll need actual backend routes for this
// // // // //     const handleSocialSignUp = (provider) => {
// // // // //         alert(`Redirecting to ${provider} for authentication... (This feature requires backend integration)`);
// // // // //         // Example: window.location.href = `http://localhost:3000/user/auth/${provider}`;
// // // // //     };

// // // // //     // Use your specified background image and a darker overlay for the card
// // // // //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// // // // //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// // // // //     const renderContent = () => {
// // // // //         // Show a loading spinner if the initial OTP sending or verification is in progress
// // // // //         if (loading && !otpSent) {
// // // // //             return (
// // // // //                 <div className="flex flex-col items-center justify-center h-full">
// // // // //                     <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // //                     <p className="mt-4 text-xl text-white">Creating Account...</p>
// // // // //                 </div>
// // // // //             );
// // // // //         }

// // // // //         // OTP Verification Step
// // // // //         if (otpSent) {
// // // // //             return (
// // // // //                 <>
// // // // //                     {/* Back button to re-enter details */}
// // // // //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm text-gray-400 hover:text-primary transition-colors duration-200">← Back</button>
// // // // //                     <h2 className="card-title justify-center text-white text-2xl mt-4">Enter OTP</h2>
// // // // //                     <p className="text-center text-sm text-gray-300 mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
                    
// // // // //                     {/* OTP Input Fields */}
// // // // //                     {/* Centered and with consistent styling */}
// // // // //                     <div className="flex justify-center space-x-2 my-4">
// // // // //                         {otp.map((data, index) => (
// // // // //                             <input
// // // // //                                 key={index}
// // // // //                                 type="tel" // Use tel for numeric keypad on mobile
// // // // //                                 className={`input input-bordered w-12 h-14 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
// // // // //                                     ${errors.otp || (error && !loading) ? 'input-error border-error' : ''}`} // Apply error class if Redux error or local Zod error
// // // // //                                 maxLength="1"
// // // // //                                 value={data}
// // // // //                                 onChange={(e) => handleOtpChange(e.target, index)}
// // // // //                                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
// // // // //                                 onFocus={e => e.target.select()} // Select current digit on focus
// // // // //                                 ref={(el) => (inputRefs.current[index] = el)}
// // // // //                                 autoFocus={index === 0} // Auto-focus first input
// // // // //                             />
// // // // //                         ))}
// // // // //                     </div>
                    
// // // // //                     {/* Error Message for OTP */}
// // // // //                     {errors.otp && <div className="text-center text-error mt-2">{errors.otp.message}</div>} {/* Local Zod error for OTP field */}
// // // // //                     {error && !loading && !errors.otp && <div className="text-center text-error mt-2">{error}</div>} {/* Redux error if no local error */}
// // // // //                     {successMessage && !error && !errors.otp && <div className="text-center text-success mt-2">{successMessage}</div>}

// // // // //                     {/* Resend OTP Timer/Button */}
// // // // //                     <div className="mt-4 text-center text-sm text-gray-400 min-h-[20px]">
// // // // //                         {timer > 0 ? (
// // // // //                             <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p>
// // // // //                         ) : (
// // // // //                             <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>
// // // // //                                 {resendLoading ? 'Sending...' : 'Resend OTP'}
// // // // //                             </button>
// // // // //                         )}
// // // // //                     </div>
                    
// // // // //                     {/* Verify OTP Button */}
// // // // //                     <div className="form-control mt-6">
// // // // //                         <button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>
// // // // //                             {loading ? 'Verifying...' : 'Verify & Continue'}
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </>
// // // // //             );
// // // // //         }

// // // // //         // Initial Signup Form Step
// // // // //         return (
// // // // //             <>
// // // // //                 <h2 className="card-title justify-center text-white text-3xl mb-4">Create Account</h2>
// // // // //                 {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
                
// // // // //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// // // // //                     {/* First Name */}
// // // // //                     <div className="form-control">
// // // // //                         <label className="label py-1"><span className="label-text text-gray-300">First Name</span></label>
// // // // //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.firstname ? 'input-error border-error' : ''}`} {...register('firstname')} />
// // // // //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// // // // //                     </div>
                    
// // // // //                     {/* Email */}
// // // // //                     <div className="form-control mt-2">
// // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Email</span></label>
// // // // //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.emailId ? 'input-error border-error' : ''}`} {...register('emailId')} />
// // // // //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// // // // //                     </div>
                    
// // // // //                     {/* Password with Toggle */}
// // // // //                     <div className="form-control mt-2">
// // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Password</span></label>
// // // // //                         <div className="relative">
// // // // //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 bg-gray-700 text-white border-gray-600 ${errors.password ? 'input-error border-error' : ''}`} {...register('password')} />
// // // // //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
// // // // //                                 {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// // // // //                             </button>
// // // // //                         </div>
// // // // //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// // // // //                     </div>
                    
// // // // //                     {/* Captcha */}
// // // // //                     <div className="form-control mt-2">
// // // // //                         <label className="label py-1"><span className="label-text text-gray-300">Verify You Are Human</span></label>
// // // // //                         {/* Ensure flex items are vertically aligned for visual appeal */}
// // // // //                         <div className="flex items-center space-x-3">
// // // // //                             <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${errors.captcha ? 'input-error border-error' : ''}`} {...register('captcha')} />
// // // // //                             <Captcha ref={captchaRef} />
// // // // //                         </div>
// // // // //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// // // // //                     </div>
                    
// // // // //                     {/* Submit Button */}
// // // // //                     <div className="form-control mt-4">
// // // // //                         <button type="submit" className="btn btn-primary" disabled={loading}>
// // // // //                             {loading ? 'Sending OTP...' : 'Sign Up with Email'}
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </form>

// // // // //                 <div className="divider text-sm text-gray-400 my-6">OR CONTINUE WITH</div>

// // // // //                 {/* Social Sign-up Buttons */}
// // // // //                 <div className="flex justify-center items-center gap-4">
// // // // //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Google"><GoogleIcon /></button>
// // // // //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// // // // //                     <button onClick={() => alert("Instagram login is not supported for this type of application.")} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 opacity-50 cursor-not-allowed" aria-label="Sign up with Instagram (disabled)" disabled><InstagramIcon /></button>
// // // // //                 </div>

// // // // //                 {/* Login Redirect */}
// // // // //                 <div className="text-center mt-6">
// // // // //                     <p className="text-sm text-gray-400">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// // // // //                 </div>
// // // // //             </>
// // // // //         );
// // // // //     };

// // // // //     return (
// // // // //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// // // // //             <div className="card w-96 shadow-xl text-white" style={cardFinalStyle}>
// // // // //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '550px' }}>
// // // // //                     {renderContent()}
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Signup;

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useForm } from 'react-hook-form';
// // // // import { zodResolver } from '@hookform/resolvers/zod';
// // // // import { z } from 'zod';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { useNavigate, NavLink } from 'react-router-dom';
// // // // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../authSlice'; // CORRECTED PATH
// // // // import Captcha from '../components/Captcha'; // Assuming this path is correct

// // // // // --- Reusable Social Icon SVG Components ---
// // // // const GoogleIcon = () => (
// // // //     <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
// // // // );
// // // // const FacebookIcon = () => (
// // // //     <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
// // // // );
// // // // const InstagramIcon = () => (
// // // //     <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><radialGradient id="insta-gradient" cx=".396" cy=".98" r="1.725"><stop offset="0" stopColor="#fd5"/><stop offset=".48" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient></defs><path fill="url(#insta-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546a4.928 4.928 0 011.82 1.82c.298.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855a4.928 4.928 0 01-1.82 1.82c-.75.298-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546a4.928 4.928 0 01-1.82-1.82c-.298-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248-2.105.546-2.855a4.928 4.928 0 011.82-1.82c.75-.298 1.597-.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.18 0-3.552.012-4.788.07-1.12.048-1.782.23-2.22.39a3.48 3.48 0 00-1.28 1.28c-.16.438-.342 1.1-.39 2.22-.058 1.236-.07 1.608-.07 4.788s.012 3.552.07 4.788c.048 1.12.23 1.782.39 2.22a3.48 3.48 0 001.28 1.28c.438.16 1.1.342 2.22.39 1.236.058 1.608.07 4.788.07s3.552-.012 4.788-.07c1.12-.048 1.782-.23 2.22-.39a3.48 3.48 0 001.28-1.28c.16-.438.342-1.1.39-2.22.058-1.236.07-1.608-.07-4.788s-.012-3.552-.07-4.788c-.048-1.12-.23-1.782-.39-2.22a3.48 3.48 0 00-1.28-1.28c-.438-.16-1.1-.342-2.22-.39-1.236-.058-1.608-.07-4.788-.07zm0 2.88c-2.923 0-5.286 2.363-5.286 5.286s2.363 5.286 5.286 5.286 5.286-2.363 5.286-5.286S14.923 6.485 12 6.485zm0 8.571c-1.815 0-3.286-1.47-3.286-3.286s1.47-3.286 3.286-3.286 3.286 1.47 3.286 3.286-1.47 3.286-3.286 3.286zm4.65-8.877a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
// // // // );

// // // // const signupSchema = z.object({
// // // //     firstname: z.string().min(3, "Minimum character should be 3"),
// // // //     emailId: z.string().email("Invalid Email"),
// // // //     password: z.string().min(8, "Password is too weak"),
// // // //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // // // });

// // // // function Signup() {
// // // //     const [showPassword, setShowPassword] = useState(false);
// // // //     const captchaRef = useRef(null);
// // // //     const dispatch = useDispatch();
// // // //     const navigate = useNavigate();

// // // //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading, successMessage } = useSelector((state) => state.auth);

// // // //     const [otp, setOtp] = useState(new Array(6).fill(""));
// // // //     const [timer, setTimer] = useState(60); // Set initial timer for 60 seconds
// // // //     const inputRefs = useRef([]);

// // // //     // Use form for initial signup fields and captcha
// // // //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// // // //     useEffect(() => {
// // // //         if (isAuthenticated) {
// // // //             navigate('/onboarding', { replace: true }); // Redirect to onboarding on successful registration
// // // //         }
// // // //         // Cleanup: Reset OTP state when component unmounts or isAuthenticated changes
// // // //         return () => { dispatch(resetOtpState()); };
// // // //     }, [isAuthenticated, navigate, dispatch]);

// // // //     useEffect(() => {
// // // //         let interval;
// // // //         if (otpSent && timer > 0) {
// // // //             // Focus on the first OTP input when the OTP step is shown
// // // //             // A small delay helps ensure the input is rendered before focusing
// // // //             setTimeout(() => inputRefs.current[0]?.focus(), 100); 
// // // //             interval = setInterval(() => {
// // // //                 setTimer((prevTimer) => prevTimer - 1);
// // // //             }, 1000);
// // // //         } else if (timer === 0) {
// // // //             clearInterval(interval);
// // // //         }
// // // //         return () => clearInterval(interval);
// // // //     }, [otpSent, timer]);

// // // //     const handleOtpChange = (element, index) => {
// // // //         if (isNaN(element.value)) return; // Only allow numbers
// // // //         const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
// // // //         setOtp(newOtp);

// // // //         // Move to next input if a digit is entered and there's a next sibling
// // // //         if (element.value && element.nextSibling) {
// // // //             element.nextSibling.focus();
// // // //         }
// // // //         // If it's the last input and a digit is entered, attempt verification
// // // //         if (index === 5 && element.value) {
// // // //             // Delay slightly to allow the last digit to register in state before dispatching
// // // //             setTimeout(onVerifyOtp, 100); 
// // // //         }
// // // //     };

// // // //     const handleOtpKeyDown = (e, index) => {
// // // //         if (e.key === "Backspace") {
// // // //             // Clear current input if it has a value, otherwise move to previous
// // // //             if (otp[index]) {
// // // //                 const newOtp = [...otp];
// // // //                 newOtp[index] = "";
// // // //                 setOtp(newOtp);
// // // //             } else if (index > 0) {
// // // //                 inputRefs.current[index - 1].focus();
// // // //             }
// // // //         }
// // // //     };

// // // //     const onSendOtp = async (data) => {
// // // //         dispatch(clearError()); // Clear any previous errors
// // // //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// // // //         if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
// // // //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// // // //             captchaRef.current.refresh();
// // // //             resetField('captcha'); // Clear the captcha input field
// // // //             return;
// // // //         }
// // // //         const { captcha, ...registrationData } = data; // Remove captcha from data sent to backend
// // // //         dispatch(sendOtp(registrationData));
// // // //     };

// // // //     const onVerifyOtp = () => {
// // // //         dispatch(clearError()); // Clear any previous errors
// // // //         const combinedOtp = otp.join("");
// // // //         if (combinedOtp.length === 6) {
// // // //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// // // //         } else {
// // // //             // Set a local form error for incomplete OTP
// // // //             setError('otp', { type: 'manual', message: 'Please enter the full 6-digit OTP.' });
// // // //         }
// // // //     };

// // // //     const handleResendOtp = () => {
// // // //         dispatch(clearError()); // Clear any previous errors
// // // //         dispatch(resendOtp({ emailId: emailForVerification }));
// // // //         setTimer(60); // Reset timer
// // // //         setOtp(new Array(6).fill("")); // Clear OTP input fields
// // // //     };
    
// // // //     // Placeholder for social sign-up - you'll need actual backend routes for this
// // // //     const handleSocialSignUp = (provider) => {
// // // //         alert(`Redirecting to ${provider} for authentication... (This feature requires backend integration)`);
// // // //         // Example: window.location.href = `http://localhost:3000/user/auth/${provider}`;
// // // //     };

// // // //     // Use your specified background image and a darker overlay for the card
// // // //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// // // //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// // // //     const renderContent = () => {
// // // //         // Show a loading spinner if the initial OTP sending or verification is in progress
// // // //         if (loading && !otpSent) {
// // // //             return (
// // // //                 <div className="flex flex-col items-center justify-center h-full">
// // // //                     <span className="loading loading-spinner loading-lg text-primary"></span>
// // // //                     <p className="mt-4 text-xl text-white">Creating Account...</p>
// // // //                 </div>
// // // //             );
// // // //         }

// // // //         // OTP Verification Step
// // // //         if (otpSent) {
// // // //             return (
// // // //                 <>
// // // //                     {/* Back button to re-enter details */}
// // // //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm text-gray-400 hover:text-primary transition-colors duration-200">← Back</button>
// // // //                     <h2 className="card-title justify-center text-white text-2xl mt-4">Enter OTP</h2>
// // // //                     <p className="text-center text-sm text-gray-300 mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
                    
// // // //                     {/* OTP Input Fields */}
// // // //                     {/* Centered and with consistent styling */}
// // // //                     <div className="flex justify-center space-x-2 my-4">
// // // //                         {otp.map((data, index) => (
// // // //                             <input
// // // //                                 key={index}
// // // //                                 type="tel" // Use tel for numeric keypad on mobile
// // // //                                 className={`input input-bordered w-12 h-14 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
// // // //                                     ${errors.otp || (error && !loading) ? 'input-error border-error' : ''}`} // Apply error class if Redux error or local Zod error
// // // //                                 maxLength="1"
// // // //                                 value={data}
// // // //                                 onChange={(e) => handleOtpChange(e.target, index)}
// // // //                                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
// // // //                                 onFocus={e => e.target.select()} // Select current digit on focus
// // // //                                 ref={(el) => (inputRefs.current[index] = el)}
// // // //                                 autoFocus={index === 0} // Auto-focus first input
// // // //                             />
// // // //                         ))}
// // // //                     </div>
                    
// // // //                     {/* Error Message for OTP */}
// // // //                     {errors.otp && <div className="text-center text-error mt-2">{errors.otp.message}</div>} {/* Local Zod error for OTP field */}
// // // //                     {error && !loading && !errors.otp && <div className="text-center text-error mt-2">{error}</div>} {/* Redux error if no local error */}
// // // //                     {successMessage && !error && !errors.otp && <div className="text-center text-success mt-2">{successMessage}</div>}

// // // //                     {/* Resend OTP Timer/Button */}
// // // //                     <div className="mt-4 text-center text-sm text-gray-400 min-h-[20px]">
// // // //                         {timer > 0 ? (
// // // //                             <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p>
// // // //                         ) : (
// // // //                             <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>
// // // //                                 {resendLoading ? 'Sending...' : 'Resend OTP'}
// // // //                             </button>
// // // //                         )}
// // // //                     </div>
                    
// // // //                     {/* Verify OTP Button */}
// // // //                     <div className="form-control mt-6">
// // // //                         <button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>
// // // //                             {loading ? 'Verifying...' : 'Verify & Continue'}
// // // //                         </button>
// // // //                     </div>
// // // //                 </>
// // // //             );
// // // //         }

// // // //         // Initial Signup Form Step
// // // //         return (
// // // //             <>
// // // //                 <h2 className="card-title justify-center text-white text-3xl mb-4">Create Account</h2>
// // // //                 {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
                
// // // //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// // // //                     {/* First Name */}
// // // //                     <div className="form-control">
// // // //                         <label className="label py-1"><span className="label-text text-gray-300">First Name</span></label>
// // // //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.firstname ? 'input-error border-error' : ''}`} {...register('firstname')} />
// // // //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// // // //                     </div>
                    
// // // //                     {/* Email */}
// // // //                     <div className="form-control mt-2">
// // // //                         <label className="label py-1"><span className="label-text text-gray-300">Email</span></label>
// // // //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.emailId ? 'input-error border-error' : ''}`} {...register('emailId')} />
// // // //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// // // //                     </div>
                    
// // // //                     {/* Password with Toggle */}
// // // //                     <div className="form-control mt-2">
// // // //                         <label className="label py-1"><span className="label-text text-gray-300">Password</span></label>
// // // //                         <div className="relative">
// // // //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 bg-gray-700 text-white border-gray-600 ${errors.password ? 'input-error border-error' : ''}`} {...register('password')} />
// // // //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
// // // //                                 {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// // // //                             </button>
// // // //                         </div>
// // // //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// // // //                     </div>
                    
// // // //                     {/* Captcha */}
// // // //                     <div className="form-control mt-2">
// // // //                         <label className="label py-1"><span className="label-text text-gray-300">Verify You Are Human</span></label>
// // // //                         {/* Ensure flex items are vertically aligned for visual appeal */}
// // // //                         <div className="flex items-center space-x-3">
// // // //                             <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${errors.captcha ? 'input-error border-error' : ''}`} {...register('captcha')} />
// // // //                             <Captcha ref={captchaRef} />
// // // //                         </div>
// // // //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// // // //                     </div>
                    
// // // //                     {/* Submit Button */}
// // // //                     <div className="form-control mt-4">
// // // //                         <button type="submit" className="btn btn-primary" disabled={loading}>
// // // //                             {loading ? 'Sending OTP...' : 'Sign Up with Email'}
// // // //                         </button>
// // // //                     </div>
// // // //                 </form>

// // // //                 <div className="divider text-sm text-gray-400 my-6">OR CONTINUE WITH</div>

// // // //                 {/* Social Sign-up Buttons */}
// // // //                 <div className="flex justify-center items-center gap-4">
// // // //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Google"><GoogleIcon /></button>
// // // //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// // // //                     <button onClick={() => alert("Instagram login is not supported for this type of application.")} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 opacity-50 cursor-not-allowed" aria-label="Sign up with Instagram (disabled)" disabled><InstagramIcon /></button>
// // // //                 </div>

// // // //                 {/* Login Redirect */}
// // // //                 <div className="text-center mt-6">
// // // //                     <p className="text-sm text-gray-400">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// // // //                 </div>
// // // //             </>
// // // //         );
// // // //     };

// // // //     return (
// // // //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// // // //             <div className="card w-96 shadow-xl text-white" style={cardFinalStyle}>
// // // //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '550px' }}>
// // // //                     {renderContent()}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Signup;

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useForm } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';
// // // import { z } from 'zod';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useNavigate, NavLink } from 'react-router-dom';
// // // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../authSlice'; // CORRECTED PATH
// // // import Captcha from '../components/Captcha'; // Assuming this path is correct

// // // // --- Reusable Social Icon SVG Components ---
// // // const GoogleIcon = () => (
// // //     <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
// // // );
// // // const FacebookIcon = () => (
// // //     <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
// // // );
// // // const InstagramIcon = () => (
// // //     <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><radialGradient id="insta-gradient" cx=".396" cy=".98" r="1.725"><stop offset="0" stopColor="#fd5"/><stop offset=".48" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient></defs><path fill="url(#insta-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546a4.928 4.928 0 011.82 1.82c.298.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855a4.928 4.928 0 01-1.82 1.82c-.75.298-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546a4.928 4.928 0 01-1.82-1.82c-.298-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248-2.105.546-2.855a4.928 4.928 0 011.82-1.82c.75-.298 1.597-.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.18 0-3.552.012-4.788.07-1.12.048-1.782.23-2.22.39a3.48 3.48 0 00-1.28 1.28c-.16.438-.342 1.1-.39 2.22-.058 1.236-.07 1.608-.07 4.788s.012 3.552.07 4.788c.048 1.12.23 1.782.39 2.22a3.48 3.48 0 001.28 1.28c.438.16 1.1.342 2.22.39 1.236.058 1.608.07 4.788.07s3.552-.012 4.788-.07c1.12-.048 1.782-.23 2.22-.39a3.48 3.48 0 001.28-1.28c.16-.438.342-1.1.39-2.22.058-1.236.07-1.608-.07-4.788s-.012-3.552-.07-4.788c-.048-1.12-.23-1.782-.39-2.22a3.48 3.48 0 00-1.28-1.28c-.438-.16-1.1-.342-2.22-.39-1.236-.058-1.608-.07-4.788-.07zm0 2.88c-2.923 0-5.286 2.363-5.286 5.286s2.363 5.286 5.286 5.286 5.286-2.363 5.286-5.286S14.923 6.485 12 6.485zm0 8.571c-1.815 0-3.286-1.47-3.286-3.286s1.47-3.286 3.286-3.286 3.286 1.47 3.286 3.286-1.47 3.286-3.286 3.286zm4.65-8.877a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
// // // );

// // // const signupSchema = z.object({
// // //     firstname: z.string().min(3, "Minimum character should be 3"),
// // //     emailId: z.string().email("Invalid Email"),
// // //     password: z.string().min(8, "Password is too weak"),
// // //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // // });

// // // function Signup() {
// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const captchaRef = useRef(null);
// // //     const dispatch = useDispatch();
// // //     const navigate = useNavigate();

// // //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading, successMessage } = useSelector((state) => state.auth);

// // //     const [otp, setOtp] = useState(new Array(6).fill(""));
// // //     const [timer, setTimer] = useState(60); // Set initial timer for 60 seconds
// // //     const inputRefs = useRef([]);

// // //     // Use form for initial signup fields and captcha
// // //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// // //     useEffect(() => {
// // //         if (isAuthenticated) {
// // //             navigate('/onboarding', { replace: true }); // Redirect to onboarding on successful registration
// // //         }
// // //         // Cleanup: Reset OTP state when component unmounts or isAuthenticated changes
// // //         return () => { dispatch(resetOtpState()); };
// // //     }, [isAuthenticated, navigate, dispatch]);

// // //     useEffect(() => {
// // //         let interval;
// // //         if (otpSent && timer > 0) {
// // //             // Focus on the first OTP input when the OTP step is shown
// // //             // A small delay helps ensure the input is rendered before focusing
// // //             setTimeout(() => inputRefs.current[0]?.focus(), 100); 
// // //             interval = setInterval(() => {
// // //                 setTimer((prevTimer) => prevTimer - 1);
// // //             }, 1000);
// // //         } else if (timer === 0) {
// // //             clearInterval(interval);
// // //         }
// // //         return () => clearInterval(interval);
// // //     }, [otpSent, timer]);

// // //     const handleOtpChange = (element, index) => {
// // //         if (isNaN(element.value)) return; // Only allow numbers
// // //         const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
// // //         setOtp(newOtp);

// // //         // Move to next input if a digit is entered and there's a next sibling
// // //         if (element.value && element.nextSibling) {
// // //             element.nextSibling.focus();
// // //         }
// // //         // If it's the last input and a digit is entered, attempt verification
// // //         if (index === 5 && element.value) {
// // //             // Delay slightly to allow the last digit to register in state before dispatching
// // //             setTimeout(onVerifyOtp, 100); 
// // //         }
// // //     };

// // //     const handleOtpKeyDown = (e, index) => {
// // //         if (e.key === "Backspace") {
// // //             // Clear current input if it has a value, otherwise move to previous
// // //             if (otp[index]) {
// // //                 const newOtp = [...otp];
// // //                 newOtp[index] = "";
// // //                 setOtp(newOtp);
// // //             } else if (index > 0) {
// // //                 inputRefs.current[index - 1].focus();
// // //             }
// // //         }
// // //     };

// // //     const onSendOtp = async (data) => {
// // //         dispatch(clearError()); // Clear any previous errors
// // //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// // //         if (data.captcha.toLowerCase() !== correctCaptchaText.toLowerCase()) { // Case-insensitive comparison
// // //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// // //             captchaRef.current.refresh();
// // //             resetField('captcha'); // Clear the captcha input field
// // //             return;
// // //         }
// // //         const { captcha, ...registrationData } = data; // Remove captcha from data sent to backend
// // //         dispatch(sendOtp(registrationData));
// // //     };

// // //     const onVerifyOtp = () => {
// // //         dispatch(clearError()); // Clear any previous errors
// // //         const combinedOtp = otp.join("");
// // //         if (combinedOtp.length === 6) {
// // //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// // //         } else {
// // //             // Set a local form error for incomplete OTP
// // //             setError('otp', { type: 'manual', message: 'Please enter the full 6-digit OTP.' });
// // //         }
// // //     };

// // //     const handleResendOtp = () => {
// // //         dispatch(clearError()); // Clear any previous errors
// // //         dispatch(resendOtp({ emailId: emailForVerification }));
// // //         setTimer(60); // Reset timer
// // //         setOtp(new Array(6).fill("")); // Clear OTP input fields
// // //     };
    
// // //     // Placeholder for social sign-up - you'll need actual backend routes for this
// // //     const handleSocialSignUp = (provider) => {
// // //         alert(`Redirecting to ${provider} for authentication... (This feature requires backend integration)`);
// // //         // Example: window.location.href = `http://localhost:3000/user/auth/${provider}`;
// // //     };

// // //     // Use your specified background image and a darker overlay for the card
// // //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// // //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// // //     const renderContent = () => {
// // //         // Show a loading spinner if the initial OTP sending or verification is in progress
// // //         if (loading && !otpSent) {
// // //             return (
// // //                 <div className="flex flex-col items-center justify-center h-full">
// // //                     <span className="loading loading-spinner loading-lg text-primary"></span>
// // //                     <p className="mt-4 text-xl text-white">Creating Account...</p>
// // //                 </div>
// // //             );
// // //         }

// // //         // OTP Verification Step
// // //         if (otpSent) {
// // //             return (
// // //                 <>
// // //                     {/* Back button to re-enter details */}
// // //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm text-gray-400 hover:text-primary transition-colors duration-200">← Back</button>
// // //                     <h2 className="card-title justify-center text-white text-2xl mt-4">Enter OTP</h2>
// // //                     <p className="text-center text-sm text-gray-300 mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
                    
// // //                     {/* OTP Input Fields */}
// // //                     {/* Centered and with consistent styling */}
// // //                     <div className="flex justify-center space-x-2 my-4">
// // //                         {otp.map((data, index) => (
// // //                             <input
// // //                                 key={index}
// // //                                 type="tel" // Use tel for numeric keypad on mobile
// // //                                 className={`input input-bordered w-12 h-14 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
// // //                                     ${errors.otp || (error && !loading) ? 'input-error border-error' : ''}`} // Apply error class if Redux error or local Zod error
// // //                                 maxLength="1"
// // //                                 value={data}
// // //                                 onChange={(e) => handleOtpChange(e.target, index)}
// // //                                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
// // //                                 onFocus={e => e.target.select()} // Select current digit on focus
// // //                                 ref={(el) => (inputRefs.current[index] = el)}
// // //                                 autoFocus={index === 0} // Auto-focus first input
// // //                             />
// // //                         ))}
// // //                     </div>
                    
// // //                     {/* Error Message for OTP */}
// // //                     {errors.otp && <div className="text-center text-error mt-2">{errors.otp.message}</div>} {/* Local Zod error for OTP field */}
// // //                     {error && !loading && !errors.otp && <div className="text-center text-error mt-2">{error}</div>} {/* Redux error if no local error */}
// // //                     {successMessage && !error && !errors.otp && <div className="text-center text-success mt-2">{successMessage}</div>}

// // //                     {/* Resend OTP Timer/Button */}
// // //                     <div className="mt-4 text-center text-sm text-gray-400 min-h-[20px]">
// // //                         {timer > 0 ? (
// // //                             <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p>
// // //                         ) : (
// // //                             <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>
// // //                                 {resendLoading ? 'Sending...' : 'Resend OTP'}
// // //                             </button>
// // //                         )}
// // //                     </div>
                    
// // //                     {/* Verify OTP Button */}
// // //                     <div className="form-control mt-6">
// // //                         <button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>
// // //                             {loading ? 'Verifying...' : 'Verify & Continue'}
// // //                         </button>
// // //                     </div>
// // //                 </>
// // //             );
// // //         }

// // //         // Initial Signup Form Step
// // //         return (
// // //             <>
// // //                 <h2 className="card-title justify-center text-white text-3xl mb-4">Create Account</h2>
// // //                 {error && <div className="alert alert-error shadow-lg mb-4"><div><span className="text-sm">{error}</span></div></div>}
                
// // //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// // //                     {/* First Name */}
// // //                     <div className="form-control">
// // //                         <label className="label py-1"><span className="label-text text-gray-300">First Name</span></label>
// // //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.firstname ? 'input-error border-error' : ''}`} {...register('firstname')} />
// // //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// // //                     </div>
                    
// // //                     {/* Email */}
// // //                     <div className="form-control mt-2">
// // //                         <label className="label py-1"><span className="label-text text-gray-300">Email</span></label>
// // //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm bg-gray-700 text-white border-gray-600 ${errors.emailId ? 'input-error border-error' : ''}`} {...register('emailId')} />
// // //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// // //                     </div>
                    
// // //                     {/* Password with Toggle */}
// // //                     <div className="form-control mt-2">
// // //                         <label className="label py-1"><span className="label-text text-gray-300">Password</span></label>
// // //                         <div className="relative">
// // //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 bg-gray-700 text-white border-gray-600 ${errors.password ? 'input-error border-error' : ''}`} {...register('password')} />
// // //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
// // //                                 {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// // //                             </button>
// // //                         </div>
// // //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// // //                     </div>
                    
// // //                     {/* Captcha */}
// // //                     <div className="form-control mt-2">
// // //                         <label className="label py-1"><span className="label-text text-gray-300">Verify You Are Human</span></label>
// // //                         {/* Ensure flex items are vertically aligned for visual appeal */}
// // //                         <div className="flex items-center space-x-3">
// // //                             <input type="text" placeholder="Enter text" className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 ${errors.captcha ? 'input-error border-error' : ''}`} {...register('captcha')} />
// // //                             <Captcha ref={captchaRef} />
// // //                         </div>
// // //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// // //                     </div>
                    
// // //                     {/* Submit Button */}
// // //                     <div className="form-control mt-4">
// // //                         <button type="submit" className="btn btn-primary" disabled={loading}>
// // //                             {loading ? 'Sending OTP...' : 'Sign Up with Email'}
// // //                         </button>
// // //                     </div>
// // //                 </form>

// // //                 <div className="divider text-sm text-gray-400 my-6">OR CONTINUE WITH</div>

// // //                 {/* Social Sign-up Buttons */}
// // //                 <div className="flex justify-center items-center gap-4">
// // //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Google"><GoogleIcon /></button>
// // //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 hover:text-white" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// // //                     <button onClick={() => alert("Instagram login is not supported for this type of application.")} className="btn btn-circle btn-outline border-gray-600 hover:border-primary text-gray-300 opacity-50 cursor-not-allowed" aria-label="Sign up with Instagram (disabled)" disabled><InstagramIcon /></button>
// // //                 </div>

// // //                 {/* Login Redirect */}
// // //                 <div className="text-center mt-6">
// // //                     <p className="text-sm text-gray-400">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// // //                 </div>
// // //             </>
// // //         );
// // //     };

// // //     return (
// // //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// // //             <div className="card w-96 shadow-xl text-white" style={cardFinalStyle}>
// // //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '550px' }}>
// // //                     {renderContent()}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Signup;
// // import { useState, useEffect, useRef } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, NavLink } from 'react-router-dom';
// // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../authSlice';
// // import Captcha from '../components/Captcha';

// // // --- Reusable Social Icon SVG Components ---
// // const GoogleIcon = () => (
// //     <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
// // );
// // const FacebookIcon = () => (
// //     <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
// // );
// // const InstagramIcon = () => (
// //     <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><radialGradient id="insta-gradient" cx=".396" cy=".98" r="1.725"><stop offset="0" stopColor="#fd5"/><stop offset=".48" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient></defs><path fill="url(#insta-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546a4.928 4.928 0 011.82 1.82c.298.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855a4.928 4.928 0 01-1.82 1.82c-.75.298-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546a4.928 4.928 0 01-1.82-1.82c-.298-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248-2.105.546-2.855a4.928 4.928 0 011.82-1.82c.75-.298 1.597-.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.18 0-3.552.012-4.788.07-1.12.048-1.782.23-2.22.39a3.48 3.48 0 00-1.28 1.28c-.16.438-.342 1.1-.39 2.22-.058 1.236-.07 1.608-.07 4.788s.012 3.552.07 4.788c.048 1.12.23 1.782.39 2.22a3.48 3.48 0 001.28 1.28c.438.16 1.1.342 2.22.39 1.236.058 1.608.07 4.788.07s3.552-.012 4.788-.07c1.12-.048 1.782-.23 2.22-.39a3.48 3.48 0 001.28-1.28c.16-.438.342-1.1.39-2.22.058-1.236.07-1.608-.07-4.788s-.012-3.552-.07-4.788c-.048-1.12-.23-1.782-.39-2.22a3.48 3.48 0 00-1.28-1.28c-.438-.16-1.1-.342-2.22-.39-1.236-.058-1.608-.07-4.788-.07zm0 2.88c-2.923 0-5.286 2.363-5.286 5.286s2.363 5.286 5.286 5.286 5.286-2.363 5.286-5.286S14.923 6.485 12 6.485zm0 8.571c-1.815 0-3.286-1.47-3.286-3.286s1.47-3.286 3.286-3.286 3.286 1.47 3.286 3.286-1.47 3.286-3.286 3.286zm4.65-8.877a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
// // );

// // const signupSchema = z.object({
// //     firstname: z.string().min(3, "Minimum character should be 3"),
// //     emailId: z.string().email("Invalid Email"),
// //     password: z.string().min(8, "Password is too weak"),
// //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // });

// // function Signup() {
// //     const [showPassword, setShowPassword] = useState(false);
// //     const captchaRef = useRef(null);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading } = useSelector((state) => state.auth);

// //     const [otp, setOtp] = useState(new Array(6).fill(""));
// //     const [timer, setTimer] = useState(20);
// //     const inputRefs = useRef([]);

// //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// //     useEffect(() => {
// //         if (isAuthenticated) {
// //             navigate('/');
// //         }
// //         return () => { dispatch(resetOtpState()); };
// //     }, [isAuthenticated, navigate, dispatch]);

// //     useEffect(() => {
// //         let interval;
// //         if (otpSent && timer > 0) {
// //             inputRefs.current[0]?.focus();
// //             interval = setInterval(() => {
// //                 setTimer((prevTimer) => prevTimer - 1);
// //             }, 1000);
// //         }
// //         return () => clearInterval(interval);
// //     }, [otpSent, timer]);

// //     const handleOtpChange = (element, index) => {
// //         if (isNaN(element.value)) return;
// //         setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
// //         if (element.nextSibling) {
// //             element.nextSibling.focus();
// //         }
// //     };

// //     const handleOtpKeyDown = (e, index) => {
// //         if (e.key === "Backspace" && !otp[index] && index > 0) {
// //             inputRefs.current[index - 1].focus();
// //         }
// //     };

// //     const onSendOtp = (data) => {
// //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// //         if (data.captcha !== correctCaptchaText) {
// //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// //             captchaRef.current.refresh();
// //             resetField('captcha');
// //             return;
// //         }
// //         const { captcha, ...registrationData } = data;
// //         dispatch(sendOtp(registrationData));
// //     };

// //     const onVerifyOtp = () => {
// //         const combinedOtp = otp.join("");
// //         if (combinedOtp.length === 6) {
// //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// //         }
// //     };

// //     const handleResendOtp = () => {
// //         dispatch(clearError());
// //         dispatch(resendOtp({ emailId: emailForVerification }));
// //         setTimer(20);
// //         setOtp(new Array(6).fill(""));
// //     };
    
// //     const handleSocialSignUp = (provider) => {
// //         window.location.href = `http://localhost:3000/user/auth/${provider}`;
// //     };

// //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// //     const renderContent = () => {
// //         if (loading && !otpSent) {
// //             return (
// //                 <div className="flex flex-col items-center justify-center h-full">
// //                     <span className="loading loading-spinner loading-lg text-primary"></span>
// //                     <p className="mt-4 text-xl">Creating Account...</p>
// //                 </div>
// //             );
// //         }

// //         if (otpSent) {
// //             return (
// //                 <>
// //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm hover:text-primary">← Back</button>
// //                     <h2 className="card-title justify-center text-2xl mt-4">Enter OTP</h2>
// //                     <p className="text-center text-sm mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
// //                     <div className="flex justify-center space-x-2 my-2">
// //                         {otp.map((data, index) => (
// //                             <input
// //                                 key={index} type="tel"
// //                                 className={`input input-bordered w-12 h-14 text-center text-2xl font-bold ${error && !loading ? 'input-error' : ''}`}
// //                                 maxLength="1" value={data}
// //                                 onChange={(e) => handleOtpChange(e.target, index)}
// //                                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
// //                                 onFocus={e => e.target.select()}
// //                                 ref={(el) => (inputRefs.current[index] = el)}
// //                             />
// //                         ))}
// //                     </div>
// //                     {error && !loading && <div className="text-center text-error mt-2">{error}</div>}
// //                     <div className="mt-4 text-center text-sm min-h-[20px]">
// //                         {timer > 0 ? (
// //                             <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p>
// //                         ) : (
// //                             <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>
// //                                 {resendLoading ? 'Sending...' : 'Resend OTP'}
// //                             </button>
// //                         )}
// //                     </div>
// //                     <div className="form-control mt-6">
// //                         <button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>
// //                             {loading ? 'Verifying...' : 'Verify & Continue'}
// //                         </button>
// //                     </div>
// //                 </>
// //             );
// //         }

// //         return (
// //             <>
// //                 <h2 className="card-title justify-center text-3xl mb-4">Create Account</h2>
// //                 {error && <div className="alert alert-error shadow-lg"><div><span>{error}</span></div></div>}
// //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// //                     <div className="form-control">
// //                         <label className="label py-1"><span className="label-text">First Name</span></label>
// //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm ${errors.firstname ? 'input-error' : ''}`} {...register('firstname')} />
// //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Email</span></label>
// //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm ${errors.emailId ? 'input-error' : ''}`} {...register('emailId')} />
// //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Password</span></label>
// //                         <div className="relative">
// //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 ${errors.password ? 'input-error' : ''}`} {...register('password')} />
// //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
// //                                 {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
// //                             </button>
// //                         </div>
// //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Verify You Are Human</span></label>
// //                         <div className="flex items-start space-x-3"><input type="text" placeholder="Enter text" className={`input input-bordered w-full ${errors.captcha ? 'input-error' : ''}`} {...register('captcha')} /><Captcha ref={captchaRef} /></div>
// //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-4">
// //                         <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up with Email</button>
// //                     </div>
// //                 </form>

// //                 <div className="divider text-sm my-6">OR CONTINUE WITH</div>

// //                 <div className="flex justify-center items-center gap-4">
// //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline" aria-label="Sign up with Google"><GoogleIcon /></button>
// //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// //                     <button onClick={() => alert("Instagram login is not supported for this type of application.")} className="btn btn-circle btn-outline" aria-label="Sign up with Instagram (disabled)"><InstagramIcon /></button>
// //                 </div>

// //                 <div className="text-center mt-6">
// //                     <p className="text-sm">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// //                 </div>
// //             </>
// //         );
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// //             <div className="card w-96 shadow-xl" style={cardFinalStyle}>
// //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '550px' }}>
// //                     {renderContent()}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Signup;

// // import { useState, useEffect, useRef } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, NavLink } from 'react-router-dom';
// // import { sendOtp, verifyOtpAndRegister, resendOtp, resetOtpState, clearError } from '../authSlice';
// // import Captcha from '../components/Captcha';

// // // --- Reusable Social Icon SVG Components ---
// // const GoogleIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 11.22l7.97-6.21z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> );
// // const FacebookIcon = () => ( <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg> );
// // const EyeOpenIcon = () => ( <svg xmlns="http://www.w.3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> );
// // const EyeClosedIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> );

// // const signupSchema = z.object({
// //     firstname: z.string().min(3, "First name must be at least 3 characters"),
// //     emailId: z.string().email("Invalid Email"),
// //     password: z.string().min(8, "Password is too weak"),
// //     confirmPassword: z.string(),
// //     captcha: z.string().min(6, "Please enter the 6 characters from the image")
// // }).refine(data => data.password === data.confirmPassword, {
// //     message: "Passwords do not match",
// //     path: ["confirmPassword"],
// // });

// // function Signup() {
// //     const [showPassword, setShowPassword] = useState(false);
// //     const captchaRef = useRef(null);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const { isAuthenticated, loading, error, otpSent, emailForVerification, resendLoading } = useSelector((state) => state.auth);

// //     const [otp, setOtp] = useState(new Array(6).fill(""));
// //     const [timer, setTimer] = useState(20);
// //     const inputRefs = useRef([]);

// //     const { register, handleSubmit, setError, resetField, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

// //     useEffect(() => {
// //         if (isAuthenticated) {
// //             navigate('/');
// //         }
// //         return () => { dispatch(resetOtpState()); };
// //     }, [isAuthenticated, navigate, dispatch]);
    
// //     useEffect(() => {
// //         let interval;
// //         if (otpSent && timer > 0) {
// //             inputRefs.current[0]?.focus();
// //             interval = setInterval(() => { setTimer((prev) => prev - 1); }, 1000);
// //         }
// //         return () => clearInterval(interval);
// //     }, [otpSent, timer]);

// //     const handleOtpChange = (element, index) => {
// //         if (isNaN(element.value)) return;
// //         setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
// //         if (element.nextSibling) element.nextSibling.focus();
// //     };

// //     const handleOtpKeyDown = (e, index) => {
// //         if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
// //     };

// //     const onSendOtp = (data) => {
// //         const correctCaptchaText = captchaRef.current.getCaptchaText();
// //         if (data.captcha !== correctCaptchaText) {
// //             setError('captcha', { type: 'manual', message: 'Incorrect, please try again.' });
// //             captchaRef.current.refresh();
// //             resetField('captcha');
// //             return;
// //         }
// //         const { confirmPassword, captcha, ...registrationData } = data;
// //         dispatch(sendOtp(registrationData));
// //     };
    
// //     const onVerifyOtp = () => {
// //         const combinedOtp = otp.join("");
// //         if (combinedOtp.length === 6) {
// //             dispatch(verifyOtpAndRegister({ emailId: emailForVerification, otp: combinedOtp }));
// //         }
// //     };

// //     const handleResendOtp = () => {
// //         dispatch(clearError());
// //         dispatch(resendOtp({ emailId: emailForVerification }));
// //         setTimer(20);
// //         setOtp(new Array(6).fill(""));
// //     };
    
// //     const handleSocialSignUp = (provider) => {
// //         window.location.href = `http://localhost:3000/user/auth/${provider}`;
// //     };

// //     const pageStyle = { backgroundImage: 'url("https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752463275/ui8vs7luz8bmg30fkb6y.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' };
// //     const cardFinalStyle = { backgroundImage: `linear-gradient(rgba(29, 41, 57, 0.9), rgba(29, 41, 57, 0.9)), url("https://as2.ftcdn.net/v2/jpg/05/40/78/28/1000_F_540782862_aM53i23R13eTCRHwP9dcQd5sSA23M210.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center center' };

// //     const renderContent = () => {
// //         if (loading && !otpSent) {
// //             return ( <div className="flex flex-col items-center justify-center h-full"><span className="loading loading-spinner loading-lg text-primary"></span><p className="mt-4 text-xl">Creating Account...</p></div> );
// //         }

// //         if (otpSent) {
// //             return (
// //                 <>
// //                     <button onClick={() => dispatch(resetOtpState())} className="self-start text-sm hover:text-primary">← Back</button>
// //                     <h2 className="card-title justify-center text-2xl mt-4">Enter OTP</h2>
// //                     <p className="text-center text-sm mb-4">An OTP was sent to <strong>{emailForVerification}</strong></p>
// //                     <div className="flex justify-center space-x-2 my-2">{otp.map((data, index) => ( <input key={index} type="tel" className={`input input-bordered w-12 h-14 text-center text-2xl font-bold ${error && !loading ? 'input-error' : ''}`} maxLength="1" value={data} onChange={(e) => handleOtpChange(e.target, index)} onKeyDown={(e) => handleOtpKeyDown(e, index)} onFocus={e => e.target.select()} ref={(el) => (inputRefs.current[index] = el)} /> ))}</div>
// //                     {error && !loading && <div className="text-center text-error mt-2">{error}</div>}
// //                     <div className="mt-4 text-center text-sm min-h-[20px]">{timer > 0 ? ( <p>Resend OTP in 00:{String(timer).padStart(2, '0')}</p> ) : ( <button onClick={handleResendOtp} className={`link link-primary ${resendLoading ? 'loading' : ''}`} disabled={resendLoading}>{resendLoading ? 'Sending...' : 'Resend OTP'}</button> )}</div>
// //                     <div className="form-control mt-6"><button onClick={onVerifyOtp} className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading || otp.join("").length < 6}>{loading ? 'Verifying...' : 'Verify & Continue'}</button></div>
// //                 </>
// //             );
// //         }

// //         return (
// //             <>
// //                 <h2 className="card-title justify-center text-3xl mb-4">Create Account</h2>
// //                 {error && <div className="alert alert-error shadow-lg"><div><span>{error}</span></div></div>}
// //                 <form onSubmit={handleSubmit(onSendOtp)} noValidate>
// //                     <div className="form-control">
// //                         <label className="label py-1"><span className="label-text">First Name</span></label>
// //                         <input type="text" placeholder="John Doe" className={`input input-bordered w-full input-sm ${errors.firstname ? 'input-error' : ''}`} {...register('firstname')} />
// //                         {errors.firstname && <span className="text-error text-xs mt-1">{errors.firstname.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Email</span></label>
// //                         <input type="email" placeholder="john@example.com" className={`input input-bordered w-full input-sm ${errors.emailId ? 'input-error' : ''}`} {...register('emailId')} />
// //                         {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Password</span></label>
// //                         <div className="relative">
// //                             <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm pr-10 ${errors.password ? 'input-error' : ''}`} {...register('password')} />
// //                             <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeClosedIcon/> : <EyeOpenIcon/>}</button>
// //                         </div>
// //                         {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Confirm Password</span></label>
// //                         <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full input-sm ${errors.confirmPassword ? 'input-error' : ''}`} {...register('confirmPassword')} />
// //                         {errors.confirmPassword && <span className="text-error text-xs mt-1">{errors.confirmPassword.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-2">
// //                         <label className="label py-1"><span className="label-text">Verify You Are Human</span></label>
// //                         <div className="flex items-start space-x-3"><input type="text" placeholder="Enter text" className={`input input-bordered w-full ${errors.captcha ? 'input-error' : ''}`} {...register('captcha')} /><Captcha ref={captchaRef} /></div>
// //                         {errors.captcha && <span className="text-error text-xs mt-1">{errors.captcha.message}</span>}
// //                     </div>
// //                     <div className="form-control mt-4">
// //                         <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up with Email</button>
// //                     </div>
// //                 </form>

// //                 <div className="divider text-sm my-6">OR CONTINUE WITH</div>

// //                 <div className="flex justify-center items-center gap-4">
// //                     <button onClick={() => handleSocialSignUp('google')} className="btn btn-circle btn-outline" aria-label="Sign up with Google"><GoogleIcon /></button>
// //                     <button onClick={() => handleSocialSignUp('facebook')} className="btn btn-circle btn-outline" aria-label="Sign up with Facebook"><FacebookIcon /></button>
// //                 </div>

// //                 <div className="text-center mt-6">
// //                     <p className="text-sm">Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink></p>
// //                 </div>
// //             </>
// //         );
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
// //             <div className="card w-96 shadow-xl" style={cardFinalStyle}>
// //                 <div className="card-body flex flex-col py-6" style={{ height: 'auto', minHeight: '620px' }}>
// //                     {renderContent()}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Signup;

