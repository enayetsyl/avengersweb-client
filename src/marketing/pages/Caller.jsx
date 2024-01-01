import { Table } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import TableLoader from '../../components/common/TableLoader';

const dummyData = [
  {
    name: 'Shafayet',
    phone: '01638719578',
    fbLink: 'https://facebook.com/avengers-web',
    conversionStage: 'pending',
    reason: 'lorem ipsum dolor sit amet.',
    meeting: '10/11/23',
    time: '10:21AM',
  },
  {
    name: 'Shafayet',
    phone: '01638719578',
    fbLink: 'https://facebook.com/avengers-web',
    conversionStage: 'pending',
    reason:
      'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.',
    meeting: '10/11/23',
    time: '10:21AM',
  },
];

const Caller = () => {
  const [loading, setIsLoading] = useState(false);

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
            {dummyData.length === 0 ? (
              <p className="text-center text-xl font-semibold">No Data Found</p>
            ) : (
              <Table striped className="relative">
                <Table.Head>
                  <Table.HeadCell className="text-start">Name</Table.HeadCell>
                  <Table.HeadCell className="text-start">Phone</Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    FB Page Link
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Conversion Stage
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Reason For Not Conversion
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Meeting Schedule
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dummyData?.map((item) => (
                    <Table.Row className="bg-gray-100" key={item?._id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell className="whitespace-wrap font-bold  min-w-[200px]">
                        {item.phone}
                      </Table.Cell>
                      <Table.Cell>{item.fbLink}</Table.Cell>
                      <Table.Cell>{item.conversionStage}</Table.Cell>
                      <Table.Cell className="max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.reason}
                      </Table.Cell>
                      <Table.Cell>{item.meeting}</Table.Cell>
                      <Table.Cell>
                        <FaEdit className="text-cyan-500 cursor-pointer" />
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

export default Caller;
