import axios from "axios"

export const getSingleUserLeads = async(email) => {
  {
    console.log(email)
    const response = await axios.get(`http://localhost:5000/api/v1/singleUserLeads?email=${email}`)
    return response.data
  }
}

export const deleteLead = async (id) => {
  console.log('delete id', id)
  const result = await axios.delete(`http://localhost:5000/api/v1/deleteLead/${id}`)
  console.log(result)
  return result.data
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

export const addLeadData = async (data) => {
  console.log('data lead', data)
  const result = await axios.post(`http://localhost:5000/api/v1/addLead`, data)
  return result.data
}


export const getEditLeadData = async (id) => {
const result = await axios.get(`http://localhost:5000/api/v1/editLeadGet/${id}`)
return result.data
}

export const editLeadData = async(leadData, id) => {
  console.log(leadData)
  console.log(id)
  const result = await axios.patch(`http://localhost:5000/api/v1/editLeadPatch/${id}`, leadData)
  return result.data
}
