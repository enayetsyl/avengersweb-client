import { Button, Container, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { motion,useScroll } from "framer-motion"
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";


const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>   
      <motion.div 
      className='fixed top-0 left-0 right-0 h-3 bg-[#ff4589] transform origin-top-left'
      style={{ scaleX: scrollYProgress }} /> 
      <Heading as='h1' size='3xl'
      textAlign='center'
      my='40px'
      >About My Website</Heading>  
   
      <Container maxW='6xl'>
      <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-2'>
      <nav className='border border-pink-600 p-3 rounded-lg w-full md:w-1/2'>
      <OrderedList>
  <ListItem><a href="#TechnologyUsed">Technology Used</a></ListItem>
  <ListItem><a href="#FrontendCodeOverview">
  Frontend Code Overview</a></ListItem>
  <ListItem><a href="#BackendCodeOverview">
Backend Code Overview</a></ListItem>
</OrderedList>
      </nav>


      <div className='border border-pink-600 p-3 rounded-lg w-full md:w-1/2'>
      <OrderedList>
  <ListItem><Link to='https://github.com/enayetsyl/avengersweb-client' target='_blank'>GitHub FrontEnd Code</Link></ListItem>
  <ListItem><Link to='https://github.com/enayetsyl/avengers-web-server' target='_blank'>GitHub BackEnd Code</Link></ListItem>
  <ListItem><Link>Video Description</Link></ListItem>
  <ListItem><Link to='https://www.linkedin.com/in/md-enayetur-rahman/' target='_blank'>Linkedin Profile</Link></ListItem>
</OrderedList>
      </div>
      </div>

      <section id="TechnologyUsed" className='space-y-4 my-8'>

        <Heading 
        textAlign='center'
        py='20px'>Technology Used</Heading>
        <Heading py='20px'>Frontend</Heading>

        <Text><span className='font-bold'>React (with Vite):</span> The frontend of this portfolio website is built using React, a popular JavaScript library for building user interfaces. The project is set up with Vite, a fast and efficient frontend build tool.</Text>

        <Text><span className='font-bold'>Chakra UI:</span> Styling and components are handled with Chakra UI, a modern UI library for React that makes it easy to design and maintain consistent interfaces.</Text>

        <Text><span className='font-bold'>Framer Motion:</span>  For smooth animations and transitions, Framer Motion is integrated into the project. It provides a simple way to create delightful motion in React applications.</Text>

        <Text><span className='font-bold'>React Router:</span> Navigation within the single-page application is managed using React Router, allowing for seamless transitions between different sections.</Text>

        <Text><span className='font-bold'>Chart.js and React-Chartjs-2:</span> Chart.js, along with its React wrapper (React-Chartjs-2), is used for displaying interactive and visually appealing charts on the portfolio.</Text>

        <Text><span className='font-bold'>Firebase:</span> Firebase is utilized for various functionalities, such as authentication, real-time database, and hosting.</Text>

        <Text><span className='font-bold'>React Icons:</span> For a wide selection of icons used across the website, React Icons provides a convenient library.</Text>

        <Text><span className='font-bold'>React Spinners:</span> Loading spinners are implemented using React Spinners, enhancing the user experience during data fetching.</Text>

        <Text><span className='font-bold'>React Toastify:</span> Toast notifications are managed with React Toastify, providing a clean and user-friendly way to display messages.</Text>

        <Heading py='20px'>Backend</Heading>

        <Text><span className='font-bold'>Node.js and Express:</span> The backend server is built with Node.js, and the Express framework is used to handle routing and server-related functionalities.</Text>


        <Text><span className='font-bold'>MongoDB and Mongoose:</span> MongoDB, a NoSQL database, is employed to store and manage data. Mongoose, an ODM library, facilitates interaction with the MongoDB database using Node.js.</Text>


        <Text><span className='font-bold'>JWT (JSON Web Tokens): </span> JSON Web Tokens are used for secure authentication and authorization processes within the web server.</Text>

        <Text><span className='font-bold'>Bcrypt: </span> Passwords are securely hashed using Bcrypt to enhance user data security.</Text>


        <Text><span className='font-bold'>Cors:</span> Cross-Origin Resource Sharing (CORS) is implemented using the Cors middleware, allowing controlled access to resources on the server from different origins.</Text>


        <Text><span className='font-bold'>Dotenv: </span> Environmental variables are managed with Dotenv to keep sensitive information secure and separate from the codebase.</Text>

      </section>

      <section id="FrontendCodeOverview" className='space-y-4 my-8'>
      <Heading 
        textAlign='center'
        py='20px'>Frontend Code Overview</Heading>

        <Heading py='20px'>Key Features</Heading>

        <Text> <span className='font-bold'>Authentication and Role-Based Access:</span>The website incorporates a robust authentication system ensuring secure user access. Role-based access control is implemented, allowing different levels of authorization for users, including marketing administrators, lead collectors, and developers.</Text>

        

        <Text> <span className='font-bold'>Responsive UI with Chakra UI:</span>The user interface is crafted with Chakra UI, a modern and responsive design framework. The website adapts seamlessly to various devices, providing an optimal viewing experience for users across different platforms.</Text>


        <Text> <span className='font-bold'>Routing and Navigation:</span>Efficient routing is achieved through the use of React Router. The website offers a smooth and intuitive navigation experience, enhancing user engagement and overall satisfaction.</Text>


        <Text> <span className='font-bold'>Chart.js Integration:</span>For data visualization, Chart.js is integrated to present dynamic and interactive charts. This feature not only adds visual appeal but also demonstrates my proficiency in incorporating third-party libraries for enhanced functionality.</Text>


        <Text> <span className='font-bold'>React Query for Data Management:</span>Data management is optimized with React Query, offering a streamlined approach to fetching, caching, and updating data. This ensures a responsive and efficient application, particularly in scenarios where real-time data updates are crucial.</Text>


        <Text> <span className='font-bold'>Protected Routes and PrivateRoute Component:</span>To ensure secure access to certain sections of the website, a PrivateRoute component is implemented. This component restricts access based on user roles, showcasing my expertise in implementing role-based access control.</Text>


        <Text> <span className='font-bold'>User Profile and Dashboard:</span>A personalized user profile and dashboard provide a tailored experience. Users can manage their information, preferences, and view relevant data, contributing to a user-centric design.</Text>


        <Text> <span className='font-bold'>Marketing and Development Modules:</span>The website is divided into distinct modules for marketing and development purposes. Each module caters to specific roles, enhancing efficiency and focus in tasks related to marketing administration and development management.</Text>


        <Text> <span className='font-bold'>AnimatedRoute for Enhanced Transitions:</span>The use of AnimatedRoute adds a polished touch to page transitions, providing a visually appealing and seamless navigation experience. This attention to detail demonstrates a commitment to enhancing the overall user journey.</Text>


        <Text> <span className='font-bold'>Integration with External APIs:</span>Incorporation of external APIs enriches the website's functionality. This showcases my ability to integrate with third-party services, opening possibilities for extended features and data sources.</Text>


        <Text> <span className='font-bold'>Error Handling and User Feedback:</span>Comprehensive error handling and user feedback mechanisms are implemented, ensuring a smooth experience even in the face of unexpected scenarios. Users receive clear and actionable messages, contributing to a positive overall experience.</Text>


        <Text> <span className='font-bold'>Future-Ready Architecture:</span>The architecture of the website is designed with scalability in mind. The use of modular components and industry-standard practices positions the application for future enhancements and updates.</Text>


      </section>

      <section id="BackendCodeOverview" className='space-y-4 my-8'>
      <Heading 
        textAlign='center'
        py='20px'>Backend Code Overview</Heading>

        <Heading py='20px'>File Structure</Heading>

        <Text>File structure is organized into different modules for specific functionalities. Below is a high-level overview of the file structure:</Text>
        
        <Text><span className='font-bold'>models Directory:</span> Contains the MongoDB schema models for different entities such as Lead and User.</Text>

        <Text><span className='font-bold'>middleware Directory:</span> Holds middleware functions for verifying JWT tokens (verifyToken), checking admin privileges (verifyAdmin), and other potential middleware.</Text>

        <Text><span className='font-bold'>routes Directory:</span> Divided into multiple route files based on functionality: <br />
authRoutes.js: Handles user authentication-related routes.
<br />
developerRoutes.js: Manages routes related to developers and their data.
<br />
leadRoutes.js: Contains routes for lead management.
<br />
userRoutes.js: Deals with user-related routes.</Text>


        <Text><span className='font-bold'>index.js:</span>  The entry point for  application where i initialize Express, connect to the database, and define the main middleware.This file is responsible for starting the server, listening on a specific port, and handling any necessary setup.</Text>

        <Text><span className='font-bold'>.env:</span> Contains configuration settings, environment variables, & other global constants.</Text>

        <Heading py='20px'>Code Organization</Heading>

        <Text><span className='font-bold'>User Authentication:</span> The authentication-related code is organized in the authRoutes.js file. It includes user registration, login, JWT token generation, and token verification.</Text>

        <Text><span className='font-bold'>User and Role Management:</span> User-related routes and role management are handled in the userRoutes.js file. This includes fetching users, changing user roles, and handling user login.</Text>

        <Text><span className='font-bold'>Lead Management:</span> Lead-related functionalities are encapsulated in the leadRoutes.js file. It covers adding, editing, deleting leads, and transferring leads to developers.</Text>

        <Text><span className='font-bold'>Developer Routes:</span> Routes related specifically to developers, such as getting all developers, assigning developers, fetching developer leads, and updating developer data, are located in developerRoutes.js.</Text>

        <Text><span className='font-bold'>Middleware:</span> The middleware directory houses reusable middleware functions, such as verifying JWT tokens and checking admin privileges.</Text>


        <Heading py='20px'>Functionality of the Code</Heading>

        <Text><span className='font-bold'>User Authentication and Authorization:</span> 
        <UnorderedList>
  <ListItem>Users can register, login, and obtain JWT tokens for authentication.</ListItem>
  <ListItem>Token verification ensures secure access to certain routes.</ListItem>
  <ListItem>Admins can change user roles, allowing role-based access control.</ListItem>
</UnorderedList>
        </Text>

        <Text><span className='font-bold'>Lead Management:</span> 
        <UnorderedList>
  <ListItem>Leads can be added, edited, and deleted.</ListItem>
  <ListItem>Leads can be transferred to developers for further processing.</ListItem>
  <ListItem>Statistics data related to lead counts is available for analysis.</ListItem>
</UnorderedList>
        </Text>


        <Text><span className='font-bold'>User and Developer Management:</span> 
        <UnorderedList>
  <ListItem>Users are categorized into different roles (Developer, Caller, Marketing Admin, etc.).</ListItem>
  <ListItem>Admins can fetch information about all users or specific roles.</ListItem>
  <ListItem>Developer-specific routes handle actions related to developers.</ListItem>
</UnorderedList>
        </Text>


        <Text><span className='font-bold'>Statistics Data:</span> 
        <UnorderedList>
  <ListItem>Various statistics routes provide insights into developer counts on a daily, weekly, monthly, and yearly basis.</ListItem>
</UnorderedList>
        </Text>


        <Text><span className='font-bold'>Security Measures:</span> 
        <UnorderedList>
  <ListItem>Passwords are securely hashed using bcrypt during user registration.</ListItem>
  <ListItem>Routes are protected with JWT tokens to ensure secure access.</ListItem>
</UnorderedList>
        </Text>


        <Text><span className='font-bold'>Error Handling and Logging:</span> 
        <UnorderedList>
  <ListItem>There are logs and error handling mechanisms in place, providing insights into any internal server errors.</ListItem>
</UnorderedList>
        </Text>

       



      </section>
      {scrollProgress > 10 && (
          <Button
            onClick={handleBackToTop}
            position="fixed"
            bottom="4"
            right="4"
            backgroundColor="#ff4589"
          >
            Back to Top
          </Button>
        )}
      </Container>
        <div className='bg-pink-600 shadow-xl '>
          <div className='py-5 flex justify-around '>
         
          <Link to='https://www.facebook.com/profile.php?id=100094416483981' target='_blank'><FaFacebookF className='text-white text-3xl'/></Link> 
          
          <Link to='https://twitter.com/enayetu_syl' target='_blank'><FaTwitter className='text-white text-3xl'/></Link>
         
          <Link to='https://www.linkedin.com/in/md-enayetur-rahman/' target='_blank'>
          <FaLinkedinIn className='text-white text-3xl'/>
          </Link>
          
          </div>
          <div className='text-center pb-3 text-white'>copyright @ Md Enayetur Rahman, <span className='font-bold'>01730 19 76 20 </span></div>

        </div>

    </div>
  )
}

export default About