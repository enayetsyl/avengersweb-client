import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import Loader from '../../components/common/Loader';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { developerAssign, developerData } from '../../lib/devloperfunction';

const AdminDeveloperTable = ({data}) => {
  const [developerId, setDeveloperId] = useState(null)
  console.log(data)
  const [leadId, setLeadId] = useState(null)
  const queryClient = useQueryClient()
  const tableHeadData = ['Business Name', 'Facebook Page Name','Facebook Page Link','Business Type','Email','Website Available','Existing Website Link','Our Created Website Link','Assigned Developer','Developer Name','Assign Developer',' Mobile Number','Marketing Message Sent','First Call Date','First Meeting Date','Conversion Status','Reason for non Conversion',]

  const {data:developerName, isLoading} = useQuery({
    queryKey:['developerInfo'],
    queryFn: developerData,
  })

  const {mutateAsync} = useMutation({
    mutationFn:() => developerAssign(developerId, leadId),
    onSuccess:(data) => {
      console.log(data)
      if(data === 'Developer Assigned Successfully'){
        toast.success('Developer Assigned Successfully')
        queryClient.invalidateQueries(['developerInfo'])
      }else{
        toast.warning('An error occurred.')
      }
    }
  })

  if(isLoading){
    return <Loader type='sync'/>
  }


  const handleDeveloperSelect = (e, leadId) => {
    setDeveloperId(e.target.value)
    setLeadId(leadId)
  }

  const handleAssignDeveloper = async () => {
    if (!developerId) {
      console.error("Developer not selected!");
      return;
    }
    await mutateAsync()
  }
  return (
    <>
    <h2 className="text-2xl font-bold my-12">
      Developer:
    </h2>
    <Table striped className="relative">
      <Table.Head>
        {
          tableHeadData.map(head => (
        <Table.HeadCell className="text-start" 
        key={head}
        >
          {head}
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
              {item.existingWebsiteLink ? item.existingWebsiteLink : "No website available"}
            </Table.Cell>
            <Table.Cell>
              {item.ourCreatedWebsiteLink ? item.ourCreatedWebsiteLink : "Not created yet"}
            </Table.Cell>
            <Table.Cell>
              {item.developerName ? item.developerName : "Not Assigned"}
            </Table.Cell>
            <Table.Cell>
              <select name="developerSelect" id="developerSelect"
              onChange={e => handleDeveloperSelect(e, item._id)}
              >
                <option value=''>Select Developer</option>
                {developerName?.map((developer) => (
                  <option key={developer._id} value={developer._id}>{developer.name}</option>
                ))}
              </select>
            </Table.Cell>
            <Table.Cell>
              <button className='py-1.5 px-5 rounded-md hover:bg-primary hover:text-white duration-300 cursor-pointer'
              onClick={() => handleAssignDeveloper(item._id)}
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
              {item.reasonForNonConversion ? item.reasonForNonConversion : "N/A"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
  );
};

export default AdminDeveloperTable;