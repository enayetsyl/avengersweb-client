import axios from "axios"

export const callerData = async () => {
  const result = await axios.get(`http://localhost:5000/api/v1/callerInfo`)
  return result.data
}

export const callerAssign = async(callerId, leadId) => {
  const result = await axios.patch(
  `http://localhost:5000/api/v1/assignCaller?callerId=${callerId}&leadId=${leadId}`
  )
  return result.data
}

