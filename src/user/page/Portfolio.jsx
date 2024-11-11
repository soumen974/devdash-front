import React from 'react'
import PortfolioBody from "../components/PortfolioBody";
import ExperienceList from "../components/ExperienceList";
import ProjectsList from "../components/ProjectsList";
import LicenceCertificationList from "../components/LicenceCertificationList";
import LicenceCertificationForm from "../components/LicenceCertificationForm";
import Footer from "../components/Footerinportfolio";

export default function Portfolio() {
  return (
    < >
     <div className="relative mx-auto max-w-screen  px-2  ">
        <div className="absolute -z-10 inset-x-0 -inset-y-[4rem] ">
        </div>
        <div className="mx-auto max-w-4xl pt-7 p-2 md:p-5  bg-red-00 ">
          <div className="max-w-2xl mx-auto mt-20 z-0  ">
           
            <PortfolioBody/>
            <ExperienceList UseForShow={true}/>
            <ProjectsList UseForShow={true} />
            <LicenceCertificationList UseForShow={true}/>
            {/* <LicenceCertificationForm/> */}

              <div className="">
                <Footer/>
              </div>
          </div>
          
        </div>
      </div>
    
    </>
  )
}
