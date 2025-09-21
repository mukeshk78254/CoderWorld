import React from 'react';
import { useSelector } from 'react-redux';

const ProfileImageTest = () => {
  const { user } = useSelector(state => state.auth);
  const savedImage = localStorage.getItem('profileImage');

  return (
    <div className="p-4 bg-gray-800 rounded-lg m-4">
      <h3 className="text-white text-lg mb-4">Profile Image Test</h3>
      
      <div className="space-y-2 text-sm">
        <div className="text-gray-300">
          <strong>Redux User Profile Image:</strong> 
          <span className="ml-2 text-cyan-400">
            {user?.profileImage ? '✅ Has Image' : '❌ No Image'}
          </span>
        </div>
        
        <div className="text-gray-300">
          <strong>localStorage Profile Image:</strong> 
          <span className="ml-2 text-cyan-400">
            {savedImage ? '✅ Has Image' : '❌ No Image'}
          </span>
        </div>
        
        <div className="text-gray-300">
          <strong>User ID:</strong> 
          <span className="ml-2 text-cyan-400">{user?.id || 'No ID'}</span>
        </div>
        
        <div className="text-gray-300">
          <strong>User Name:</strong> 
          <span className="ml-2 text-cyan-400">{user?.firstname || user?.name || 'No Name'}</span>
        </div>
      </div>
      
      {savedImage && (
        <div className="mt-4">
          <p className="text-gray-300 text-sm mb-2">Saved Image Preview:</p>
          <img 
            src={savedImage} 
            alt="Saved Profile" 
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageTest;

