import { useContext, useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { addLeadData } from '../../lib/leadFunction';

const AddLead = () => {
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const entryBy = user?.email;
  const [userData, setUserData] = useState({
    businessName: '',
    facebookAddress:'',
    mobileNumber:'',
    facebookPageName:'',
    businessType:'',
    websiteAvailable:false,
    email:'',
    existingWebsiteLink:'',
  })
  
  const otherField = {
    firstCallDate: '', 
    firstMeetingDate: '',
    converted: false,
    reasonForNonConversion: '',
    websiteCreation: '',
    ourCreatedWebsiteLink: '',
    messageSentAtFirstApproach: '',
    marketingMessageSent: false,
  }
  const newLeadData = {...userData, ...otherField, entryBy}

  const {mutateAsync} = useMutation({
    mutationFn:(newLeadData) => addLeadData(newLeadData),
    onSuccess:(data)=>{
      console.log(data)
      toast.success('Data added successfully.')
      setLoading(false)
      navigate('/marketing/lead-collector')
    }
  })

  const handleInputchange = (e) => {
    const {name, value, type, checked} = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    return setUserData((prevInfo) => ({
      ...prevInfo, [name] : inputValue
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(entryBy){
      await mutateAsync(newLeadData)
    } else{
      toast.warning('Error occurred. Please logout and try again.')
    }
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-bold text-xl md:text-5xl mb-12">
          Add New Lead
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
                value={userData.businessName}
                onChange={handleInputchange}
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
                value={userData.facebookAddress}
                onChange={handleInputchange}
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
                value={userData.mobileNumber}
                onChange={handleInputchange}
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
                value={userData.email}
                onChange={handleInputchange}
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
                value={userData.facebookPageName}
                onChange={handleInputchange}
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
                value={userData.businessType}
                onChange={handleInputchange}
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
                
                value={userData.existingWebsiteLink}
                onChange={handleInputchange}
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
                
                value={userData.websiteAvailable}
                onChange={handleInputchange}
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
                <>Add New Lead</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
