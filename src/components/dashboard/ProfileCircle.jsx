import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, User, Check, X, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImage, removeProfileImage } from '../../authSlice';

const ProfileCircle = ({ user, onImageUpdate }) => {
  const dispatch = useDispatch();
  const { user: reduxUser } = useSelector(state => state.auth);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showRemoveOption, setShowRemoveOption] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Get the current user (prefer Redux user over prop user)
  const currentUser = reduxUser || user;

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setCurrentImage(savedImage);
      if (currentUser && !currentUser.profileImage) {
        // If we have a saved image but the user object doesn't have it, update Redux
        dispatch(updateProfileImage(savedImage));
      }
    } else if (currentUser?.profileImage) {
      setCurrentImage(currentUser.profileImage);
    }
  }, [currentUser, dispatch]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUploadOptions && !event.target.closest('.upload-modal') && !event.target.closest('[title="Manage Profile Photo"]')) {
        setShowUploadOptions(false);
      }
    };

    if (showUploadOptions) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showUploadOptions]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
    // Clear the input so the same file can be selected again
    event.target.value = '';
  };

  const handleImageUpload = (file) => {
    console.log('Image upload started:', file.name);
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      console.log('Image processed, updating states');
      setPreviewImage(imageData);
      setCurrentImage(imageData);
      
      // Update Redux state with the new image
      dispatch(updateProfileImage(imageData));
      console.log('Redux state updated');
      
      // Also update localStorage for persistence
      localStorage.setItem('profileImage', imageData);
      console.log('localStorage updated');
      
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Call the onImageUpdate callback if provided
      if (onImageUpdate) {
        onImageUpdate(file);
      }
      
      // Auto-close the modal after successful upload
      setShowUploadOptions(false);
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileClick = () => {
    // Show upload options modal when profile is clicked
    console.log('Profile clicked - showing upload options');
    setShowUploadOptions(true);
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const confirmUpload = () => {
    // The image is already saved in handleImageUpload
    // Just close the modal and clear preview
    setShowUploadOptions(false);
    setPreviewImage(null);
  };

  const cancelUpload = () => {
    setPreviewImage(null);
    setShowUploadOptions(false);
  };

  const handleRemoveImage = () => {
    // Remove from Redux state
    dispatch(removeProfileImage());
    
    // Remove from localStorage
    localStorage.removeItem('profileImage');
    
    // Clear all image states
    setPreviewImage(null);
    setCurrentImage(null);
    
    // Hide remove option
    setShowRemoveOption(false);
    
    // Call the onImageUpdate callback if provided
    if (onImageUpdate) {
      onImageUpdate(null);
    }
    
    console.log('Profile image removed');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="relative">
      {/* Profile Circle */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-32 h-32 mx-auto cursor-pointer group"
        onClick={handleProfileClick}
      >
        {/* Main Profile Circle */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-1 shadow-2xl">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : currentImage ? (
              <img
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-4xl font-bold text-white">
                {getInitials(currentUser?.firstname || currentUser?.name)}
              </div>
            )}
          </div>
        </div>

        {/* Camera Icon Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Camera className="w-6 h-6 text-white mb-1" />
          <span className="text-xs text-white font-medium">Click to upload</span>
        </motion.div>

        {/* Upload Status Indicator */}
        {isUploading && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Upload className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        )}

        {/* Success Indicator */}
        {uploadSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Small Image Management Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowUploadOptions(true)}
        className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800 z-10"
        title="Manage Profile Photo"
      >
        <Camera className="w-4 h-4 text-white" />
      </motion.button>

      {/* Upload Options Modal */}
      {showUploadOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[99998] bg-black/20"
            onClick={() => setShowUploadOptions(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="upload-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-700 z-[99999] min-w-[280px] max-w-[320px]"
          >
          <div className="text-center mb-4">
            <h3 className="text-white font-semibold mb-1">Manage Profile Photo</h3>
            <p className="text-gray-400 text-sm">Choose an action for your profile picture</p>
          </div>

          <div className="space-y-3">
            {/* Camera Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCameraCapture}
              className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Take New Photo</div>
                <div className="text-gray-400 text-xs">Use your camera</div>
              </div>
            </motion.button>

            {/* File Upload Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFileUpload}
              className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Change Photo</div>
                <div className="text-gray-400 text-xs">Choose from device</div>
              </div>
            </motion.button>

            {/* Remove Image Option - Only show if there's an existing image */}
            {currentImage && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRemoveImage}
                className="w-full flex items-center gap-3 p-3 bg-red-700/20 hover:bg-red-600/30 rounded-lg transition-colors border border-red-500/30"
              >
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">Remove Photo</div>
                  <div className="text-gray-400 text-xs">Delete from dashboard</div>
                </div>
              </motion.button>
            )}
          </div>

          {/* Preview and Actions */}
          {previewImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t border-gray-700"
            >
              <div className="text-center mb-3">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-400 text-xs">Preview</p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmUpload}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Confirm</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelUpload}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Cancel</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setShowUploadOptions(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          </motion.div>
        </>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* User Info */}
      <div className="text-center mt-4">
        <h3 className="text-white font-semibold text-lg">
          {currentUser?.firstname || currentUser?.name || 'User'}
        </h3>
        <p className="text-gray-400 text-sm">
          {currentUser?.emailId || currentUser?.email || 'user@example.com'}
        </p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
            <User className="w-3 h-3 mr-1" />
            {currentUser?.role || 'Member'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCircle;

