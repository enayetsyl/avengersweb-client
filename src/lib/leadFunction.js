import axios from "axios"

// FOR LeadCollector.jsx file
export const getSingleUserLeads = async(email) => {
  {
    const response = await axios.get(`http://localhost:5000/api/v1/singleUserLeads?email=${email}`)
    return response.data
  }
}

// FOR LeadCollector.jsx file

export const leadPost = async (id) => {
  const result = await axios.post(`http://localhost:5000/api/v1/leadPostForDeveloper/${id}`)
  console.log(result.data)
  return result.data

}

// FOR LeadCollector.jsx file

export const deleteLead = async (id) => {
  const result = await axios.delete(`http://localhost:5000/api/v1/deleteLead/${id}`)
  return result.data
}

// FOR AddLead.jsx file

export const addLeadData = async (data) => {
  const result = await axios.post(`http://localhost:5000/api/v1/addLead`, data, {
    headers: {
      authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  console.log(result)
  return result.data
}

// FOR EditLead.jsx file

export const getEditLeadData = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/v1/editLeadGet/${id}`)
  return result.data
  }

// FOR EditLead.jsx file
  
export const editLeadData = async(leadData, id) => {
  const result = await axios.patch(`http://localhost:5000/api/v1/editLeadPatch/${id}`, leadData)
  return result.data
}
