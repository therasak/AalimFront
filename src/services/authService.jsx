import axios from 'axios'

const apiUrl = "http://localhost:5000/api/users"


export const Authlogin = async (userId, password) => {
  console.log("service", userId, password);

  try {
    const response = await axios.post(`${apiUrl}/login`, {email, password})
    if (response.data.message === 'Success') {
      return 'OK'
    }
    else {
      return "Not"
    }
  } catch (error) {
    return "error";
  }
};



