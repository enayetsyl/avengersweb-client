import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Loader from '../components/common/Loader';
import { addData } from '../lib/getfunction';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [pic, setPic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const navigate = useNavigate();
  const {loading, setLoading, createUser} = useContext(AuthContext)

  // const postDetails = (pic) => {
  //   setLoading(true);

  //   return new Promise((resolve, reject) => {
  //     if (
  //       pic.type === 'image/jpeg' ||
  //       pic.type === 'image/png' ||
  //       pic.type === 'image/jpg'
  //     ) {
  //       const data = new FormData();
  //       data.append('file', pic);
  //       data.append('upload_preset', 'blogy app');
  //       data.append('cloud_name', 'djlghivmg');

  //       fetch('https://api.cloudinary.com/v1_1/djlghivmg/image/upload', {
  //         method: 'post',
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setPic(data.url.toString());
  //           console.log(pic);
  //           setLoading(false);
  //           resolve();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setLoading(false);
  //           reject(err);
  //         });
  //     } else {
  //       toast.error('Please upload a jpeg, jpg, or png image!');
  //       setLoading(false);
  //       reject('Invalid image type');
  //     }
  //   });
  // };

  // const addData = async () => {
  //   try {
  //     const result = await axios.post(`http://localhost:5000/user`, {
  //       name,
  //       email,
  //       password,
  //       pic,
  //     });
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  // eslint-disable-next-line no-unused-vars
  const { data, mutateAsync } = useMutation({
    mutationFn: ({name, email, password}) => addData(name, email, password),
    onSuccess: (data) => {
      console.log('from on success', data)
      // localStorage.setItem('userInfo', JSON.stringify(data));
      if(data.message === 'Registration Successful'){
        toast.success('Registration Successful. Wait for approval');
        setLoading(false);
      }else if(data === 'User exist'){
        toast.warning('This email already exist. Try with another one or wait for approval.');
        setLoading(false);
      }else{
        toast.warning('An error occurred. Please try again later. ')
      }
      // navigate('/');
      // window.location.reload();
    },
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !conPassword) {
      toast.warning('Please fill all the fields!');
      setLoading(false);
      return;
    } else {
      if (password !== conPassword) {
        toast.warning("Password Doesn't match!");
        setLoading(false);
        return;
      } else {

        try {
          // createUser(email, password)
          // .then(result => {
          //   if(result.user){
          //     console.log('from firebase',result.user)
          //   }
          // })
          await mutateAsync({name, email, password});
        } catch (error) {
          toast.warning('Failed To Create User!');
          setLoading(false);
        }

        // if (pic) {
        //   postDetails(pic).then(async () => {
        //     try {
        //       await mutateAsync();
        //     } catch (error) {
        //       toast.warning('Failed To Create User!');
        //       setLoading(false);
        //     }
        //   });
        // } else {
        //   setPic(
        //     'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png'
        //   );
        //   // postDetails(pic);
        //   // try {
        //   //   await mutateAsync();
        //   // } catch (error) {
        //   //   toast.warning('Failed To Create User!');
        //   //   setLoading(false);
        //   // }
        // }
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 to-pink-500 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="shadow-xl p-6 md:p-12 rounded-xl min-h-[600px] max-w-[600px] bg-white bg-opacity-25 backdrop-blur-md mx-auto">
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleRegisterSubmit}
          >
            <h3 className="accent-color text-3xl text-center font-bold capitalize my-4">
              Register with your details
            </h3>
            {/* name */}
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-primary rounded-md"
            />
            {/* email */}
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-primary rounded-md"
            />
            {/* password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-primary rounded-md"
              />
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
            {/* confirm password */}
            <div className="relative">
              <input
                type={showConPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-primary rounded-md"
              />
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
                onClick={() => setShowConPassword((prev) => !prev)}
              >
                {showConPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
            {/* image */}
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => setPic(e.target.files[0])}
            /> */}
            <button
              type="submit"
              className={`bg-primary hover:bg-opacity-90 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg ${
                loading && 'cursor-not-allowed opacity-50'
              }`}
              disabled={loading}
            >
              {!loading ? 'REGISTER NOW' : <Loader type="sync" size={11} />}
            </button>
          </form>
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
