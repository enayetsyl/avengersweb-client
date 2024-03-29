import { Table } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import TableLoader from "../../components/common/TableLoader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getCallerData } from "../../lib/callerfunction";

const formatDate = (dateString) => {
  const options = {year: 'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric', hour12:true}
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options)
  return formattedDate
}

const tableHeadName = [
  "Business Name",
  "Facebook Page Name",
  "Business Type",
  "Facebook Page Address",
  "Mobile Number",
  "Our Created Website Link",
  "Marketing Message Sent",
  "Marketing Message",
  "First Call Date",
  "First Meeting Date",
  "Conversion Status",
  "Reason for Non-Conversion",
  "Edit",
];

const Caller = () => {
    const { user } = useAuth()

    const email = user.email;

  
  const { data, isLoading: loading } = useQuery({
    queryKey: ["callerData"],
    queryFn: () => getCallerData(email),
  });

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
            {data?.length === 0 ? (
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
                        {item.marketingMessageSent
                          ? "Yes"
                          : "Not Sent"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.messageSentAtFirstApproach
                          ? item.messageSentAtFirstApproach
                          : "Not Sent"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.firstCallDate ? formatDate(item.firstCallDate) : "Not Called"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.firstMeetingDate ? formatDate(item.firstMeetingDate) : "Not Set"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.converted ? "Yes" : "No"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.reasonForNonConversion
                          ? item.reasonForNonConversion
                          : "Not Applicable"}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/marketing/caller/edit/${item._id}`}>
                        <FaEdit className="text-cyan-500 cursor-pointer" />
                        </Link>
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
