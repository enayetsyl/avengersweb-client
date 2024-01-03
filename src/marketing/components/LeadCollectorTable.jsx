import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { callerAssign, callerData } from '../../lib/marketingAdminFunction';
import Loader from '../../components/common/Loader';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LeadCollectorTable = ({data}) => {
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
      console.log(data)
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
      Lead Collectors:
    </h2>
    <Table striped className="relative">
      <Table.Head>
        <Table.HeadCell className="text-start">
          Business Name
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Facebook Page Name
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Facebook Page Link
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Business Type
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Email
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
         Website Available
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Existing Website Link
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Our Created Website Link
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Caller Name
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Assign Caller
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Mobile Number
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Marketing Message Sent
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          First Call Date
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          First Meeting Date
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Conversion Status
        </Table.HeadCell>
        <Table.HeadCell className="text-start">
          Reason for non Conversion
        </Table.HeadCell>
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
              <select name="callerSelect" id="callerSelect"
              onChange={e => handleCallerSelect(e, item._id)}
              >
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
            <Table.Cell>
              {item.marketingMessageSent ? 'Yes' : 'No'}
            </Table.Cell>
            <Table.Cell>
              {item.firstCallDate ? item.firstCallDate : 'N/A'}
            </Table.Cell>
            <Table.Cell>
              {item.firstMeetingDate ? item.firstMeetingDate : 'N/A'}
            </Table.Cell>
            <Table.Cell>
              {item.converted ? 'Converted' : 'Not Converted'}
            </Table.Cell>
            <Table.Cell>
              {item.reasonForNonConversion ? item.reasonForNonConversion : "N/A"
}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
  );
};

export default LeadCollectorTable;