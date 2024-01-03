import { useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';

const AddCaller = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    toast.success('Lead successfully added!');
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
              />
            </div>
          </div>

          {/* input group */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            {/* btype */}
            <div className=" flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="btype" className="form-label">
                Business Type
              </label>
              <input
                type="text"
                placeholder="Business Type"
                name="btype"
                className="input-with-shadow"
                required
              />
            </div>
            {/* Existing website Link */}
            <div className="flex flex-col gap-y-3 w-full md:w-1/2">
              <label htmlFor="webLink" className="form-label">
                Existing website Link
              </label>
              <input
                type="text"
                placeholder="Existing website Link"
                className="input-with-shadow"
                name="webLink"
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

export default AddCaller;
