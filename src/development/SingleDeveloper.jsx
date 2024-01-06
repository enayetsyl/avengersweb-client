import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import TableLoader from "../components/common/TableLoader";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { developerDataPost, getDeveloperData } from "../lib/devloperfunction";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const tableHeadName = [
  "Business Name",
  "Facebook Page Name",
  "Business Type",
  "Facebook Page Address",
  "Mobile Number",
  "Our Created Website Link",
  "Edit",
  "Post to Marketing Department"
];

const SingleDeveloper = () => {
    const { user } = useAuth()

    const email = user.email;

    const queryClient = useQueryClient()

  const { data, isLoading: loading } = useQuery({
    queryKey: ["individualDeveloperData"],
    queryFn: () => getDeveloperData(email),
  });

  const {mutateAsync} = useMutation({
    mutationFn: (id) => developerDataPost(id),
    onSuccess:(data) =>{
     if(data){
      queryClient.invalidateQueries(['individualDeveloperData'])
      toast.success('Data posted successfully.')
     }
    }
  })

  const handlePost = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Post it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id)
      }
    });
  }

  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <h2 className="text-center font-bold text-3xl md:text-5xl mb-12">
          Caller
        </h2>
        {loading ? (
          <TableLoader />
        ) : (
          <>
            {data.length === 0 ? (
              <p className="text-center text-xl font-semibold">No Data Found</p>
            ) : (
              <Table striped className="relative">
                <Table.Head>
                  {tableHeadName.map((head) => (
                    <Table.HeadCell className="text-start" key={head}>
                      {head}
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {data?.map((item) => (
                    <Table.Row className="bg-gray-100" key={item?._id}>
                      <Table.Cell>{item.businessName}</Table.Cell>
                      <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
                        {item.facebookPageName}
                      </Table.Cell>
                      <Table.Cell>{item.businessType}</Table.Cell>
                      <Table.Cell>{item.facebookAddress}</Table.Cell>
                      <Table.Cell className="max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.mobileNumber}
                      </Table.Cell>
                      <Table.Cell>
                        {item.ourCreatedWebsiteLink
                          ? item.ourCreatedWebsiteLink
                          : "Not Created"}
                      </Table.Cell>
                      
                      <Table.Cell>
                        <Link to={`/development/developer/edit/${item._id}`}>
                        <FaEdit className="text-cyan-500 cursor-pointer" />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <button className='py-1.5 px-5 rounded-md 
                        bg-black text-white hover:bg-primary  duration-300 cursor-pointer'
                        onClick={() => handlePost(item._id)}
                        >Post</button>
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

export default SingleDeveloper;
