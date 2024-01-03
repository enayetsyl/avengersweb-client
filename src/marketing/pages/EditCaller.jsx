import { useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';

const EditCaller = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fbLink, setFbLink] = useState('');
  const [reason, setReason] = useState('');
  const [conversionStage, setConversionStage] = useState('');
  const [meeting, setMeeting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    toast.success('Lead successfully added!');
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
            {/* name */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="name" className="form-label">
                Page Name
              </label>
              <input
                type="text"
                placeholder="Page name"
                name="name"
                className="input-with-shadow"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* phone */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Phone"
                className="input-with-shadow"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* fbLink */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="fbLink" className="form-label">
                FB page Link
              </label>
              <input
                type="text"
                placeholder="FB page Link"
                name="fbLink"
                className="input-with-shadow"
                required
                value={fbLink}
                onChange={(e) => setFbLink(e.target.value)}
              />
            </div>
            {/* reason for not conversion */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="reason" className="form-label">
                Reason for not conversion
              </label>
              <input
                type="text"
                placeholder="Reason for not conversion"
                className="input-with-shadow"
                name="reason"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* cstage */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="cstage" className="form-label">
                Conversion Stage
              </label>
              <select
                name="cstage"
                id="cstage"
                className="input-with-shadow"
                value={conversionStage}
                onChange={(e) => setConversionStage(e.target.value)}
              >
                <option value="Conversion Stage" selected hidden>
                  Conversion Stage
                </option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="meeting">Meeting Set</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* Meeting */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="meeting" className="form-label">
                Meeting Schedule
              </label>
              <input
                type="text"
                placeholder="11/04/2024 10:00AM"
                className="input-with-shadow"
                name="meeting"
                value={meeting}
                onChange={(e) => setMeeting(e.target.value)}
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

export default EditCaller;
