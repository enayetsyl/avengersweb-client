import axios from "axios"

export const getAllLeads = async() => {
  {
    const response = await axios.get(`http://localhost:5000/api/v1/allLeads`)
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