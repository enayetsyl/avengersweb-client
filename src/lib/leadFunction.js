import axios from "axios"


export const leadPost = async (id) => {
  console.log(id)
  const result = await axios.post(`http://localhost:5000/api/v1/leadPostForDeveloper/${id}`)
  console.log(result.data)
  return result.data

}