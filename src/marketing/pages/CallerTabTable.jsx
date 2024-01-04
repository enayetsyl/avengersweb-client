import { Table } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

const CallerTabTable = (data) => {
  console.log(data.data);
  const tableHeadName = [
    "Business Name",
    "Facebook Page Name",
    "Business Type",
    "Facebook Page Address",
    "Mobile Number",
    "Our Created Website Link",
    "Website Available",
    "Client Existing Website Address",
    "Marketing Message Sent",
    "First Call Date",
    "First Meeting Data",
    "Conversion Status",
    "Reason for Non-Conversion",
    "Caller Name",
    // "Edit",
  ];

  const formatDate = (dateString) => {
    const options = {year: 'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric', hour12:true}
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options)
    return formattedDate
  }
  return (
    <div>
      <>
        <h2 className="text-2xl font-bold my-12">Caller:</h2>
        <Table striped className="relative">
          <Table.Head>
            {tableHeadName.map((head) => (
              <Table.HeadCell className="text-start" key={head}>
                {head}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.data?.map((item) => (
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
                <Table.Cell>{item.ourCreatedWebsiteLink}</Table.Cell>
                <Table.Cell>{item.websiteAvailabe ? item.websiteAvailabe : "No"}</Table.Cell>
                <Table.Cell>{item.existingWebsiteLink ? item.existingWebsiteLink : "N/A"}</Table.Cell>
                <Table.Cell>{item.marketingMessageSent ? 'Yes' : "No"}</Table.Cell>
                <Table.Cell>{item.firstCallDate ? formatDate(item.firstCallDate) : "Not Called Yet"}</Table.Cell>
                <Table.Cell>{item.firstMeetingDate ? formatDate(item.firstMeetingDate) : "N/A"}</Table.Cell>
                <Table.Cell>{item.converted ? "Converted" : "Pending"}</Table.Cell>
                <Table.Cell>{item.reasonForNonConversion
 ? item.reasonForNonConversion : "N/A"}</Table.Cell>
                <Table.Cell>{item.callerName}</Table.Cell>
                {/* <Table.Cell>
                  <FaEdit className="text-cyan-500 cursor-pointer" />
                </Table.Cell> */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    </div>
  );
};

export default CallerTabTable;
