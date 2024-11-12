import { SiAltiumdesigner } from "react-icons/si";
import { TbCodeDots } from "react-icons/tb";
import { PiCodeBold } from "react-icons/pi";
import { Link } from 'react-router-dom'; 
import GithubStreaks from "../page/StreaksTable";
import ExperienceList from "./ExperienceList";
import ProjectsList from "./ProjectsList";
import LicenceCertificationList from "./LicenceCertificationList";
import { useUserImage } from './PersonalDataList';
import { FileText,ArrowUpRight} from 'lucide-react';

const Home = () => {
  // ,name,headline,about
  const { imageUrl } = useUserImage();
  const { name } = useUserImage();
  const {headline}=useUserImage();
  const {description}=useUserImage();

  const recent_experience = [
    {
      image: <img src="/images/buildspaceso_logo.jpeg" className="w-16 h-16 rounded-md" alt="SoumenBhunia" width={64} height={64} />,
      position: "buildspace n&w s5 Cohort",
      company: "buildspace",
      time: "Jun 2024 - 1 mo",
    },
    {
      image: <img src="/images/zidio_development_logo.jpeg" className="w-16 h-16 rounded-md" alt="SoumenBhunia" width={64} height={64} />,
      position: "Web Developer Internship",
      company: "Zidio Development",
      time: "Jun 2024 - 1 mo",
    },
  ];

  const projects = [
    {
      title: "Cubikor",
      description: "The Cube E-Commerce is a web application designed to provide users with an intuitive and seamless shopping experience, and a user-friendly interface for browsing and purchasing products online.",
      Skills: [
        { name: "React.js" },
        { name: "Tailwind.css" },
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "Mariadb" },
      ],
    },
    {
      title: "Placement module",
      description: "The Placement Module is a web application designed to provide users with an intuitive and seamless experience for managing and tracking placement activities.",
      Skills: [
        { name: "React.js" },
        { name: "Tailwind.css" },
        { name: "Springboot" },
        { name: "Mysql" },
      ],
    },
  ];

  const services = [
    {
      title: "Frontend development",
      description: "Smooth API Integration.",
      icon: <PiCodeBold className='w-full h-full object-cover object-center  font-thin text-white  '/>,
    },
    {
      title: "Fullstack development",
      description: "Optimized System Architecture.",
      icon: <TbCodeDots className='w-full h-full object-cover object-center  font-thin text-white   '/>,
    },
    {
      title: "Designing",
      description: "UI/UX, Elegant Digital Experiences",
      icon: <SiAltiumdesigner className='w-full h-full object-cover object-center  font-thin  text-white   '/>,
    },
  ];

  const Licenses_and_certification = [
    {
      image: <img src="/images/ibm-crt.svg" className="w-60 h-40 rounded-md" alt="IBM" width={64} height={64} />,
      company: "IBM",
      logo: <img src="/images/ibm_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="IBM" width={64} height={64} />,
      title: "Web Development with HTML, CSS, JavaScript",
      time: "- Jun 2023",
      Skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
      ],
    },
    {
      image: <img src="/images/meta_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="Meta" width={64} height={64} />,
      company: "Meta",
      logo: <img src="/images/infosys_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="Infosys" width={64} height={64} />,

      title: "React Basics",
      time: "- Oct 2023",
      Skills: [
        { name: "React.js" },
      ],
    },
    {
      image: <img src="/images/infosys-crt.svg" className="w-60 h-40 rounded-md" alt="Infosys" width={64} height={64} />,
      company: "Infosys",
      logo: <img src="/images/infosys_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="Infosys" width={64} height={64} />,
      title: "Spring: An Overview of the Spring Framework",
      time: "- Nov 2023",
      Skills: [
        { name: "Spring Framework" },
      ],
    },
    {
      image: <img src="/images/mongodbinc_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="MongoDB" width={64} height={64} />,
      company: "MongoDB",
      logo: <img src="/images/infosys_logo.jpeg" className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="Infosys" width={64} height={64} />,
      title: "MongoDB for SQL Professionals",
      time: "- Jun 2024",
      Skills: [
        { name: "MongoDB" },
      ],
    },
  ];

  return (
    <>
      <div className='text-white '>

        {/* page link */} 
        <div className="fixed  bottom-5 z-20 ">
            <div className="flex justify-end">
                <a
                  href='kkb'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5F85] to-[#FD356E] text-white rounded-xl hover:from-[#FD356E] hover:to-[#FF5F85] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Portfolio link</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </a>
              </div>
        </div>
        {/* intro */}
        <div className="flex-col-1 gap-y-2 flex flex-wrap-reverse justify-between">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-clip-text"> {name || "Soumen Bhunia"}</h1>
            
            <h5 className="py-1 text-[#62626A] text-[1.1rem] pt-4">
           
            <HighlightedHeadline headline= { headline || "I build Web Apps and Designs understanding the user experience." } />
            </h5>
            
             
           
          </div>

          <div className="overflow-hidden w-fit h-fit">
            
            {imageUrl ? <img src={imageUrl} className="w-16 h-16 rounded-md hover:scale-125 transition-scale duration-300" alt="Soumen Bhunia" width={64} height={64} />
                          : <div className=" w-16 h-16  bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-md opacity-60 hover:opacity-100 transition-opacity duration-300 p-2"></div>
                          }
          </div>
        </div>

       { <div className="py-8 text-[#62626A] text-[1.1rem]">
          {description}
        </div> 
         ||
        <div className="py-8 text-[#62626A] text-[1.1rem]">
          <a href="https://github.com/soumen974" className='text-white'>IBM</a> certified web developer, I build user-friendly web apps. <br />
          Check me on <a href="https://github.com/soumen974" className='text-white'>GitHub</a>
        </div>}

        <div className="mx-auto group max-w-7xl">
          <h1 className='text-2xl md:text-4xl flex gap-1 pb-5'>GitHub Contributions
            {/* <KnowMore link={'https://github.com/soumen974'} /> */}
            </h1>
          {/* <GithubStreaks /> */}
        </div>

        {/* recent experience */}
        <div className="pt-5 group">
          <h1 className='text-2xl md:text-4xl flex gap-1'>Recent Experience 
            {/* <KnowMore link={'/experience'} /> */}
            </h1>
            <ExperienceList UseForShow={true}/>
        </div>
        

        {/* projects */}
        <div className="py-5">
          <h1 className='text-2xl md:text-4xl '>Projects</h1>
          <ProjectsList UseForShow={true} />
        </div>
        

        {/* services */}
        <div className="py-5 group">
          <h1 className='text-2xl md:text-4xl flex gap-1 '>Services
            </h1>
          <div className="py-5 grid grid-cols-3 gap-3 md:grid-cols-3  justify-between ">
            {services.map((services) => (
              <div key={services.title} className=" group/service flex justify-center sm:grid max-sm:hover:bg-none   bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500  p-2 md:p-4 rounded-xl">
                <div className=" py-4 h-20 w-20 flex justify-center  group-hover/service:hidden sm:group-hover/service:block">
                  {services.icon}
                </div>
                <h1 className=' text-[0.8rem] sm:text-xl text-white sm:font-bold sm:w-fit sm:group-hover/service:block   hidden group-hover/service:flex items-center justify-center sm:block w-20 '>{services.title}</h1>
                <p className='font-normal text-base text-slate-100 hidden sm:block'>{services.discription} </p>
              </div>
            ))}

            </div>
          </div>

        {/* licenses and certifications */}
        <div className="py-">
          <h1 className='text-2xl md:text-4xl '>Licenses & certifications</h1>
          <LicenceCertificationList UseForShow={true}/>
        </div>

        

        
      </div>
    </>
  );
}

