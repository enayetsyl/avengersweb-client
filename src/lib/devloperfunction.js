import axios from "axios"

export const developerData = async () => {
  const result = await axios.get(`http://localhost:5000/api/v1/developerInfo`)
  return result.data
}

