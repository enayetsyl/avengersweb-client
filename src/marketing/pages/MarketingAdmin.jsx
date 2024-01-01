import { Table } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import TableLoader from '../../components/common/TableLoader';

const dummyDataLead = [
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
const dummyCallerLead = [
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
const dummyUserLead = [
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

const MarketingAdmin = () => {
  const [loading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [leadData, setLeadData] = useState([])
  const [callerData, setCallerData] = useState([])
  const [userData, setUserData] = useState([])

  // load data 
  useEffect(() => {
    setIsLoading(true)
    // Load data based on the selected tab
    let dataToLoad = [];
    switch(tab){
      case 0: 
      dataToLoad = leadData;
      break;
      case 1: 
      dataToLoad = callerData;
      break;
      case 2: 
      dataToLoad = userData;
      break;
      default:
        break;
    }

    // Set loaded data to the respective tab
    switch(tab){
      case 0:
        setLeadData(dataToLoad);
        break;
      case 1:
        setCallerData(dataToLoad);
        break;
      case 2:
        setUserData(dataToLoad);
        break;
        default:
          break
    }
    setIsLoading(false)
  },[tab, callerData, leadData, userData])


  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <h2 className="text-center font-bold text-3xl md:text-5xl mb-12">
          Marketing Admin
        </h2>

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
        {loading ? (
          <TableLoader />
        ) : (
          <>
            {tab === 0 ? (
              <>
                {dummyDataLead.length === 0 ? (
                  <p className="text-center text-xl font-semibold">
                    No Data Found
                  </p>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold my-12">
                      Lead Collectors:
                    </h2>
                    <Table striped className="relative">
                      <Table.Head>
                        <Table.HeadCell className="text-start">
                          Name
                        </Table.HeadCell>
                        <Table.HeadCell className="text-start">
                          Phone
                        </Table.HeadCell>
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
                        <Table.HeadCell className="text-start">
                          Edit
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {dummyDataLead?.map((item) => (
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
                  </>
                )}
              </>
            ) : (
              <>
                {dummyDataLead.length === 0 ? (
                  <p className="text-center text-xl font-semibold">
                    No Data Found
                  </p>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold my-12">Callers:</h2>
                    <Table striped className="relative">
                      <Table.Head>
                        <Table.HeadCell className="text-start">
                          Name
                        </Table.HeadCell>
                        <Table.HeadCell className="text-start">
                          Phone
                        </Table.HeadCell>
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
                        <Table.HeadCell className="text-start">
                          Edit
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {dummyDataLead?.map((item) => (
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
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketingAdmin;
