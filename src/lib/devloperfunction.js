import axios from "axios"

// FOR DeveloperTable.jsx file

export const developerData = async () => {
  const result = await axios.get(`http://localhost:5000/api/v1/developerInfo`)
  return result.data
}

export const developerAssign = async(developerId, leadId) => {
  const result = await axios.patch(
  `http://localhost:5000/api/v1/assignDeveloper?callerId=${developerId}&leadId=${leadId}`
  )
  return result.data
}


export const getDeveloperData = async (email) => {
  const result = await axios.get(`http://localhost:5000/api/v1/developerLead?email=${email}`)
  return result.data
}

export const developerEditDataGet = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/v1/singleDeveloperData/${id}`)
  return result.data
}


export const developerUpdateData = async(id, data) => {
  const result = await axios.patch(`http://localhost:5000/api/v1/developerUpdateData/${id}`,data)
  return result.data
}

export const developerDataPost = async(id) => {
  const result = await axios.post(`http://localhost:5000/api/v1/developerPost/${id}`)
  return result.data
}