import {useState} from 'react';
// import {login} from '../services/authService';
import {Navigate, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth'
const LoginForm = () => {
  const navigate = useNavigate()


  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');


  const {loading, error, login} = useAuth()
  const handlesubmit = () => {

    navigate('/main/home')
  }
  return (
    <div className="
    bg-gradient-to-b from-gray-900 via-blue-900 to-gray-800 
    h-max w-[95%] lg:w-1/4 lg:h-2/3 
    p-6 rounded-2xl shadow-2xl 
    flex flex-col justify-center items-center gap-8
    text-white
  ">
      {/* Title */}
      <span className='text-3xl font-semibold tracking-wide'>
        Welcome Back 👋
      </span>
      <span className='text-gray-300 text-sm text-center'>
        Please enter your credentials to access the platform
      </span>

      {/* Inputs */}
      <div className='flex flex-col w-full gap-5 mt-3'>
        <div className='flex flex-col'>
          <label className='text-blue-400 text-sm mb-1'>Username</label>
          <input
            type="text"
            placeholder='Erasak123'
            required
            className='
            w-full h-10 px-3 rounded-md bg-gray-800 text-white 
            border border-blue-600 focus:border-blue-400 
            focus:ring-1 focus:ring-blue-400 outline-none 
            transition-all duration-300
          '
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-blue-400 text-sm mb-1'>Password</label>
          <input
            type="password"
            placeholder='********'
            required
            className='
            w-full h-10 px-3 rounded-md bg-gray-800 text-white 
            border border-blue-600 focus:border-blue-400 
            focus:ring-1 focus:ring-blue-400 outline-none 
            transition-all duration-300
          '
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-medium text-sm">{error}</p>
      )}

      {/* Submit Button */}
      <button
        className='
        w-full h-11 mt-2 
        bg-gradient-to-r from-blue-600 to-blue-500 
        hover:from-blue-500 hover:to-blue-400 
        text-white text-lg font-semibold 
        rounded-lg shadow-md hover:shadow-blue-500/30 
        transition-all duration-300
      '
        onClick={handlesubmit}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
    </div>
  );

};

export default LoginForm;
