import axios from "axios"

export const callerData = async () => {
  const result = await axios.get(`http://localhost:5000/api/v1/callerInfo`)
  console.log(result.data)
  return result.data
}

export const callerAssign = async(callerId, leadId) => {
  console.log('caller id ', callerId)
  console.log('lead id ', leadId)
  const result = await axios.patch(
  `http://localhost:5000/api/v1/assignCaller?callerId=${callerId}&leadId=${leadId}`
  )
  console.log(result.data)
  return result.data
}