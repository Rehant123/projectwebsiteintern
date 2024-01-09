import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const nav = useNavigate();
  
  const handleRegister = async () => {
    // Validation checks
    if (!email || !password || !username) {
      toast.error('Please enter all fields.');
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Store user information (including uid) in local storage
        const userInfo = {
            uid: user.uid,
            username,  // assuming you have 'username' variable defined earlier
            isAuth: true
        };
        localStorage.setItem('auth', JSON.stringify(userInfo));
        toast.success("Registeration successful");
        nav("/");
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Error registering user: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">Sign Up</h1>
        <div className="w-3/4 mb-6">
          <input
            type="email"
            name="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 px-8 bg-slate-200 text-black placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Email"
          />
        </div>
        <div className="w-3/4 mb-6">
          <input
            type="text" 
            name="username"
            required
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-4 px-8 bg-slate-200 text-black placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Username"
          />
        </div>
        <div className="w-3/4 mb-6">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-4 px-8 bg-slate-200 text-black placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Password"
          />
        </div>
        <div className="w-3/4 mt-4">
          <button
            type="button"
            onClick={handleRegister}
            className="py-4 bg-green-400 w-full rounded text-green-50 font-bold hover:bg-green-700"
          >
            REGISTER
          </button>
        </div>
        <h1 className="text-black ">
          Already have an account?{' '}
          <Link className="text-red-700" to="/">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
