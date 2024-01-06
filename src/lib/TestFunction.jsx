import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const TestFunction = () => {
  const axiosSecure = useAxiosSecure()

  const getTestData = async (email) => {
    console.log('test function ', email)
    const result = await axiosSecure.get(`/api/v1/testLead?email=${email}`)
    return result.data
  }

  return  getTestData 
};

export const getTestDataFun = TestFunction;
