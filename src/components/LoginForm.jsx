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
    <div className="bg-white h-max w-[95%]  p-5 rounded-2xl flex flex-col justify-center items-center gap-10 lg:w-1/4 lg:h-2/3">
      <span className='text-4xl font-bold text-balck'>Login</span>
      <span className=''>Enter your creadentials to access the plaform</span>

      <div className='flex flex-col w-full gap-4'>
        <div>
          <span className='text-blue-400'>Username</span>
          <input type="text" placeholder='Ex:SAQ762' required
            className=' border-b-2  w-full h-10 focus:outline-none border-blue-400 focus:border-b-2'
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>

        <div>
          <span className='text-blue-400'>Password</span>
          <input type="password" placeholder='********' required
            className=' border-b-2  w-full h-10 focus:outline-none border-blue-400 focus:border-b-2'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>


      </div>
      <p className="text-red-600 font-semibold">{error && <span>{error}</span>}</p>

      <button className='w-full h-10  bg-gradient-to-r from-amber-500 to-pink-500 text-white text-lg font-bold rounded-xl hover:cursor-pointer'
        onClick={handlesubmit}
      >{loading ? <span>Loading</span> : <span>Submit</span>}</button>

    </div>
  );
};

export default LoginForm;
