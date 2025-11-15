import {useState} from 'react';
// import {login} from '../services/authService';
import {Navigate, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth'
import axios from 'axios';
import {Key} from 'lucide-react';
const LoginForm = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;



  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const handlesubmit = async () => {

    // console.log(userid, password)
    try {
      setLoading(true)
      const response = await axios.post(`${apiUrl}/api/users/login`, {userid, password})
      if (response.status == 200) {
        navigate('/main/home')
        localStorage.setItem("User", JSON.stringify(response.data.user.name));

      }
    }
    catch (e) {
      console.log("error",e.response)
      if (e.status == 404) {
        setError("User not found")
        setLoading(false)

      }
      else if (e.status == 401) {
        setError("Incorrect password")
        setLoading(false)


      }
    }
    setLoading(false)


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
        Thendral Cable
      </span>
      <span className='text-gray-300 text-sm text-center'>
        Please enter your credentials to access the platform
      </span>

      {error && (
        <p className="text-red-500 font-medium text-sm">{error}</p>
      )}
      {/* Inputs */}
      <div className='flex flex-col w-full gap-5 mt-3'>
        <div className='flex flex-col'>
          <label className='text-blue-400 text-sm mb-1'>Username</label>
          <input
            type="text"
            placeholder='Ex - user123'
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
        {/* Login */}
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );

};

export default LoginForm;
