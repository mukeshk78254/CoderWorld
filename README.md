# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data) => {
    console.log(data);

    // Backend data ko send kar dena chaiye?
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Leetcode</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered ${errors.firstName && 'input-error'}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-error">{errors.firstName.message}</span>
              )}
            </div>

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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
https://github.com/mukeshk78254/LEETCODE/tree/main
https://g.co/gemini/share/bc8b73eb8946



import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import{z} from 'zod';

const signupschema=z.object({
  firstname:z.string().min(3,"firstname should be atleast 3 character"),
  emailid:z.string().email(),

  password:z.string().min(8,"password should be atleast 8 character")

})















// formstate:{error}   means agr format submit krte time agr koi bhi error aayega yha se hh usko identify kr skte hai us jagah pr likhs kte hai i ye error aaaya hai jaise
function Signup() {
  const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(signupschema)}); // schema ko pass krne ka tarika jha data register hoga whi to validation lgega aur basically isse link bhi ho gya

  return (
   
 
   
    <form onSubmit={handleSubmit((data) => console.log(data))} >
       <input {...register('firstname')} placeholder='Enter firstname' />  
       {errors.firstname && (<span>{errors.firstname.message}</span>)}
        {/* ...register(firstName) se ye k objctb return kr  deta hai ... register lgane se ye apna app value cjange ko show kr deta hai isme koi onchange ya value lgane ka jrurat nih hai   ye key ke terah hai firstname yha jo name dalenge wh value ke form me stote hog to ye json form me de rha hai ye to achi bat hai db sare doc ko json form mr hi loeta hai*/}
      <input {...register('emailid', { required: true })} placeholder='Enter Emailid' />
      <input {...register('password', { required: true })} placeholder='Enter Password' type='password'/>
      <button type='submit' className='btn btn-lg'>Submit</button>
   
     
    </form>
  );
}

















export default Signup




