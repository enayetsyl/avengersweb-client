import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { developerEditDataGet, developerUpdateData } from '../lib/devloperfunction';
import Loader from '../components/common/Loader';
import useAuth from '../hooks/useAuth';

const DeveloperEdit = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const {user} = useAuth()
  const userEmail = user.email;
  console.log(userEmail)
  const timestamp = new Date()
  console.log(timestamp)
  const {data, isLoading} = useQuery({
    queryKey: ['developerEditData'],
    queryFn:() => developerEditDataGet(id)
  })

  const [formData, setFormData] = useState('')
  const devEditData = {
    ourCreatedWebsiteLink: formData,
    userEmail,
    timestamp,
  }
  const { mutateAsync } = useMutation({
    mutationFn:() => developerUpdateData(id, devEditData),
    onSuccess:(data) => {
      if(data){
        setLoading(false)
      toast.success('Lead successfully updated!');
      queryClient.invalidateQueries(['developerData','developerEditData'])
      navigate('/development/developer')
      }
    }
  })

 
  if(isLoading){
    return <Loader/>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
                placeholder="Our Created Website Link"
                className="input-with-shadow"
                name="ourCreatedWebsiteLink"
                onChange={(e)=> setFormData( e.target.value)}
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

export default DeveloperEdit;