export default Home;

const Icon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const HighlightedHeadline = ({ headline }) => {
  // Split the headline into words
  const words = headline.split(' ');

  // Check if we should apply colors to specific words
  const shouldApplyColors = words.length >= 2 && words.length <= 3;

  return (
    <h5 className="py-1 text-[#62626A] text-[1.1rem] pt-4">
      {words.map((word, index) => {
        // Conditionally style the 2nd and 4th words
        if (shouldApplyColors && (index === 2 || index === 4)) {
          return (
            <span
              key={index}
              className="bg-purple-500 rounded-full text-[.8rem] text-gray-100 px-3 py-[0.15rem]"
            >
              {word}
            </span>
          );
        }

        // For the "Web Apps" and "Designs" terms, apply their specific styles
        if (word === 'Web' || word === 'Apps') {
          return (
            <span
              key={index}
              className="bg-purple-500 rounded-full text-[.8rem] text-gray-100 px-3 py-[0.15rem]"
            >
              {word}
            </span>
          );
        } else if (word === 'Designs') {
          return (
            <span
              key={index}
              className="bg-violet-500 rounded-full px-3 py-[0.15rem] text-[.8rem] text-gray-100"
            >
              {word}
            </span>
          );
        }

        // Render other words normally
        return <span key={index}>{word} </span>;
      })}
    </h5>
  );
};


