import { Table } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import TableLoader from '../../components/common/TableLoader';
import { useQuery } from '@tanstack/react-query';
import { getSingleUserLeads } from '../../lib/getfunction';
import { AuthContext } from '../../Provider/AuthProvider';

const LeadCollector = () => {
  const {user} = useContext(AuthContext)
  const userEmail = user?.email;
  const {data, isLoading} = useQuery({
    queryKey:['individualLeadCollectorData'],
    queryFn:() => getSingleUserLeads(userEmail)
  })

  const handleDelete = id => {
    console.log(id)
  }

console.log(data)
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
                  <Table.HeadCell className="text-start">Business Name</Table.HeadCell>
                  <Table.HeadCell className="text-start">Phone</Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    FB Page Name
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    FB Page Link
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">Email</Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Business Type
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Website Available
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Existing Website Link
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">Edit</Table.HeadCell>
                  <Table.HeadCell className="text-start">Delete</Table.HeadCell>
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
                      <Table.Cell>{item.businessType
}</Table.Cell>
                      <Table.Cell>{item.websiteAvailabe === true ? 'Yes' : 'No'}</Table.Cell>
                      <Table.Cell>{item.existingWebsiteLink}</Table.Cell>
                      <Table.Cell>
                        <FaEdit className="text-red-500 cursor-pointer" />
                      </Table.Cell>
                      <Table.Cell>
                        <FaTrash className="text-red-500 cursor-pointer" 
                        onClick={()=> handleDelete(item._id)}
                        />
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
