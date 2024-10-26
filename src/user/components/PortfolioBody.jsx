// import { SiAltiumdesigner } from "react-icons/si";
// import { TbCodeDots } from "react-icons/tb";
// import { PiCodeBold } from "react-icons/pi";
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
      icon: "PiCodeBold",
    },
    {
      title: "Fullstack development",
      description: "Optimized System Architecture.",
      icon: "TbCodeDots",
    },
    {
      title: "Designing",
      description: "UI/UX, Elegant Digital Experiences",
      icon: "SiAltiumdesigner" ,
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
      title: "MongoDB for SQL Professionals",
      time: "- Jun 2024",
      Skills: [
        { name: "MongoDB" },
      ],
    },
  ];

  return (
    <>
      <div>
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
          <h1 className='text-2xl md:text-4xl'>Projects</h1>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2 justify-between">
            {projects.map((project) => (
              <div key={project.title} className="">
                <div className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-700 from-inherit bg-zinc-800/30 flex flex-col gap-4 items-start w-fit mx-auto p-4 relative z-0">
                  <div className="grid gap-2">
                    <h2>{project.title}</h2>
                    <h2 className="dark:text-white text-black font-thin">
                      {project.description}
                    </h2>
                    <div className="py-3">
                      <h2 className="dark:text-white text-black">Skills</h2>
                      <div className="text-white text-xs flex flex-wrap gap-2 pt-1">
                        {project.Skills.map((skill) => (
                          <span key={skill.name} className="bg-neutral-900 border border-neutral-800 py-1.5 px-2.5 rounded-full dark:bg-gray-100 dark:text-neutral-900 text-white">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center mx-auto items-center pt-2'>
                    {/* <MdOutlineArrowOutward className='hover:animate-spin text-center w-fit text-gray-100 h-8 w-8' /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* services */}
        <div className="py-5">
          <h1 className='text-2xl md:text-4xl'>Services</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-between py-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white/10 border border-neutral-800/30 py-6 px-8 rounded-2xl">
                <div className='p-2 flex justify-center w-full h-full text-neutral-900 bg-neutral-100 rounded-xl dark:text-white dark:bg-neutral-900'>
                  {service.icon}
                </div>
                <div className="pt-4">
                  <h1 className='text-2xl md:text-3xl'>{service.title}</h1>
                  <h2 className="text-sm font-light pt-2 text-neutral-500">
                    {service.description}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* licenses and certifications */}
        <div className="py-5">
          <h1 className='text-2xl md:text-4xl'>Licenses & Certification</h1>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-between">
            {Licenses_and_certification.map((license) => (
              <div key={license.company} className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-700 from-inherit bg-zinc-800/30 flex flex-col gap-4 items-start w-fit mx-auto p-4 relative z-0">
                <div className="grid gap-2">
                  <div className="overflow-hidden w-full h-full flex justify-center items-center">
                    {license.image}
                  </div>
                  <div className="flex gap-x-2">
                    {license.logo}
                    <div className="py-1">
                      <h2 className='text-white'>{license.title}</h2>
                      <h2 className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                        {license.company}
                      </h2>
                      <h3 className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                        {license.time}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-3">
                    <h2 className="text-sm font-light text-neutral-500 dark:text-neutral-400">Skills</h2>
                    <div className="text-xs flex flex-wrap gap-2 pt-1">
                      {license.Skills.map((skill) => (
                        <span key={skill.name} className="bg-neutral-900 border border-neutral-800 py-1.5 px-2.5 rounded-full dark:bg-gray-100 dark:text-neutral-900 text-white">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex justify-center mx-auto items-center pt-2'>
                  {/* <MdOutlineArrowOutward className='hover:animate-spin text-center w-fit text-gray-100 h-8 w-8' /> */}
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
