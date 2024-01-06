import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { callerAssign, callerData } from '../../lib/marketingAdminFunction';
import Loader from '../../components/common/Loader';
import { useState } from 'react';
import { toast } from 'react-toastify';


const tableHeadName = ['Business Name', 'Facebook Page Name','Facebook Page Link','Business Type','Email','Website Available','Existing Website Link','Our Created Website Link','Caller Name','Select Caller','Assign Caller','Mobile Number']

const CallerAssignTable = ({data}) => {
  // console.log(data)
  const [callerId, setCallerId] = useState(null)
  const [leadId, setLeadId] = useState(null)
  const queryClient = useQueryClient()
  
  const {data:callerName, isLoading} = useQuery({
    queryKey:['callerInfo'],
    queryFn: callerData,
  })

  const {mutateAsync} = useMutation({
    mutationFn:() => callerAssign(callerId, leadId),
    onSuccess:(data) => {
      if(data === 'Caller Assigned Successfully'){
        toast.success('Caller Assigned Successfully')
        queryClient.invalidateQueries(['callerInfo'])
      }else{
        toast.warning('An error occurred.')
      }
    }
  })

  if(isLoading){
    return <Loader type='sync'/>
  }


  const handleCallerSelect = (e, leadId) => {
    setCallerId(e.target.value)
    setLeadId(leadId)
  }

  const handleAssignCaller = async () => {
    if (!callerId) {
      console.error("Caller not selected!");
      return;
    }
    await mutateAsync()
  }
  return (
    <>
    <h2 className="text-2xl font-bold my-12">
      Caller Assign Table:
    </h2>
    <Table striped className="relative">
      <Table.Head>
        {
          tableHeadName.map(name => (
            <Table.HeadCell className="text-start" key={name}>
            {name}
          </Table.HeadCell>
          ))
        }
        
      </Table.Head>
      <Table.Body className="divide-y">
        {data?.map((item) => (
          <Table.Row className="bg-gray-100" key={item?._id}>
            <Table.Cell>{item.businessName}</Table.Cell>
            <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
              {item.facebookPageName}
            </Table.Cell>
            <Table.Cell>{item.facebookAddress}</Table.Cell>
            <Table.Cell>{item.businessType}</Table.Cell>
            <Table.Cell className="max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {item.email}
            </Table.Cell>
            <Table.Cell>{item.websiteAvailabe ? 'Yes' : 'No'}</Table.Cell>
            <Table.Cell>
              {item.existingWebsiteLink}
            </Table.Cell>
            <Table.Cell>
              {item.ourCreatedWebsiteLink}
            </Table.Cell>
            <Table.Cell>
              {item.callerName ? item.callerName : "Not Assigned Yet"}
            </Table.Cell>
            <Table.Cell>
              <select name="callerSelect" id="callerSelect"
              onChange={e => handleCallerSelect(e, item._id)}
              ><option>Select Caller</option>
                {callerName?.map((caller) => (
                  <option key={caller._id} value={caller._id}>{caller.name}</option>
                ))}
              </select>
            </Table.Cell>
            <Table.Cell>
              <button className='py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer'
              onClick={() => handleAssignCaller(item._id)}
              >Assign</button>
            </Table.Cell>
            <Table.Cell>
              {item.mobileNumber}
            </Table.Cell>
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
  );
};

export default CallerAssignTable;