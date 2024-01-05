import {  useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editLeadData, getEditLeadData } from '../../lib/leadFunction';


const EditLead = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState(null)
  
  const {data} = useQuery({
    queryKey:['editLeadGetData',id ],
    queryFn:() =>  getEditLeadData(id),
  })

   const { mutateAsync } = useMutation({
    mutationFn: () => editLeadData(newData, id),
    onSuccess: (data) => {
      console.log(data)
      toast.success('Lead successfully edited!');
      setLoading(false);
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      businessName: e.target.businessName.value,
    facebookAddress:e.target.facebookAddress.value,
    mobileNumber:e.target.mobileNumber.value,
    facebookPageName:e.target.facebookPageName.value,
    businessType:e.target.businessType.value,
    websiteAvailable:e.target.websiteAvailable.checked,
    email:e.target.email.value,
    existingWebsiteLink:e.target.existingWebsiteLink.value
    }
    setNewData(newData)
    await mutateAsync(newData, id)
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
                placeholder="Business name"
                name="businessName"
                className="input-with-shadow"
                required
                defaultValue={data?.businessName}
              />
            </div>
            {/* Facebook address */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="facebookAddress" className="form-label">
                Facebook Address
              </label>
              <input
                type="facebook address"
                placeholder="Facebook Address"
                className="input-with-shadow"
                name="facebookAddress"
                required
                defaultValue={data?.facebookAddress}
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/*   Mobile Number */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="mobileNumber"
                className="input-with-shadow"
                required
                defaultValue={data?.mobileNumber}
              />
            </div>
            {/* email */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input-with-shadow"
                name="email"
                required
                defaultValue={data?.email}
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          {/* Facebook Page Name */}
          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="facebookPageName" className="form-label">
              Facebook Page Name
              </label>
              <input
                type="text"
                placeholder="Facebook Page Name"
                className="input-with-shadow"
                name="facebookPageName"
                required
                defaultValue={data?.facebookPageName}
              />
            </div>
          {/* Business Type */}
          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="businessType" className="form-label">
              Business Type
              </label>
              <input
                type="text"
                placeholder="Business Type"
                className="input-with-shadow"
                name="businessType"
                required
                defaultValue={data?.businessType}
              />
            </div>
          </div>
          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
         
            {/* Existing website Link */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="existingWebsiteLink" className="form-label">
                Existing website Link
              </label>
              <input
                type="text"
                placeholder="Existing website Link"
                className="input-with-shadow"
                name="existingWebsiteLink"
                
                defaultValue={data?.existingWebsiteLink}
              />
            </div>
            {/* Website Available */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="websiteAvailable" className="form-label">
              Website Available
              </label>
              <input
                type="checkbox"
                className="input-with-shadow"
                name="websiteAvailable"
                
                defaultValue={data?.websiteAvailable}
              />
            </div>
          </div>

          <div className="mt-12">
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
                <>Edit Lead</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLead;
