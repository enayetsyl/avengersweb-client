import {  useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { callerEditDataGet, callerUpdateData } from '../../lib/callerfunction';

const EditCaller = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery({
    queryKey: ['callerEditData'],
    queryFn:() => callerEditDataGet(id)
  })


  
   // Extract the date value from the server response
   const defaultFirstCallDate = data?.firstCallDate;

   const defaultFirstMeetingDate = data?.firstMeetingDate

   // Format the date for the input field (if it exists)
   const formattedDefaultFirstCallDate =
     defaultFirstCallDate && new Date(defaultFirstCallDate).toISOString().slice(0, -8);

   const formattedDefaultFirstMeetingDate =
   defaultFirstMeetingDate && new Date(defaultFirstMeetingDate).toISOString().slice(0, -8);

console.log(formattedDefaultFirstCallDate)
console.log(formattedDefaultFirstMeetingDate)
 
  const [formData, setFormData] = useState({
     marketingMessageSent: data?.marketingMessageSent || false,
    messageSentAtFirstApproach: data?.messageSentAtFirstApproach || '',
    converted: data?.converted || false,
    reasonForNonConversion: data?.reasonForNonConversion || '',
    firstCallDate: formattedDefaultFirstCallDate || '',
    firstMeetingDate: formattedDefaultFirstMeetingDate || '',
  })
console.log(formData)
  const { mutateAsync } = useMutation({
    mutationFn:() => callerUpdateData(id, formData),
    onSuccess:(data) => {
      console.log(data)
      setLoading(false)
      toast.success('Lead successfully edited!');
      queryClient.invalidateQueries(['callerData', 'callerEditData'])
      navigate('/marketing/caller')
    }
  })

 

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  if(isLoading){
    return <Loader/>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData)
    await mutateAsync()
  };
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-bold text-xl md:text-5xl mb-12">
          Edit Lead
        </h2>
        <form
          className="max-w-[900px] black-shadow mx-auto py-12 px-8 md:px-12 rounded-xl"
          onSubmit={handleSubmit}
        >
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* Business name */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="businessName" className="form-label">
              Business name
              </label>
              <input
                type="text"
                placeholder="Page name"
                name="businessName"
                className="input-with-shadow"
                readOnly
                value={data.businessName}
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Facebook Page Name */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="facebookPageName" className="form-label">
              Facebook Page Name
              </label>
              <input
                type="text"
                placeholder="facebookPageName"
                className="input-with-shadow"
                name="phone"
                readOnly
                value={data.facebookPageName}
                // onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* Facebook Page Link */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="facebookAddress" className="form-label">
                Facebook Page Link
              </label>
              <input
                type="text"
                placeholder="FB page Link"
                name="facebookAddress"
                className="input-with-shadow"
                readOnly
                value={data.facebookAddress}
                // onChange={(e) => setFbLink(e.target.value)}
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                readOnly
                className="input-with-shadow"
                name="email"
                required
                value={data.email}
                // onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* Mobile Number */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                readOnly
                name="mobileNumber"
                className="input-with-shadow"
                value={data.mobileNumber}
              />
            </div>
            {/* OUR CREATED WEBSITE LINK */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="ourCreatedWebsiteLink" className="form-label">
                Our Created Website Link
              </label>
              <input
                type="text"
                placeholder="ourCreatedWebsiteLink"
                readOnly
                className="input-with-shadow"
                name="ourCreatedWebsiteLink"
                value={data.ourCreatedWebsiteLink}
                // onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* Marketing Message Sent */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="marketingMessageSent" className="form-label">
               Marketing Message Sent
              </label>
              <input
                type="checkbox"
                name="marketingMessageSent"
                className="input-with-shadow "
                checked={formData?.marketingMessageSent}
                onChange={handleChange}
              />
            </div>
            {/*  Message Sent At First Approach
 */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="messageSentAtFirstApproach" className="form-label">
                Message Sent At First Approach
              </label>
              <input
                type="text"
                placeholder="Message Sent At First Approach"
                className="input-with-shadow"
                name="messageSentAtFirstApproach"
                value={formData?.messageSentAtFirstApproach}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* 
            Conversion Status */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="converted" className="form-label">
                Conversion Status
              </label>
              <input
                type="checkbox"
                name="converted"
                className="input-with-shadow"
                checked={formData?.converted}
                onChange={handleChange}
              />
            </div>
            {/* Reason for Non-Conversion */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="reasonForNonConversion
" className="form-label">
                Reason for Non-Conversion
              </label>
              <input
                type="text"
                placeholder="Reason for Non-Conversion"
                className="input-with-shadow"
                name="reasonForNonConversion"
                value={formData?.reasonForNonConversion}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          
            {/* First Call Date */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="firstCallDate" className="form-label">
              First Call Date
              </label>
              <input
                type="datetime-local"
                className="input-with-shadow"
                name="firstCallDate"
                value={formData?.firstCallDate || ''
                }
                onChange={handleChange}
              />
            </div>
            {/* First Meeting Date
 */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="firstMeetingDate
" className="form-label">
              First Meeting Date
              </label>
              <input
                type="datetime-local"
                className="input-with-shadow"
                name="firstMeetingDate"
              value={formData?.firstMeetingDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-12 flex justify-center items-center">
            <button
              className={`bg-black text-white font-base uppercase font-bold py-3 px-12 hover:translate-y-2 duration-500 rounded cursor-pointer ${
                loading && 'cursor-not-allowed'
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={11} loader="sync" />
                </>
              ) : (
                <>Update Status</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCaller;
