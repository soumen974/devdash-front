import { SiAltiumdesigner } from "react-icons/si";
import { TbCodeDots } from "react-icons/tb";
import { PiCodeBold } from "react-icons/pi";
// import { GlobeDemo } from "../components/GlobeDemo";
// import { IoIosArrowDown } from "react-icons/io";
// import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom'; // If using react-router for navigation

// import { FormtoMail } from "../components/FormtoMail";
import GithubStreaks from "../page/StreaksTable";

const Home = () => {

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
      <div className='text-white'>
        {/* intro */}
        <div className="flex-col-1 gap-y-2 flex flex-wrap-reverse justify-between">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-clip-text">Soumen Bhunia</h1>
            <h5 className="py-1 text-[#62626A] text-[1.1rem] pt-4">
              I build <span className="bg-purple-500 rounded-full text-[.8rem] text-gray-100 px-3 py-[0.15rem]">Web Apps</span> and <span className="bg-violet-500 rounded-full px-3 py-[0.15rem] text-[.8rem] text-gray-100">Designs</span> understanding the user experience.
            </h5>
          </div>

          <div className="overflow-hidden w-fit h-fit">
            <img src="/images/soumenbhunia.svg" className="w-16 h-16 rounded-md hover:scale-125 transition-scale duration-300" alt="Soumen Bhunia" width={64} height={64} />
          </div>
        </div>

        <div className="py-8 text-[#62626A] text-[1.1rem]">
          <a href="https://github.com/soumen974" className='text-white'>IBM</a> certified web developer, I build user-friendly web apps. <br />
          Check me on <a href="https://github.com/soumen974" className='text-white'>GitHub</a>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 md:grid-cols-2 justify-between">
            {recent_experience.map((experience) => (
              <div key={experience.company} className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-800 from-inherit bg-zinc-800/30 sm:grid flex gap-x-5 gap-y-2 mt-4 p-3 w-full rounded-xl sm:rounded-md">
                <div>
                  {experience.image}
                </div>
                <div>
                  <h1>{experience.position}</h1>
                  <h2 className='text-white text-sm font-light'>{experience.company}</h2>
                  <h3 className='text-gray-100 font-thin text-sm'>{experience.time}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* projects */}
        <div className="py-5">
          <h1 className='text-2xl md:text-4xl '>Projects</h1>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2  justify-between   ">
            {projects.map((project)=>(
              <div key={project.title} className=" ">
                <div className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-700 from-inherit bg-zinc-800/30 flex flex-col gap-4 items-start w-fit mx-auto p-4 relative z-0    ">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

                    

                    <div className="grid gap-2">
                        <div className="">
                          <h2></h2>
                          <h1>{project.title}</h1>
                        </div>

                        <h2 className="dark:text-white text-black  text-sm font-light">
                          {project.description}
                        </h2>
                    </div>
                    
                    <div className=" flex flex-wrap gap-2 w-[90%]">
                      {project.Skills.map((skill)=>(
                        <h1 key={skill.name} className=' w-fit text-[0.7rem] border  border-neutral-700 rounded-full   shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  p-1 px-4 items-center justify-center '>{skill.name}</h1>
                      ))}
                    </div>


                </div>

              
              </div>

            ))}
          </div>
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
          <div className="py-3 flex-col-reverse flex">
          {Licenses_and_certification.map((LnC)=>(
              <div key={LnC.title} className=" py-5 flex shrink-0 gap-5">

                <div className="flex items-center">
                  {LnC.logo}
                </div>

                <div className=" grid">
                  <h1 className="font-bold truncate ">
                    {LnC.title}
                  </h1>

                  <h1 className="">
                  { LnC.company}
                  </h1>

                  <h1 className='text-gray-100 font-thin text-sm'>
                    {LnC.time} 
                  </h1>
                  {/* Skills */}

                  <div className="w-fit py-2 flex gap-1 overflow-x-hidden">
                    {LnC.Skills.map((skill)=>(
                      <h1 key={skill.name} className='bg-green-400 text-black font-bold flex items-center text-[0.6rem] px-2 rounded-full'>
                        {skill.name}
                      </h1>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
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



