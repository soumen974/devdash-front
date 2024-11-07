import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, Clock, Loader } from 'lucide-react';

// Custom Alert Component
const Alert = ({ variant = 'default', children }) => {
  const styles = {
    default: 'bg-green-500/10 border-green-500/20 text-green-400',
    destructive: 'bg-red-500/10 border-red-500/20 text-red-400'
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[variant]} animate-fadeIn`}>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
};

const WorkListingCard = ({ listing }) => {
  const formattedDate = new Date(listing.completion_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="backdrop-blur-lg bg-[#1E1E24]/90 rounded-xl border border-[#FD356E]/10 overflow-hidden 
      transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FD356E]/20">
      <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FD356E]/10 rounded-full blur-2xl -mr-12 -mt-12" />
        <h2 className="text-xl font-bold text-white mb-2 relative truncate">{listing.task_name}</h2>
        <div className="flex items-center gap-2 text-gray-400 text-sm relative">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4 min-h-[60px] line-clamp-3">
          {listing.task_description}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Due: {new Date(listing.completion_time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>
    </div>
  );
};

const WorkListings = () => {
  const [workListings, setWorkListings] = useState([]);
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkListings = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/work/workListings`, {
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch work listings');
        }

        setWorkListings(data.workListings);
      } catch (error) {
        setStatus({
          type: 'error',
          message: error.message || 'Error fetching work listings'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkListings();
  }, []);

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        

        <div className=" mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
           Your Work Listings          </h1>
          <p className="text-gray-400">
           Manage and track your assigned tasks
          </p>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className="mb-6">
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <span className="ml-2">{status.message}</span>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-8 w-8 text-[#FD356E] animate-spin" />
              <p className="text-gray-400">Loading work listings...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {!status.type && workListings.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="bg-[#2A2A32] rounded-full p-4 mb-4">
                  <Calendar className="h-8 w-8 text-[#FD356E]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Work Listings Found</h3>
                <p className="text-gray-400 max-w-md">
                  Create your first work listing to get started tracking your tasks and deadlines.
                </p>
              </div>
            )}

            {/* Listings Grid */}
            {workListings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workListings.map((listing, index) => (
                  <WorkListingCard key={listing.id || index} listing={listing} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkListings;