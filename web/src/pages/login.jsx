import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import Spinner from '../components/spinner';
import { Lock, Mail } from 'lucide-react';
import { authStore } from '../store/authStore';
import toast from 'react-hot-toast';


function Login() {
  const navigate =useNavigate();

const login = authStore((state) => state.login);
const isCheckingAuth = authStore((state) => state.isCheckingAuth );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const response=await login(formData.email,formData.password);
  
    if(response?.success){
      toast.success('Log in success✅')
    setFormData({ email: '', password: '' });
    navigate('/');
    }else{
     
      toast.error( "something went wrong ❌" | response.message ) 

    }
   

  }

  if(isCheckingAuth) return <Spinner />

  return (
    <div className="h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex h-[80vh] max-w-5xl overflow-hidden rounded-sm bg-white shadow-2xl">
        <div className="flex w-full flex-col justify-center  sm:p-10 lg:w-1/2 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Welcome back
            </p>
           {/*  <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Log in to your account
            </h1> */}
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Please enter your email and password to continue.
            </p>

            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              <div className='relative'>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                  <Mail color="#8f9194"  className='absolute top-10 left-0  px-4 ' strokeWidth={0.75}/>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-sm border  border-slate-200 bg-slate-50 px-6 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <div className='relative'>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
                  <Lock color="#8f9194"  className='absolute top-10 left-0 px-5'   strokeWidth={0.75} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-sm border border-slate-200 bg-slate-50 px-6 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <button
              onClick={handleLogin}
                type="submit"
                className="w-full rounded-sm bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              
                <Link to="/signup">Sign up</Link>
              
            </p>
          </div>
        </div>

        <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-8 lg:flex">
         {/*  <div className="w-full max-w-sm rounded-md border border-white/20 bg-white/10 p-8 backdrop-blur-sm"> */}
           {/*  <div className="h-40 rounded-md border border-dashed border-white/40 bg-white/10" /> */}

            <img src={'./login.png'} width={550} className='rounded-md '/>
           
         {/*  </div> */}
        </div>



      </div>
    </div>
  );
}

export default Login;
