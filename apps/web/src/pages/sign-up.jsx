import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner';
import { authStore } from '../../../../packages/api/src/store';


function SignUp() {

  const register = authStore((state) => state.register);
  const navigate =useNavigate();
  const isCheckingAuth = authStore((state) => state.isCheckingAuth );

  const [formData, setFormData] = useState({
    name: '',
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

  const handleSignUp = async(e) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., API call)
    const response=await register(formData.name,formData.email,formData.password);
    if(response.success){
    setFormData({ name: '', email: '', password: '' });
    navigate('/');
    }else{
      alert(response.message);

    }
    
     
  };
   if(isCheckingAuth) return <Spinner label="Loading chats..." />

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex w-full flex-col justify-center p-8 sm:p-10 lg:w-1/2 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Create account
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Sign up for free
            </h1>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Create an account to get started with our platform.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="signup-email">
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <button
              onClick={handleSignUp}
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              
                <Link to="/login">Log in</Link>
                
            </p>
          </div>
        </div>

        <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-slate-900 p-10 lg:flex">
          <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <div className="h-40 rounded-2xl border border-dashed border-white/40 bg-white/10" />
            <p className="mt-6 text-lg font-semibold text-white">Image placeholder</p>
            <p className="mt-2 text-sm text-blue-50">
              This side is styled as a visual panel for the auth experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
