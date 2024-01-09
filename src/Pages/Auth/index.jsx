import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../Config/firebase.config"
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
  
    const handleLogin = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Fetch the username from local storage
          const storedUserInfo = JSON.parse(localStorage.getItem('auth')) || {};
          const username = storedUserInfo.username || '';
    
          // Store user information (including uid and fetched username) in local storage
          const userInfo = {
            uid: user.uid,
            email: user.email,
            username,
          };
          localStorage.setItem('auth', JSON.stringify(userInfo));
    
          console.log('User logged in successfully:', user);
          nav('/');
    
          // You may want to redirect the user or perform other actions upon successful login.
        } catch (error) {
          console.error('Error logging in:', error.message);
          toast.error('There was an issue logging in');
          // Handle login error, e.g., display an error message to the user.
        }
      };
  
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        {/* Login form */}
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
        <div className="w-3/4 mb-6">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 px-8 text-black bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Email"
          />
        </div>
        <div className="w-3/4 mb-6">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 text-black outline-blue-500"
            placeholder="Password"
          />
        </div>
        <div className="w-3/4 flex flex-row justify-between mb-4">
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="remember" id="remember" className="w-4 text-black h-4" />
            <label htmlFor="remember" className="text-sm text-slate-400">
              Remember me
            </label>
          </div>
          <div>
          
          </div>
        </div>
        <div className="w-3/4">
          <button
            type="button"
            onClick={handleLogin}
            className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
          >
            LOGIN
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default LoginForm;
