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
  console.log(result.data)
  return result.data
}