import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../lib/getfunction";
import { AuthContext } from "../Provider/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
const [loading, setLoading] = useState(false)
  const {  setUser } =  useAuth()

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      try {
        const result = await loginUser(email, password);
        setUser(result.data.userInfo)
        if (result.data.message === "Login Successful") {
          const serverData = result.data.userInfo;
          sessionStorage.setItem("userInfo", JSON.stringify(serverData));

          setLoading(false);
          const email = result.data.userInfo.email;
          console.log(email)
          try {
            const res = await axios.post('http://localhost:5000/api/v1/jwt', email)
            console.log(res.data.token)
            if(res.data.token){
              const token = res?.data?.token
              sessionStorage.setItem("token", token)
            }
          } catch (error) {
            console.log('Error in jwt route', error)
          }

          if (result.data.userInfo.role === "LeadCollector") {
            toast.success("Login Successful!");
            navigate("/marketing/lead-collector");
          } else if (result.data.userInfo.role === "Caller") {
            toast.success("Login Successful!");
            navigate("/marketing/caller");
          } else if (result.data.userInfo.role === "marketingAdmin") {
            toast.success("Login Successful!");
            navigate("/marketing");
          } else if (result.data.userInfo.role === "developmentAdmin") {
            toast.success("Login Successful!");
            navigate("/development");
          }  else if (result.data.userInfo.role === "Developer") {
            toast.success("Login Successful!");
            navigate("/development/developer");
          }else {
            toast.warning("Your Account is not approved yet");
            navigate("/");
          }
        } else if (result.data === "Incorrect Password") {
          toast.success("Incorrect Password. Try again Late");
          setLoading(false);
          console.log(result.data);
        }
      } catch (error) {
        toast.warning("Failed To Log in!");
        setLoading(false);
      }
    } else {
      toast.warning("Please Fill all the fields!");
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 to-pink-500 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="shadow-xl p-6 md:p-12 rounded-xl min-h-[600px] max-w-[600px] bg-white bg-opacity-25 backdrop-blur-md mx-auto">
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleLoginSubmit}
          >
            <h3 className="accent-color text-3xl text-center font-bold capitalize my-6">
              Enter your login details
            </h3>
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500 rounded-md"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500 rounded-md"
              />
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg ${
                loading && "cursor-not-allowed opacity-50"
              }`}
            >
              Log In
            </button>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-teal-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg"
              onClick={() => {
                setEmail("demo@gmail.com");
                setPassword("123456");
              }}
            >
              Guest Login
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

export default Login;
