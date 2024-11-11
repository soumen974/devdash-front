import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import LicenceCertificationForm from "./LicenceCertificationForm";
// Configure axios defaults
const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true
  });

const LicenceCertificationList = ({UseForShow}) => {
  const [licenceCertifications, setLicenceCertifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editinglicenceCertifications, setEditinglicenceCertifications] = useState(null);

  useEffect(() => {
    
    fetchLicenceCertifications();
  }, []);
  const fetchLicenceCertifications = async () => {
    try {
        const { data } = await api.get('/devs/licence-certification');
        setLicenceCertifications(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
};

  const handleDelete = async (id) => {
    try {
      await api.delete(`/devs/licence-certification/${id}`);
      setLicenceCertifications(licenceCertifications.filter(lnc => lnc._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleRemoveSkill = async (licenceId, skillId) => {
    try {
      const { data } = await api.delete(`/devs/licence-certification/${licenceId}/skill/${skillId}`);
      setLicenceCertifications(prev => 
        prev.map(exp => exp._id === licenceId ? data : exp)
      );
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  return (
    <div className=" max-w-6xl mx-auto">
     {!UseForShow? 
      <div className="flex justify-between items-center mb-4 mt-14">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
             Licence and Certifications
          </h1>
          <p className="text-gray-400">
            Manage and update your profile details
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)} 
          className="px-6 flex items-center py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
          <Plus size={20} /> Add Licence and Certifications
        </button>
      </div>
      :null}

      {showForm && (
        <LicenceCertificationForm 
        licenceCertifications={editinglicenceCertifications}
          onClose={() => {
            setShowForm(false);
            setEditinglicenceCertifications(null);
          }}
          onSubmit={fetchLicenceCertifications}
        />
      )}

      {!UseForShow? 

      /* editable compoent */
      (
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {licenceCertifications.map((lnc) => (
            <div key={lnc._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  {lnc.company_name_logoUrl && (
                    <img 
                      src={lnc.company_name_logoUrl} 
                      alt={lnc.company_name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-xl  font-bold">{lnc.certification_title}</h2>
                    <p className="text-gray-600">{lnc.company_name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                        setEditinglicenceCertifications(lnc);
                      setShowForm(true);
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    onClick={() => handleDelete(lnc._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                 
                  <p className="text-gray-600">{lnc.time}</p>
                </div>
                
               
                {lnc.skills?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {lnc.skills.map((skill) => (
                        <span 
                          key={skill._id}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                        >
                          {skill.name}
                          <button
                            onClick={() => handleRemoveSkill(lnc._id, skill._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      ):

      /* portfoio showing component */

      (
        <div className="py-3 text-gray-100 flex-col-reverse flex">
        {licenceCertifications.map((LnC)=>(
            <div key={LnC.title} className=" py-5 flex shrink-0 gap-5">

              <div className="flex items-center">
                
                <img src={LnC.company_name_logoUrl} className="max-w-min-24 sm:h-24 sm:w-24 max-h-min-24 rounded-md" alt="IBM" width={64} height={64} />
              </div>

              <div className=" grid">
                <h1 className="font-bold truncate ">
                  {LnC.certification_title}
                </h1>

                <h1 className="">
                { LnC.company_name}
                </h1>

                <h1 className='text-gray-100 font-thin text-sm'>
                  {LnC.time} 
                </h1>
                {/* Skills */}

                <div className="w-fit py-2 flex gap-1 overflow-x-hidden">
                  {LnC.skills.map((skill)=>(
                    <h1 key={skill._id} className='bg-green-400 text-black font-bold flex items-center text-[0.6rem] px-2 rounded-full'>
                      {skill.name}
                    </h1>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default LicenceCertificationList;