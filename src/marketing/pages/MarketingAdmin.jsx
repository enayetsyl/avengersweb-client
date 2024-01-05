import { Table } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import TableLoader from '../../components/common/TableLoader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUserRole } from '../../lib/getfunction';
import LeadCollectorTable from '../components/LeadCollectorTable';
import Loader from '../../components/common/Loader';
import CallerTabTable from './CallerTabTable';


const MarketingAdmin = () => {
  const [tab, setTab] = useState(0)
  const [role, setRole] = useState({})
  const queryClient = useQueryClient()
 
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
      return axios.get('http://localhost:5000/api/v1/allLeads').then((response) => response.data)
    case 1:
      return axios.get('http://localhost:5000/api/v1/allCaller').then((response) => response.data)
    case 2:
      return axios.get('http://localhost:5000/api/v1/allUsers').then((response) => response.data)
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
            Lead Collectors
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
               <LeadCollectorTable data={data}/>
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
                //  <>
                //    <h2 className="text-2xl font-bold my-12">
                //      Lead Collectors:
                //    </h2>
                //    <Table striped className="relative">
                //      <Table.Head>
                //        <Table.HeadCell className="text-start">
                //          Name
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          Phone
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          FB Page Link
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          Conversion Stage
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          Reason For Not Conversion
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          Meeting Schedule
                //        </Table.HeadCell>
                //        <Table.HeadCell className="text-start">
                //          Edit
                //        </Table.HeadCell>
                //      </Table.Head>
                //      <Table.Body className="divide-y">
                //        {dummyDataLead?.map((item) => (
                //          <Table.Row className="bg-gray-100" key={item?._id}>
                //            <Table.Cell>{item.name}</Table.Cell>
                //            <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
                //              {item.phone}
                //            </Table.Cell>
                //            <Table.Cell>{item.fbLink}</Table.Cell>
                //            <Table.Cell>{item.conversionStage}</Table.Cell>
                //            <Table.Cell className="max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                //              {item.reason}
                //            </Table.Cell>
                //            <Table.Cell>{item.meeting}</Table.Cell>
                //            <Table.Cell>
                //              <FaEdit className="text-cyan-500 cursor-pointer" />
                //            </Table.Cell>
                //          </Table.Row>
                //        ))}
                //      </Table.Body>
                //    </Table>
                //  </>
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
                   <Table striped className="relative">
                     <Table.Head>
                       <Table.HeadCell className="text-start">
                         Name
                       </Table.HeadCell>
                       <Table.HeadCell className="text-start">
                         Email
                       </Table.HeadCell>
                       <Table.HeadCell className="text-start">
                         Role
                       </Table.HeadCell>
                       <Table.HeadCell className="text-start">
                        Select Role
                       </Table.HeadCell>
                       <Table.HeadCell className="text-start">
                        Change Role
                       </Table.HeadCell>
                     </Table.Head>
                     <Table.Body className="divide-y">
                       {data?.map((item) => (
                         <Table.Row className="bg-gray-100" key={item?._id}>
                           <Table.Cell>{item.name}</Table.Cell>
                           <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
                             {item.email}
                           </Table.Cell>
                           <Table.Cell>{item.role}</Table.Cell>
                           <Table.Cell>
                            <select name="changeRole" id=""
                            onChange={(e)=> setRole({role: e.target.value})}
                            >
                            <option value="NewUser">New User</option>
                            <option value="LeadCollector">Lead Collector</option>
                            <option value="Caller">Caller</option>

                            </select>
                            </Table.Cell>
                            <Table.Cell>
                              <button
                              className='py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer'
                              onClick={() => handleRoleChange(item._id)}
                              >Change</button>
                            </Table.Cell>
                         </Table.Row>
                       ))}
                     </Table.Body>
                   </Table>
                 </>
               )}
             </>
            )}

       
      </div>
    </div>
  );
};

export default MarketingAdmin;
