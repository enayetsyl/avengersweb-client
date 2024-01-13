// import { Table } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUserRole } from '../../lib/getfunction';
import Loader from '../../components/common/Loader';
import CallerTabTable from './CallerTabTable';
import CallerAssignTable from '../components/CallerAssignTable';
import useAuth from '../../hooks/useAuth';
import { TableContainer,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Select, } from '@chakra-ui/react';


const MarketingAdmin = () => {
  const [tab, setTab] = useState(0)
  const [role, setRole] = useState({})
  const queryClient = useQueryClient()

  const {user} = useAuth()
  console.log(user.email)
  const email= user?.email
 
  // Fetching data
  const {data, isLoading, isError} = useQuery({
  queryKey:['marketingAdminDataFetch', tab],
  queryFn: ()=> fetchData(tab),
 })

 //  Sending data to server after changing role of user

 const { mutateAsync } = useMutation({
  mutationFn:({id, role}) => updateUserRole(id, role),
  onSuccess:(data) => {
    if(data.modifiedCount > 0){
      toast.success('Role updated Successfully')
      queryClient.invalidateQueries(['marketingAdminDataFetch', tab])
    }else{
      toast.warning('An error occurred. Try again')
    }
  }
 })

// Populating data based on tab clicked
 const fetchData = async(selectedTab) => {
  switch(selectedTab){
    case 0:
      return axios.get('http://localhost:5000/api/v1/assignCaller').then((response) => response.data)
    case 1:
      return axios.get('http://localhost:5000/api/v1/allCallerData').then((response) => response.data)
    case 2:
      return axios.get(`http://localhost:5000/api/v1/allUsers?email=${email}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then((response) => response.data)
      default:
        return []
  }
 }

 if(isLoading){
  return <Loader/>
 }
 
 //  handler of the user role change
 const handleRoleChange = async (id) => {
   if(role){
     await mutateAsync({id, role})   
   }else{
     toast.warning('No role selected')
   }
 }



  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <h2 className="text-center font-bold text-3xl md:text-5xl mb-12">
          Marketing Admin
        </h2>
{/* Tab Heading */}
        <div className="flex items-center gap-x-2 my-6">
          <h4
            className={` py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer ${
              tab === 0 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab(0)}
          >
            Assign Caller
          </h4>
          <h4
            className={` py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer ${
              tab === 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab(1)}
          >
            Callers
          </h4>
          <h4
            className={` py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer ${
              tab === 2 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab(2)}
          >
            User
          </h4>
        </div>
{/* Data load */}
            {/* tab 0 */}
            {tab === 0 && (
               <>
               {data?.length === 0 ? (
                 <p className="text-center text-xl font-semibold">
                   No Data Found
                 </p>
               ) : (
               <CallerAssignTable data={data}/>
               )}
             </>
            )}
            {/* tab 1 */}
            {tab === 1 && (
               <>
               {data?.length === 0 ? (
                 <p className="text-center text-xl font-semibold">
                   No Data Found
                 </p>
               ) : (
                <CallerTabTable data={data}/>
                
               )}
             </>
            )}
            {/* tab 2 user */}
            {tab === 2 && (
               <>
               {data && data.length === 0 ? (
                 <p className="text-center text-xl font-semibold">
                   No Data Found
                 </p>
               ) : (
                 <>
                   <h2 className="text-2xl font-bold my-12">
                     Users:
                   </h2>
                  <TableContainer>
                    <Table variant='striped' colorScheme='orange'>
                      <TableCaption>User</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Email</Th>
                          <Th>Role</Th>
                          <Th>Select Role</Th>
                          <Th>Change Role</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          data?.map(item => (
                            <Tr key={item._id}>
                              <Td>{item.name}</Td>
                              <Td>{item.email}</Td>
                              <Td>{item.role}</Td>
                              <Td> <Select placeholder='Select option' name="changeRole" id=""
                              size='md'
                              variant='filled'
                            onChange={(e)=> setRole({role: e.target.value})}
                            >
                            <option value="NewUser">New User</option>
                            <option value="LeadCollector">Lead Collector</option>
                            <option value="Caller">Caller</option>

                            </Select></Td>
                              <Td><button
                              className='py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer'
                              onClick={() => handleRoleChange(item._id)}
                              >Change</button></Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                 </>
               )}
             </>
            )}

       
      </div>
    </div>
  );
};

export default MarketingAdmin;
