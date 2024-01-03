import axios from "axios"

export const getSingleUserLeads = async(email) => {
  {
    const response = await axios.get(`http://localhost:5000/api/v1/singleUserLeads?email=${email}`)
    return response.data
  }
}


export const addData = async (name,
  email,
  password) => {
    console.log('from addData function', name, email, password)
  try {
    const result = await axios.post(`http://localhost:5000/api/v1/addUser`, {
      name,
      email,
      password,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserRole = async(id, role) => {
  console.log('from function', id, role)
  const result = await axios.patch(`http://localhost:5000/api/v1/userRoleChange/${id}`, role) 
  return result.data
}


export const loginUser = async (email, password) => {
  console.log('getfn', email, password)
  try {
    const result = await axios.get(`http://localhost:5000/api/v1/userLogin`, {
    params: {
      email,
      password,
    }
    });
    console.log('from get function page', result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};