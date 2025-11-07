// useAuth.js
import {useState} from "react";
import {Authlogin} from '../services/authService'

export function useAuth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (userId, password) => {
    setLoading(true);
    try {
    console.log('auth',userId,password)

      const isLogin = await Authlogin(userId, password);
      if (isLogin === 'OK') {
        setLoading(false);
        return true;
      }
      else {
        return false;
      }
    }
    catch (err) {
      setLoading(false);
      setError("error i UseAuth")
      return false;

    }
  };

  return {error, loading, login};
}
