import axios from "axios"

export const getCallerData = async (email) => {
  const result = await axios.get(`http://localhost:5000/api/v1/callerLead?email=${email}`,{
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}
// export const getCallerData = async (email) => {
//   const result = await axios.get(`http://localhost:5000/api/v1/callerLead?email=${email}`)
//   return result.data
// }

export const callerEditDataGet = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/v1/singleCallerData/${id}`)
  return result.data
}


export const callerUpdateData = async(id, data) => {
  const result = await axios.patch(`http://localhost:5000/api/v1/callerUpdateData/${id}`,data)
  console.log(result.data)
  return result.data
}

