import { Table } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import TableLoader from '../../components/common/TableLoader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteLead, getSingleUserLeads, leadPost } from '../../lib/leadFunction';
import useAuth from '../../hooks/useAuth';

const LeadCollector = () => {
  const queryClient = useQueryClient()  
  const {user} = useAuth()
  const userEmail = user?.email;

  const {data, isLoading} = useQuery({
    queryKey:['individualLeadCollectorData'],
    queryFn:() => getSingleUserLeads(userEmail)
  })

const {mutateAsync: deleteMutation} = useMutation({
  mutationFn: (id) => deleteLead(id),
  onSuccess:(data) => {
    console.log('from delete mutation function', data)
    if(data.deletedCount > 0){
      toast.success('Lead deleted successfully.')
      queryClient.invalidateQueries(['individualLeadCollectorData'])
    }else{
      toast.warning('An error occurred. Try again')
    }
  }
})

const {mutateAsync: postMutation} = useMutation({
  mutationFn: (id) => leadPost(id),
  onSuccess:(data) => {
    console.log('from post mutation function', data)
    if(data._id){
      toast.success('Lead Posted successfully.')
      queryClient.invalidateQueries(['individualLeadCollectorData'])
    }else{
      toast.warning('An error occurred. Try again')
    }
  }
})

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMutation(id)
      }
    });

  }

  const handlePost = async (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "After post you cannot see it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4589",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Post it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
       await postMutation(id)
      }
    });

  }

  const tableHeadData = ['Business Name', 'Phone', 'FB Page Name','FB Page Link', 'Email','Business Type', 'Website Available','Existing Website Link', 'Edit','Delete','Post for Production' ]

  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <h2 className="text-center font-bold text-3xl md:text-5xl mb-12">
          Lead Collector
        </h2>
        {isLoading ? (
          <TableLoader />
        ) : (
          <>
            {data?.length === 0 ? (
              <p className="text-center text-xl font-semibold">No Data Found</p>
            ) : (
              <Table striped className="relative">
                <Table.Head>
                 {
                  tableHeadData.map(head => (
                    <Table.HeadCell className="text-start" key={head}>{head}</Table.HeadCell>
                  ))
                 }
                </Table.Head>
                <Table.Body className="divide-y">
                  {data?.map((item) => (
                    <Table.Row className="bg-gray-100" key={item?._id}>
                      <Table.Cell>{item.businessName}</Table.Cell>
                      <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
                        {item.mobileNumber}
                      </Table.Cell>
                      <Table.Cell>{item.facebookPageName}</Table.Cell>
                      <Table.Cell>{item.facebookAddress}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.businessType}</Table.Cell>
                      <Table.Cell>{item.websiteAvailabe === true ? 'Yes' : 'No'}</Table.Cell>
                      <Table.Cell>{item.existingWebsiteLink}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/marketing/lead-collector/edit/${item._id}`}>
                        <FaEdit className="text-red-500 cursor-pointer" />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <FaTrash className="text-red-500 cursor-pointer" 
                        onClick={()=> handleDelete(item._id)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <button className='py-1.5 px-5 rounded-md 
                        bg-black text-white hover:bg-primary  duration-300 cursor-pointer'
              onClick={() => handlePost(item._id)}>Post</button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCollector;
