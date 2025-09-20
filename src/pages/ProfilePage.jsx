// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { NavLink, Navigate } from 'react-router-dom';
// // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // import axiosClient from '../utils/axiosClient'; // Assuming this is your configured Axios instance
// // // // // // import { logoutUser } from '../authSlice'; // To handle logout from navbar

// // // // // // // Helper function to capitalize first letter of each word
// // // // // // const capitalizeWords = (str) => {
// // // // // //     if (typeof str !== 'string' || !str) return '';
// // // // // //     return str
// // // // // //         .split(' ')
// // // // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // // // //         .join(' ');
// // // // // // };

// // // // // // function ProfilePage() {
// // // // // //     const dispatch = useDispatch();
// // // // // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // // // // //     const [profileData, setProfileData] = useState(null);
// // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // //     const [activeTab, setActiveTab] = useState('basicInfo'); // 'basicInfo', 'account', 'privacy', 'notifications'
    
// // // // // //     // State for managing editable fields:
// // // // // //     // `editingField` holds the path to the field being edited (e.g., 'firstname', 'profile.location')
// // // // // //     const [editingField, setEditingField] = useState(null); 
// // // // // //     // `tempValue` holds the current value in the input field during editing
// // // // // //     const [tempValue, setTempValue] = useState(''); 

// // // // // //     // Handler for editing any field
// // // // // //     const handleEditClick = (fieldPath, currentValue) => {
// // // // // //         setEditingField(fieldPath);
// // // // // //         // Ensure tempValue is a string, handle null/undefined
// // // // // //         setTempValue(currentValue === null || currentValue === undefined ? '' : currentValue); 
// // // // // //     };

// // // // // //     const handleSaveClick = async (fieldPath) => {
// // // // // //         try {
// // // // // //             // Special handling for Gender: Map 'Not provided' back to empty string for backend enum
// // // // // //             let valueToSave = tempValue;
// // // // // //             if (fieldPath === 'profile.gender') {
// // // // // //                 valueToSave = tempValue === 'Not provided' ? '' : tempValue;
// // // // // //             } else if (fieldPath === 'profile.birthday') {
// // // // // //                 // Ensure birthday is saved as a Date object if the backend expects it
// // // // // //                 valueToSave = tempValue ? new Date(tempValue) : null;
// // // // // //             }

// // // // // //             const res = await axiosClient.put('/api/profile/field', {
// // // // // //                 field: fieldPath,
// // // // // //                 value: valueToSave
// // // // // //             });
// // // // // //             // Update local state with the new user data from response
// // // // // //             setProfileData(res.data.user); 
// // // // // //             setEditingField(null); // Exit editing mode
// // // // // //             setTempValue('');
// // // // // //         } catch (err) {
// // // // // //             console.error('Error updating field:', fieldPath, err);
// // // // // //             alert(`Failed to update ${fieldPath.split('.').pop()}: ${err.response?.data?.message || err.message}`);
// // // // // //         }
// // // // // //     };

// // // // // //     const handleCancelClick = () => {
// // // // // //         setEditingField(null);
// // // // // //         setTempValue('');
// // // // // //     };

// // // // // //     // Helper to render an editable input or text for basic info fields
// // // // // //     const renderEditableField = (fieldPath, displayValue, inputType = 'text', options = []) => {
// // // // // //         const isEditing = editingField === fieldPath;

// // // // // //         return (
// // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // //                 <span className="text-gray-400 text-md min-w-[120px]">{capitalizeWords(fieldPath.split('.').pop().replace(/([A-Z])/g, ' $1').trim())}</span>
// // // // // //                 <div className="flex-1 w-full max-w-lg flex flex-col items-start md:items-center md:flex-row gap-2">
// // // // // //                     {isEditing ? (
// // // // // //                         inputType === 'textarea' ? (
// // // // // //                             <textarea
// // // // // //                                 className="textarea textarea-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow"
// // // // // //                                 value={tempValue}
// // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // //                                 rows="3"
// // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // //                             ></textarea>
// // // // // //                         ) : inputType === 'select' ? (
// // // // // //                             <select
// // // // // //                                 className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full max-w-[200px]"
// // // // // //                                 value={tempValue}
// // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // //                             >
// // // // // //                                 {options.map((opt) => (
// // // // // //                                     <option key={opt} value={opt}>{opt}</option>
// // // // // //                                 ))}
// // // // // //                             </select>
// // // // // //                         ) : (
// // // // // //                             <input
// // // // // //                                 type={inputType}
// // // // // //                                 className="input input-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow"
// // // // // //                                 value={tempValue}
// // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // //                             />
// // // // // //                         )
// // // // // //                     ) : (
// // // // // //                         <span className="text-gray-300 flex-grow py-2">{displayValue || 'Not provided'}</span>
// // // // // //                     )}
// // // // // //                     <div className="flex gap-2 mt-2 md:mt-0">
// // // // // //                         {isEditing ? (
// // // // // //                             <>
// // // // // //                                 <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handleSaveClick(fieldPath)}>Save</button>
// // // // // //                                 <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={handleCancelClick}>Cancel</button>
// // // // // //                             </>
// // // // // //                         ) : (
// // // // // //                             <button
// // // // // //                                 className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700"
// // // // // //                                 onClick={() => handleEditClick(fieldPath, displayValue === 'Not provided' ? '' : displayValue)}
// // // // // //                             >
// // // // // //                                 Edit
// // // // // //                             </button>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         );
// // // // // //     };


// // // // // //     // Fetch user profile data on component mount
// // // // // //     useEffect(() => {
// // // // // //         const fetchProfileData = async () => {
// // // // // //             try {
// // // // // //                 setPageLoading(true);
// // // // // //                 const res = await axiosClient.get('/api/profile');
// // // // // //                 setProfileData(res.data);
// // // // // //                 // Initialize notification and privacy settings for their respective tabs
// // // // // //                 // Ensure default structure if settings or sub-objects are missing
// // // // // //                 setNotificationSettings(res.data.settings?.notifications || {
// // // // // //                     importantAnnouncements: { email: true, site: false },
// // // // // //                     featureAnnouncements: { email: true, site: false },
// // // // // //                     awardNotification: { email: true, site: true },
// // // // // //                     globalRanking: { email: false, site: true },
// // // // // //                     contestBadge: { email: false, site: true },
// // // // // //                     contestAnnouncements: { email: true, site: true },
// // // // // //                     newComment: { email: false, site: true },
// // // // // //                     otherNotifications: { email: true, site: false },
// // // // // //                     promotions: { email: true, site: false },
// // // // // //                     weeklyRecommendations: { email: true, site: false },
// // // // // //                 });
// // // // // //                 setPrivacySettings(res.data.settings?.privacy || {
// // // // // //                     contactByCompanies: true,
// // // // // //                     joinStudyPlanLeaderboard: true,
// // // // // //                     displaySubmissionHistory: true,
// // // // // //                 });
// // // // // //             } catch (err) {
// // // // // //                 console.error('Error fetching profile data:', err);
// // // // // //                 alert('Failed to load profile data. Please try again.');
// // // // // //             } finally {
// // // // // //                 setPageLoading(false);
// // // // // //             }
// // // // // //         };

// // // // // //         if (isAuthenticated && !authLoading) {
// // // // // //             fetchProfileData();
// // // // // //         }

// // // // // //     }, [isAuthenticated, authLoading]);

// // // // // //     // Notification settings state and handler
// // // // // //     const [notificationSettings, setNotificationSettings] = useState({});
// // // // // //     const handleNotificationChange = async (setting, type, checked) => {
// // // // // //         try {
// // // // // //             const res = await axiosClient.put('/api/profile/settings/notifications', {
// // // // // //                 setting,
// // // // // //                 type,
// // // // // //                 value: checked
// // // // // //             });
// // // // // //             // Update the specific setting in the state based on backend response
// // // // // //             setNotificationSettings(prev => ({
// // // // // //                 ...prev,
// // // // // //                 [setting]: {
// // // // // //                     ...prev[setting],
// // // // // //                     [type]: checked
// // // // // //                 }
// // // // // //             }));
// // // // // //         } catch (err) {
// // // // // //             console.error('Error updating notification setting:', err);
// // // // // //             alert('Failed to update notification setting.');
// // // // // //         }
// // // // // //     };

// // // // // //     // Privacy settings state and handler
// // // // // //     const [privacySettings, setPrivacySettings] = useState({});
// // // // // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null); // Tracks which privacy field is being edited
// // // // // //     const handlePrivacyChange = async (field, value) => {
// // // // // //         try {
// // // // // //             const booleanValue = value === 'Yes'; // Convert 'Yes'/'No' to boolean
// // // // // //             const res = await axiosClient.put('/api/profile/settings/privacy', {
// // // // // //                 field,
// // // // // //                 value: booleanValue
// // // // // //             });
// // // // // //             setPrivacySettings(prev => ({
// // // // // //                 ...prev,
// // // // // //                 [field]: booleanValue
// // // // // //             }));
// // // // // //             setEditingPrivacyField(null); // Exit editing mode for this field
// // // // // //             setTempValue(''); // Clear temp value
// // // // // //         } catch (err) {
// // // // // //             console.error('Error updating privacy setting:', err);
// // // // // //             alert('Failed to update privacy setting.');
// // // // // //         }
// // // // // //     };

// // // // // //     // Render functions for different tabs
// // // // // //     const renderAccountInfo = () => {
// // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // //         return (
// // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // // // // //                 <div className="space-y-6">
// // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // //                         <div className="flex-1">
// // // // // //                             <p className="text-gray-400 text-sm mb-1"> ID</p>
// // // // // //                             {/* Derive a LeetCode-like ID from user data */}
// // // // // //                             <p className="text-white text-lg">{profileData.firstname.toLowerCase() + profileData._id.slice(0, 5)}</p>
// // // // // //                         </div>
// // // // // //                         {/* Edit button for LeetCode ID is static as it's often not truly editable username */}
// // // // // //                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // // // // //                     </div>

// // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // //                         <div className="flex-1">
// // // // // //                             <p className="text-gray-400 text-sm mb-1">Email</p>
// // // // // //                             <p className="text-white text-lg">{profileData.emailId} <span className="badge badge-success bg-emerald-500 text-white border-transparent ml-2">Primary</span></p>
// // // // // //                         </div>
// // // // // //                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button> {/* Email typically not editable this way */}
// // // // // //                     </div>

// // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // // // // //                         <div className="flex-1">
// // // // // //                             <p className="text-gray-400 text-sm mb-1">Password</p>
// // // // // //                             <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Account</h3>
// // // // // //                 <div className="space-y-4">
// // // // // //                     {/* These are static as per the requirement; full OAuth integration is outside scope */}
// // // // // //                     {['LinkedIn', 'Google', 'Github', 'Facebook'].map(platform => (
// // // // // //                         <div key={platform} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // //                             <div className="flex items-center">
// // // // // //                                 {/* Simple text as placeholder for icons */}
// // // // // //                                 <span className={`mr-3 text-2xl font-bold ${platform === 'LinkedIn' ? 'text-blue-500' : platform === 'Google' ? 'text-red-500' : platform === 'Github' ? 'text-gray-400' : 'text-blue-600'}`}>
// // // // // //                                     {platform === 'LinkedIn' && 'in'}
// // // // // //                                     {platform === 'Google' && 'G'}
// // // // // //                                     {platform === 'Github' && 'Gh'}
// // // // // //                                     {platform === 'Facebook' && 'f'}
// // // // // //                                 </span>
// // // // // //                                 <p className="text-white text-lg">{platform}</p>
// // // // // //                             </div>
// // // // // //                             <div className="flex items-center gap-4">
// // // // // //                                 <span className="text-gray-400">Not Connected</span>
// // // // // //                                 <span className="text-green-400">+10</span> {/* Static points display */}
// // // // // //                                 <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                 </div>

// // // // // //                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">
// // // // // //                     Delete Account
// // // // // //                 </button>
// // // // // //             </div>
// // // // // //         );
// // // // // //     };

// // // // // //     const renderPrivacySettings = () => {
// // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // //         const privacyFields = [
// // // // // //             {
// // // // // //                 field: 'contactByCompanies',
// // // // // //                 label: 'Can companies contact you with job opportunities?',
// // // // // //                 description: 'We will only send your contact information to interested partner companies to connect you with job opportunities. We respect your privacy and will never give or sell your personal information to third parties without your explicit consent.',
// // // // // //                 currentValue: privacySettings.contactByCompanies
// // // // // //             },
// // // // // //             {
// // // // // //                 field: 'joinStudyPlanLeaderboard',
// // // // // //                 label: 'Join study plan leaderboard',
// // // // // //                 description: 'Will no longer join the leaderboard after turning off, the changes will be applied at the start of each week.',
// // // // // //                 currentValue: privacySettings.joinStudyPlanLeaderboard
// // // // // //             },
// // // // // //             {
// // // // // //                 field: 'displaySubmissionHistory',
// // // // // //                 label: 'Display my submission history',
// // // // // //                 description: 'After closing, your submission history data and information will not be displayed on your profile page to others.',
// // // // // //                 currentValue: privacySettings.displaySubmissionHistory
// // // // // //             }
// // // // // //         ];

// // // // // //         return (
// // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // // // // //                 <div className="space-y-8">
// // // // // //                     {privacyFields.map(({ field, label, description, currentValue }) => (
// // // // // //                         <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // //                             <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // // // // //                                 <p className="text-white text-lg font-medium">{label}</p>
// // // // // //                                 <p className="text-gray-400 text-sm mt-1">{description}</p>
// // // // // //                             </div>
// // // // // //                             <div className="flex items-center gap-2">
// // // // // //                                 {editingPrivacyField === field ? (
// // // // // //                                     <>
// // // // // //                                         <select
// // // // // //                                             className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
// // // // // //                                             value={tempValue}
// // // // // //                                             onChange={(e) => setTempValue(e.target.value)}
// // // // // //                                         >
// // // // // //                                             <option value="Yes">Yes</option>
// // // // // //                                             <option value="No">No</option>
// // // // // //                                         </select>
// // // // // //                                         <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handlePrivacyChange(field, tempValue)}>Save</button>
// // // // // //                                         <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(null); setTempValue(''); }}>Cancel</button>
// // // // // //                                     </>
// // // // // //                                 ) : (
// // // // // //                                     <>
// // // // // //                                         <span className="text-gray-300 font-semibold">{currentValue ? 'Yes' : 'No'}</span>
// // // // // //                                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(field); setTempValue(currentValue ? 'Yes' : 'No'); }}>Edit</button>
// // // // // //                                     </>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         );
// // // // // //     };

// // // // // //     const renderNotificationSettings = () => {
// // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // //         const notificationCategories = {
// // // // // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // // // // //             Award: ['awardNotification'],
// // // // // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // // // // //             Discuss: ['newComment'],
// // // // // //             Other: ['otherNotifications'],
// // // // // //             Promotions: ['promotions'],
// // // // // //             'Weekly Email': ['weeklyRecommendations']
// // // // // //         };

// // // // // //         const renderCheckboxRow = (settingKey, label) => (
// // // // // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // // // // //                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
// // // // // //                 <td className="py-3 px-4 text-center">
// // // // // //                     <input
// // // // // //                         type="checkbox"
// // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // //                         checked={notificationSettings[settingKey]?.email || false}
// // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // // // // //                     />
// // // // // //                 </td>
// // // // // //                 <td className="py-3 px-4 text-center">
// // // // // //                     <input
// // // // // //                         type="checkbox"
// // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // //                         checked={notificationSettings[settingKey]?.site || false}
// // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // // // // //                     />
// // // // // //                 </td>
// // // // // //             </tr>
// // // // // //         );

// // // // // //         return (
// // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // // // // //                 <div className="overflow-x-auto">
// // // // // //                     <table className="table w-full text-slate-200">
// // // // // //                         <thead>
// // // // // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
// // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
// // // // // //                             </tr>
// // // // // //                         </thead>
// // // // // //                         <tbody>
// // // // // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // // // // //                                 <React.Fragment key={category}>
// // // // // //                                     <tr>
// // // // // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // // // // //                                     </tr>
// // // // // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
// // // // // //                                 </React.Fragment>
// // // // // //                             ))}
// // // // // //                         </tbody>
// // // // // //                     </table>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         );
// // // // // //     };


// // // // // //     if (authLoading || pageLoading || !profileData) {
// // // // // //         return (
// // // // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // // // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // // // // //             </div>
// // // // // //         );
// // // // // //     }

// // // // // //     if (!isAuthenticated) {
// // // // // //         // This should primarily be handled by App.js's route protection
// // // // // //         return <Navigate to="/login" />;
// // // // // //     }

// // // // // //     // Determine the user's display name for the header (e.g., LeetCode ID style)
// // // // // //     const displayLeetcodeId = user?.firstname ? user.firstname.toLowerCase() + user.id.slice(0, 5) : 'unknownid12345';


// // // // // //     return (
// // // // // //         <div className="min-h-screen bg-slate-950 text-slate-200 font-sans"
// // // // // //             style={{
// // // // // //                 backgroundImage: `
// // // // // //                     radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // // //                     radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // // //                     radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // // //                     radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // // //                 `,
// // // // // //                 backgroundAttachment: 'fixed',
// // // // // //             }}>
// // // // // //             {/* Inline styles for custom animations */}
// // // // // //             <style>
// // // // // //                 {`
// // // // // //                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // // // //                 .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
// // // // // //                 @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // //                 .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
// // // // // //                 @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // //                 .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
// // // // // //                 .loading-spinner { animation: spin 0.8s linear infinite; }
// // // // // //                 @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// // // // // //                 `}
// // // // // //             </style>

// // // // // //             {/* Navbar (reusing from Homepage for consistency, simplified) */}
// // // // // //             <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // // //                 <div className="flex-1">
// // // // // //                     <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // //                         style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // // //                         CoderWorld<span className="text-xl opacity-70">.dev</span>
// // // // // //                     </NavLink>
// // // // // //                 </div>
// // // // // //                 <div className="flex-none">
// // // // // //                     <div className="dropdown dropdown-end ml-4">
// // // // // //                         <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // // //                             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
// // // // // //                                 style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}>
// // // // // //                                 <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                         <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // // //                             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // // // //                             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // // // //                             <div className="divider my-1 h-px bg-gray-700" />
// // // // // //                             <li><button onClick={() => dispatch(logoutUser())} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // // // //                         </ul>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </nav>

// // // // // //             {/* Main Profile Content Area */}
// // // // // //             <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
// // // // // //                 {/* Left Sidebar */}
// // // // // //                 <div className="w-full lg:w-1/4 bg-gray-900/50 rounded-2xl shadow-lg border border-gray-700 p-6 flex flex-col items-center sticky top-28 h-fit animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // // //                     <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-5xl text-gray-400 border-4 border-indigo-500 mb-4">
// // // // // //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
// // // // // //                             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // // // // //                         </svg>
// // // // // //                     </div>
// // // // // //                     <h2 className="text-2xl font-bold text-white mb-1">{profileData?.firstname || 'Guest User'}</h2>
// // // // // //                     <p className="text-gray-400 text-sm mb-6"> ID: <span className="text-indigo-400">{displayLeetcodeId}</span></p>

// // // // // //                     {/* Navigation Links */}
// // // // // //                     <ul className="menu w-full space-y-2">
// // // // // //                         <li>
// // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'basicInfo' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // //                                 onClick={() => setActiveTab('basicInfo')}>
// // // // // //                                 Basic Info
// // // // // //                             </button>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'account' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // //                                 onClick={() => setActiveTab('account')}>
// // // // // //                                 Account
// // // // // //                             </button>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // //                                 onClick={() => setActiveTab('privacy')}>
// // // // // //                                 Privacy
// // // // // //                             </button>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // //                                 onClick={() => setActiveTab('notifications')}>
// // // // // //                                 Notifications
// // // // // //                             </button>
// // // // // //                         </li>
// // // // // //                         {/* Other static menu items as per screenshot */}
// // // // // //                         <li>
// // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // //                                 Points
// // // // // //                             </a>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // //                                 Lab
// // // // // //                             </a>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // //                                 Billing <span className="badge badge-sm badge-info text-blue-200 bg-blue-700/50 border-blue-600/50 ml-auto">New</span>
// // // // // //                             </a>
// // // // // //                         </li>
// // // // // //                         <li>
// // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // //                                 Orders <span className="badge badge-sm badge-warning text-yellow-200 bg-yellow-700/50 border-yellow-600/50 ml-auto">Beta</span>
// // // // // //                             </a>
// // // // // //                         </li>
// // // // // //                     </ul>
// // // // // //                 </div>

// // // // // //                 {/* Right Content Area (Dynamically rendered based on activeTab) */}
// // // // // //                 <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // // //                     {activeTab === 'basicInfo' && (
// // // // // //                         <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
// // // // // //                             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // // // // //                             <div className="space-y-6">
// // // // // //                                 {/* Name */}
// // // // // //                                 {renderEditableField('firstname', profileData.firstname)}

// // // // // //                                 {/* Gender */}
// // // // // //                                 {renderEditableField('profile.gender', profileData.profile?.gender || 'Not provided', 'select', ['Not provided', 'Male', 'Female', 'Other'])}

// // // // // //                                 {/* Location */}
// // // // // //                                 {renderEditableField('profile.location', profileData.profile?.location)}

// // // // // //                                 {/* Birthday */}
// // // // // //                                 {renderEditableField('profile.birthday', profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : '', 'date')}

// // // // // //                                 {/* Summary */}
// // // // // //                                 {renderEditableField('profile.summary', profileData.profile?.summary, 'textarea')}

// // // // // //                                 {/* Website */}
// // // // // //                                 {renderEditableField('profile.website', profileData.profile?.website)}

// // // // // //                                 {/* Github */}
// // // // // //                                 {renderEditableField('profile.github', profileData.profile?.github)}

// // // // // //                                 {/* LinkedIn */}
// // // // // //                                 {renderEditableField('profile.linkedin', profileData.profile?.linkedin)}

// // // // // //                                 {/* X (formerly Twitter) */}
// // // // // //                                 {renderEditableField('profile.twitter', profileData.profile?.twitter)}

// // // // // //                                 {/* Experience */}
// // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// // // // // //                                 {renderEditableField('profile.work', profileData.profile?.work)}
// // // // // //                                 {renderEditableField('profile.education', profileData.profile?.education)}

// // // // // //                                 {/* Skills */}
// // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// // // // // //                                 {renderEditableField('profile.skills', profileData.profile?.skills)}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     )}

// // // // // //                     {activeTab === 'account' && renderAccountInfo()}
// // // // // //                     {activeTab === 'privacy' && renderPrivacySettings()}
// // // // // //                     {activeTab === 'notifications' && renderNotificationSettings()}

// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // export default ProfilePage;

// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import { NavLink, useNavigate } from 'react-router-dom';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // import { logoutUser } from '../authSlice';
// // // // // // // import toast from 'react-hot-toast'; // For notifications
// // // // // // // import ChangePasswordModal from '../components/ChangePasswordModal'; // NEW: Import the modal


// // // // // // // // Helper function to capitalize first letter of each word (and handle camelCase)
// // // // // // // const capitalizeWords = (str) => {
// // // // // // //     if (typeof str !== 'string' || !str) return '';
// // // // // // //     return str
// // // // // // //         .replace(/([A-Z])/g, ' $1') // Add space before capital letters
// // // // // // //         .split(' ')
// // // // // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // // // // //         .join(' ');
// // // // // // // };

// // // // // // // function ProfilePage() {
// // // // // // //     const dispatch = useDispatch();
// // // // // // //     const navigate = useNavigate();
// // // // // // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // // // // // //     const [profileData, setProfileData] = useState(null);
// // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // //     const [activeTab, setActiveTab] = useState('basicInfo'); // 'basicInfo', 'account', 'privacy', 'notifications'

// // // // // // //     // State for managing editable fields (Basic Info, Experience, Skills)
// // // // // // //     const [editingField, setEditingField] = useState(null);
// // // // // // //     const [tempValue, setTempValue] = useState('');

// // // // // // //     // State for managing settings (Privacy, Notifications)
// // // // // // //     const [notificationSettings, setNotificationSettings] = useState({});
// // // // // // //     const [privacySettings, setPrivacySettings] = useState({});
// // // // // // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null);

// // // // // // //     // Modals state
// // // // // // //     const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
// // // // // // //     const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);

// // // // // // //     // Fetch user profile data on component mount
// // // // // // //     const fetchProfileData = useCallback(async () => {
// // // // // // //         try {
// // // // // // //             setPageLoading(true);
// // // // // // //             const res = await axiosClient.get('/api/profile');
// // // // // // //             setProfileData(res.data);
            
// // // // // // //             // Initialize notification and privacy settings with fetched data or sensible defaults
// // // // // // //             setNotificationSettings(res.data.settings?.notifications || {
// // // // // // //                 importantAnnouncements: { email: true, site: false },
// // // // // // //                 featureAnnouncements: { email: true, site: false },
// // // // // // //                 awardNotification: { email: true, site: true },
// // // // // // //                 globalRanking: { email: false, site: true },
// // // // // // //                 contestBadge: { email: false, site: true },
// // // // // // //                 contestAnnouncements: { email: true, site: true },
// // // // // // //                 newComment: { email: false, site: true },
// // // // // // //                 otherNotifications: { email: true, site: false },
// // // // // // //                 promotions: { email: true, site: false },
// // // // // // //                 weeklyRecommendations: { email: true, site: false },
// // // // // // //             });
// // // // // // //             setPrivacySettings(res.data.settings?.privacy || {
// // // // // // //                 contactByCompanies: true,
// // // // // // //                 joinStudyPlanLeaderboard: true,
// // // // // // //                 displaySubmissionHistory: true,
// // // // // // //             });
// // // // // // //             toast.success('Profile data loaded.');
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error fetching profile data:', err);
// // // // // // //             toast.error(`Failed to load profile: ${err.response?.data?.message || err.message}`);
// // // // // // //             // If fetching fails, especially due to auth, redirect to login
// // // // // // //             if (err.response?.status === 401 || err.response?.status === 403) {
// // // // // // //                 dispatch(logoutUser());
// // // // // // //                 navigate('/login');
// // // // // // //             }
// // // // // // //         } finally {
// // // // // // //             setPageLoading(false);
// // // // // // //         }
// // // // // // //     }, [dispatch, navigate]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (isAuthenticated && !authLoading) {
// // // // // // //             fetchProfileData();
// // // // // // //         }
// // // // // // //     }, [isAuthenticated, authLoading, fetchProfileData]);

// // // // // // //     // Handle editing any profile field (Basic Info, Experience, Skills)
// // // // // // //     const handleEditClick = (fieldPath, currentValue) => {
// // // // // // //         setEditingField(fieldPath);
// // // // // // //         // Ensure tempValue is a string, handle null/undefined/Date objects for input fields
// // // // // // //         if (fieldPath === 'profile.birthday' && currentValue) {
// // // // // // //             setTempValue(new Date(currentValue).toISOString().split('T')[0]);
// // // // // // //         } else {
// // // // // // //             setTempValue(currentValue === null || currentValue === undefined ? '' : String(currentValue));
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleSaveClick = async (fieldPath) => {
// // // // // // //         try {
// // // // // // //             let valueToSave = tempValue;
// // // // // // //             // Special handling for Gender: Map 'Not provided' back to empty string for backend enum
// // // // // // //             if (fieldPath === 'profile.gender') {
// // // // // // //                 valueToSave = tempValue === 'Not provided' ? '' : tempValue;
// // // // // // //             } else if (fieldPath === 'profile.birthday') {
// // // // // // //                 // Ensure birthday is saved as a Date object or null if empty
// // // // // // //                 valueToSave = tempValue ? new Date(tempValue) : null;
// // // // // // //             } else if (fieldPath === 'profile.skills') {
// // // // // // //                 // Assuming skills is a comma-separated string that should be stored as such
// // // // // // //                 // If it needs to be an array on backend, you'd convert here: valueToSave = tempValue.split(',').map(s => s.trim());
// // // // // // //             }

// // // // // // //             const res = await axiosClient.put('/api/profile/field', {
// // // // // // //                 field: fieldPath,
// // // // // // //                 value: valueToSave
// // // // // // //             });
// // // // // // //             // Update local state with the new user data from response
// // // // // // //             setProfileData(res.data.user);
// // // // // // //             setEditingField(null); // Exit editing mode
// // // // // // //             setTempValue('');
// // // // // // //             toast.success(`Updated ${capitalizeWords(fieldPath.split('.').pop())}!`);
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating field:', fieldPath, err);
// // // // // // //             toast.error(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleCancelClick = () => {
// // // // // // //         setEditingField(null);
// // // // // // //         setTempValue('');
// // // // // // //     };

// // // // // // //     // Helper to render an editable input or text for basic info fields
// // // // // // //     const renderEditableField = (fieldPath, displayValue, inputType = 'text', options = []) => {
// // // // // // //         const isEditing = editingField === fieldPath;
// // // // // // //         const actualDisplayValue = (displayValue === null || displayValue === undefined || String(displayValue).trim() === '') 
// // // // // // //             ? 'Not provided' 
// // // // // // //             : String(displayValue);

// // // // // // //         return (
// // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-gray-700/50">
// // // // // // //                 <span className="text-gray-400 text-sm font-semibold min-w-[120px] mb-2 md:mb-0">
// // // // // // //                     {capitalizeWords(fieldPath.split('.').pop().replace(/([A-Z])/g, ' $1').trim())}
// // // // // // //                 </span>
// // // // // // //                 <div className="flex-1 w-full max-w-lg flex items-center gap-2">
// // // // // // //                     {isEditing ? (
// // // // // // //                         inputType === 'textarea' ? (
// // // // // // //                             <textarea
// // // // // // //                                 className="textarea textarea-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow text-sm min-h-[60px]"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                 rows="2"
// // // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // // //                             ></textarea>
// // // // // // //                         ) : inputType === 'select' ? (
// // // // // // //                             <select
// // // // // // //                                 className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full max-w-[200px] text-sm"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                             >
// // // // // // //                                 {options.map((opt) => (
// // // // // // //                                     <option key={opt} value={opt}>{opt}</option>
// // // // // // //                                 ))}
// // // // // // //                             </select>
// // // // // // //                         ) : (
// // // // // // //                             <input
// // // // // // //                                 type={inputType}
// // // // // // //                                 className="input input-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow text-sm"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // // //                             />
// // // // // // //                         )
// // // // // // //                     ) : (
// // // // // // //                         <span className="text-gray-300 flex-grow py-2 text-sm">{actualDisplayValue}</span>
// // // // // // //                     )}
// // // // // // //                     <div className="flex gap-2 min-w-[140px] justify-end">
// // // // // // //                         {isEditing ? (
// // // // // // //                             <>
// // // // // // //                                 <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handleSaveClick(fieldPath)}>Save</button>
// // // // // // //                                 <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={handleCancelClick}>Cancel</button>
// // // // // // //                             </>
// // // // // // //                         ) : (
// // // // // // //                             <button
// // // // // // //                                 className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700"
// // // // // // //                                 onClick={() => handleEditClick(fieldPath, displayValue)}
// // // // // // //                             >
// // // // // // //                                 Edit
// // // // // // //                             </button>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     // Notification settings handler
// // // // // // //     const handleNotificationChange = async (setting, type, checked) => {
// // // // // // //         try {
// // // // // // //             const res = await axiosClient.put('/api/profile/settings/notifications', {
// // // // // // //                 setting,
// // // // // // //                 type,
// // // // // // //                 value: checked
// // // // // // //             });
// // // // // // //             setNotificationSettings(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 [setting]: {
// // // // // // //                     ...prev[setting],
// // // // // // //                     [type]: checked
// // // // // // //                 }
// // // // // // //             }));
// // // // // // //             toast.success('Notification settings updated!');
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating notification setting:', err);
// // // // // // //             toast.error(`Failed to update notification setting: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Privacy settings handler
// // // // // // //     const handlePrivacyChange = async (field, value) => {
// // // // // // //         try {
// // // // // // //             const booleanValue = value === 'Yes'; // Convert 'Yes'/'No' to boolean
// // // // // // //             const res = await axiosClient.put('/api/profile/settings/privacy', {
// // // // // // //                 field,
// // // // // // //                 value: booleanValue
// // // // // // //             });
// // // // // // //             setPrivacySettings(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 [field]: booleanValue
// // // // // // //             }));
// // // // // // //             setEditingPrivacyField(null); // Exit editing mode for this field
// // // // // // //             setTempValue(''); // Clear temp value
// // // // // // //             toast.success('Privacy settings updated!');
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating privacy setting:', err);
// // // // // // //             toast.error(`Failed to update privacy setting: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleDeleteAccount = async () => {
// // // // // // //         try {
// // // // // // //             const res = await axiosClient.delete('/auth/profile'); // Using the /auth/profile route for self-delete
// // // // // // //             dispatch(logoutUser()); // Log out user after deletion
// // // // // // //             toast.success(res.data.message || 'Your account has been deleted successfully.');
// // // // // // //             navigate('/signup'); // Redirect to signup/login page
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error deleting account:', err);
// // // // // // //             toast.error(`Failed to delete account: ${err.response?.data?.message || err.message}`);
// // // // // // //         } finally {
// // // // // // //             setShowDeleteAccountConfirmation(false); // Close confirmation modal
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Render functions for different tabs
// // // // // // //     const renderAccountInfo = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // // // // // //                 <div className="space-y-6">
// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">LeetCode ID</p>
// // // // // // //                             <p className="text-white text-lg">{user?.firstname?.toLowerCase() + user?.id?.slice(0, 5) || 'N/A'}</p>
// // // // // // //                         </div>
// // // // // // //                         <button className="btn btn-ghost btn-sm text-gray-500 mt-2 md:mt-0" disabled>Edit</button>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">Email</p>
// // // // // // //                             <p className="text-white text-lg">{profileData.emailId} <span className="badge badge-success bg-emerald-500 text-white border-transparent ml-2">Primary</span></p>
// // // // // // //                         </div>
// // // // // // //                         <button className="btn btn-ghost btn-sm text-gray-500 mt-2 md:mt-0" disabled>Edit</button>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">Password</p>
// // // // // // //                             <button 
// // // // // // //                                 className="text-indigo-400 text-lg hover:underline cursor-pointer btn btn-ghost btn-sm p-0 h-auto min-h-0"
// // // // // // //                                 onClick={() => setShowChangePasswordModal(true)}
// // // // // // //                             >
// // // // // // //                                 Change Password
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Account</h3>
// // // // // // //                 <div className="space-y-4">
// // // // // // //                     {['LinkedIn', 'Google', 'Github', 'Facebook'].map(platform => (
// // // // // // //                         <div key={platform} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // // //                             <div className="flex items-center">
// // // // // // //                                 <span className={`mr-3 text-2xl font-bold
// // // // // // //                                     ${platform === 'LinkedIn' ? 'text-blue-500' :
// // // // // // //                                       platform === 'Google' ? 'text-red-500' :
// // // // // // //                                       platform === 'Github' ? 'text-gray-400' : 'text-blue-600'}`}
// // // // // // //                                 >
// // // // // // //                                     {platform === 'LinkedIn' && <i className="fab fa-linkedin"></i>} {/* Placeholder for icons */}
// // // // // // //                                     {platform === 'Google' && <i className="fab fa-google"></i>}
// // // // // // //                                     {platform === 'Github' && <i className="fab fa-github"></i>}
// // // // // // //                                     {platform === 'Facebook' && <i className="fab fa-facebook"></i>}
// // // // // // //                                 </span>
// // // // // // //                                 <p className="text-white text-lg">{platform}</p>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-4">
// // // // // // //                                 <span className="text-gray-400">Not Connected</span>
// // // // // // //                                 <span className="text-green-400 font-bold">+10</span>
// // // // // // //                                 <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>

// // // // // // //                 <button
// // // // // // //                     className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg"
// // // // // // //                     onClick={() => setShowDeleteAccountConfirmation(true)}
// // // // // // //                 >
// // // // // // //                     Delete Account
// // // // // // //                 </button>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     const renderPrivacySettings = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         const privacyFields = [
// // // // // // //             {
// // // // // // //                 field: 'contactByCompanies',
// // // // // // //                 label: 'Can companies contact you with job opportunities?',
// // // // // // //                 description: 'We will only send your contact information to interested partner companies to connect you with job opportunities. We respect your privacy and will never give or sell your personal information to third parties without your explicit consent.',
// // // // // // //                 currentValue: privacySettings.contactByCompanies
// // // // // // //             },
// // // // // // //             {
// // // // // // //                 field: 'joinStudyPlanLeaderboard',
// // // // // // //                 label: 'Join study plan leaderboard',
// // // // // // //                 description: 'Will no longer join the leaderboard after turning off, the changes will be applied at the start of each week.',
// // // // // // //                 currentValue: privacySettings.joinStudyPlanLeaderboard
// // // // // // //             },
// // // // // // //             {
// // // // // // //                 field: 'displaySubmissionHistory',
// // // // // // //                 label: 'Display my submission history',
// // // // // // //                 description: 'After closing, your submission history data and information will not be displayed on your profile page to others.',
// // // // // // //                 currentValue: privacySettings.displaySubmissionHistory
// // // // // // //             }
// // // // // // //         ];

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // // // // // //                 <div className="space-y-8">
// // // // // // //                     {privacyFields.map(({ field, label, description, currentValue }) => (
// // // // // // //                         <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // // //                             <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // // // // // //                                 <p className="text-white text-lg font-medium">{label}</p>
// // // // // // //                                 <p className="text-gray-400 text-sm mt-1">{description}</p>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-2 min-w-[140px] justify-end">
// // // // // // //                                 {editingPrivacyField === field ? (
// // // // // // //                                     <>
// // // // // // //                                         <select
// // // // // // //                                             className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24 text-sm"
// // // // // // //                                             value={tempValue}
// // // // // // //                                             onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                         >
// // // // // // //                                             <option value="Yes">Yes</option>
// // // // // // //                                             <option value="No">No</option>
// // // // // // //                                         </select>
// // // // // // //                                         <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handlePrivacyChange(field, tempValue)}>Save</button>
// // // // // // //                                         <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(null); setTempValue(''); }}>Cancel</button>
// // // // // // //                                     </>
// // // // // // //                                 ) : (
// // // // // // //                                     <>
// // // // // // //                                         <span className="text-gray-300 font-semibold text-sm">{currentValue ? 'Yes' : 'No'}</span>
// // // // // // //                                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(field); setTempValue(currentValue ? 'Yes' : 'No'); }}>Edit</button>
// // // // // // //                                     </>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     const renderNotificationSettings = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         const notificationCategories = {
// // // // // // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // // // // // //             Award: ['awardNotification'],
// // // // // // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // // // // // //             Discuss: ['newComment'],
// // // // // // //             Other: ['otherNotifications'],
// // // // // // //             Promotions: ['promotions'],
// // // // // // //             'Weekly Email': ['weeklyRecommendations']
// // // // // // //         };

// // // // // // //         const renderCheckboxRow = (settingKey, label) => (
// // // // // // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // // // // // //                 <td className="py-3 px-4 text-white text-sm font-medium">{label}</td>
// // // // // // //                 <td className="py-3 px-4 text-center">
// // // // // // //                     <input
// // // // // // //                         type="checkbox"
// // // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // // //                         checked={notificationSettings[settingKey]?.email || false}
// // // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // // // // // //                     />
// // // // // // //                 </td>
// // // // // // //                 <td className="py-3 px-4 text-center">
// // // // // // //                     <input
// // // // // // //                         type="checkbox"
// // // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // // //                         checked={notificationSettings[settingKey]?.site || false}
// // // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // // // // // //                     />
// // // // // // //                 </td>
// // // // // // //             </tr>
// // // // // // //         );

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // // // // // //                 <div className="overflow-x-auto">
// // // // // // //                     <table className="table w-full text-slate-200">
// // // // // // //                         <thead>
// // // // // // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-xl"></th>
// // // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-xl">Site</th>
// // // // // // //                             </tr>
// // // // // // //                         </thead>
// // // // // // //                         <tbody>
// // // // // // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // // // // // //                                 <React.Fragment key={category}>
// // // // // // //                                     <tr>
// // // // // // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-xs border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // // // // // //                                     </tr>
// // // // // // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').replace('Id', ' ID').trim())))}
// // // // // // //                                 </React.Fragment>
// // // // // // //                             ))}
// // // // // // //                         </tbody>
// // // // // // //                     </table>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };


// // // // // // //     if (authLoading || pageLoading || !profileData) {
// // // // // // //         return (
// // // // // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // // // // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // // // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     }

// // // // // // //     // Determine the user's display name for the header (e.g., LeetCode ID style)
// // // // // // //     const displayLeetcodeId = user?.firstname ? user.firstname.toLowerCase() + user.id.slice(0, 5) : 'unknownid12345';

// // // // // // //     return (
// // // // // // //         <div className="min-h-screen bg-slate-950 text-slate-200 font-sans"
// // // // // // //             style={{
// // // // // // //                 backgroundImage: `
// // // // // // //                     radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // // // //                     radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // // // //                     radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // // // //                     radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // // // //                 `,
// // // // // // //                 backgroundAttachment: 'fixed',
// // // // // // //             }}>
// // // // // // //             {/* Inline styles for custom animations */}
// // // // // // //             <style>
// // // // // // //                 {`
// // // // // // //                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // // // // //                 .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
// // // // // // //                 @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // // //                 .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
// // // // // // //                 @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // // //                 .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
// // // // // // //                 .loading-spinner { animation: spin 0.8s linear infinite; }
// // // // // // //                 @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// // // // // // //                 `}
// // // // // // //             </style>

// // // // // // //             {/* Navbar (reusing from Homepage for consistency, simplified) */}
// // // // // // //             <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // // // //                 <div className="flex-1">
// // // // // // //                     <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // // //                         style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // // // //                         CoderWorld<span className="text-xl opacity-70">.dev</span>
// // // // // // //                     </NavLink>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex-none">
// // // // // // //                     <div className="dropdown dropdown-end ml-4">
// // // // // // //                         <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // // // //                             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
// // // // // // //                                 style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}>
// // // // // // //                                 <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // // // //                             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // // // // //                             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // // // // //                             <div className="divider my-1 h-px bg-gray-700" />
// // // // // // //                             <li><button onClick={() => dispatch(logoutUser())} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // // // // //                         </ul>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </nav>

// // // // // // //             {/* Main Profile Content Area */}
// // // // // // //             <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
// // // // // // //                 {/* Left Sidebar */}
// // // // // // //                 <div className="w-full lg:w-1/4 bg-gray-900/50 rounded-2xl shadow-lg border border-gray-700 p-6 flex flex-col items-center sticky top-28 h-fit animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // // // //                     <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-5xl text-gray-400 border-4 border-indigo-500 mb-4 overflow-hidden">
// // // // // // //                         {/* Avatar / Profile Picture */}
// // // // // // //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
// // // // // // //                             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // // // // // //                         </svg>
// // // // // // //                     </div>
// // // // // // //                     <h2 className="text-2xl font-bold text-white mb-1">{profileData?.firstname || 'Guest User'}</h2>
// // // // // // //                     <p className="text-gray-400 text-sm mb-6">LeetCode ID: <span className="text-indigo-400">{displayLeetcodeId}</span></p>

// // // // // // //                     {/* Navigation Links */}
// // // // // // //                     <ul className="menu w-full space-y-2">
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'basicInfo' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('basicInfo')}>
// // // // // // //                                 <i className="fas fa-info-circle mr-2"></i> Basic Info
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'account' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('account')}>
// // // // // // //                                 <i className="fas fa-user-circle mr-2"></i> Account
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('privacy')}>
// // // // // // //                                 <i className="fas fa-shield-alt mr-2"></i> Privacy
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('notifications')}>
// // // // // // //                                 <i className="fas fa-bell mr-2"></i> Notifications
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         {/* Other static menu items from screenshot */}
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-star mr-2"></i> Points
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-flask mr-2"></i> Lab
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-receipt mr-2"></i> Billing <span className="badge badge-sm badge-info text-blue-200 bg-blue-700/50 border-blue-600/50 ml-auto">New</span>
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-shopping-bag mr-2"></i> Orders <span className="badge badge-sm badge-warning text-yellow-200 bg-yellow-700/50 border-yellow-600/50 ml-auto">Beta</span>
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                     </ul>
// // // // // // //                 </div>

// // // // // // //                 {/* Right Content Area (Dynamically rendered based on activeTab) */}
// // // // // // //                 <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // // // //                     {activeTab === 'basicInfo' && (
// // // // // // //                         <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
// // // // // // //                             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // // // // // //                             <div className="space-y-4">
// // // // // // //                                 {/* Name */}
// // // // // // //                                 {renderEditableField('firstname', profileData.firstname)}

// // // // // // //                                 {/* Gender */}
// // // // // // //                                 {renderEditableField('profile.gender', profileData.profile?.gender, 'select', ['Not provided', 'Male', 'Female', 'Other'])}

// // // // // // //                                 {/* Location */}
// // // // // // //                                 {renderEditableField('profile.location', profileData.profile?.location)}

// // // // // // //                                 {/* Birthday */}
// // // // // // //                                 {renderEditableField('profile.birthday', profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : '', 'date')}

// // // // // // //                                 {/* Summary */}
// // // // // // //                                 {renderEditableField('profile.summary', profileData.profile?.summary, 'textarea')}

// // // // // // //                                 {/* Website */}
// // // // // // //                                 {renderEditableField('profile.website', profileData.profile?.website)}

// // // // // // //                                 {/* Github */}
// // // // // // //                                 {renderEditableField('profile.github', profileData.profile?.github)}

// // // // // // //                                 {/* LinkedIn */}
// // // // // // //                                 {renderEditableField('profile.linkedin', profileData.profile?.linkedin)}

// // // // // // //                                 {/* X (formerly Twitter) */}
// // // // // // //                                 {renderEditableField('profile.twitter', profileData.profile?.twitter)}

// // // // // // //                                 {/* Experience */}
// // // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// // // // // // //                                 {renderEditableField('profile.work', profileData.profile?.work, 'textarea')}
// // // // // // //                                 {renderEditableField('profile.education', profileData.profile?.education, 'textarea')}

// // // // // // //                                 {/* Skills */}
// // // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// // // // // // //                                 {renderEditableField('profile.skills', profileData.profile?.skills, 'textarea')}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {activeTab === 'account' && renderAccountInfo()}
// // // // // // //                     {activeTab === 'privacy' && renderPrivacySettings()}
// // // // // // //                     {activeTab === 'notifications' && renderNotificationSettings()}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* Change Password Modal */}
// // // // // // //             <ChangePasswordModal 
// // // // // // //                 isOpen={showChangePasswordModal} 
// // // // // // //                 onClose={() => setShowChangePasswordModal(false)} 
// // // // // // //             />

// // // // // // //             {/* Delete Account Confirmation Modal */}
// // // // // // //             {showDeleteAccountConfirmation && (
// // // // // // //                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]">
// // // // // // //                     <div className="modal-box bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm text-white text-center">
// // // // // // //                         <h3 className="font-bold text-2xl mb-4 text-red-400">Confirm Deletion</h3>
// // // // // // //                         <p className="text-gray-300 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
// // // // // // //                         <div className="flex justify-center gap-4">
// // // // // // //                             <button
// // // // // // //                                 className="btn bg-red-600 hover:bg-red-700 border-red-600 text-white"
// // // // // // //                                 onClick={handleDeleteAccount}
// // // // // // //                             >
// // // // // // //                                 Yes, Delete
// // // // // // //                             </button>
// // // // // // //                             <button
// // // // // // //                                 className="btn btn-ghost text-gray-400 hover:bg-gray-700"
// // // // // // //                                 onClick={() => setShowDeleteAccountConfirmation(false)}
// // // // // // //                             >
// // // // // // //                                 Cancel
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // export default ProfilePage;

// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import { NavLink, useNavigate } from 'react-router-dom';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // import { logoutUser } from '../authSlice';
// // // // // // // import ChangePasswordModal from '../components/ChangePasswordModal'; // Import the modal


// // // // // // // // Helper function to capitalize first letter of each word (and handle camelCase)
// // // // // // // const capitalizeWords = (str) => {
// // // // // // //     if (typeof str !== 'string' || !str) return '';
// // // // // // //     return str
// // // // // // //         .replace(/([A-Z])/g, ' $1') // Add space before capital letters
// // // // // // //         .split(' ')
// // // // // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // // // // //         .join(' ');
// // // // // // // };

// // // // // // // function ProfilePage() {
// // // // // // //     const dispatch = useDispatch();
// // // // // // //     const navigate = useNavigate();
// // // // // // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // // // // // //     const [profileData, setProfileData] = useState(null);
// // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // //     const [activeTab, setActiveTab] = useState('basicInfo'); // 'basicInfo', 'account', 'privacy', 'notifications'

// // // // // // //     // State for managing editable fields (Basic Info, Experience, Skills)
// // // // // // //     const [editingField, setEditingField] = useState(null);
// // // // // // //     const [tempValue, setTempValue] = useState('');

// // // // // // //     // State for managing settings (Privacy, Notifications)
// // // // // // //     const [notificationSettings, setNotificationSettings] = useState({});
// // // // // // //     const [privacySettings, setPrivacySettings] = useState({});
// // // // // // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null);

// // // // // // //     // Modals state
// // // // // // //     const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
// // // // // // //     const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);

// // // // // // //     // Fetch user profile data on component mount
// // // // // // //     const fetchProfileData = useCallback(async () => {
// // // // // // //         try {
// // // // // // //             setPageLoading(true);
// // // // // // //             const res = await axiosClient.get('/api/profile');
// // // // // // //             setProfileData(res.data);
            
// // // // // // //             // Initialize notification and privacy settings with fetched data or sensible defaults
// // // // // // //             setNotificationSettings(res.data.settings?.notifications || {
// // // // // // //                 importantAnnouncements: { email: true, site: false },
// // // // // // //                 featureAnnouncements: { email: true, site: false },
// // // // // // //                 awardNotification: { email: true, site: true },
// // // // // // //                 globalRanking: { email: false, site: true },
// // // // // // //                 contestBadge: { email: false, site: true },
// // // // // // //                 contestAnnouncements: { email: true, site: true },
// // // // // // //                 newComment: { email: false, site: true },
// // // // // // //                 otherNotifications: { email: true, site: false },
// // // // // // //                 promotions: { email: true, site: false },
// // // // // // //                 weeklyRecommendations: { email: true, site: false },
// // // // // // //             });
// // // // // // //             setPrivacySettings(res.data.settings?.privacy || {
// // // // // // //                 contactByCompanies: true,
// // // // // // //                 joinStudyPlanLeaderboard: true,
// // // // // // //                 displaySubmissionHistory: true,
// // // // // // //             });
// // // // // // //             // alert('Profile data loaded successfully.'); // Use alert for critical feedback, but not for every successful load
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error fetching profile data:', err);
// // // // // // //             alert(`Failed to load profile: ${err.response?.data?.message || err.message}`);
// // // // // // //             // If fetching fails, especially due to auth, redirect to login
// // // // // // //             if (err.response?.status === 401 || err.response?.status === 403) {
// // // // // // //                 dispatch(logoutUser());
// // // // // // //                 navigate('/login');
// // // // // // //             }
// // // // // // //         } finally {
// // // // // // //             setPageLoading(false);
// // // // // // //         }
// // // // // // //     }, [dispatch, navigate]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (isAuthenticated && !authLoading) {
// // // // // // //             fetchProfileData();
// // // // // // //         }
// // // // // // //     }, [isAuthenticated, authLoading, fetchProfileData]);

// // // // // // //     // Handle editing any profile field (Basic Info, Experience, Skills)
// // // // // // //     const handleEditClick = (fieldPath, currentValue) => {
// // // // // // //         setEditingField(fieldPath);
// // // // // // //         // Ensure tempValue is a string, handle null/undefined/Date objects for input fields
// // // // // // //         if (fieldPath === 'profile.birthday' && currentValue) {
// // // // // // //             setTempValue(new Date(currentValue).toISOString().split('T')[0]);
// // // // // // //         } else {
// // // // // // //             setTempValue(currentValue === null || currentValue === undefined || String(currentValue).trim() === '' ? '' : String(currentValue));
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleSaveClick = async (fieldPath) => {
// // // // // // //         try {
// // // // // // //             let valueToSave = tempValue;
// // // // // // //             // Special handling for Gender: Map 'Not provided' back to empty string for backend enum
// // // // // // //             if (fieldPath === 'profile.gender') {
// // // // // // //                 valueToSave = tempValue === 'Not provided' ? '' : tempValue;
// // // // // // //             } else if (fieldPath === 'profile.birthday') {
// // // // // // //                 // Ensure birthday is saved as a Date object or null if empty
// // // // // // //                 valueToSave = tempValue ? new Date(tempValue) : null;
// // // // // // //             }

// // // // // // //             const res = await axiosClient.put('/api/profile/field', {
// // // // // // //                 field: fieldPath,
// // // // // // //                 value: valueToSave
// // // // // // //             });
// // // // // // //             // Update local state with the new user data from response
// // // // // // //             setProfileData(res.data.user);
// // // // // // //             setEditingField(null); // Exit editing mode
// // // // // // //             setTempValue('');
// // // // // // //             alert(`Updated ${capitalizeWords(fieldPath.split('.').pop())} successfully!`);
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating field:', fieldPath, err);
// // // // // // //             alert(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleCancelClick = () => {
// // // // // // //         setEditingField(null);
// // // // // // //         setTempValue('');
// // // // // // //     };

// // // // // // //     // Helper to render an editable input or text for basic info fields
// // // // // // //     const renderEditableField = (fieldPath, displayValue, inputType = 'text', options = []) => {
// // // // // // //         const isEditing = editingField === fieldPath;
// // // // // // //         const actualDisplayValue = (displayValue === null || displayValue === undefined || String(displayValue).trim() === '') 
// // // // // // //             ? 'Not provided' 
// // // // // // //             : String(displayValue);

// // // // // // //         return (
// // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-gray-700/50">
// // // // // // //                 <span className="text-gray-400 text-sm font-semibold min-w-[120px] mb-2 md:mb-0">
// // // // // // //                     {capitalizeWords(fieldPath.split('.').pop().replace(/([A-Z])/g, ' $1').trim())}
// // // // // // //                 </span>
// // // // // // //                 <div className="flex-1 w-full max-w-lg flex items-center gap-2">
// // // // // // //                     {isEditing ? (
// // // // // // //                         inputType === 'textarea' ? (
// // // // // // //                             <textarea
// // // // // // //                                 className="textarea textarea-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow text-sm min-h-[60px]"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                 rows="2"
// // // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // // //                             ></textarea>
// // // // // // //                         ) : inputType === 'select' ? (
// // // // // // //                             <select
// // // // // // //                                 className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full max-w-[200px] text-sm"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                             >
// // // // // // //                                 {options.map((opt) => (
// // // // // // //                                     <option key={opt} value={opt}>{opt}</option>
// // // // // // //                                 ))}
// // // // // // //                             </select>
// // // // // // //                         ) : (
// // // // // // //                             <input
// // // // // // //                                 type={inputType}
// // // // // // //                                 className="input input-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow text-sm"
// // // // // // //                                 value={tempValue}
// // // // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // // // //                             />
// // // // // // //                         )
// // // // // // //                     ) : (
// // // // // // //                         <span className="text-gray-300 flex-grow py-2 text-sm">{actualDisplayValue}</span>
// // // // // // //                     )}
// // // // // // //                     <div className="flex gap-2 min-w-[140px] justify-end">
// // // // // // //                         {isEditing ? (
// // // // // // //                             <>
// // // // // // //                                 <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handleSaveClick(fieldPath)}>Save</button>
// // // // // // //                                 <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={handleCancelClick}>Cancel</button>
// // // // // // //                             </>
// // // // // // //                         ) : (
// // // // // // //                             <button
// // // // // // //                                 className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700"
// // // // // // //                                 onClick={() => handleEditClick(fieldPath, displayValue)}
// // // // // // //                             >
// // // // // // //                                 Edit
// // // // // // //                             </button>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     // Notification settings handler
// // // // // // //     const handleNotificationChange = async (setting, type, checked) => {
// // // // // // //         try {
// // // // // // //             const res = await axiosClient.put('/api/profile/settings/notifications', {
// // // // // // //                 setting,
// // // // // // //                 type,
// // // // // // //                 value: checked
// // // // // // //             });
// // // // // // //             setNotificationSettings(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 [setting]: {
// // // // // // //                     ...prev[setting],
// // // // // // //                     [type]: checked
// // // // // // //                 }
// // // // // // //             }));
// // // // // // //             alert('Notification settings updated!');
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating notification setting:', err);
// // // // // // //             alert(`Failed to update notification setting: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Privacy settings handler
// // // // // // //     const handlePrivacyChange = async (field, value) => {
// // // // // // //         try {
// // // // // // //             const booleanValue = value === 'Yes'; // Convert 'Yes'/'No' to boolean
// // // // // // //             const res = await axiosClient.put('/api/profile/settings/privacy', {
// // // // // // //                 field,
// // // // // // //                 value: booleanValue
// // // // // // //             });
// // // // // // //             setPrivacySettings(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 [field]: booleanValue
// // // // // // //             }));
// // // // // // //             setEditingPrivacyField(null); // Exit editing mode for this field
// // // // // // //             setTempValue(''); // Clear temp value
// // // // // // //             alert('Privacy settings updated!');
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error updating privacy setting:', err);
// // // // // // //             alert(`Failed to update privacy setting: ${err.response?.data?.message || err.message}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleDeleteAccount = async () => {
// // // // // // //         try {
// // // // // // //             const res = await axiosClient.delete('/auth/profile'); // Using the /auth/profile route for self-delete
// // // // // // //             dispatch(logoutUser()); // Log out user after deletion
// // // // // // //             alert(res.data.message || 'Your account has been deleted successfully.');
// // // // // // //             navigate('/signup'); // Redirect to signup/login page
// // // // // // //         } catch (err) {
// // // // // // //             console.error('Error deleting account:', err);
// // // // // // //             alert(`Failed to delete account: ${err.response?.data?.message || err.message}`);
// // // // // // //         } finally {
// // // // // // //             setShowDeleteAccountConfirmation(false); // Close confirmation modal
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Render functions for different tabs
// // // // // // //     const renderAccountInfo = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // // // // // //                 <div className="space-y-6">
// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">LeetCode ID</p>
// // // // // // //                             <p className="text-white text-lg">{user?.firstname?.toLowerCase() + user?.id?.slice(0, 5) || 'N/A'}</p>
// // // // // // //                         </div>
// // // // // // //                         <button className="btn btn-ghost btn-sm text-gray-500 mt-2 md:mt-0" disabled>Edit</button>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">Email</p>
// // // // // // //                             <p className="text-white text-lg">{profileData.emailId} <span className="badge badge-success bg-emerald-500 text-white border-transparent ml-2">Primary</span></p>
// // // // // // //                         </div>
// // // // // // //                         <button className="btn btn-ghost btn-sm text-gray-500 mt-2 md:mt-0" disabled>Edit</button>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // // // // // //                         <div className="flex-1">
// // // // // // //                             <p className="text-gray-400 text-sm mb-1">Password</p>
// // // // // // //                             <button 
// // // // // // //                                 className="text-indigo-400 text-lg hover:underline cursor-pointer btn btn-ghost btn-sm p-0 h-auto min-h-0"
// // // // // // //                                 onClick={() => setShowChangePasswordModal(true)}
// // // // // // //                             >
// // // // // // //                                 Change Password
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Account</h3>
// // // // // // //                 <div className="space-y-4">
// // // // // // //                     {['LinkedIn', 'Google', 'Github', 'Facebook'].map(platform => (
// // // // // // //                         <div key={platform} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // // //                             <div className="flex items-center">
// // // // // // //                                 <span className={`mr-3 text-2xl font-bold
// // // // // // //                                     ${platform === 'LinkedIn' ? 'text-blue-500' :
// // // // // // //                                       platform === 'Google' ? 'text-red-500' :
// // // // // // //                                       platform === 'Github' ? 'text-gray-400' : 'text-blue-600'}`}
// // // // // // //                                 >
// // // // // // //                                     {/* These are FontAwesome icons, ensure FontAwesome is linked in your index.html */}
// // // // // // //                                     {platform === 'LinkedIn' && <i className="fab fa-linkedin"></i>}
// // // // // // //                                     {platform === 'Google' && <i className="fab fa-google"></i>}
// // // // // // //                                     {platform === 'Github' && <i className="fab fa-github"></i>}
// // // // // // //                                     {platform === 'Facebook' && <i className="fab fa-facebook"></i>}
// // // // // // //                                 </span>
// // // // // // //                                 <p className="text-white text-lg">{platform}</p>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-4">
// // // // // // //                                 <span className="text-gray-400">Not Connected</span>
// // // // // // //                                 <span className="text-green-400 font-bold">+10</span>
// // // // // // //                                 <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>

// // // // // // //                 <button
// // // // // // //                     className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg"
// // // // // // //                     onClick={() => setShowDeleteAccountConfirmation(true)}
// // // // // // //                 >
// // // // // // //                     Delete Account
// // // // // // //                 </button>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     const renderPrivacySettings = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         const privacyFields = [
// // // // // // //             {
// // // // // // //                 field: 'contactByCompanies',
// // // // // // //                 label: 'Can companies contact you with job opportunities?',
// // // // // // //                 description: 'We will only send your contact information to interested partner companies to connect you with job opportunities. We respect your privacy and will never give or sell your personal information to third parties without your explicit consent.',
// // // // // // //                 currentValue: privacySettings.contactByCompanies
// // // // // // //             },
// // // // // // //             {
// // // // // // //                 field: 'joinStudyPlanLeaderboard',
// // // // // // //                 label: 'Join study plan leaderboard',
// // // // // // //                 description: 'Will no longer join the leaderboard after turning off, the changes will be applied at the start of each week.',
// // // // // // //                 currentValue: privacySettings.joinStudyPlanLeaderboard
// // // // // // //             },
// // // // // // //             {
// // // // // // //                 field: 'displaySubmissionHistory',
// // // // // // //                 label: 'Display my submission history',
// // // // // // //                 description: 'After closing, your submission history data and information will not be displayed on your profile page to others.',
// // // // // // //                 currentValue: privacySettings.displaySubmissionHistory
// // // // // // //             }
// // // // // // //         ];

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // // // // // //                 <div className="space-y-8">
// // // // // // //                     {privacyFields.map(({ field, label, description, currentValue }) => (
// // // // // // //                         <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // // // //                             <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // // // // // //                                 <p className="text-white text-lg font-medium">{label}</p>
// // // // // // //                                 <p className="text-gray-400 text-sm mt-1">{description}</p>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-2 min-w-[140px] justify-end">
// // // // // // //                                 {editingPrivacyField === field ? (
// // // // // // //                                     <>
// // // // // // //                                         <select
// // // // // // //                                             className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24 text-sm"
// // // // // // //                                             value={tempValue}
// // // // // // //                                             onChange={(e) => setTempValue(e.target.value)}
// // // // // // //                                         >
// // // // // // //                                             <option value="Yes">Yes</option>
// // // // // // //                                             <option value="No">No</option>
// // // // // // //                                         </select>
// // // // // // //                                         <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handlePrivacyChange(field, tempValue)}>Save</button>
// // // // // // //                                         <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(null); setTempValue(''); }}>Cancel</button>
// // // // // // //                                     </>
// // // // // // //                                 ) : (
// // // // // // //                                     <>
// // // // // // //                                         <span className="text-gray-300 font-semibold text-sm">{currentValue ? 'Yes' : 'No'}</span>
// // // // // // //                                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(field); setTempValue(currentValue ? 'Yes' : 'No'); }}>Edit</button>
// // // // // // //                                     </>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };

// // // // // // //     const renderNotificationSettings = () => {
// // // // // // //         if (!profileData) return <div className="text-center py-10 text-gray-400">Loading...</div>;

// // // // // // //         const notificationCategories = {
// // // // // // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // // // // // //             Award: ['awardNotification'],
// // // // // // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // // // // // //             Discuss: ['newComment'],
// // // // // // //             Other: ['otherNotifications'],
// // // // // // //             Promotions: ['promotions'],
// // // // // // //             'Weekly Email': ['weeklyRecommendations']
// // // // // // //         };

// // // // // // //         const renderCheckboxRow = (settingKey, label) => (
// // // // // // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // // // // // //                 <td className="py-3 px-4 text-white text-sm font-medium">{label}</td>
// // // // // // //                 <td className="py-3 px-4 text-center">
// // // // // // //                     <input
// // // // // // //                         type="checkbox"
// // // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // // //                         checked={notificationSettings[settingKey]?.email || false}
// // // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // // // // // //                     />
// // // // // // //                 </td>
// // // // // // //                 <td className="py-3 px-4 text-center">
// // // // // // //                     <input
// // // // // // //                         type="checkbox"
// // // // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // // // //                         checked={notificationSettings[settingKey]?.site || false}
// // // // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // // // // // //                     />
// // // // // // //                 </td>
// // // // // // //             </tr>
// // // // // // //         );

// // // // // // //         return (
// // // // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // // // // // //                 <div className="overflow-x-auto">
// // // // // // //                     <table className="table w-full text-slate-200">
// // // // // // //                         <thead>
// // // // // // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-xl"></th>
// // // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // // // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-xl">Site</th>
// // // // // // //                             </tr>
// // // // // // //                         </thead>
// // // // // // //                         <tbody>
// // // // // // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // // // // // //                                 <React.Fragment key={category}>
// // // // // // //                                     <tr>
// // // // // // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-xs border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // // // // // //                                     </tr>
// // // // // // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').replace('Id', ' ID').trim())))}
// // // // // // //                                 </React.Fragment>
// // // // // // //                             ))}
// // // // // // //                         </tbody>
// // // // // // //                     </table>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };


// // // // // // //     if (authLoading || pageLoading || !profileData) {
// // // // // // //         return (
// // // // // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // // // // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // // // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     }

// // // // // // //     // Determine the user's display name for the header (e.g., LeetCode ID style)
// // // // // // //     const displayLeetcodeId = user?.firstname ? user.firstname.toLowerCase() + user.id.slice(0, 5) : 'unknownid12345';

// // // // // // //     return (
// // // // // // //         <div className="min-h-screen bg-slate-950 text-slate-200 font-sans"
// // // // // // //             style={{
// // // // // // //                 backgroundImage: `
// // // // // // //                     radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // // // //                     radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // // // //                     radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // // // //                     radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // // // //                 `,
// // // // // // //                 backgroundAttachment: 'fixed',
// // // // // // //             }}>
// // // // // // //             {/* Inline styles for custom animations */}
// // // // // // //             <style>
// // // // // // //                 {`
// // // // // // //                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // // // // //                 .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
// // // // // // //                 @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // // //                 .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
// // // // // // //                 @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
// // // // // // //                 .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
// // // // // // //                 .loading-spinner { animation: spin 0.8s linear infinite; }
// // // // // // //                 @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// // // // // // //                 `}
// // // // // // //             </style>

// // // // // // //             {/* Navbar (reusing from Homepage for consistency, simplified) */}
// // // // // // //             <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // // // //                 <div className="flex-1">
// // // // // // //                     <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // // //                         style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // // // //                         CoderWorld<span className="text-xl opacity-70">.dev</span>
// // // // // // //                     </NavLink>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex-none">
// // // // // // //                     <div className="dropdown dropdown-end ml-4">
// // // // // // //                         <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // // // //                             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
// // // // // // //                                 style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}>
// // // // // // //                                 <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // // // //                             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // // // // //                             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // // // // //                             <div className="divider my-1 h-px bg-gray-700" />
// // // // // // //                             <li><button onClick={() => dispatch(logoutUser())} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // // // // //                         </ul>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </nav>

// // // // // // //             {/* Main Profile Content Area */}
// // // // // // //             <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
// // // // // // //                 {/* Left Sidebar */}
// // // // // // //                 <div className="w-full lg:w-1/4 bg-gray-900/50 rounded-2xl shadow-lg border border-gray-700 p-6 flex flex-col items-center sticky top-28 h-fit animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // // // //                     <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-5xl text-gray-400 border-4 border-indigo-500 mb-4 overflow-hidden">
// // // // // // //                         {/* Avatar / Profile Picture */}
// // // // // // //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
// // // // // // //                             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // // // // // //                         </svg>
// // // // // // //                     </div>
// // // // // // //                     <h2 className="text-2xl font-bold text-white mb-1">{profileData?.firstname || 'Guest User'}</h2>
// // // // // // //                     <p className="text-gray-400 text-sm mb-6">LeetCode ID: <span className="text-indigo-400">{displayLeetcodeId}</span></p>

// // // // // // //                     {/* Navigation Links */}
// // // // // // //                     <ul className="menu w-full space-y-2">
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'basicInfo' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('basicInfo')}>
// // // // // // //                                 <i className="fas fa-info-circle mr-2"></i> Basic Info
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'account' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('account')}>
// // // // // // //                                 <i className="fas fa-user-circle mr-2"></i> Account
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('privacy')}>
// // // // // // //                                 <i className="fas fa-shield-alt mr-2"></i> Privacy
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // // // //                                 onClick={() => setActiveTab('notifications')}>
// // // // // // //                                 <i className="fas fa-bell mr-2"></i> Notifications
// // // // // // //                             </button>
// // // // // // //                         </li>
// // // // // // //                         {/* Other static menu items from screenshot */}
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-star mr-2"></i> Points
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-flask mr-2"></i> Lab
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-receipt mr-2"></i> Billing <span className="badge badge-sm badge-info text-blue-200 bg-blue-700/50 border-blue-600/50 ml-auto">New</span>
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                         <li>
// // // // // // //                             <a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">
// // // // // // //                                 <i className="fas fa-shopping-bag mr-2"></i> Orders <span className="badge badge-sm badge-warning text-yellow-200 bg-yellow-700/50 border-yellow-600/50 ml-auto">Beta</span>
// // // // // // //                             </a>
// // // // // // //                         </li>
// // // // // // //                     </ul>
// // // // // // //                 </div>

// // // // // // //                 {/* Right Content Area (Dynamically rendered based on activeTab) */}
// // // // // // //                 <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // // // //                     {activeTab === 'basicInfo' && (
// // // // // // //                         <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
// // // // // // //                             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // // // // // //                             <div className="space-y-4">
// // // // // // //                                 {/* Name */}
// // // // // // //                                 {renderEditableField('firstname', profileData.firstname)}

// // // // // // //                                 {/* Gender */}
// // // // // // //                                 {renderEditableField('profile.gender', profileData.profile?.gender, 'select', ['Not provided', 'Male', 'Female', 'Other'])}

// // // // // // //                                 {/* Location */}
// // // // // // //                                 {renderEditableField('profile.location', profileData.profile?.location)}

// // // // // // //                                 {/* Birthday */}
// // // // // // //                                 {renderEditableField('profile.birthday', profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : '', 'date')}

// // // // // // //                                 {/* Summary */}
// // // // // // //                                 {renderEditableField('profile.summary', profileData.profile?.summary, 'textarea')}

// // // // // // //                                 {/* Website */}
// // // // // // //                                 {renderEditableField('profile.website', profileData.profile?.website)}

// // // // // // //                                 {/* Github */}
// // // // // // //                                 {renderEditableField('profile.github', profileData.profile?.github)}

// // // // // // //                                 {/* LinkedIn */}
// // // // // // //                                 {renderEditableField('profile.linkedin', profileData.profile?.linkedin)}

// // // // // // //                                 {/* X (formerly Twitter) */}
// // // // // // //                                 {renderEditableField('profile.twitter', profileData.profile?.twitter)}

// // // // // // //                                 {/* Experience */}
// // // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// // // // // // //                                 {renderEditableField('profile.work', profileData.profile?.work, 'textarea')}
// // // // // // //                                 {renderEditableField('profile.education', profileData.profile?.education, 'textarea')}

// // // // // // //                                 {/* Skills */}
// // // // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// // // // // // //                                 {renderEditableField('profile.skills', profileData.profile?.skills, 'textarea')}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {activeTab === 'account' && renderAccountInfo()}
// // // // // // //                     {activeTab === 'privacy' && renderPrivacySettings()}
// // // // // // //                     {activeTab === 'notifications' && renderNotificationSettings()}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* Change Password Modal */}
// // // // // // //             <ChangePasswordModal 
// // // // // // //                 isOpen={showChangePasswordModal} 
// // // // // // //                 onClose={() => setShowChangePasswordModal(false)} 
// // // // // // //             />

// // // // // // //             {/* Delete Account Confirmation Modal */}
// // // // // // //             {showDeleteAccountConfirmation && (
// // // // // // //                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]">
// // // // // // //                     <div className="modal-box bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm text-white text-center">
// // // // // // //                         <h3 className="font-bold text-2xl mb-4 text-red-400">Confirm Deletion</h3>
// // // // // // //                         <p className="text-gray-300 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
// // // // // // //                         <div className="flex justify-center gap-4">
// // // // // // //                             <button
// // // // // // //                                 className="btn bg-red-600 hover:bg-red-700 border-red-600 text-white"
// // // // // // //                                 onClick={handleDeleteAccount}
// // // // // // //                             >
// // // // // // //                                 Yes, Delete
// // // // // // //                             </button>
// // // // // // //                             <button
// // // // // // //                                 className="btn btn-ghost text-gray-400 hover:bg-gray-700"
// // // // // // //                                 onClick={() => setShowDeleteAccountConfirmation(false)}
// // // // // // //                             >
// // // // // // //                                 Cancel
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // export default ProfilePage;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { NavLink, Navigate } from 'react-router-dom';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import axiosClient from '../utils/axiosClient';
// // // // // import { logoutUser } from '../authSlice';

// // // // // // Helper function to capitalize first letter of each word
// // // // // const capitalizeWords = (str) => {
// // // // //     if (typeof str !== 'string' || !str) return '';
// // // // //     return str
// // // // //         .split(' ')
// // // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // // //         .join(' ');
// // // // // };

// // // // // // --- Frontend Default Settings ---
// // // // // // These should mirror the backend's DEFAULT_NOTIFICATION_SETTINGS and DEFAULT_PRIVACY_SETTINGS
// // // // // // to ensure consistent initial state and prevent errors if settings are not fully present in fetched data.
// // // // // const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
// // // // //     importantAnnouncements: { email: true, site: false },
// // // // //     featureAnnouncements: { email: true, site: false },
// // // // //     awardNotification: { email: true, site: true },
// // // // //     globalRanking: { email: false, site: true },
// // // // //     contestBadge: { email: false, site: true },
// // // // //     contestAnnouncements: { email: true, site: true },
// // // // //     newComment: { email: false, site: true },
// // // // //     otherNotifications: { email: true, site: false },
// // // // //     promotions: { email: true, site: false },
// // // // //     weeklyRecommendations: { email: true, site: false },
// // // // // };

// // // // // const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
// // // // //     contactByCompanies: true,
// // // // //     joinStudyPlanLeaderboard: true,
// // // // //     displaySubmissionHistory: true,
// // // // // };

// // // // // function ProfilePage() {
// // // // //     const dispatch = useDispatch();
// // // // //     // Get user and auth status from Redux store
// // // // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // // // //     // Local states for profile data and UI management
// // // // //     const [profileData, setProfileData] = useState(null); // Full profile data from backend
// // // // //     const [pageLoading, setPageLoading] = useState(true); // Loading state for profile data fetch
// // // // //     const [fetchError, setFetchError] = useState(null); // Error state for profile data fetch

// // // // //     const [activeTab, setActiveTab] = useState('basicInfo'); // Currently active tab

// // // // //     // States for managing editable fields
// // // // //     const [editingField, setEditingField] = useState(null); 
// // // // //     const [tempValue, setTempValue] = useState(''); 

// // // // //     // States for notification and privacy settings, initialized with defaults
// // // // //     const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // // //     const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // // // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null); 

// // // // //     // --- Handlers for Profile Field Editing (Basic Info) ---
// // // // //     const handleEditClick = (fieldPath, currentValue) => {
// // // // //         setEditingField(fieldPath);
// // // // //         // Ensure tempValue is a string, handle null/undefined
// // // // //         setTempValue(currentValue === null || currentValue === undefined ? '' : currentValue); 
// // // // //     };

// // // // //     const handleSaveClick = async (fieldPath) => {
// // // // //         try {
// // // // //             setFetchError(null); // Clear previous errors

// // // // //             let valueToSave = tempValue;
// // // // //             if (fieldPath === 'profile.gender') {
// // // // //                 valueToSave = tempValue === 'Not provided' ? '' : tempValue;
// // // // //             } else if (fieldPath === 'profile.birthday') {
// // // // //                 // Send ISO string for backend date parsing if date exists, otherwise null
// // // // //                 valueToSave = tempValue ? new Date(tempValue).toISOString() : null;
// // // // //             }

// // // // //             // Send PUT request to update specific field
// // // // //             const res = await axiosClient.put('/profile/field', { // Endpoint matching profileRouter.js
// // // // //                 field: fieldPath,
// // // // //                 value: valueToSave
// // // // //             });
            
// // // // //             // Backend should return the updated user object or the specific updated profile field.
// // // // //             // Assuming `res.data.user` contains the full updated user object including profile and settings.
// // // // //             setProfileData(res.data.user); 
            
// // // // //             // Update notification and privacy settings based on the fresh data from the response
// // // // //             setNotificationSettings(res.data.user.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // // //             setPrivacySettings(res.data.user.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);

// // // // //             setEditingField(null); // Exit editing mode
// // // // //             setTempValue('');
// // // // //         } catch (err) {
// // // // //             console.error('Error updating field:', fieldPath, err);
// // // // //             setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// // // // //         }
// // // // //     };

// // // // //     const handleCancelClick = () => {
// // // // //         setEditingField(null);
// // // // //         setTempValue('');
// // // // //     };

// // // // //     // Helper to render an editable input or text for basic info fields
// // // // //     const renderEditableField = (fieldPath, displayValue, inputType = 'text', options = []) => {
// // // // //         const isEditing = editingField === fieldPath;

// // // // //         return (
// // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // //                 <span className="text-gray-400 text-md min-w-[120px]">{capitalizeWords(fieldPath.split('.').pop().replace(/([A-Z])/g, ' $1').trim())}</span>
// // // // //                 <div className="flex-1 w-full max-w-lg flex flex-col items-start md:items-center md:flex-row gap-2">
// // // // //                     {isEditing ? (
// // // // //                         inputType === 'textarea' ? (
// // // // //                             <textarea
// // // // //                                 className="textarea textarea-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow"
// // // // //                                 value={tempValue}
// // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // //                                 rows="3"
// // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // //                             ></textarea>
// // // // //                         ) : inputType === 'select' ? (
// // // // //                             <select
// // // // //                                 className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full max-w-[200px]"
// // // // //                                 value={tempValue}
// // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // //                             >
// // // // //                                 {options.map((opt) => (
// // // // //                                     <option key={opt} value={opt}>{opt}</option>
// // // // //                                 ))}
// // // // //                             </select>
// // // // //                         ) : (
// // // // //                             <input
// // // // //                                 type={inputType}
// // // // //                                 className="input input-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 w-full flex-grow"
// // // // //                                 value={tempValue}
// // // // //                                 onChange={(e) => setTempValue(e.target.value)}
// // // // //                                 placeholder={`Enter your ${capitalizeWords(fieldPath.split('.').pop())}`}
// // // // //                             />
// // // // //                         )
// // // // //                     ) : (
// // // // //                         <span className="text-gray-300 flex-grow py-2">{displayValue || 'Not provided'}</span>
// // // // //                     )}
// // // // //                     <div className="flex gap-2 mt-2 md:mt-0">
// // // // //                         {isEditing ? (
// // // // //                             <>
// // // // //                                 <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handleSaveClick(fieldPath)}>Save</button>
// // // // //                                 <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={handleCancelClick}>Cancel</button>
// // // // //                             </>
// // // // //                         ) : (
// // // // //                             <button
// // // // //                                 className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700"
// // // // //                                 onClick={() => handleEditClick(fieldPath, displayValue === 'Not provided' ? '' : displayValue)}
// // // // //                             >
// // // // //                                 Edit
// // // // //                             </button>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         );
// // // // //     };


// // // // //     // --- useEffect for fetching user profile data on component mount/auth change ---
// // // // //     useEffect(() => {
// // // // //         const fetchProfileData = async () => {
// // // // //             // Prevent fetching if already loading or not authenticated
// // // // //             if (!isAuthenticated) { 
// // // // //                 setPageLoading(false); // Stop loading animation if not authenticated
// // // // //                 return; // Let Navigate component handle redirection
// // // // //             }

// // // // //             try {
// // // // //                 setPageLoading(true);
// // // // //                 setFetchError(null); // Clear any previous errors before new fetch

// // // // //                 // Make API call to get profile data
// // // // //                 const res = await axiosClient.get('/profile'); // Endpoint matching profileRouter.js
// // // // //                 setProfileData(res.data);
                
// // // // //                 // Initialize notification and privacy settings with defensive checks and defaults
// // // // //                 setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // // //                 setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);

// // // // //             } catch (err) {
// // // // //                 console.error('Error fetching profile data:', err);
// // // // //                 setFetchError('Failed to load profile data. Please try again or log in again.');
// // // // //                 // If unauthorized (401), dispatch logout to clear Redux/localStorage state fully
// // // // //                 if (err.response?.status === 401) {
// // // // //                     dispatch(logoutUser()); 
// // // // //                 }
// // // // //             } finally {
// // // // //                 setPageLoading(false); // Always set loading to false when fetch finishes
// // // // //             }
// // // // //         };

// // // // //         // Trigger fetch only if authenticated and authentication status is not still loading
// // // // //         if (isAuthenticated && !authLoading) {
// // // // //             fetchProfileData();
// // // // //         } else if (!isAuthenticated && !authLoading) {
// // // // //             // If authentication process finished and user is not authenticated,
// // // // //             // then there's no data to fetch, and the Navigate will handle redirect.
// // // // //             setPageLoading(false);
// // // // //         }

// // // // //     }, [isAuthenticated, authLoading, dispatch]); // Dependencies: Re-run if auth status changes

// // // // //     // --- Handlers for Notification Settings ---
// // // // //     const handleNotificationChange = async (setting, type, checked) => {
// // // // //         try {
// // // // //             setFetchError(null); // Clear errors
// // // // //             // Optimistic UI update: update state immediately for better UX
// // // // //             setNotificationSettings(prev => ({
// // // // //                 ...prev,
// // // // //                 [setting]: { ...prev[setting], [type]: checked }
// // // // //             }));

// // // // //             await axiosClient.put('/profile/settings/notifications', { // Endpoint matching profileRouter.js
// // // // //                 setting,
// // // // //                 type,
// // // // //                 value: checked
// // // // //             });
// // // // //             // If backend sends back the updated user, you could update profileData here:
// // // // //             // setProfileData(res.data.user); 
// // // // //         } catch (err) {
// // // // //             console.error('Error updating notification setting:', err);
// // // // //             // Revert optimistic update and display error
// // // // //             setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // // //             setFetchError('Failed to update notification setting. Please retry.');
// // // // //         }
// // // // //     };

// // // // //     // --- Handlers for Privacy Settings ---
// // // // //     const handlePrivacyChange = async (field, value) => {
// // // // //         try {
// // // // //             setFetchError(null); // Clear errors
// // // // //             const booleanValue = value === 'Yes'; // Convert 'Yes'/'No' to boolean

// // // // //             // Optimistic UI update
// // // // //             setPrivacySettings(prev => ({
// // // // //                 ...prev,
// // // // //                 [field]: booleanValue
// // // // //             }));

// // // // //             await axiosClient.put('/profile/settings/privacy', { // Endpoint matching profileRouter.js
// // // // //                 field,
// // // // //                 value: booleanValue
// // // // //             });
// // // // //             setEditingPrivacyField(null); 
// // // // //             setTempValue('');
// // // // //             // If backend sends back the updated user, you could update profileData here:
// // // // //             // setProfileData(res.data.user); 
// // // // //         } catch (err) {
// // // // //             console.error('Error updating privacy setting:', err);
// // // // //             // Revert optimistic update and display error
// // // // //             setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // // // //             setFetchError('Failed to update privacy setting. Please retry.');
// // // // //         }
// // // // //     };

// // // // //     // --- Render Functions for Different Tabs ---
// // // // //     // These functions now assume profileData is not null, as main render logic handles it.
// // // // //     const renderAccountInfo = () => {
// // // // //         return (
// // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // // // //                 <div className="space-y-6">
// // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // //                         <div className="flex-1">
// // // // //                             <p className="text-gray-400 text-sm mb-1"> ID</p>
// // // // //                             {/* Ensure user and user.id exist before accessing/slicing */}
// // // // //                             <p className="text-white text-lg">
// // // // //                                 {user?.firstname?.toLowerCase() || ''}{user?.id?.slice(0, 5) || ''}
// // // // //                             </p>
// // // // //                         </div>
// // // // //                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // // // //                     </div>

// // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // // //                         <div className="flex-1">
// // // // //                             <p className="text-gray-400 text-sm mb-1">Email</p>
// // // // //                             <p className="text-white text-lg">
// // // // //                                 {/* Ensure profileData.emailId exists before displaying */}
// // // // //                                 {profileData.emailId || 'N/A'} <span className="badge badge-success bg-emerald-500 text-white border-transparent ml-2">Primary</span></p>
// // // // //                         </div>
// // // // //                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // // // //                     </div>

// // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // // // //                         <div className="flex-1">
// // // // //                             <p className="text-gray-400 text-sm mb-1">Password</p>
// // // // //                             <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Account</h3>
// // // // //                 <div className="space-y-4">
// // // // //                     {['LinkedIn', 'Google', 'Github', 'Facebook'].map(platform => (
// // // // //                         <div key={platform} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // //                             <div className="flex items-center">
// // // // //                                 <span className={`mr-3 text-2xl font-bold ${platform === 'LinkedIn' ? 'text-blue-500' : platform === 'Google' ? 'text-red-500' : platform === 'Github' ? 'text-gray-400' : 'text-blue-600'}`}>
// // // // //                                     {platform === 'LinkedIn' && 'in'}
// // // // //                                     {platform === 'Google' && 'G'}
// // // // //                                     {platform === 'Github' && 'Gh'}
// // // // //                                     {platform === 'Facebook' && 'f'}
// // // // //                                 </span>
// // // // //                                 <p className="text-white text-lg">{platform}</p>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-4">
// // // // //                                 <span className="text-gray-400">Not Connected</span>
// // // // //                                 <span className="text-green-400">+10</span> 
// // // // //                                 <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>

// // // // //                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">
// // // // //                     Delete Account
// // // // //                 </button>
// // // // //             </div>
// // // // //         );
// // // // //     };

// // // // //     const renderPrivacySettings = () => {
// // // // //         return (
// // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // // // //                 <div className="space-y-8">
// // // // //                     {[
// // // // //                         { field: 'contactByCompanies', label: 'Can companies contact you with job opportunities?', description: 'We will only send your contact information to interested partner companies to connect you with job opportunities. We respect your privacy and will never give or sell your personal information to third parties without your explicit consent.' },
// // // // //                         { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Will no longer join the leaderboard after turning off, the changes will be applied at the start of each week.' },
// // // // //                         { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'After closing, your submission history data and information will not be displayed on your profile page to others.' }
// // // // //                     ].map(({ field, label, description }) => (
// // // // //                         <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // // //                             <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // // // //                                 <p className="text-white text-lg font-medium">{label}</p>
// // // // //                                 <p className="text-gray-400 text-sm mt-1">{description}</p>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-2">
// // // // //                                 {editingPrivacyField === field ? (
// // // // //                                     <>
// // // // //                                         <select
// // // // //                                             className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
// // // // //                                             value={tempValue}
// // // // //                                             onChange={(e) => setTempValue(e.target.value)}
// // // // //                                         >
// // // // //                                             <option value="Yes">Yes</option>
// // // // //                                             <option value="No">No</option>
// // // // //                                         </select>
// // // // //                                         <button className="btn btn-sm btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => handlePrivacyChange(field, tempValue)}>Save</button>
// // // // //                                         <button className="btn btn-sm btn-ghost text-gray-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(null); setTempValue(''); }}>Cancel</button>
// // // // //                                     </>
// // // // //                                 ) : (
// // // // //                                     <>
// // // // //                                         {/* Use privacySettings state directly which is robustly initialized */}
// // // // //                                         <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
// // // // //                                         <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => { setEditingPrivacyField(field); setTempValue(privacySettings[field] ? 'Yes' : 'No'); }}>Edit</button>
// // // // //                                     </>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>
// // // // //             </div>
// // // // //         );
// // // // //     };

// // // // //     const renderNotificationSettings = () => {
// // // // //         const notificationCategories = {
// // // // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // // // //             Award: ['awardNotification'],
// // // // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // // // //             Discuss: ['newComment'],
// // // // //             Other: ['otherNotifications'],
// // // // //             Promotions: ['promotions'],
// // // // //             'Weekly Email': ['weeklyRecommendations']
// // // // //         };

// // // // //         const renderCheckboxRow = (settingKey, label) => (
// // // // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // // // //                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
// // // // //                 <td className="py-3 px-4 text-center">
// // // // //                     <input
// // // // //                         type="checkbox"
// // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // //                         checked={notificationSettings[settingKey]?.email || false}
// // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // // // //                     />
// // // // //                 </td>
// // // // //                 <td className="py-3 px-4 text-center">
// // // // //                     <input
// // // // //                         type="checkbox"
// // // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500 checked:border-indigo-500"
// // // // //                         checked={notificationSettings[settingKey]?.site || false}
// // // // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // // // //                     />
// // // // //                 </td>
// // // // //             </tr>
// // // // //         );

// // // // //         return (
// // // // //             <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in-up">
// // // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // // // //                 <div className="overflow-x-auto">
// // // // //                     <table className="table w-full text-slate-200">
// // // // //                         <thead>
// // // // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
// // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
// // // // //                             </tr>
// // // // //                         </thead>
// // // // //                         <tbody>
// // // // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // // // //                                 <React.Fragment key={category}>
// // // // //                                     <tr>
// // // // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // // // //                                     </tr>
// // // // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
// // // // //                                 </React.Fragment>
// // // // //                             ))}
// // // // //                         </tbody>
// // // // //                     </table>
// // // // //                 </div>
// // // // //             </div>
// // // // //         );
// // // // //     };

// // // // //     // --- Main Render Logic (Conditional Rendering Based on State) ---
// // // // //     // Handle loading, authentication, and initial data fetching states.
// // // // //     if (authLoading || pageLoading) {
// // // // //         return (
// // // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     if (!isAuthenticated) {
// // // // //         // If not authenticated, redirect to login page.
// // // // //         return <Navigate to="/login" />;
// // // // //     }

// // // // //     if (fetchError) {
// // // // //         // Display a user-friendly error message if fetching profile data failed.
// // // // //         return (
// // // // //             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
// // // // //                 <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
// // // // //                 <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.reload()}>Retry Loading Profile</button>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     if (!profileData) {
// // // // //         // This case should ideally be caught by pageLoading and fetchError,
// // // // //         // but as a fallback, if data is unexpectedly null.
// // // // //         return (
// // // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // // //                 <p className="ml-3 text-lg">No profile data available. Please try logging in again.</p>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     // Determine the user's display ID (e.g., LeetCode ID style)
// // // // //     // Use optional chaining for `user` and `user.id` to prevent errors if they are null/undefined
// // // // //     const displayLeetcodeId = user?.firstname ? user.firstname.toLowerCase() + (user.id ? user.id.slice(0, 5) : '') : 'unknownid';


// // // // //     return (
// // // // //         <div className="min-h-screen bg-slate-950 text-slate-200 font-sans"
// // // // //             style={{
// // // // //                 backgroundImage: `
// // // // //                     radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // //                     radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // //                     radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // //                     radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // //                 `,
// // // // //                 backgroundAttachment: 'fixed',
// // // // //             }}>
// // // // //             {/* Inline styles for custom animations (good to put in a CSS file for larger apps) */}
// // // // //             <style>
// // // // //                 {`
// // // // //                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // // //                 .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
// // // // //                 @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// // // // //                 .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
// // // // //                 @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
// // // // //                 .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
// // // // //                 .loading-spinner { animation: spin 0.8s linear infinite; }
// // // // //                 @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// // // // //                 `}
// // // // //             </style>

// // // // //             {/* Navbar */}
// // // // //             <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // //                 <div className="flex-1">
// // // // //                     <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // //                         style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // //                         CoderWorld<span className="text-xl opacity-70">.dev</span>
// // // // //                     </NavLink>
// // // // //                 </div>
// // // // //                 <div className="flex-none">
// // // // //                     <div className="dropdown dropdown-end ml-4">
// // // // //                         <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // //                             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
// // // // //                                 style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}>
// // // // //                                 {/* Display user's initial, safely handle null/undefined */}
// // // // //                                 <span className="text-lg font-bold">{user?.firstname?.charAt(0)?.toUpperCase() || '?'}</span> 
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // //                             <li> <NavLink to="/profile" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
// // // // //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
// // // // //                   <span>Profile</span>
// // // // //                 </NavLink></li>
// // // // //                             {/* Conditionally render Admin Panel link if user is admin */}
// // // // //                             {user?.role === 'admin' && (
// // // // //                  <li> <NavLink to="/admin" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
// // // // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 8a1 1 0 00-1 1v1h14V9a1 1 0 00-1-1H5z" /><path fillRule="evenodd" d="M3 11v5a2 2 0 002 2h10a2 2 0 002-2v-5H3zm3 2a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
// // // // //                     <span>Admin Panel</span>
// // // // //                   </NavLink></li>
// // // // //                 )}
// // // // //                             <li><NavLink to="/dashboard" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
// // // // //                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
// // // // //                                   <span>Dashboard</span>
// // // // //                                 </NavLink></li>
// // // // //                             <div className="divider my-1 h-px bg-gray-700" />
// // // // //                             {/* <li><button onClick={() => dispatch(logoutUser())} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li> */}
// // // // //                             <li><button onClick={() => dispatch(logoutUser())} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
// // // // //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
// // // // //                   <span>Logout</span>
// // // // //                 </button></li>

// // // // //                         </ul>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </nav>

// // // // //             {/* Main Profile Content Area */}
// // // // //             <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
// // // // //                 {/* Left Sidebar */}
// // // // //                 <div className="w-full lg:w-1/4 bg-gray-900/50 rounded-2xl shadow-lg border border-gray-700 p-6 flex flex-col items-center sticky top-28 h-fit animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // //                     <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-5xl text-gray-400 border-4 border-indigo-500 mb-4">
// // // // //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
// // // // //                             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // // // //                         </svg>
// // // // //                     </div>
// // // // //                     {/* Ensure profileData.firstname exists */}
// // // // //                     <h2 className="text-2xl font-bold text-white mb-1">{profileData?.firstname || 'Guest User'}</h2>
// // // // //                     <p className="text-gray-400 text-sm mb-6"> ID: <span className="text-indigo-400">{displayLeetcodeId}</span></p>

// // // // //                     {/* Navigation Links */}
// // // // //                     <ul className="menu w-full space-y-2">
// // // // //                         <li>
// // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'basicInfo' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // //                                 onClick={() => setActiveTab('basicInfo')}>
// // // // //                                 Basic Info
// // // // //                             </button>
// // // // //                         </li>
// // // // //                         <li>
// // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'account' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // //                                 onClick={() => setActiveTab('account')}>
// // // // //                                 Account
// // // // //                             </button>
// // // // //                         </li>
// // // // //                         <li>
// // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // //                                 onClick={() => setActiveTab('privacy')}>
// // // // //                                 Privacy
// // // // //                             </button>
// // // // //                         </li>
// // // // //                         <li>
// // // // //                             <button className={`btn btn-block justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'}`}
// // // // //                                 onClick={() => setActiveTab('notifications')}>
// // // // //                                 Notifications
// // // // //                             </button>
// // // // //                         </li>
// // // // //                         {/* Other static menu items as per screenshot */}
// // // // //                         <li><a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">Points</a></li>
// // // // //                         <li><a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">Lab</a></li>
// // // // //                         <li><a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">Billing <span className="badge badge-sm badge-info text-blue-200 bg-blue-700/50 border-blue-600/50 ml-auto">New</span></a></li>
// // // // //                         <li><a href="#" className="btn btn-block justify-start text-left px-4 py-3 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-600/70">Orders <span className="badge badge-sm badge-warning text-yellow-200 bg-yellow-700/50 border-yellow-600/50 ml-auto">Beta</span></a></li>
// // // // //                     </ul>
// // // // //                 </div>

// // // // //                 {/* Right Content Area (Dynamically rendered based on activeTab) */}
// // // // //                 <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // //                     {/* Conditionally render Basic Info tab only when profileData is available */}
// // // // //                     {activeTab === 'basicInfo' && profileData && (
// // // // //                         <div className="p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
// // // // //                             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // // // //                             <div className="space-y-6">
// // // // //                                 {/* Name */}
// // // // //                                 {renderEditableField('firstname', profileData.firstname)}

// // // // //                                 {/* Gender */}
// // // // //                                 {renderEditableField('profile.gender', profileData.profile?.gender || 'Not provided', 'select', ['Not provided', 'Male', 'Female', 'Other'])}

// // // // //                                 {/* Location */}
// // // // //                                 {renderEditableField('profile.location', profileData.profile?.location)}

// // // // //                                 {/* Birthday */}
// // // // //                                 {renderEditableField('profile.birthday', profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : '', 'date')}

// // // // //                                 {/* Summary */}
// // // // //                                 {renderEditableField('profile.summary', profileData.profile?.summary, 'textarea')}

// // // // //                                 {/* Website */}
// // // // //                                 {renderEditableField('profile.website', profileData.profile?.website)}

// // // // //                                 {/* Github */}
// // // // //                                 {renderEditableField('profile.github', profileData.profile?.github)}

// // // // //                                 {/* LinkedIn */}
// // // // //                                 {renderEditableField('profile.linkedin', profileData.profile?.linkedin)}

// // // // //                                 {/* X (formerly Twitter) */}
// // // // //                                 {renderEditableField('profile.twitter', profileData.profile?.twitter)}

// // // // //                                 {/* Experience */}
// // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// // // // //                                 {renderEditableField('profile.work', profileData.profile?.work)}
// // // // //                                 {renderEditableField('profile.education', profileData.profile?.education)}

// // // // //                                 {/* Skills */}
// // // // //                                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// // // // //                                 {renderEditableField('profile.skills', profileData.profile?.skills)}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     {/* Render other tabs. Their internal render functions already handle `!profileData` */}
// // // // //                     {activeTab === 'account' && renderAccountInfo()}
// // // // //                     {activeTab === 'privacy' && renderPrivacySettings()}
// // // // //                     {activeTab === 'notifications' && renderNotificationSettings()}

// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default ProfilePage;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { NavLink, Navigate } from 'react-router-dom';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { motion } from 'framer-motion';
// // // // import { 
// // // //     User, Edit3, Save, X, Star, Trophy, Award, Target, 
// // // //     Code, Calendar, MapPin, Globe, Github, Linkedin, 
// // // //     Twitter, Briefcase, GraduationCap, Settings, Shield,
// // // //     Bell, CreditCard, FileText, DollarSign, HelpCircle, Flag,
// // // //     CheckCircle
// // // // } from 'lucide-react';
// // // // import axiosClient from '../utils/axiosClient';
// // // // import { logoutUser } from '../authSlice';
// // // // import Header from '../components/dashboard/Header'; // Assuming a common Header component

// // // // // --- Helper Functions ---
// // // // // Capitalizes the first letter of each word in a string.
// // // // const capitalizeWords = (str) => {
// // // //     if (typeof str !== 'string' || !str) return '';
// // // //     return str
// // // //         .split(' ')
// // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // //         .join(' ');
// // // // };

// // // // // --- Frontend Default Settings ---
// // // // // These mirror the backend's default settings for consistent initial state.
// // // // const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
// // // //     importantAnnouncements: { email: true, site: false },
// // // //     featureAnnouncements: { email: true, site: false },
// // // //     awardNotification: { email: true, site: true },
// // // //     globalRanking: { email: false, site: true },
// // // //     contestBadge: { email: false, site: true },
// // // //     contestAnnouncements: { email: true, site: true },
// // // //     newComment: { email: false, site: true },
// // // //     otherNotifications: { email: true, site: false },
// // // //     promotions: { email: true, site: false },
// // // //     weeklyRecommendations: { email: true, site: false },
// // // // };

// // // // const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
// // // //     contactByCompanies: true,
// // // //     joinStudyPlanLeaderboard: true,
// // // //     displaySubmissionHistory: true,
// // // // };

// // // // // --- EditableField Component (Extracted and Improved) ---
// // // // const EditableField = ({ label, value, onSave, onCancel, isEditing, onEdit, type = 'text', placeholder, points = 0, icon: Icon, options }) => {
// // // //     const [tempValue, setTempValue] = useState(value);

// // // //     // Sync tempValue when the prop `value` changes (e.g., after a successful save)
// // // //     useEffect(() => {
// // // //         setTempValue(value);
// // // //     }, [value]);

// // // //     const handleSave = () => {
// // // //         onSave(tempValue);
// // // //     };

// // // //     const handleCancel = () => {
// // // //         setTempValue(value); // Revert to original value
// // // //         onCancel();
// // // //     };

// // // //     const renderInput = () => {
// // // //         if (type === 'textarea') {
// // // //             return (
// // // //                 <textarea
// // // //                     value={tempValue}
// // // //                     onChange={(e) => setTempValue(e.target.value)}
// // // //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // // //                     placeholder={placeholder}
// // // //                     rows="3"
// // // //                 />
// // // //             );
// // // //         }
// // // //         if (type === 'select' && options) {
// // // //             return (
// // // //                 <select
// // // //                     value={tempValue}
// // // //                     onChange={(e) => setTempValue(e.target.value)}
// // // //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // // //                 >
// // // //                     {options.map((opt) => (
// // // //                         <option key={opt} value={opt}>{opt}</option>
// // // //                     ))}
// // // //                 </select>
// // // //             );
// // // //         }
// // // //         return (
// // // //             <input
// // // //                 type={type}
// // // //                 value={tempValue}
// // // //                 onChange={(e) => setTempValue(e.target.value)}
// // // //                 className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // // //                 placeholder={placeholder}
// // // //             />
// // // //         );
// // // //     };

// // // //     return (
// // // //         <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-colors border border-gray-700/50 hover:bg-slate-800/70">
// // // //             <div className="flex-1 flex items-center gap-3 mb-2 md:mb-0">
// // // //                 <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
// // // //                     <Icon size={18} className="text-cyan-400" />
// // // //                 </div>
// // // //                 <div>
// // // //                     <div className="text-white font-medium">{label}</div>
// // // //                     {isEditing ? (
// // // //                         renderInput()
// // // //                     ) : (
// // // //                         <div className="text-slate-400 text-sm">{value || <span className="italic">{placeholder || 'Not provided'}</span>}</div>
// // // //                     )}
// // // //                 </div>
// // // //             </div>
            
// // // //             <div className="flex items-center gap-2">
// // // //                 {points > 0 && !isEditing && (
// // // //                     <span className="text-cyan-400 text-sm font-medium">+{points}</span>
// // // //                 )}
// // // //                 {isEditing ? (
// // // //                     <div className="flex gap-1">
// // // //                         <button
// // // //                             onClick={handleSave}
// // // //                             className="p-1 bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
// // // //                         >
// // // //                             <Save size={16} />
// // // //                         </button>
// // // //                         <button
// // // //                             onClick={handleCancel}
// // // //                             className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
// // // //                         >
// // // //                             <X size={16} />
// // // //                         </button>
// // // //                     </div>
// // // //                 ) : (
// // // //                     <button
// // // //                         onClick={() => onEdit()}
// // // //                         className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
// // // //                     >
// // // //                         <Edit3 size={16} />
// // // //                     </button>
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // // --- Main Profile Page Component ---
// // // // function ProfilePage() {
// // // //     const dispatch = useDispatch();
// // // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // // //     const [profileData, setProfileData] = useState(null);
// // // //     const [pageLoading, setPageLoading] = useState(true);
// // // //     const [fetchError, setFetchError] = useState(null);
// // // //     const [activeTab, setActiveTab] = useState('basic-info');
    
// // // //     // States for editing fields
// // // //     const [editingField, setEditingField] = useState(null);
// // // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null);

// // // //     // States for notification and privacy settings, initialized with defaults
// // // //     const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // //     const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // // //     const [reportText, setReportText] = useState('');
// // // //     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

// // // //     // Sample data for static sections
// // // //     const achievements = [
// // // //         { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: Trophy },
// // // //         { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: Trophy },
// // // //         { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: Target },
// // // //         { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: Code },
// // // //     ];

// // // //     const badges = [
// // // //         { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
// // // //         { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
// // // //         { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
// // // //         { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
// // // //     ];

// // // //     const stats = {
// // // //         problemsSolved: 117,
// // // //         totalProblems: 3617,
// // // //         easySolved: 40,
// // // //         easyTotal: 885,
// // // //         mediumSolved: 62,
// // // //         mediumTotal: 1881,
// // // //         hardSolved: 15,
// // // //         hardTotal: 851,
// // // //         currentStreak: 5,
// // // //         maxStreak: 34,
// // // //         rank: 1081203,
// // // //         reputation: 1,
// // // //         views: 107,
// // // //         solutions: 3,
// // // //         discussions: 0
// // // //     };

// // // //     // --- Data Fetching Effect ---
// // // //     useEffect(() => {
// // // //         const fetchProfileData = async () => {
// // // //             if (!isAuthenticated) { 
// // // //                 setPageLoading(false);
// // // //                 return;
// // // //             }
// // // //             try {
// // // //                 setPageLoading(true);
// // // //                 setFetchError(null);
// // // //                 const res = await axiosClient.get('/profile');
// // // //                 setProfileData(res.data);
// // // //                 setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // //                 setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // // //             } catch (err) {
// // // //                 console.error('Error fetching profile data:', err);
// // // //                 setFetchError('Failed to load profile data. Please try again.');
// // // //                 if (err.response?.status === 401) {
// // // //                     dispatch(logoutUser()); 
// // // //                 }
// // // //             } finally {
// // // //                 setPageLoading(false);
// // // //             }
// // // //         };

// // // //         if (isAuthenticated && !authLoading) {
// // // //             fetchProfileData();
// // // //         } else if (!isAuthenticated && !authLoading) {
// // // //             setPageLoading(false);
// // // //         }
// // // //     }, [isAuthenticated, authLoading, dispatch]);

// // // //     // --- Handlers for Basic Info Editing ---
// // // //     const handleSaveBasicInfo = async (fieldPath, value) => {
// // // //         try {
// // // //             setFetchError(null);
// // // //             let valueToSave = value;
// // // //             if (fieldPath === 'profile.gender') {
// // // //                 valueToSave = value === 'Not provided' ? '' : value;
// // // //             } else if (fieldPath === 'profile.birthday') {
// // // //                 valueToSave = value ? new Date(value).toISOString() : null;
// // // //             }

// // // //             const res = await axiosClient.put('/profile/field', { field: fieldPath, value: valueToSave });
// // // //             setProfileData(res.data.user);
// // // //             setEditingField(null);
// // // //         } catch (err) {
// // // //             console.error('Error updating field:', fieldPath, err);
// // // //             setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// // // //         }
// // // //     };

// // // //     // --- Handlers for Notifications ---
// // // //     const handleNotificationChange = async (setting, type, checked) => {
// // // //         try {
// // // //             setFetchError(null);
// // // //             setNotificationSettings(prev => ({ ...prev, [setting]: { ...prev[setting], [type]: checked } }));
// // // //             await axiosClient.put('/profile/settings/notifications', { setting, type, value: checked });
// // // //         } catch (err) {
// // // //             console.error('Error updating notification setting:', err);
// // // //             setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // // //             setFetchError('Failed to update notification setting. Please retry.');
// // // //         }
// // // //     };

// // // //     // --- Handlers for Privacy Settings ---
// // // //     const handlePrivacyChange = async (field, value) => {
// // // //         try {
// // // //             setFetchError(null);
// // // //             const booleanValue = value === 'Yes';
// // // //             setPrivacySettings(prev => ({ ...prev, [field]: booleanValue }));
// // // //             await axiosClient.put('/profile/settings/privacy', { field, value: booleanValue });
// // // //             setEditingPrivacyField(null);
// // // //         } catch (err) {
// // // //             console.error('Error updating privacy setting:', err);
// // // //             setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // // //             setFetchError('Failed to update privacy setting. Please retry.');
// // // //         }
// // // //     };

// // // //     // --- Handlers for Reports ---
// // // //     const handleSubmitReport = () => {
// // // //         if (reportText.trim() === '') {
// // // //             setFetchError('Please enter a report description.');
// // // //             return;
// // // //         }
// // // //         console.log('Report submitted:', reportText);
// // // //         setShowSuccessMessage(true);
// // // //         setReportText('');
// // // //         setTimeout(() => setShowSuccessMessage(false), 3000);
// // // //     };

// // // //     // --- Render Functions for Each Tab ---
// // // //     const renderBasicInfo = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // // //             <div className="space-y-6">
// // // //                 <EditableField
// // // //                     label="Name"
// // // //                     value={profileData.firstname || ''}
// // // //                     onSave={(value) => handleSaveBasicInfo('firstname', value)}
// // // //                     isEditing={editingField === 'firstname'}
// // // //                     onEdit={() => setEditingField('firstname')}
// // // //                     onCancel={() => setEditingField(null)}
// // // //                     icon={User}
// // // //                     points={2}
// // // //                     placeholder="Enter your full name"
// // // //                 />
// // // //                 <EditableField
// // // //                     label="Gender"
// // // //                     value={profileData.profile?.gender || 'Not provided'}
// // // //                     onSave={(value) => handleSaveBasicInfo('profile.gender', value)}
// // // //                     isEditing={editingField === 'profile.gender'}
// // // //                     onEdit={() => setEditingField('profile.gender')}
// // // //                     onCancel={() => setEditingField(null)}
// // // //                     icon={User}
// // // //                     type="select"
// // // //                     options={['Not provided', 'Male', 'Female', 'Other']}
// // // //                     points={2}
// // // //                 />
// // // //                 {/* Other editable fields... */}
// // // //                 <EditableField
// // // //                     label="Location"
// // // //                     value={profileData.profile?.location || ''}
// // // //                     onSave={(value) => handleSaveBasicInfo('profile.location', value)}
// // // //                     isEditing={editingField === 'profile.location'}
// // // //                     onEdit={() => setEditingField('profile.location')}
// // // //                     onCancel={() => setEditingField(null)}
// // // //                     icon={MapPin}
// // // //                     points={2}
// // // //                     placeholder="City, Country"
// // // //                 />
// // // //                 <EditableField
// // // //                     label="Birthday"
// // // //                     value={profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : ''}
// // // //                     onSave={(value) => handleSaveBasicInfo('profile.birthday', value)}
// // // //                     isEditing={editingField === 'profile.birthday'}
// // // //                     onEdit={() => setEditingField('profile.birthday')}
// // // //                     onCancel={() => setEditingField(null)}
// // // //                     icon={Calendar}
// // // //                     type="date"
// // // //                     points={2}
// // // //                 />
// // // //                 <EditableField
// // // //                     label="Summary"
// // // //                     value={profileData.profile?.summary || ''}
// // // //                     onSave={(value) => handleSaveBasicInfo('profile.summary', value)}
// // // //                     isEditing={editingField === 'profile.summary'}
// // // //                     onEdit={() => setEditingField('profile.summary')}
// // // //                     onCancel={() => setEditingField(null)}
// // // //                     icon={FileText}
// // // //                     type="textarea"
// // // //                     points={2}
// // // //                     placeholder="Tell us about yourself..."
// // // //                 />
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderAccountInfo = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // // //             <div className="space-y-6">
// // // //                 {/* Account ID */}
// // // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // //                     <div className="flex-1">
// // // //                         <p className="text-gray-400 text-sm mb-1">ID</p>
// // // //                         <p className="text-white text-lg">{profileData.firstname?.toLowerCase() || ''}{profileData._id?.slice(0, 5) || ''}</p>
// // // //                     </div>
// // // //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // // //                 </div>
// // // //                 {/* Email */}
// // // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // // //                     <div className="flex-1">
// // // //                         <p className="text-gray-400 text-sm mb-1">Email</p>
// // // //                         <p className="text-white text-lg">{profileData.emailId || 'N/A'}</p>
// // // //                     </div>
// // // //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // // //                 </div>
// // // //                 {/* Password Change */}
// // // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // // //                     <div className="flex-1">
// // // //                         <p className="text-gray-400 text-sm mb-1">Password</p>
// // // //                         <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
// // // //                     </div>
// // // //                 </div>
// // // //                 {/* Social Accounts Section */}
// // // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Accounts</h3>
// // // //                 <div className="space-y-4">
// // // //                     {/* Simplified social links */}
// // // //                     <EditableField
// // // //                         label="Github"
// // // //                         value={profileData.profile?.github || ''}
// // // //                         onSave={(value) => handleSaveBasicInfo('profile.github', value)}
// // // //                         isEditing={editingField === 'profile.github'}
// // // //                         onEdit={() => setEditingField('profile.github')}
// // // //                         onCancel={() => setEditingField(null)}
// // // //                         icon={Github}
// // // //                         points={2}
// // // //                         placeholder="https://github.com/yourusername"
// // // //                     />
// // // //                     <EditableField
// // // //                         label="LinkedIn"
// // // //                         value={profileData.profile?.linkedin || ''}
// // // //                         onSave={(value) => handleSaveBasicInfo('profile.linkedin', value)}
// // // //                         isEditing={editingField === 'profile.linkedin'}
// // // //                         onEdit={() => setEditingField('profile.linkedin')}
// // // //                         onCancel={() => setEditingField(null)}
// // // //                         icon={Linkedin}
// // // //                         points={2}
// // // //                         placeholder="https://linkedin.com/in/yourprofile"
// // // //                     />
// // // //                 </div>
// // // //                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">Delete Account</button>
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderPrivacySettings = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // // //             <div className="space-y-8">
// // // //                 {[
// // // //                     { field: 'contactByCompanies', label: 'Can companies contact you?', description: 'We will only send your contact info to interested partners.' },
// // // //                     { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Changes apply at the start of each week.' },
// // // //                     { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'History will not be visible to others on your profile.' }
// // // //                 ].map(({ field, label, description }) => (
// // // //                     <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // // //                         <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // // //                             <p className="text-white text-lg font-medium">{label}</p>
// // // //                             <p className="text-gray-400 text-sm mt-1">{description}</p>
// // // //                         </div>
// // // //                         <div className="flex items-center gap-2">
// // // //                             {editingPrivacyField === field ? (
// // // //                                 <>
// // // //                                     <select
// // // //                                         className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
// // // //                                         value={privacySettings[field] ? 'Yes' : 'No'}
// // // //                                         onChange={(e) => setPrivacySettings(prev => ({ ...prev, [field]: e.target.value === 'Yes' }))}
// // // //                                     >
// // // //                                         <option value="Yes">Yes</option>
// // // //                                         <option value="No">No</option>
// // // //                                     </select>
// // // //                                     <button className="btn btn-sm btn-primary" onClick={() => handlePrivacyChange(field, privacySettings[field] ? 'Yes' : 'No')}>Save</button>
// // // //                                     <button className="btn btn-sm btn-ghost" onClick={() => setEditingPrivacyField(null)}>Cancel</button>
// // // //                                 </>
// // // //                             ) : (
// // // //                                 <>
// // // //                                     <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
// // // //                                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => setEditingPrivacyField(field)}>Edit</button>
// // // //                                 </>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderNotificationSettings = () => {
// // // //         const notificationCategories = {
// // // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // // //             Other: ['otherNotifications', 'promotions', 'weeklyRecommendations'],
// // // //         };

// // // //         const renderCheckboxRow = (settingKey, label) => (
// // // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // // //                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
// // // //                 <td className="py-3 px-4 text-center">
// // // //                     <input
// // // //                         type="checkbox"
// // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// // // //                         checked={notificationSettings[settingKey]?.email || false}
// // // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // // //                     />
// // // //                 </td>
// // // //                 <td className="py-3 px-4 text-center">
// // // //                     <input
// // // //                         type="checkbox"
// // // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// // // //                         checked={notificationSettings[settingKey]?.site || false}
// // // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // // //                     />
// // // //                 </td>
// // // //             </tr>
// // // //         );

// // // //         return (
// // // //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // // //                 <div className="overflow-x-auto">
// // // //                     <table className="table w-full text-slate-200">
// // // //                         <thead>
// // // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
// // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
// // // //                             </tr>
// // // //                         </thead>
// // // //                         <tbody>
// // // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // // //                                 <React.Fragment key={category}>
// // // //                                     <tr>
// // // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // // //                                     </tr>
// // // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
// // // //                                 </React.Fragment>
// // // //                             ))}
// // // //                         </tbody>
// // // //                     </table>
// // // //                 </div>
// // // //             </motion.div>
// // // //         );
// // // //     };

// // // //     const renderAchievements = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Achievements</h3>
// // // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// // // //                 {achievements.map((achievement) => (
// // // //                     <div key={achievement.id} className="text-center">
// // // //                         <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'} shadow-lg`}>
// // // //                             {<achievement.icon size={32} className="text-white" />}
// // // //                         </div>
// // // //                         <div className="text-white text-sm font-medium">{achievement.name}</div>
// // // //                         <div className="text-slate-400 text-xs">{achievement.description}</div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderBadges = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Badges</h3>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 {badges.map((badge) => (
// // // //                     <div key={badge.id} className={`p-6 rounded-xl border-2 ${badge.unlocked ? 'bg-slate-800/50 border-cyan-400/50' : 'bg-slate-800/30 border-slate-600'}`}>
// // // //                         <div className="flex items-center gap-4">
// // // //                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? `bg-${badge.color}-500` : 'bg-slate-600'}`}>
// // // //                                 <Award size={24} className="text-white" />
// // // //                             </div>
// // // //                             <div className="flex-1">
// // // //                                 <h4 className="text-white font-semibold">{badge.name}</h4>
// // // //                                 <p className="text-slate-400 text-sm">{badge.description}</p>
// // // //                                 <div className={`text-xs mt-1 ${badge.unlocked ? 'text-green-400' : 'text-slate-500'}`}>
// // // //                                     {badge.unlocked ? '✓ Earned' : 'Locked'}
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderPoints = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Points & Stats</h3>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                 {[
// // // //                     { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, icon: Code },
// // // //                     { label: 'Current Streak', value: stats.currentStreak, icon: Star },
// // // //                     { label: 'Max Streak', value: stats.maxStreak, icon: Star },
// // // //                     { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Globe }
// // // //                 ].map((stat) => (
// // // //                     <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
// // // //                         <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
// // // //                             <stat.icon size={24} className="text-white" />
// // // //                         </div>
// // // //                         <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
// // // //                         <div className="text-sm text-slate-400">{stat.label}</div>
// // // //                         {stat.total && <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>}
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderTransactions = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Transaction History</h3>
// // // //             <p className="text-slate-400 text-sm mb-4">View your payment and subscription history.</p>
// // // //             <div className="space-y-4">
// // // //                 {[
// // // //                     { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
// // // //                     { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
// // // //                 ].map((transaction) => (
// // // //                     <div key={transaction.id} className="p-4 bg-slate-800/50 rounded-lg">
// // // //                         <div className="flex items-center justify-between">
// // // //                             <div className="flex items-center gap-3">
// // // //                                 <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
// // // //                                     <DollarSign size={18} className="text-white" />
// // // //                                 </div>
// // // //                                 <div>
// // // //                                     <div className="text-white font-medium">{transaction.type}</div>
// // // //                                     <div className="text-slate-400 text-sm">{transaction.date}</div>
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div className="text-right">
// // // //                                 <div className="text-green-400 font-semibold">{transaction.amount}</div>
// // // //                                 <div className="text-slate-400 text-sm">{transaction.status}</div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderReports = () => (
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Reports</h3>
// // // //             <div className="space-y-4">
// // // //                 {showSuccessMessage && (
// // // //                     <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
// // // //                         <div className="flex items-center gap-3">
// // // //                             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// // // //                                 <CheckCircle size={16} className="text-white" />
// // // //                             </div>
// // // //                             <div>
// // // //                                 <p className="text-green-200 font-medium">Report Submitted Successfully!</p>
// // // //                                 <p className="text-green-300/80 text-sm">Thank you for your feedback.</p>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //                 <div className="p-6 bg-slate-800/50 rounded-xl">
// // // //                     <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
// // // //                     <textarea
// // // //                         value={reportText}
// // // //                         onChange={(e) => setReportText(e.target.value)}
// // // //                         placeholder="Describe the issue you encountered..."
// // // //                         className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
// // // //                         rows={4}
// // // //                     />
// // // //                     <button 
// // // //                         onClick={handleSubmitReport}
// // // //                         className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
// // // //                     >
// // // //                         Submit Report
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //         </motion.div>
// // // //     );

// // // //     const renderContent = () => {
// // // //         if (!profileData) return null;
// // // //         switch (activeTab) {
// // // //             case 'basic-info': return renderBasicInfo();
// // // //             case 'account': return renderAccountInfo();
// // // //             case 'privacy': return renderPrivacySettings();
// // // //             case 'notifications': return renderNotificationSettings();
// // // //             case 'achievements': return renderAchievements();
// // // //             case 'badges': return renderBadges();
// // // //             case 'points': return renderPoints();
// // // //             case 'transactions': return renderTransactions();
// // // //             case 'reports': return renderReports();
// // // //             default:
// // // //                 return (
// // // //                     <div className="text-center py-16">
// // // //                         <Settings size={64} className="mx-auto mb-4 text-slate-600" />
// // // //                         <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
// // // //                         <p className="text-slate-400">This section is under development.</p>
// // // //                     </div>
// // // //                 );
// // // //         }
// // // //     };

// // // //     const sidebarItems = [
// // // //         { id: 'basic-info', label: 'Basic Info', icon: User },
// // // //         { id: 'account', label: 'Account', icon: Settings },
// // // //         { id: 'privacy', label: 'Privacy', icon: Shield },
// // // //         { id: 'notifications', label: 'Notifications', icon: Bell },
// // // //         { id: 'achievements', label: 'Achievements', icon: Trophy },
// // // //         { id: 'badges', label: 'Badges', icon: Award },
// // // //         { id: 'points', label: 'Points', icon: Star },
// // // //         { id: 'transactions', label: 'Transactions', icon: DollarSign },
// // // //         { id: 'reports', label: 'Reports', icon: Flag },
// // // //         { id: 'help', label: 'Help & Support', icon: HelpCircle },
// // // //         { id: 'billing', label: 'Billing', icon: CreditCard },
// // // //     ];

// // // //     // Main Conditional Rendering
// // // //     if (authLoading || pageLoading) {
// // // //         return (
// // // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // // //             </div>
// // // //         );
// // // //     }
// // // //     if (!isAuthenticated) {
// // // //         return <Navigate to="/login" />;
// // // //     }
// // // //     if (fetchError) {
// // // //         return (
// // // //             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
// // // //                 <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
// // // //                 <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Loading Profile</button>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <div className="min-h-screen bg-slate-950 text-slate-200">
// // // //             <Header />
// // // //             <main className="container mx-auto px-4 py-8">
// // // //                 <motion.div 
// // // //                     className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
// // // //                     initial={{ opacity: 0, y: 50 }}
// // // //                     animate={{ opacity: 1, y: 0 }}
// // // //                     transition={{ duration: 0.8 }}
// // // //                 >
// // // //                     <div className="flex items-center gap-6">
// // // //                         <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center">
// // // //                             <User size={40} className="text-slate-400" />
// // // //                         </div>
// // // //                         <div>
// // // //                             <h1 className="text-2xl font-bold text-white mb-1">{profileData.firstname}</h1>
// // // //                             <p className="text-slate-400">ID: {profileData._id}</p>
// // // //                         </div>
// // // //                     </div>
// // // //                 </motion.div>

// // // //                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// // // //                     {/* Sidebar */}
// // // //                     <motion.div 
// // // //                         className="lg:col-span-1"
// // // //                         initial={{ opacity: 0, x: -50 }}
// // // //                         animate={{ opacity: 1, x: 0 }}
// // // //                         transition={{ duration: 0.8 }}
// // // //                     >
// // // //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm">
// // // //                             <nav className="space-y-2">
// // // //                                 {sidebarItems.map((item) => (
// // // //                                     <button
// // // //                                         key={item.id}
// // // //                                         onClick={() => setActiveTab(item.id)}
// // // //                                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
// // // //                                             activeTab === item.id
// // // //                                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
// // // //                                                 : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
// // // //                                         }`}
// // // //                                     >
// // // //                                         <item.icon size={18} />
// // // //                                         <span className="font-medium">{item.label}</span>
// // // //                                     </button>
// // // //                                 ))}
// // // //                             </nav>
// // // //                         </div>
// // // //                     </motion.div>

// // // //                     {/* Main Content */}
// // // //                     <div className="lg:col-span-3">
// // // //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
// // // //                             {renderContent()}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </main>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default ProfilePage;
// // // import React, { useState, useEffect } from 'react';
// // // import { NavLink, Navigate } from 'react-router-dom';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { motion } from 'framer-motion';
// // // import { 
// // //     User, Edit3, Save, X, Star, Trophy, Award, Target, 
// // //     Code, Calendar, MapPin, Globe, Github, Linkedin, 
// // //     Twitter, Briefcase, GraduationCap, Settings, Shield,
// // //     Bell, CreditCard, FileText, DollarSign, HelpCircle, Flag,
// // //     CheckCircle, MessageSquare
// // // } from 'lucide-react';
// // // import axiosClient from '../utils/axiosClient';
// // // import { logoutUser } from '../authSlice';
// // // import Header from '../components/dashboard/Header';

// // // // --- Helper Functions ---
// // // const capitalizeWords = (str) => {
// // //     if (typeof str !== 'string' || !str) return '';
// // //     return str
// // //         .split(' ')
// // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // //         .join(' ');
// // // };

// // // const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
// // //     importantAnnouncements: { email: true, site: false },
// // //     featureAnnouncements: { email: true, site: false },
// // //     awardNotification: { email: true, site: true },
// // //     globalRanking: { email: false, site: true },
// // //     contestBadge: { email: false, site: true },
// // //     contestAnnouncements: { email: true, site: true },
// // //     newComment: { email: false, site: true },
// // //     otherNotifications: { email: true, site: false },
// // //     promotions: { email: true, site: false },
// // //     weeklyRecommendations: { email: true, site: false },
// // // };

// // // const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
// // //     contactByCompanies: true,
// // //     joinStudyPlanLeaderboard: true,
// // //     displaySubmissionHistory: true,
// // // };

// // // // --- EditableField Component (Extracted and Improved) ---
// // // const EditableField = ({ label, value, onSave, onCancel, isEditing, onEdit, type = 'text', placeholder, points = 0, icon: Icon, options }) => {
// // //     const [tempValue, setTempValue] = useState(value);

// // //     useEffect(() => {
// // //         setTempValue(value);
// // //     }, [value]);

// // //     const handleSave = () => {
// // //         onSave(tempValue);
// // //     };

// // //     const handleCancel = () => {
// // //         setTempValue(value);
// // //         onCancel();
// // //     };

// // //     const renderInput = () => {
// // //         if (type === 'textarea') {
// // //             return (
// // //                 <textarea
// // //                     value={tempValue}
// // //                     onChange={(e) => setTempValue(e.target.value)}
// // //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // //                     placeholder={placeholder}
// // //                     rows="3"
// // //                 />
// // //             );
// // //         }
// // //         if (type === 'select' && options) {
// // //             return (
// // //                 <select
// // //                     value={tempValue}
// // //                     onChange={(e) => setTempValue(e.target.value)}
// // //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // //                 >
// // //                     {options.map((opt) => (
// // //                         <option key={opt} value={opt}>{opt}</option>
// // //                     ))}
// // //                 </select>
// // //             );
// // //         }
// // //         return (
// // //             <input
// // //                 type={type}
// // //                 value={tempValue}
// // //                 onChange={(e) => setTempValue(e.target.value)}
// // //                 className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// // //                 placeholder={placeholder}
// // //             />
// // //         );
// // //     };

// // //     return (
// // //         <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-colors border border-gray-700/50 hover:bg-slate-800/70">
// // //             <div className="flex-1 flex items-center gap-3 mb-2 md:mb-0">
// // //                 <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
// // //                     <Icon size={18} className="text-cyan-400" />
// // //                 </div>
// // //                 <div>
// // //                     <div className="text-white font-medium">{label}</div>
// // //                     {isEditing ? (
// // //                         renderInput()
// // //                     ) : (
// // //                         <div className="text-slate-400 text-sm">{value || <span className="italic">{placeholder || 'Not provided'}</span>}</div>
// // //                     )}
// // //                 </div>
// // //             </div>
            
// // //             <div className="flex items-center gap-2">
// // //                 {points > 0 && !isEditing && (
// // //                     <span className="text-cyan-400 text-sm font-medium">+{points}</span>
// // //                 )}
// // //                 {isEditing ? (
// // //                     <div className="flex gap-1">
// // //                         <button
// // //                             onClick={handleSave}
// // //                             className="p-1 bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
// // //                         >
// // //                             <Save size={16} />
// // //                         </button>
// // //                         <button
// // //                             onClick={handleCancel}
// // //                             className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
// // //                         >
// // //                             <X size={16} />
// // //                         </button>
// // //                     </div>
// // //                 ) : (
// // //                     <button
// // //                         onClick={() => onEdit()}
// // //                         className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
// // //                     >
// // //                         <Edit3 size={16} />
// // //                     </button>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // // --- Main Profile Page Component ---
// // // function ProfilePage() {
// // //     const dispatch = useDispatch();
// // //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// // //     const [profileData, setProfileData] = useState(null);
// // //     const [pageLoading, setPageLoading] = useState(true);
// // //     const [fetchError, setFetchError] = useState(null);
// // //     const [activeTab, setActiveTab] = useState('basic-info');
    
// // //     const [editingField, setEditingField] = useState(null);
// // //     const [editingPrivacyField, setEditingPrivacyField] = useState(null);
// // //     const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // //     const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // //     const [reportText, setReportText] = useState('');
// // //     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

// // //     // Chatbot state
// // //     const [chatMessages, setChatMessages] = useState([]);
// // //     const [chatInput, setChatInput] = useState('');

// // //     const chatbotResponses = {
// // //         'getting started': "Welcome! To get started, you can explore the 'Problems' section to solve your first challenge, or check out a 'Study Plan' to guide your learning.",
// // //         'problem solving': "Having trouble with a problem? Try breaking it down into smaller steps, drawing out the data flow, or searching for similar problems in the 'Discuss' section.",
// // //         'contests': "To join a contest, simply go to the 'Contests' tab and register for an upcoming event. Make sure you're on time to compete for a prize!",
// // //         'account issues': "For account issues, you can try resetting your password from the login page or send a detailed report from the 'Reports' tab. Our support team will help you out.",
// // //         'hello': "Hi there! I'm here to help. What can I assist you with today?",
// // //         'default': "I'm sorry, I don't have information on that topic yet. Please select from the options provided or try asking a different question."
// // //     };

// // //     const handleChatbotSubmit = (e) => {
// // //         e.preventDefault();
// // //         if (chatInput.trim() === '') return;

// // //         const userMessage = chatInput;
// // //         setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
// // //         setChatInput('');

// // //         // Simulate a delay for the bot's response
// // //         setTimeout(() => {
// // //             const normalizedInput = userMessage.toLowerCase().trim();
// // //             let botResponse = chatbotResponses.default;

// // //             if (normalizedInput.includes('getting started')) {
// // //                 botResponse = chatbotResponses['getting started'];
// // //             } else if (normalizedInput.includes('problem solving')) {
// // //                 botResponse = chatbotResponses['problem solving'];
// // //             } else if (normalizedInput.includes('contests')) {
// // //                 botResponse = chatbotResponses['contests'];
// // //             } else if (normalizedInput.includes('account issues')) {
// // //                 botResponse = chatbotResponses['account issues'];
// // //             } else if (normalizedInput.includes('hello')) {
// // //                 botResponse = chatbotResponses['hello'];
// // //             }
            
// // //             setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
// // //         }, 1000);
// // //     };

// // //     // Sample data for static sections
// // //     const achievements = [
// // //         { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: Trophy },
// // //         { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: Trophy },
// // //         { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: Target },
// // //         { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: Code },
// // //     ];

// // //     const badges = [
// // //         { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
// // //         { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
// // //         { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
// // //         { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
// // //     ];

// // //     const stats = {
// // //         problemsSolved: 117,
// // //         totalProblems: 3617,
// // //         easySolved: 40,
// // //         easyTotal: 885,
// // //         mediumSolved: 62,
// // //         mediumTotal: 1881,
// // //         hardSolved: 15,
// // //         hardTotal: 851,
// // //         currentStreak: 5,
// // //         maxStreak: 34,
// // //         rank: 1081203,
// // //         reputation: 1,
// // //         views: 107,
// // //         solutions: 3,
// // //         discussions: 0
// // //     };

// // //     useEffect(() => {
// // //         const fetchProfileData = async () => {
// // //             if (!isAuthenticated) { 
// // //                 setPageLoading(false);
// // //                 return;
// // //             }
// // //             try {
// // //                 setPageLoading(true);
// // //                 setFetchError(null);
// // //                 const res = await axiosClient.get('/profile');
// // //                 setProfileData(res.data);
// // //                 setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // //                 setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // //             } catch (err) {
// // //                 console.error('Error fetching profile data:', err);
// // //                 setFetchError('Failed to load profile data. Please try again.');
// // //                 if (err.response?.status === 401) {
// // //                     dispatch(logoutUser()); 
// // //                 }
// // //             } finally {
// // //                 setPageLoading(false);
// // //             }
// // //         };

// // //         if (isAuthenticated && !authLoading) {
// // //             fetchProfileData();
// // //         } else if (!isAuthenticated && !authLoading) {
// // //             setPageLoading(false);
// // //         }
// // //     }, [isAuthenticated, authLoading, dispatch]);

// // //     const handleSaveBasicInfo = async (fieldPath, value) => {
// // //         try {
// // //             setFetchError(null);
// // //             let valueToSave = value;
// // //             if (fieldPath === 'profile.gender') {
// // //                 valueToSave = value === 'Not provided' ? '' : value;
// // //             } else if (fieldPath === 'profile.birthday') {
// // //                 valueToSave = value ? new Date(value).toISOString() : null;
// // //             }

// // //             const res = await axiosClient.put('/profile/field', { field: fieldPath, value: valueToSave });
// // //             setProfileData(res.data.user);
// // //             setEditingField(null);
// // //         } catch (err) {
// // //             console.error('Error updating field:', fieldPath, err);
// // //             setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// // //         }
// // //     };

// // //     const handleNotificationChange = async (setting, type, checked) => {
// // //         try {
// // //             setFetchError(null);
// // //             setNotificationSettings(prev => ({ ...prev, [setting]: { ...prev[setting], [type]: checked } }));
// // //             await axiosClient.put('/profile/settings/notifications', { setting, type, value: checked });
// // //         } catch (err) {
// // //             console.error('Error updating notification setting:', err);
// // //             setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// // //             setFetchError('Failed to update notification setting. Please retry.');
// // //         }
// // //     };

// // //     const handlePrivacyChange = async (field, value) => {
// // //         try {
// // //             setFetchError(null);
// // //             const booleanValue = value === 'Yes';
// // //             setPrivacySettings(prev => ({ ...prev, [field]: booleanValue }));
// // //             await axiosClient.put('/profile/settings/privacy', { field, value: booleanValue });
// // //             setEditingPrivacyField(null);
// // //         } catch (err) {
// // //             console.error('Error updating privacy setting:', err);
// // //             setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// // //             setFetchError('Failed to update privacy setting. Please retry.');
// // //         }
// // //     };

// // //     const handleSubmitReport = () => {
// // //         if (reportText.trim() === '') {
// // //             setFetchError('Please enter a report description.');
// // //             return;
// // //         }
// // //         console.log('Report submitted:', reportText);
// // //         setShowSuccessMessage(true);
// // //         setReportText('');
// // //         setTimeout(() => setShowSuccessMessage(false), 3000);
// // //     };

// // //     // --- Render Functions for Each Tab ---
// // //     const renderBasicInfo = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// // //             <div className="space-y-6">
// // //                 <EditableField
// // //                     label="Name"
// // //                     value={profileData.firstname || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('firstname', value)}
// // //                     isEditing={editingField === 'firstname'}
// // //                     onEdit={() => setEditingField('firstname')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={User}
// // //                     points={2}
// // //                     placeholder="Enter your full name"
// // //                 />
// // //                 <EditableField
// // //                     label="Gender"
// // //                     value={profileData.profile?.gender || 'Not provided'}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.gender', value)}
// // //                     isEditing={editingField === 'profile.gender'}
// // //                     onEdit={() => setEditingField('profile.gender')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={User}
// // //                     type="select"
// // //                     options={['Not provided', 'Male', 'Female', 'Other']}
// // //                     points={2}
// // //                 />
// // //                 <EditableField
// // //                     label="Location"
// // //                     value={profileData.profile?.location || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.location', value)}
// // //                     isEditing={editingField === 'profile.location'}
// // //                     onEdit={() => setEditingField('profile.location')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={MapPin}
// // //                     points={2}
// // //                     placeholder="City, Country"
// // //                 />
// // //                 <EditableField
// // //                     label="Birthday"
// // //                     value={profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.birthday', value)}
// // //                     isEditing={editingField === 'profile.birthday'}
// // //                     onEdit={() => setEditingField('profile.birthday')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Calendar}
// // //                     type="date"
// // //                     points={2}
// // //                 />
// // //                 <EditableField
// // //                     label="Summary"
// // //                     value={profileData.profile?.summary || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.summary', value)}
// // //                     isEditing={editingField === 'profile.summary'}
// // //                     onEdit={() => setEditingField('profile.summary')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={FileText}
// // //                     type="textarea"
// // //                     points={2}
// // //                     placeholder="Tell us about yourself..."
// // //                 />
// // //                 <EditableField
// // //                     label="Website"
// // //                     value={profileData.profile?.website || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.website', value)}
// // //                     isEditing={editingField === 'profile.website'}
// // //                     onEdit={() => setEditingField('profile.website')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Globe}
// // //                     points={2}
// // //                     placeholder="https://your-website.com"
// // //                 />
// // //                 <EditableField
// // //                     label="Github"
// // //                     value={profileData.profile?.github || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.github', value)}
// // //                     isEditing={editingField === 'profile.github'}
// // //                     onEdit={() => setEditingField('profile.github')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Github}
// // //                     points={2}
// // //                     placeholder="https://github.com/yourusername"
// // //                 />
// // //                 <EditableField
// // //                     label="LinkedIn"
// // //                     value={profileData.profile?.linkedin || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.linkedin', value)}
// // //                     isEditing={editingField === 'profile.linkedin'}
// // //                     onEdit={() => setEditingField('profile.linkedin')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Linkedin}
// // //                     points={2}
// // //                     placeholder="https://linkedin.com/in/yourprofile"
// // //                 />
// // //                 <EditableField
// // //                     label="X (formerly Twitter)"
// // //                     value={profileData.profile?.twitter || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.twitter', value)}
// // //                     isEditing={editingField === 'profile.twitter'}
// // //                     onEdit={() => setEditingField('profile.twitter')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Twitter}
// // //                     points={2}
// // //                     placeholder="https://x.com/yourusername"
// // //                 />
// // //                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// // //                 <EditableField
// // //                     label="Work"
// // //                     value={profileData.profile?.work || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.work', value)}
// // //                     isEditing={editingField === 'profile.work'}
// // //                     onEdit={() => setEditingField('profile.work')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Briefcase}
// // //                     points={2}
// // //                     placeholder="Your current job title and company"
// // //                 />
// // //                 <EditableField
// // //                     label="Education"
// // //                     value={profileData.profile?.education || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.education', value)}
// // //                     isEditing={editingField === 'profile.education'}
// // //                     onEdit={() => setEditingField('profile.education')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={GraduationCap}
// // //                     points={2}
// // //                     placeholder="Your educational background"
// // //                 />
// // //                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// // //                 <EditableField
// // //                     label="Technical Skills"
// // //                     value={profileData.profile?.skills || ''}
// // //                     onSave={(value) => handleSaveBasicInfo('profile.skills', value)}
// // //                     isEditing={editingField === 'profile.skills'}
// // //                     onEdit={() => setEditingField('profile.skills')}
// // //                     onCancel={() => setEditingField(null)}
// // //                     icon={Code}
// // //                     points={2}
// // //                     placeholder="List your programming languages and technologies"
// // //                 />
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderAccountInfo = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// // //             <div className="space-y-6">
// // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // //                     <div className="flex-1">
// // //                         <p className="text-gray-400 text-sm mb-1">ID</p>
// // //                         <p className="text-white text-lg">{profileData.firstname?.toLowerCase() || ''}{profileData._id?.slice(0, 5) || ''}</p>
// // //                     </div>
// // //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // //                 </div>
// // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// // //                     <div className="flex-1">
// // //                         <p className="text-gray-400 text-sm mb-1">Email</p>
// // //                         <p className="text-white text-lg">{profileData.emailId || 'N/A'}</p>
// // //                     </div>
// // //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// // //                 </div>
// // //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// // //                     <div className="flex-1">
// // //                         <p className="text-gray-400 text-sm mb-1">Password</p>
// // //                         <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
// // //                     </div>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Accounts</h3>
// // //                 <div className="space-y-4">
// // //                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // //                         <div className="flex items-center">
// // //                             <span className="mr-3 text-2xl font-bold text-blue-500">in</span>
// // //                             <p className="text-white text-lg">LinkedIn</p>
// // //                         </div>
// // //                         <div className="flex items-center gap-4">
// // //                             <span className="text-gray-400">Not Connected</span>
// // //                             <span className="text-green-400">+10</span> 
// // //                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // //                         </div>
// // //                     </div>
// // //                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // //                         <div className="flex items-center">
// // //                             <span className="mr-3 text-2xl font-bold text-gray-400">Gh</span>
// // //                             <p className="text-white text-lg">Github</p>
// // //                         </div>
// // //                         <div className="flex items-center gap-4">
// // //                             <span className="text-gray-400">Not Connected</span>
// // //                             <span className="text-green-400">+10</span> 
// // //                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">Delete Account</button>
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderPrivacySettings = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// // //             <div className="space-y-8">
// // //                 {[
// // //                     { field: 'contactByCompanies', label: 'Can companies contact you?', description: 'We will only send your contact info to interested partners.' },
// // //                     { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Changes apply at the start of each week.' },
// // //                     { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'History will not be visible to others on your profile.' }
// // //                 ].map(({ field, label, description }) => (
// // //                     <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// // //                         <div className="flex-1 pr-4 mb-4 lg:mb-0">
// // //                             <p className="text-white text-lg font-medium">{label}</p>
// // //                             <p className="text-gray-400 text-sm mt-1">{description}</p>
// // //                         </div>
// // //                         <div className="flex items-center gap-2">
// // //                             {editingPrivacyField === field ? (
// // //                                 <>
// // //                                     <select
// // //                                         className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
// // //                                         value={privacySettings[field] ? 'Yes' : 'No'}
// // //                                         onChange={(e) => setPrivacySettings(prev => ({ ...prev, [field]: e.target.value === 'Yes' }))}
// // //                                     >
// // //                                         <option value="Yes">Yes</option>
// // //                                         <option value="No">No</option>
// // //                                     </select>
// // //                                     <button className="btn btn-sm btn-primary" onClick={() => handlePrivacyChange(field, privacySettings[field] ? 'Yes' : 'No')}>Save</button>
// // //                                     <button className="btn btn-sm btn-ghost" onClick={() => setEditingPrivacyField(null)}>Cancel</button>
// // //                                 </>
// // //                             ) : (
// // //                                 <>
// // //                                     <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
// // //                                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => setEditingPrivacyField(field)}>Edit</button>
// // //                                 </>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderNotificationSettings = () => {
// // //         const notificationCategories = {
// // //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// // //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// // //             Other: ['otherNotifications', 'promotions', 'weeklyRecommendations'],
// // //         };

// // //         const renderCheckboxRow = (settingKey, label) => (
// // //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// // //                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
// // //                 <td className="py-3 px-4 text-center">
// // //                     <input
// // //                         type="checkbox"
// // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// // //                         checked={notificationSettings[settingKey]?.email || false}
// // //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// // //                     />
// // //                 </td>
// // //                 <td className="py-3 px-4 text-center">
// // //                     <input
// // //                         type="checkbox"
// // //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// // //                         checked={notificationSettings[settingKey]?.site || false}
// // //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// // //                     />
// // //                 </td>
// // //             </tr>
// // //         );

// // //         return (
// // //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// // //                 <div className="overflow-x-auto">
// // //                     <table className="table w-full text-slate-200">
// // //                         <thead>
// // //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// // //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
// // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// // //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// // //                                 <React.Fragment key={category}>
// // //                                     <tr>
// // //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// // //                                     </tr>
// // //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
// // //                                 </React.Fragment>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>
// // //                 </div>
// // //             </motion.div>
// // //         );
// // //     };

// // //     const renderAchievements = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Achievements</h3>
// // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// // //                 {achievements.map((achievement) => (
// // //                     <div key={achievement.id} className="text-center">
// // //                         <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'} shadow-lg`}>
// // //                             {<achievement.icon size={32} className="text-white" />}
// // //                         </div>
// // //                         <div className="text-white text-sm font-medium">{achievement.name}</div>
// // //                         <div className="text-slate-400 text-xs">{achievement.description}</div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderBadges = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Badges</h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {badges.map((badge) => (
// // //                     <div key={badge.id} className={`p-6 rounded-xl border-2 ${badge.unlocked ? 'bg-slate-800/50 border-cyan-400/50' : 'bg-slate-800/30 border-slate-600'}`}>
// // //                         <div className="flex items-center gap-4">
// // //                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? `bg-${badge.color}-500` : 'bg-slate-600'}`}>
// // //                                 <Award size={24} className="text-white" />
// // //                             </div>
// // //                             <div className="flex-1">
// // //                                 <h4 className="text-white font-semibold">{badge.name}</h4>
// // //                                 <p className="text-slate-400 text-sm">{badge.description}</p>
// // //                                 <div className={`text-xs mt-1 ${badge.unlocked ? 'text-green-400' : 'text-slate-500'}`}>
// // //                                     {badge.unlocked ? '✓ Earned' : 'Locked'}
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderPoints = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Points & Stats</h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                 {[
// // //                     { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, icon: Code },
// // //                     { label: 'Current Streak', value: stats.currentStreak, icon: Star },
// // //                     { label: 'Max Streak', value: stats.maxStreak, icon: Star },
// // //                     { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Globe }
// // //                 ].map((stat) => (
// // //                     <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
// // //                         <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
// // //                             <stat.icon size={24} className="text-white" />
// // //                         </div>
// // //                         <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
// // //                         <div className="text-sm text-slate-400">{stat.label}</div>
// // //                         {stat.total && <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>}
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderTransactions = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Transaction History</h3>
// // //             <p className="text-slate-400 text-sm mb-4">View your payment and subscription history.</p>
// // //             <div className="space-y-4">
// // //                 {[
// // //                     { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
// // //                     { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
// // //                 ].map((transaction) => (
// // //                     <div key={transaction.id} className="p-4 bg-slate-800/50 rounded-lg">
// // //                         <div className="flex items-center justify-between">
// // //                             <div className="flex items-center gap-3">
// // //                                 <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
// // //                                     <DollarSign size={18} className="text-white" />
// // //                                 </div>
// // //                                 <div>
// // //                                     <div className="text-white font-medium">{transaction.type}</div>
// // //                                     <div className="text-slate-400 text-sm">{transaction.date}</div>
// // //                                 </div>
// // //                             </div>
// // //                             <div className="text-right">
// // //                                 <div className="text-green-400 font-semibold">{transaction.amount}</div>
// // //                                 <div className="text-slate-400 text-sm">{transaction.status}</div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderHelp = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Help & Support</h3>
// // //             <div className="space-y-6">
// // //                 <div className="text-center mb-8">
// // //                     <p className="text-slate-400">Get quick answers from our automated assistant.</p>
// // //                 </div>
                
// // //                 {/* Chatbot Interface */}
// // //                 <div className="flex flex-col h-[500px] bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
// // //                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
// // //                         {chatMessages.map((msg, index) => (
// // //                             <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
// // //                                 <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
// // //                                     {msg.text}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                     <form onSubmit={handleChatbotSubmit} className="p-4 border-t border-gray-700 flex gap-2">
// // //                         <input
// // //                             type="text"
// // //                             value={chatInput}
// // //                             onChange={(e) => setChatInput(e.target.value)}
// // //                             placeholder="Ask a question..."
// // //                             className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
// // //                         />
// // //                         <button type="submit" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white">
// // //                             <MessageSquare size={20} />
// // //                         </button>
// // //                     </form>
// // //                 </div>
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderReports = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Reports</h3>
// // //             <div className="space-y-4">
// // //                 {showSuccessMessage && (
// // //                     <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
// // //                         <div className="flex items-center gap-3">
// // //                             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// // //                                 <CheckCircle size={16} className="text-white" />
// // //                             </div>
// // //                             <div>
// // //                                 <p className="text-green-200 font-medium">Report Submitted Successfully!</p>
// // //                                 <p className="text-green-300/80 text-sm">Thank you for your feedback.</p>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 <div className="p-6 bg-slate-800/50 rounded-xl">
// // //                     <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
// // //                     <textarea
// // //                         value={reportText}
// // //                         onChange={(e) => setReportText(e.target.value)}
// // //                         placeholder="Describe the issue you encountered..."
// // //                         className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
// // //                         rows={4}
// // //                     />
// // //                     <button 
// // //                         onClick={handleSubmitReport}
// // //                         className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
// // //                     >
// // //                         Submit Report
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderComingSoon = () => (
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16 bg-slate-800/50 rounded-xl border border-gray-700">
// // //             <div className="flex flex-col items-center justify-center">
// // //                 <Settings size={64} className="mx-auto mb-4 text-slate-600" />
// // //                 <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
// // //                 <p className="text-slate-400">This section is under development.</p>
// // //             </div>
// // //         </motion.div>
// // //     );

// // //     const renderContent = () => {
// // //         if (!profileData) return null;
// // //         switch (activeTab) {
// // //             case 'basic-info': return renderBasicInfo();
// // //             case 'account': return renderAccountInfo();
// // //             case 'privacy': return renderPrivacySettings();
// // //             case 'notifications': return renderNotificationSettings();
// // //             case 'achievements': return renderAchievements();
// // //             case 'badges': return renderBadges();
// // //             case 'points': return renderPoints();
// // //             case 'transactions': return renderTransactions();
// // //             case 'reports': return renderReports();
// // //             case 'help': return renderHelp();
// // //             case 'billing':
// // //             case 'orders':
// // //                 return renderComingSoon();
// // //             default:
// // //                 return null;
// // //         }
// // //     };

// // //     const sidebarItems = [
// // //         { id: 'basic-info', label: 'Basic Info', icon: User },
// // //         { id: 'account', label: 'Account', icon: Settings },
// // //         { id: 'privacy', label: 'Privacy', icon: Shield },
// // //         { id: 'notifications', label: 'Notifications', icon: Bell },
// // //         { id: 'achievements', label: 'Achievements', icon: Trophy },
// // //         { id: 'badges', label: 'Badges', icon: Award },
// // //         { id: 'points', label: 'Points', icon: Star },
// // //         { id: 'transactions', label: 'Transactions', icon: DollarSign },
// // //         { id: 'reports', label: 'Reports', icon: Flag },
// // //         { id: 'help', label: 'Help & Support', icon: HelpCircle },
// // //         { id: 'billing', label: 'Billing', icon: CreditCard },
// // //         { id: 'orders', label: 'Orders', icon: FileText }
// // //     ];

// // //     if (authLoading || pageLoading) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // //                 <p className="ml-3 text-lg">Loading profile...</p>
// // //             </div>
// // //         );
// // //     }
// // //     if (!isAuthenticated) {
// // //         return <Navigate to="/login" />;
// // //     }
// // //     if (fetchError) {
// // //         return (
// // //             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
// // //                 <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
// // //                 <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Loading Profile</button>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="min-h-screen bg-slate-950 text-slate-200">
// // //             <Header />
// // //             <main className="container mx-auto px-4 py-8">
// // //                 <motion.div 
// // //                     className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
// // //                     initial={{ opacity: 0, y: 50 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ duration: 0.8 }}
// // //                 >
// // //                     <div className="flex items-center gap-6">
// // //                         <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center">
// // //                             <User size={40} className="text-slate-400" />
// // //                         </div>
// // //                         <div>
// // //                             <h1 className="text-2xl font-bold text-white mb-1">{profileData.firstname}</h1>
// // //                             <p className="text-slate-400">ID: {profileData._id}</p>
// // //                         </div>
// // //                     </div>
// // //                 </motion.div>

// // //                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// // //                     <motion.div 
// // //                         className="lg:col-span-1"
// // //                         initial={{ opacity: 0, x: -50 }}
// // //                         animate={{ opacity: 1, x: 0 }}
// // //                         transition={{ duration: 0.8 }}
// // //                     >
// // //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm">
// // //                             <nav className="space-y-2">
// // //                                 {sidebarItems.map((item) => (
// // //                                     <button
// // //                                         key={item.id}
// // //                                         onClick={() => setActiveTab(item.id)}
// // //                                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
// // //                                             activeTab === item.id
// // //                                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
// // //                                                 : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
// // //                                         }`}
// // //                                     >
// // //                                         <item.icon size={18} />
// // //                                         <span className="font-medium">{item.label}</span>
// // //                                     </button>
// // //                                 ))}
// // //                             </nav>
// // //                         </div>
// // //                     </motion.div>

// // //                     <div className="lg:col-span-3">
// // //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
// // //                             {renderContent()}
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </main>
// // //         </div>
// // //     );
// // // }

// // // export default ProfilePage;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink, Navigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { motion } from 'framer-motion';
// // import { 
// //     User, Edit3, Save, X, Star, Trophy, Award, Target, 
// //     Code, Calendar, MapPin, Globe, Github, Linkedin, 
// //     Twitter, Briefcase, GraduationCap, Settings, Shield,
// //     Bell, CreditCard, FileText, DollarSign, HelpCircle, Flag,
// //     CheckCircle, MessageSquare
// // } from 'lucide-react';
// // import axiosClient from '../utils/axiosClient';
// // import { logoutUser } from '../authSlice';
// // import Header from '../components/dashboard/Header';

// // // --- Helper Functions ---
// // const capitalizeWords = (str) => {
// //     if (typeof str !== 'string' || !str) return '';
// //     return str
// //         .split(' ')
// //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //         .join(' ');
// // };

// // const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
// //     importantAnnouncements: { email: true, site: false },
// //     featureAnnouncements: { email: true, site: false },
// //     awardNotification: { email: true, site: true },
// //     globalRanking: { email: false, site: true },
// //     contestBadge: { email: false, site: true },
// //     contestAnnouncements: { email: true, site: true },
// //     newComment: { email: false, site: true },
// //     otherNotifications: { email: true, site: false },
// //     promotions: { email: true, site: false },
// //     weeklyRecommendations: { email: true, site: false },
// // };

// // const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
// //     contactByCompanies: true,
// //     joinStudyPlanLeaderboard: true,
// //     displaySubmissionHistory: true,
// // };

// // // --- EditableField Component (Extracted and Improved) ---
// // const EditableField = ({ label, value, onSave, onCancel, isEditing, onEdit, type = 'text', placeholder, points = 0, icon: Icon, options }) => {
// //     const [tempValue, setTempValue] = useState(value);

// //     useEffect(() => {
// //         setTempValue(value);
// //     }, [value]);

// //     const handleSave = () => {
// //         onSave(tempValue);
// //     };

// //     const handleCancel = () => {
// //         setTempValue(value);
// //         onCancel();
// //     };

// //     const renderInput = () => {
// //         if (type === 'textarea') {
// //             return (
// //                 <textarea
// //                     value={tempValue}
// //                     onChange={(e) => setTempValue(e.target.value)}
// //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// //                     placeholder={placeholder}
// //                     rows="3"
// //                 />
// //             );
// //         }
// //         if (type === 'select' && options) {
// //             return (
// //                 <select
// //                     value={tempValue}
// //                     onChange={(e) => setTempValue(e.target.value)}
// //                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// //                 >
// //                     {options.map((opt) => (
// //                         <option key={opt} value={opt}>{opt}</option>
// //                     ))}
// //                 </select>
// //             );
// //         }
// //         return (
// //             <input
// //                 type={type}
// //                 value={tempValue}
// //                 onChange={(e) => setTempValue(e.target.value)}
// //                 className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
// //                 placeholder={placeholder}
// //             />
// //         );
// //     };

// //     return (
// //         <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-colors border border-gray-700/50 hover:bg-slate-800/70">
// //             <div className="flex-1 flex items-center gap-3 mb-2 md:mb-0">
// //                 <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
// //                     <Icon size={18} className="text-cyan-400" />
// //                 </div>
// //                 <div>
// //                     <div className="text-white font-medium">{label}</div>
// //                     {isEditing ? (
// //                         renderInput()
// //                     ) : (
// //                         <div className="text-slate-400 text-sm">{value || <span className="italic">{placeholder || 'Not provided'}</span>}</div>
// //                     )}
// //                 </div>
// //             </div>
            
// //             <div className="flex items-center gap-2">
// //                 {points > 0 && !isEditing && (
// //                     <span className="text-cyan-400 text-sm font-medium">+{points}</span>
// //                 )}
// //                 {isEditing ? (
// //                     <div className="flex gap-1">
// //                         <button
// //                             onClick={handleSave}
// //                             className="p-1 bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
// //                         >
// //                             <Save size={16} />
// //                         </button>
// //                         <button
// //                             onClick={handleCancel}
// //                             className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
// //                         >
// //                             <X size={16} />
// //                         </button>
// //                     </div>
// //                 ) : (
// //                     <button
// //                         onClick={() => onEdit()}
// //                         className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
// //                     >
// //                         <Edit3 size={16} />
// //                     </button>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // // --- Main Profile Page Component ---
// // function ProfilePage() {
// //     const dispatch = useDispatch();
// //     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

// //     const [profileData, setProfileData] = useState(null);
// //     const [pageLoading, setPageLoading] = useState(true);
// //     const [fetchError, setFetchError] = useState(null);
// //     const [activeTab, setActiveTab] = useState('basic-info');
    
// //     const [editingField, setEditingField] = useState(null);
// //     const [editingPrivacyField, setEditingPrivacyField] = useState(null);
// //     const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// //     const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// //     const [reportText, setReportText] = useState('');
// //     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

// //     // Chatbot state
// //     const [chatMessages, setChatMessages] = useState([]);
// //     const [chatInput, setChatInput] = useState('');

// //     const chatbotResponses = {
// //         'getting started': "Welcome! To get started, you can explore the 'Problems' section to solve your first challenge, or check out a 'Study Plan' to guide your learning.",
// //         'problem solving': "Having trouble with a problem? Try breaking it down into smaller steps, drawing out the data flow, or searching for similar problems in the 'Discuss' section.",
// //         'contests': "To join a contest, simply go to the 'Contests' tab and register for an upcoming event. Make sure you're on time to compete for a prize!",
// //         'account issues': "For account issues, you can try resetting your password from the login page or send a detailed report from the 'Reports' tab. Our support team will help you out.",
// //         'hello': "Hi there! I'm here to help. What can I assist you with today?",
// //         'default': "I'm sorry, I don't have information on that topic yet. Please select from the options provided or try asking a different question."
// //     };

// //     const handleChatbotSubmit = (e) => {
// //         e.preventDefault();
// //         if (chatInput.trim() === '') return;

// //         const userMessage = chatInput;
// //         setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
// //         setChatInput('');

// //         // Simulate a delay for the bot's response
// //         setTimeout(() => {
// //             const normalizedInput = userMessage.toLowerCase().trim();
// //             let botResponse = chatbotResponses.default;

// //             if (normalizedInput.includes('getting started')) {
// //                 botResponse = chatbotResponses['getting started'];
// //             } else if (normalizedInput.includes('problem solving')) {
// //                 botResponse = chatbotResponses['problem solving'];
// //             } else if (normalizedInput.includes('contests')) {
// //                 botResponse = chatbotResponses['contests'];
// //             } else if (normalizedInput.includes('account issues')) {
// //                 botResponse = chatbotResponses['account issues'];
// //             } else if (normalizedInput.includes('hello')) {
// //                 botResponse = chatbotResponses['hello'];
// //             }
            
// //             setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
// //         }, 1000);
// //     };

// //     // Sample data for static sections
// //     const achievements = [
// //         { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: Trophy },
// //         { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: Trophy },
// //         { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: Target },
// //         { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: Code },
// //     ];

// //     const badges = [
// //         { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
// //         { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
// //         { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
// //         { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
// //     ];

// //     const stats = {
// //         problemsSolved: 117,
// //         totalProblems: 3617,
// //         easySolved: 40,
// //         easyTotal: 885,
// //         mediumSolved: 62,
// //         mediumTotal: 1881,
// //         hardSolved: 15,
// //         hardTotal: 851,
// //         currentStreak: 5,
// //         maxStreak: 34,
// //         rank: 1081203,
// //         reputation: 1,
// //         views: 107,
// //         solutions: 3,
// //         discussions: 0
// //     };

// //     useEffect(() => {
// //         const fetchProfileData = async () => {
// //             if (!isAuthenticated) { 
// //                 setPageLoading(false);
// //                 return;
// //             }
// //             try {
// //                 setPageLoading(true);
// //                 setFetchError(null);
// //                 const res = await axiosClient.get('/profile');
// //                 setProfileData(res.data);
// //                 setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// //                 setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// //             } catch (err) {
// //                 console.error('Error fetching profile data:', err);
// //                 setFetchError('Failed to load profile data. Please try again.');
// //                 if (err.response?.status === 401) {
// //                     dispatch(logoutUser()); 
// //                 }
// //             } finally {
// //                 setPageLoading(false);
// //             }
// //         };

// //         if (isAuthenticated && !authLoading) {
// //             fetchProfileData();
// //         } else if (!isAuthenticated && !authLoading) {
// //             setPageLoading(false);
// //         }
// //     }, [isAuthenticated, authLoading, dispatch]);

// //     const handleSaveBasicInfo = async (fieldPath, value) => {
// //         try {
// //             setFetchError(null);
// //             let valueToSave = value;
// //             if (fieldPath === 'profile.gender') {
// //                 valueToSave = value === 'Not provided' ? '' : value;
// //             } else if (fieldPath === 'profile.birthday') {
// //                 valueToSave = value ? new Date(value).toISOString() : null;
// //             }

// //             const res = await axiosClient.put('/profile/field', { field: fieldPath, value: valueToSave });
// //             setProfileData(res.data.user);
// //             setEditingField(null);
// //         } catch (err) {
// //             console.error('Error updating field:', fieldPath, err);
// //             setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
// //         }
// //     };

// //     const handleNotificationChange = async (setting, type, checked) => {
// //         try {
// //             setFetchError(null);
// //             setNotificationSettings(prev => ({ ...prev, [setting]: { ...prev[setting], [type]: checked } }));
// //             await axiosClient.put('/profile/settings/notifications', { setting, type, value: checked });
// //         } catch (err) {
// //             console.error('Error updating notification setting:', err);
// //             setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
// //             setFetchError('Failed to update notification setting. Please retry.');
// //         }
// //     };

// //     const handlePrivacyChange = async (field, value) => {
// //         try {
// //             setFetchError(null);
// //             const booleanValue = value === 'Yes';
// //             setPrivacySettings(prev => ({ ...prev, [field]: booleanValue }));
// //             await axiosClient.put('/profile/settings/privacy', { field, value: booleanValue });
// //             setEditingPrivacyField(null);
// //         } catch (err) {
// //             console.error('Error updating privacy setting:', err);
// //             setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
// //             setFetchError('Failed to update privacy setting. Please retry.');
// //         }
// //     };

// //     const handleSubmitReport = () => {
// //         if (reportText.trim() === '') {
// //             setFetchError('Please enter a report description.');
// //             return;
// //         }
// //         console.log('Report submitted:', reportText);
// //         setShowSuccessMessage(true);
// //         setReportText('');
// //         setTimeout(() => setShowSuccessMessage(false), 3000);
// //     };

// //     // --- Render Functions for Each Tab ---
// //     const renderBasicInfo = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
// //             <div className="space-y-6">
// //                 <EditableField
// //                     label="Name"
// //                     value={profileData.firstname || ''}
// //                     onSave={(value) => handleSaveBasicInfo('firstname', value)}
// //                     isEditing={editingField === 'firstname'}
// //                     onEdit={() => setEditingField('firstname')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={User}
// //                     points={2}
// //                     placeholder="Enter your full name"
// //                 />
// //                 <EditableField
// //                     label="Gender"
// //                     value={profileData.profile?.gender || 'Not provided'}
// //                     onSave={(value) => handleSaveBasicInfo('profile.gender', value)}
// //                     isEditing={editingField === 'profile.gender'}
// //                     onEdit={() => setEditingField('profile.gender')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={User}
// //                     type="select"
// //                     options={['Not provided', 'Male', 'Female', 'Other']}
// //                     points={2}
// //                 />
// //                 <EditableField
// //                     label="Location"
// //                     value={profileData.profile?.location || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.location', value)}
// //                     isEditing={editingField === 'profile.location'}
// //                     onEdit={() => setEditingField('profile.location')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={MapPin}
// //                     points={2}
// //                     placeholder="City, Country"
// //                 />
// //                 <EditableField
// //                     label="Birthday"
// //                     value={profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.birthday', value)}
// //                     isEditing={editingField === 'profile.birthday'}
// //                     onEdit={() => setEditingField('profile.birthday')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Calendar}
// //                     type="date"
// //                     points={2}
// //                 />
// //                 <EditableField
// //                     label="Summary"
// //                     value={profileData.profile?.summary || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.summary', value)}
// //                     isEditing={editingField === 'profile.summary'}
// //                     onEdit={() => setEditingField('profile.summary')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={FileText}
// //                     type="textarea"
// //                     points={2}
// //                     placeholder="Tell us about yourself..."
// //                 />
// //                 <EditableField
// //                     label="Website"
// //                     value={profileData.profile?.website || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.website', value)}
// //                     isEditing={editingField === 'profile.website'}
// //                     onEdit={() => setEditingField('profile.website')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Globe}
// //                     points={2}
// //                     placeholder="https://your-website.com"
// //                 />
// //                 <EditableField
// //                     label="Github"
// //                     value={profileData.profile?.github || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.github', value)}
// //                     isEditing={editingField === 'profile.github'}
// //                     onEdit={() => setEditingField('profile.github')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Github}
// //                     points={2}
// //                     placeholder="https://github.com/yourusername"
// //                 />
// //                 <EditableField
// //                     label="LinkedIn"
// //                     value={profileData.profile?.linkedin || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.linkedin', value)}
// //                     isEditing={editingField === 'profile.linkedin'}
// //                     onEdit={() => setEditingField('profile.linkedin')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Linkedin}
// //                     points={2}
// //                     placeholder="https://linkedin.com/in/yourprofile"
// //                 />
// //                 <EditableField
// //                     label="X (formerly Twitter)"
// //                     value={profileData.profile?.twitter || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.twitter', value)}
// //                     isEditing={editingField === 'profile.twitter'}
// //                     onEdit={() => setEditingField('profile.twitter')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Twitter}
// //                     points={2}
// //                     placeholder="https://x.com/yourusername"
// //                 />
// //                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
// //                 <EditableField
// //                     label="Work"
// //                     value={profileData.profile?.work || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.work', value)}
// //                     isEditing={editingField === 'profile.work'}
// //                     onEdit={() => setEditingField('profile.work')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Briefcase}
// //                     points={2}
// //                     placeholder="Your current job title and company"
// //                 />
// //                 <EditableField
// //                     label="Education"
// //                     value={profileData.profile?.education || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.education', value)}
// //                     isEditing={editingField === 'profile.education'}
// //                     onEdit={() => setEditingField('profile.education')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={GraduationCap}
// //                     points={2}
// //                     placeholder="Your educational background"
// //                 />
// //                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
// //                 <EditableField
// //                     label="Technical Skills"
// //                     value={profileData.profile?.skills || ''}
// //                     onSave={(value) => handleSaveBasicInfo('profile.skills', value)}
// //                     isEditing={editingField === 'profile.skills'}
// //                     onEdit={() => setEditingField('profile.skills')}
// //                     onCancel={() => setEditingField(null)}
// //                     icon={Code}
// //                     points={2}
// //                     placeholder="List your programming languages and technologies"
// //                 />
// //             </div>
// //         </motion.div>
// //     );

// //     const renderAccountInfo = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
// //             <div className="space-y-6">
// //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// //                     <div className="flex-1">
// //                         <p className="text-gray-400 text-sm mb-1">ID</p>
// //                         <p className="text-white text-lg">{profileData.firstname?.toLowerCase() || ''}{profileData._id?.slice(0, 5) || ''}</p>
// //                     </div>
// //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// //                 </div>
// //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
// //                     <div className="flex-1">
// //                         <p className="text-gray-400 text-sm mb-1">Email</p>
// //                         <p className="text-white text-lg">{profileData.emailId || 'N/A'}</p>
// //                     </div>
// //                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
// //                 </div>
// //                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
// //                     <div className="flex-1">
// //                         <p className="text-gray-400 text-sm mb-1">Password</p>
// //                         <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
// //                     </div>
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Accounts</h3>
// //                 <div className="space-y-4">
// //                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// //                         <div className="flex items-center">
// //                             <span className="mr-3 text-2xl font-bold text-blue-500">in</span>
// //                             <p className="text-white text-lg">LinkedIn</p>
// //                         </div>
// //                         <div className="flex items-center gap-4">
// //                             <span className="text-gray-400">Not Connected</span>
// //                             <span className="text-green-400">+10</span> 
// //                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// //                         <div className="flex items-center">
// //                             <span className="mr-3 text-2xl font-bold text-gray-400">Gh</span>
// //                             <p className="text-white text-lg">Github</p>
// //                         </div>
// //                         <div className="flex items-center gap-4">
// //                             <span className="text-gray-400">Not Connected</span>
// //                             <span className="text-green-400">+10</span> 
// //                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">Delete Account</button>
// //             </div>
// //         </motion.div>
// //     );

// //     const renderPrivacySettings = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
// //             <div className="space-y-8">
// //                 {[
// //                     { field: 'contactByCompanies', label: 'Can companies contact you?', description: 'We will only send your contact info to interested partners.' },
// //                     { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Changes apply at the start of each week.' },
// //                     { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'History will not be visible to others on your profile.' }
// //                 ].map(({ field, label, description }) => (
// //                     <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
// //                         <div className="flex-1 pr-4 mb-4 lg:mb-0">
// //                             <p className="text-white text-lg font-medium">{label}</p>
// //                             <p className="text-gray-400 text-sm mt-1">{description}</p>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                             {editingPrivacyField === field ? (
// //                                 <>
// //                                     <select
// //                                         className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
// //                                         value={privacySettings[field] ? 'Yes' : 'No'}
// //                                         onChange={(e) => setPrivacySettings(prev => ({ ...prev, [field]: e.target.value === 'Yes' }))}
// //                                     >
// //                                         <option value="Yes">Yes</option>
// //                                         <option value="No">No</option>
// //                                     </select>
// //                                     <button className="btn btn-sm btn-primary" onClick={() => handlePrivacyChange(field, privacySettings[field] ? 'Yes' : 'No')}>Save</button>
// //                                     <button className="btn btn-sm btn-ghost" onClick={() => setEditingPrivacyField(null)}>Cancel</button>
// //                                 </>
// //                             ) : (
// //                                 <>
// //                                     <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
// //                                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => setEditingPrivacyField(field)}>Edit</button>
// //                                 </>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </motion.div>
// //     );

// //     const renderNotificationSettings = () => {
// //         const notificationCategories = {
// //             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
// //             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
// //             Other: ['otherNotifications', 'promotions', 'weeklyRecommendations'],
// //         };

// //         const renderCheckboxRow = (settingKey, label) => (
// //             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
// //                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
// //                 <td className="py-3 px-4 text-center">
// //                     <input
// //                         type="checkbox"
// //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// //                         checked={notificationSettings[settingKey]?.email || false}
// //                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
// //                     />
// //                 </td>
// //                 <td className="py-3 px-4 text-center">
// //                     <input
// //                         type="checkbox"
// //                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
// //                         checked={notificationSettings[settingKey]?.site || false}
// //                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
// //                     />
// //                 </td>
// //             </tr>
// //         );

// //         return (
// //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
// //                 <div className="overflow-x-auto">
// //                     <table className="table w-full text-slate-200">
// //                         <thead>
// //                             <tr className="border-b border-gray-700 bg-gray-700/50">
// //                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
// //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
// //                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {Object.entries(notificationCategories).map(([category, settings]) => (
// //                                 <React.Fragment key={category}>
// //                                     <tr>
// //                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
// //                                     </tr>
// //                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
// //                                 </React.Fragment>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </motion.div>
// //         );
// //     };

// //     const renderAchievements = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Achievements</h3>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //                 {achievements.map((achievement) => (
// //                     <div key={achievement.id} className="text-center">
// //                         <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'} shadow-lg`}>
// //                             {<achievement.icon size={32} className="text-white" />}
// //                         </div>
// //                         <div className="text-white text-sm font-medium">{achievement.name}</div>
// //                         <div className="text-slate-400 text-xs">{achievement.description}</div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </motion.div>
// //     );

// //     const renderBadges = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Badges</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {badges.map((badge) => (
// //                     <div key={badge.id} className={`p-6 rounded-xl border-2 ${badge.unlocked ? 'bg-slate-800/50 border-cyan-400/50' : 'bg-slate-800/30 border-slate-600'}`}>
// //                         <div className="flex items-center gap-4">
// //                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? `bg-${badge.color}-500` : 'bg-slate-600'}`}>
// //                                 <Award size={24} className="text-white" />
// //                             </div>
// //                             <div className="flex-1">
// //                                 <h4 className="text-white font-semibold">{badge.name}</h4>
// //                                 <p className="text-slate-400 text-sm">{badge.description}</p>
// //                                 <div className={`text-xs mt-1 ${badge.unlocked ? 'text-green-400' : 'text-slate-500'}`}>
// //                                     {badge.unlocked ? '✓ Earned' : 'Locked'}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </motion.div>
// //     );

// //     const renderPoints = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Points & Stats</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 {[
// //                     { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, icon: Code },
// //                     { label: 'Current Streak', value: stats.currentStreak, icon: Star },
// //                     { label: 'Max Streak', value: stats.maxStreak, icon: Star },
// //                     { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Globe }
// //                 ].map((stat) => (
// //                     <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
// //                         <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                             <stat.icon size={24} className="text-white" />
// //                         </div>
// //                         <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
// //                         <div className="text-sm text-slate-400">{stat.label}</div>
// //                         {stat.total && <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>}
// //                     </div>
// //                 ))}
// //             </div>
// //         </motion.div>
// //     );

// //     const renderTransactions = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Transaction History</h3>
// //             <p className="text-slate-400 text-sm mb-4">View your payment and subscription history.</p>
// //             <div className="space-y-4">
// //                 {[
// //                     { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
// //                     { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
// //                 ].map((transaction) => (
// //                     <div key={transaction.id} className="p-4 bg-slate-800/50 rounded-lg">
// //                         <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
// //                                     <DollarSign size={18} className="text-white" />
// //                                 </div>
// //                                 <div>
// //                                     <div className="text-white font-medium">{transaction.type}</div>
// //                                     <div className="text-slate-400 text-sm">{transaction.date}</div>
// //                                 </div>
// //                             </div>
// //                             <div className="text-right">
// //                                 <div className="text-green-400 font-semibold">{transaction.amount}</div>
// //                                 <div className="text-slate-400 text-sm">{transaction.status}</div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </motion.div>
// //     );

// //     const renderHelp = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Help & Support</h3>
// //             <div className="space-y-6">
// //                 <div className="text-center mb-8">
// //                     <p className="text-slate-400">Get quick answers from our automated assistant.</p>
// //                 </div>
                
// //                 {/* Chatbot Interface */}
// //                 <div className="flex flex-col h-[500px] bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
// //                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //                         {chatMessages.map((msg, index) => (
// //                             <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
// //                                 <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
// //                                     {msg.text}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <form onSubmit={handleChatbotSubmit} className="p-4 border-t border-gray-700 flex gap-2">
// //                         <input
// //                             type="text"
// //                             value={chatInput}
// //                             onChange={(e) => setChatInput(e.target.value)}
// //                             placeholder="Ask a question..."
// //                             className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
// //                         />
// //                         <button type="submit" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white">
// //                             <MessageSquare size={20} />
// //                         </button>
// //                     </form>
// //                 </div>
// //             </div>
// //         </motion.div>
// //     );

// //     const renderReports = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Reports</h3>
// //             <div className="space-y-4">
// //                 {showSuccessMessage && (
// //                     <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
// //                         <div className="flex items-center gap-3">
// //                             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
// //                                 <CheckCircle size={16} className="text-white" />
// //                             </div>
// //                             <div>
// //                                 <p className="text-green-200 font-medium">Report Submitted Successfully!</p>
// //                                 <p className="text-green-300/80 text-sm">Thank you for your feedback.</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //                 <div className="p-6 bg-slate-800/50 rounded-xl">
// //                     <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
// //                     <textarea
// //                         value={reportText}
// //                         onChange={(e) => setReportText(e.target.value)}
// //                         placeholder="Describe the issue you encountered..."
// //                         className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
// //                         rows={4}
// //                     />
// //                     <button 
// //                         onClick={handleSubmitReport}
// //                         className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
// //                     >
// //                         Submit Report
// //                     </button>
// //                 </div>
// //             </div>
// //         </motion.div>
// //     );

// //     const renderComingSoon = () => (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16 bg-slate-800/50 rounded-xl border border-gray-700">
// //             <div className="flex flex-col items-center justify-center">
// //                 <Settings size={64} className="mx-auto mb-4 text-slate-600" />
// //                 <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
// //                 <p className="text-slate-400">This section is under development.</p>
// //             </div>
// //         </motion.div>
// //     );

// //     const renderContent = () => {
// //         if (!profileData) return null;
// //         switch (activeTab) {
// //             case 'basic-info': return renderBasicInfo();
// //             case 'account': return renderAccountInfo();
// //             case 'privacy': return renderPrivacySettings();
// //             case 'notifications': return renderNotificationSettings();
// //             case 'achievements': return renderAchievements();
// //             case 'badges': return renderBadges();
// //             case 'points': return renderPoints();
// //             case 'transactions': return renderTransactions();
// //             case 'reports': return renderReports();
// //             case 'help': return renderHelp();
// //             case 'billing':
// //             case 'orders':
// //                 return renderComingSoon();
// //             default:
// //                 return null;
// //         }
// //     };

// //     const sidebarItems = [
// //         { id: 'basic-info', label: 'Basic Info', icon: User },
// //         { id: 'account', label: 'Account', icon: Settings },
// //         { id: 'privacy', label: 'Privacy', icon: Shield },
// //         { id: 'notifications', label: 'Notifications', icon: Bell },
// //         { id: 'achievements', label: 'Achievements', icon: Trophy },
// //         { id: 'badges', label: 'Badges', icon: Award },
// //         { id: 'points', label: 'Points', icon: Star },
// //         { id: 'transactions', label: 'Transactions', icon: DollarSign },
// //         { id: 'reports', label: 'Reports', icon: Flag },
// //         { id: 'help', label: 'Help & Support', icon: HelpCircle },
// //         { id: 'billing', label: 'Billing', icon: CreditCard },
// //         { id: 'orders', label: 'Orders', icon: FileText }
// //     ];

// //     if (authLoading || pageLoading) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
// //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// //                 <p className="ml-3 text-lg">Loading profile...</p>
// //             </div>
// //         );
// //     }
// //     if (!isAuthenticated) {
// //         return <Navigate to="/login" />;
// //     }
// //     if (fetchError) {
// //         return (
// //             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
// //                 <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
// //                 <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Loading Profile</button>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-slate-950 text-slate-200">
// //             <Header />
// //             <main className="container mx-auto px-4 py-8">
// //                 <motion.div 
// //                     className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
// //                     initial={{ opacity: 0, y: 50 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.8 }}
// //                 >
// //                     <div className="flex items-center gap-6">
// //                         <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center">
// //                             <User size={40} className="text-slate-400" />
// //                         </div>
// //                         <div>
// //                             <h1 className="text-2xl font-bold text-white mb-1">{profileData.firstname}</h1>
// //                             <p className="text-slate-400">ID: {profileData._id}</p>
// //                         </div>
// //                     </div>
// //                 </motion.div>

// //                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //                     <motion.div 
// //                         className="lg:col-span-1"
// //                         initial={{ opacity: 0, x: -50 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ duration: 0.8 }}
// //                     >
// //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm">
// //                             <nav className="space-y-2">
// //                                 {sidebarItems.map((item) => (
// //                                     <button
// //                                         key={item.id}
// //                                         onClick={() => setActiveTab(item.id)}
// //                                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
// //                                             activeTab === item.id
// //                                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
// //                                                 : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
// //                                         }`}
// //                                     >
// //                                         <item.icon size={18} />
// //                                         <span className="font-medium">{item.label}</span>
// //                                     </button>
// //                                 ))}
// //                             </nav>
// //                         </div>
// //                     </motion.div>

// //                     <div className="lg:col-span-3">
// //                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
// //                             {renderContent()}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }

// // export default ProfilePage;
// import React, { useState, useEffect } from 'react';
// import { NavLink, Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { 
//     User, Edit3, Save, X, Star, Trophy, Award, Target, 
//     Code, Calendar, MapPin, Globe, Github, Linkedin, 
//     Twitter, Briefcase, GraduationCap, Settings, Shield,
//     Bell, CreditCard, FileText, DollarSign, HelpCircle, Flag,
//     CheckCircle, MessageSquare
// } from 'lucide-react';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';
// import Header from '../components/dashboard/Header';

// // --- Helper Functions ---
// const capitalizeWords = (str) => {
//     if (typeof str !== 'string' || !str) return '';
//     return str
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// };

// const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
//     importantAnnouncements: { email: true, site: false },
//     featureAnnouncements: { email: true, site: false },
//     awardNotification: { email: true, site: true },
//     globalRanking: { email: false, site: true },
//     contestBadge: { email: false, site: true },
//     contestAnnouncements: { email: true, site: true },
//     newComment: { email: false, site: true },
//     otherNotifications: { email: true, site: false },
//     promotions: { email: true, site: false },
//     weeklyRecommendations: { email: true, site: false },
// };

// const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
//     contactByCompanies: true,
//     joinStudyPlanLeaderboard: true,
//     displaySubmissionHistory: true,
// };

// // --- EditableField Component (Extracted and Improved) ---
// const EditableField = ({ label, value, onSave, onCancel, isEditing, onEdit, type = 'text', placeholder, points = 0, icon: Icon, options }) => {
//     const [tempValue, setTempValue] = useState(value);

//     useEffect(() => {
//         setTempValue(value);
//     }, [value]);

//     const handleSave = () => {
//         onSave(tempValue);
//     };

//     const handleCancel = () => {
//         setTempValue(value);
//         onCancel();
//     };

//     const renderInput = () => {
//         if (type === 'textarea') {
//             return (
//                 <textarea
//                     value={tempValue}
//                     onChange={(e) => setTempValue(e.target.value)}
//                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
//                     placeholder={placeholder}
//                     rows="3"
//                 />
//             );
//         }
//         if (type === 'select' && options) {
//             return (
//                 <select
//                     value={tempValue}
//                     onChange={(e) => setTempValue(e.target.value)}
//                     className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
//                 >
//                     {options.map((opt) => (
//                         <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                 </select>
//             );
//         }
//         return (
//             <input
//                 type={type}
//                 value={tempValue}
//                 onChange={(e) => setTempValue(e.target.value)}
//                 className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
//                 placeholder={placeholder}
//             />
//         );
//     };

//     return (
//         <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-colors border border-gray-700/50 hover:bg-slate-800/70">
//             <div className="flex-1 flex items-center gap-3 mb-2 md:mb-0">
//                 <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
//                     <Icon size={18} className="text-cyan-400" />
//                 </div>
//                 <div>
//                     <div className="text-white font-medium">{label}</div>
//                     {isEditing ? (
//                         renderInput()
//                     ) : (
//                         <div className="text-slate-400 text-sm">{value || <span className="italic">{placeholder || 'Not provided'}</span>}</div>
//                     )}
//                 </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//                 {points > 0 && !isEditing && (
//                     <span className="text-cyan-400 text-sm font-medium">+{points}</span>
//                 )}
//                 {isEditing ? (
//                     <div className="flex gap-1">
//                         <button
//                             onClick={handleSave}
//                             className="p-1 bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
//                         >
//                             <Save size={16} />
//                         </button>
//                         <button
//                             onClick={handleCancel}
//                             className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
//                         >
//                             <X size={16} />
//                         </button>
//                     </div>
//                 ) : (
//                     <button
//                         onClick={() => onEdit()}
//                         className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
//                     >
//                         <Edit3 size={16} />
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// // --- Main Profile Page Component ---
// function ProfilePage() {
//     const dispatch = useDispatch();
//     const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

//     const [profileData, setProfileData] = useState(null);
//     const [pageLoading, setPageLoading] = useState(true);
//     const [fetchError, setFetchError] = useState(null);
//     const [activeTab, setActiveTab] = useState('basic-info');
    
//     const [editingField, setEditingField] = useState(null);
//     const [editingPrivacyField, setEditingPrivacyField] = useState(null);
//     const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
//     const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
//     const [reportText, setReportText] = useState('');
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//     // Chatbot state
//     const [chatMessages, setChatMessages] = useState([]);
//     const [chatInput, setChatInput] = useState('');

//     const chatbotResponses = {
//         'getting started': "Welcome! To get started, you can explore the 'Problems' section to solve your first challenge, or check out a 'Study Plan' to guide your learning.",
//         'problem solving': "Having trouble with a problem? Try breaking it down into smaller steps, drawing out the data flow, or searching for similar problems in the 'Discuss' section.",
//         'contests': "To join a contest, simply go to the 'Contests' tab and register for an upcoming event. Make sure you're on time to compete for a prize!",
//         'account issues': "For account issues, you can try resetting your password from the login page or send a detailed report from the 'Reports' tab. Our support team will help you out.",
//         'hello': "Hi there! I'm here to help. What can I assist you with today?",
//         'default': "I'm sorry, I don't have information on that topic yet. Please select from the options provided or try asking a different question."
//     };

//     const handleChatbotSubmit = (e) => {
//         e.preventDefault();
//         if (chatInput.trim() === '') return;

//         const userMessage = chatInput;
//         setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
//         setChatInput('');

//         // Simulate a delay for the bot's response
//         setTimeout(() => {
//             const normalizedInput = userMessage.toLowerCase().trim();
//             let botResponse = chatbotResponses.default;

//             if (normalizedInput.includes('getting started')) {
//                 botResponse = chatbotResponses['getting started'];
//             } else if (normalizedInput.includes('problem solving')) {
//                 botResponse = chatbotResponses['problem solving'];
//             } else if (normalizedInput.includes('contests')) {
//                 botResponse = chatbotResponses['contests'];
//             } else if (normalizedInput.includes('account issues')) {
//                 botResponse = chatbotResponses['account issues'];
//             } else if (normalizedInput.includes('hello')) {
//                 botResponse = chatbotResponses['hello'];
//             }
            
//             setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
//         }, 1000);
//     };

//     // Sample data for static sections
//     const achievements = [
//         { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: Trophy },
//         { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: Trophy },
//         { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: Target },
//         { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: Code },
//     ];

//     const badges = [
//         { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
//         { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
//         { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
//         { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
//     ];

//     const stats = {
//         problemsSolved: 117,
//         totalProblems: 3617,
//         easySolved: 40,
//         easyTotal: 885,
//         mediumSolved: 62,
//         mediumTotal: 1881,
//         hardSolved: 15,
//         hardTotal: 851,
//         currentStreak: 5,
//         maxStreak: 34,
//         rank: 1081203,
//         reputation: 1,
//         views: 107,
//         solutions: 3,
//         discussions: 0
//     };

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             if (!isAuthenticated) { 
//                 setPageLoading(false);
//                 return;
//             }
//             try {
//                 setPageLoading(true);
//                 setFetchError(null);
//                 const res = await axiosClient.get('/profile');
//                 setProfileData(res.data);
//                 setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
//                 setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
//             } catch (err) {
//                 console.error('Error fetching profile data:', err);
//                 setFetchError('Failed to load profile data. Please try again.');
//                 if (err.response?.status === 401) {
//                     dispatch(logoutUser()); 
//                 }
//             } finally {
//                 setPageLoading(false);
//             }
//         };

//         if (isAuthenticated && !authLoading) {
//             fetchProfileData();
//         } else if (!isAuthenticated && !authLoading) {
//             setPageLoading(false);
//         }
//     }, [isAuthenticated, authLoading, dispatch]);

//     const handleSaveBasicInfo = async (fieldPath, value) => {
//         try {
//             setFetchError(null);
//             let valueToSave = value;
//             if (fieldPath === 'profile.gender') {
//                 valueToSave = value === 'Not provided' ? '' : value;
//             } else if (fieldPath === 'profile.birthday') {
//                 valueToSave = value ? new Date(value).toISOString() : null;
//             }

//             const res = await axiosClient.put('/profile/field', { field: fieldPath, value: valueToSave });
//             setProfileData(res.data.user);
//             setEditingField(null);
//         } catch (err) {
//             console.error('Error updating field:', fieldPath, err);
//             setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
//         }
//     };

//     const handleNotificationChange = async (setting, type, checked) => {
//         try {
//             setFetchError(null);
//             setNotificationSettings(prev => ({ ...prev, [setting]: { ...prev[setting], [type]: checked } }));
//             await axiosClient.put('/profile/settings/notifications', { setting, type, value: checked });
//         } catch (err) {
//             console.error('Error updating notification setting:', err);
//             setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
//             setFetchError('Failed to update notification setting. Please retry.');
//         }
//     };

//     const handlePrivacyChange = async (field, value) => {
//         try {
//             setFetchError(null);
//             const booleanValue = value === 'Yes';
//             setPrivacySettings(prev => ({ ...prev, [field]: booleanValue }));
//             await axiosClient.put('/profile/settings/privacy', { field, value: booleanValue });
//             setEditingPrivacyField(null);
//         } catch (err) {
//             console.error('Error updating privacy setting:', err);
//             setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
//             setFetchError('Failed to update privacy setting. Please retry.');
//         }
//     };

//     const handleSubmitReport = () => {
//         if (reportText.trim() === '') {
//             setFetchError('Please enter a report description.');
//             return;
//         }
//         console.log('Report submitted:', reportText);
//         setShowSuccessMessage(true);
//         setReportText('');
//         setTimeout(() => setShowSuccessMessage(false), 3000);
//     };

//     // --- Render Functions for Each Tab ---
//     const renderBasicInfo = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
//             <div className="space-y-6">
//                 <EditableField
//                     label="Name"
//                     value={profileData.firstname || ''}
//                     onSave={(value) => handleSaveBasicInfo('firstname', value)}
//                     isEditing={editingField === 'firstname'}
//                     onEdit={() => setEditingField('firstname')}
//                     onCancel={() => setEditingField(null)}
//                     icon={User}
//                     points={2}
//                     placeholder="Enter your full name"
//                 />
//                 <EditableField
//                     label="Gender"
//                     value={profileData.profile?.gender || 'Not provided'}
//                     onSave={(value) => handleSaveBasicInfo('profile.gender', value)}
//                     isEditing={editingField === 'profile.gender'}
//                     onEdit={() => setEditingField('profile.gender')}
//                     onCancel={() => setEditingField(null)}
//                     icon={User}
//                     type="select"
//                     options={['Not provided', 'Male', 'Female', 'Other']}
//                     points={2}
//                 />
//                 <EditableField
//                     label="Location"
//                     value={profileData.profile?.location || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.location', value)}
//                     isEditing={editingField === 'profile.location'}
//                     onEdit={() => setEditingField('profile.location')}
//                     onCancel={() => setEditingField(null)}
//                     icon={MapPin}
//                     points={2}
//                     placeholder="City, Country"
//                 />
//                 <EditableField
//                     label="Birthday"
//                     value={profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.birthday', value)}
//                     isEditing={editingField === 'profile.birthday'}
//                     onEdit={() => setEditingField('profile.birthday')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Calendar}
//                     type="date"
//                     points={2}
//                 />
//                 <EditableField
//                     label="Summary"
//                     value={profileData.profile?.summary || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.summary', value)}
//                     isEditing={editingField === 'profile.summary'}
//                     onEdit={() => setEditingField('profile.summary')}
//                     onCancel={() => setEditingField(null)}
//                     icon={FileText}
//                     type="textarea"
//                     points={2}
//                     placeholder="Tell us about yourself..."
//                 />
//                 <EditableField
//                     label="Website"
//                     value={profileData.profile?.website || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.website', value)}
//                     isEditing={editingField === 'profile.website'}
//                     onEdit={() => setEditingField('profile.website')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Globe}
//                     points={2}
//                     placeholder="https://your-website.com"
//                 />
//                 <EditableField
//                     label="Github"
//                     value={profileData.profile?.github || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.github', value)}
//                     isEditing={editingField === 'profile.github'}
//                     onEdit={() => setEditingField('profile.github')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Github}
//                     points={2}
//                     placeholder="https://github.com/yourusername"
//                 />
//                 <EditableField
//                     label="LinkedIn"
//                     value={profileData.profile?.linkedin || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.linkedin', value)}
//                     isEditing={editingField === 'profile.linkedin'}
//                     onEdit={() => setEditingField('profile.linkedin')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Linkedin}
//                     points={2}
//                     placeholder="https://linkedin.com/in/yourprofile"
//                 />
//                 <EditableField
//                     label="X (formerly Twitter)"
//                     value={profileData.profile?.twitter || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.twitter', value)}
//                     isEditing={editingField === 'profile.twitter'}
//                     onEdit={() => setEditingField('profile.twitter')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Twitter}
//                     points={2}
//                     placeholder="https://x.com/yourusername"
//                 />
//                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
//                 <EditableField
//                     label="Work"
//                     value={profileData.profile?.work || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.work', value)}
//                     isEditing={editingField === 'profile.work'}
//                     onEdit={() => setEditingField('profile.work')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Briefcase}
//                     points={2}
//                     placeholder="Your current job title and company"
//                 />
//                 <EditableField
//                     label="Education"
//                     value={profileData.profile?.education || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.education', value)}
//                     isEditing={editingField === 'profile.education'}
//                     onEdit={() => setEditingField('profile.education')}
//                     onCancel={() => setEditingField(null)}
//                     icon={GraduationCap}
//                     points={2}
//                     placeholder="Your educational background"
//                 />
//                 <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
//                 <EditableField
//                     label="Technical Skills"
//                     value={profileData.profile?.skills || ''}
//                     onSave={(value) => handleSaveBasicInfo('profile.skills', value)}
//                     isEditing={editingField === 'profile.skills'}
//                     onEdit={() => setEditingField('profile.skills')}
//                     onCancel={() => setEditingField(null)}
//                     icon={Code}
//                     points={2}
//                     placeholder="List your programming languages and technologies"
//                 />
//             </div>
//         </motion.div>
//     );

//     const renderAccountInfo = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
//             <div className="space-y-6">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
//                     <div className="flex-1">
//                         <p className="text-gray-400 text-sm mb-1">ID</p>
//                         <p className="text-white text-lg">{profileData.firstname?.toLowerCase() || ''}{profileData._id?.slice(0, 5) || ''}</p>
//                     </div>
//                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
//                 </div>
//                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
//                     <div className="flex-1">
//                         <p className="text-gray-400 text-sm mb-1">Email</p>
//                         <p className="text-white text-lg">{profileData.emailId || 'N/A'}</p>
//                     </div>
//                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
//                 </div>
//                 <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
//                     <div className="flex-1">
//                         <p className="text-gray-400 text-sm mb-1">Password</p>
//                         <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
//                     </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Accounts</h3>
//                 <div className="space-y-4">
//                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
//                         <div className="flex items-center">
//                             <span className="mr-3 text-2xl font-bold text-blue-500">in</span>
//                             <p className="text-white text-lg">LinkedIn</p>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="text-gray-400">Not Connected</span>
//                             <span className="text-green-400">+10</span> 
//                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
//                         <div className="flex items-center">
//                             <span className="mr-3 text-2xl font-bold text-gray-400">Gh</span>
//                             <p className="text-white text-lg">Github</p>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="text-gray-400">Not Connected</span>
//                             <span className="text-green-400">+10</span> 
//                             <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
//                         </div>
//                     </div>
//                 </div>
//                 <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">Delete Account</button>
//             </div>
//         </motion.div>
//     );

//     const renderPrivacySettings = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
//             <div className="space-y-8">
//                 {[
//                     { field: 'contactByCompanies', label: 'Can companies contact you?', description: 'We will only send your contact info to interested partners.' },
//                     { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Changes apply at the start of each week.' },
//                     { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'History will not be visible to others on your profile.' }
//                 ].map(({ field, label, description }) => (
//                     <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
//                         <div className="flex-1 pr-4 mb-4 lg:mb-0">
//                             <p className="text-white text-lg font-medium">{label}</p>
//                             <p className="text-gray-400 text-sm mt-1">{description}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             {editingPrivacyField === field ? (
//                                 <>
//                                     <select
//                                         className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
//                                         value={privacySettings[field] ? 'Yes' : 'No'}
//                                         onChange={(e) => setPrivacySettings(prev => ({ ...prev, [field]: e.target.value === 'Yes' }))}
//                                     >
//                                         <option value="Yes">Yes</option>
//                                         <option value="No">No</option>
//                                     </select>
//                                     <button className="btn btn-sm btn-primary" onClick={() => handlePrivacyChange(field, privacySettings[field] ? 'Yes' : 'No')}>Save</button>
//                                     <button className="btn btn-sm btn-ghost" onClick={() => setEditingPrivacyField(null)}>Cancel</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
//                                     <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => setEditingPrivacyField(field)}>Edit</button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </motion.div>
//     );

//     const renderNotificationSettings = () => {
//         const notificationCategories = {
//             Announcements: ['importantAnnouncements', 'featureAnnouncements'],
//             Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
//             Other: ['otherNotifications', 'promotions', 'weeklyRecommendations'],
//         };

//         const renderCheckboxRow = (settingKey, label) => (
//             <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
//                 <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
//                 <td className="py-3 px-4 text-center">
//                     <input
//                         type="checkbox"
//                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
//                         checked={notificationSettings[settingKey]?.email || false}
//                         onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
//                     />
//                 </td>
//                 <td className="py-3 px-4 text-center">
//                     <input
//                         type="checkbox"
//                         className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
//                         checked={notificationSettings[settingKey]?.site || false}
//                         onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
//                     />
//                 </td>
//             </tr>
//         );

//         return (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//                 <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
//                 <div className="overflow-x-auto">
//                     <table className="table w-full text-slate-200">
//                         <thead>
//                             <tr className="border-b border-gray-700 bg-gray-700/50">
//                                 <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
//                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
//                                 <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Object.entries(notificationCategories).map(([category, settings]) => (
//                                 <React.Fragment key={category}>
//                                     <tr>
//                                         <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
//                                     </tr>
//                                     {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </motion.div>
//         );
//     };

//     const renderAchievements = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Achievements</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//                 {achievements.map((achievement) => (
//                     <div key={achievement.id} className="text-center">
//                         <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'} shadow-lg`}>
//                             {<achievement.icon size={32} className="text-white" />}
//                         </div>
//                         <div className="text-white text-sm font-medium">{achievement.name}</div>
//                         <div className="text-slate-400 text-xs">{achievement.description}</div>
//                     </div>
//                 ))}
//             </div>
//         </motion.div>
//     );

//     const renderBadges = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Badges</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {badges.map((badge) => (
//                     <div key={badge.id} className={`p-6 rounded-xl border-2 ${badge.unlocked ? 'bg-slate-800/50 border-cyan-400/50' : 'bg-slate-800/30 border-slate-600'}`}>
//                         <div className="flex items-center gap-4">
//                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? `bg-${badge.color}-500` : 'bg-slate-600'}`}>
//                                 <Award size={24} className="text-white" />
//                             </div>
//                             <div className="flex-1">
//                                 <h4 className="text-white font-semibold">{badge.name}</h4>
//                                 <p className="text-slate-400 text-sm">{badge.description}</p>
//                                 <div className={`text-xs mt-1 ${badge.unlocked ? 'text-green-400' : 'text-slate-500'}`}>
//                                     {badge.unlocked ? '✓ Earned' : 'Locked'}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </motion.div>
//     );

//     const renderPoints = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Points & Stats</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {[
//                     { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, icon: Code },
//                     { label: 'Current Streak', value: stats.currentStreak, icon: Star },
//                     { label: 'Max Streak', value: stats.maxStreak, icon: Star },
//                     { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Globe }
//                 ].map((stat) => (
//                     <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
//                         <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <stat.icon size={24} className="text-white" />
//                         </div>
//                         <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
//                         <div className="text-sm text-slate-400">{stat.label}</div>
//                         {stat.total && <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>}
//                     </div>
//                 ))}
//             </div>
//         </motion.div>
//     );

//     const renderTransactions = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Transaction History</h3>
//             <p className="text-slate-400 text-sm mb-4">View your payment and subscription history.</p>
//             <div className="space-y-4">
//                 {[
//                     { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
//                     { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
//                 ].map((transaction) => (
//                     <div key={transaction.id} className="p-4 bg-slate-800/50 rounded-lg">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//                                     <DollarSign size={18} className="text-white" />
//                                 </div>
//                                 <div>
//                                     <div className="text-white font-medium">{transaction.type}</div>
//                                     <div className="text-slate-400 text-sm">{transaction.date}</div>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <div className="text-green-400 font-semibold">{transaction.amount}</div>
//                                 <div className="text-slate-400 text-sm">{transaction.status}</div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </motion.div>
//     );

//     const renderHelp = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Help & Support</h3>
//             <div className="space-y-6">
//                 <div className="text-center mb-8">
//                     <p className="text-slate-400">Get quick answers from our automated assistant.</p>
//                 </div>
                
//                 {/* Chatbot Interface */}
//                 <div className="flex flex-col h-[500px] bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
//                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                         {chatMessages.map((msg, index) => (
//                             <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
//                                     {msg.text}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <form onSubmit={handleChatbotSubmit} className="p-4 border-t border-gray-700 flex gap-2">
//                         <input
//                             type="text"
//                             value={chatInput}
//                             onChange={(e) => setChatInput(e.target.value)}
//                             placeholder="Ask a question..."
//                             className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
//                         />
//                         <button type="submit" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white">
//                             <MessageSquare size={20} />
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </motion.div>
//     );

//     const renderReports = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Reports</h3>
//             <div className="space-y-4">
//                 {showSuccessMessage && (
//                     <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                                 <CheckCircle size={16} className="text-white" />
//                             </div>
//                             <div>
//                                 <p className="text-green-200 font-medium">Report Submitted Successfully!</p>
//                                 <p className="text-green-300/80 text-sm">Thank you for your feedback.</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6 bg-slate-800/50 rounded-xl">
//                     <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
//                     <textarea
//                         value={reportText}
//                         onChange={(e) => setReportText(e.target.value)}
//                         placeholder="Describe the issue you encountered..."
//                         className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
//                         rows={4}
//                     />
//                     <button 
//                         onClick={handleSubmitReport}
//                         className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
//                     >
//                         Submit Report
//                     </button>
//                 </div>
//             </div>
//         </motion.div>
//     );

//     const renderComingSoon = () => (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16 bg-slate-800/50 rounded-xl border border-gray-700">
//             <div className="flex flex-col items-center justify-center">
//                 <Settings size={64} className="mx-auto mb-4 text-slate-600" />
//                 <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
//                 <p className="text-slate-400">This section is under development.</p>
//             </div>
//         </motion.div>
//     );

//     const renderContent = () => {
//         if (!profileData) return null;
//         switch (activeTab) {
//             case 'basic-info': return renderBasicInfo();
//             case 'account': return renderAccountInfo();
//             case 'privacy': return renderPrivacySettings();
//             case 'notifications': return renderNotificationSettings();
//             case 'achievements': return renderAchievements();
//             case 'badges': return renderBadges();
//             case 'points': return renderPoints();
//             case 'transactions': return renderTransactions();
//             case 'reports': return renderReports();
//             case 'help': return renderHelp();
//             case 'billing':
//             case 'orders':
//                 return renderComingSoon();
//             default:
//                 return null;
//         }
//     };

//     const sidebarItems = [
//         { id: 'basic-info', label: 'Basic Info', icon: User },
//         { id: 'account', label: 'Account', icon: Settings },
//         { id: 'privacy', label: 'Privacy', icon: Shield },
//         { id: 'notifications', label: 'Notifications', icon: Bell },
//         { id: 'achievements', label: 'Achievements', icon: Trophy },
//         { id: 'badges', label: 'Badges', icon: Award },
//         { id: 'points', label: 'Points', icon: Star },
//         { id: 'transactions', label: 'Transactions', icon: DollarSign },
//         { id: 'reports', label: 'Reports', icon: Flag },
//         { id: 'help', label: 'Help & Support', icon: HelpCircle },
//         { id: 'billing', label: 'Billing', icon: CreditCard },
//         { id: 'orders', label: 'Orders', icon: FileText }
//     ];

//     if (authLoading || pageLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
//                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
//                 <p className="ml-3 text-lg">Loading profile...</p>
//             </div>
//         );
//     }
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }
//     if (fetchError) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
//                 <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
//                 <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Loading Profile</button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-slate-950 text-slate-200">
//             <Header />
//             <main className="container mx-auto px-4 py-8">
//                 <motion.div 
//                     className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <div className="flex items-center gap-6">
//                         <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center">
//                             <User size={40} className="text-slate-400" />
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-white mb-1">{profileData.firstname}</h1>
//                             <p className="text-slate-400">ID: {profileData._id}</p>
//                         </div>
//                     </div>
//                 </motion.div>

//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                     <motion.div 
//                         className="lg:col-span-1"
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm">
//                             <nav className="space-y-2">
//                                 {sidebarItems.map((item) => (
//                                     <button
//                                         key={item.id}
//                                         onClick={() => setActiveTab(item.id)}
//                                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
//                                             activeTab === item.id
//                                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
//                                                 : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
//                                         }`}
//                                     >
//                                         <item.icon size={18} />
//                                         <span className="font-medium">{item.label}</span>
//                                     </button>
//                                 ))}
//                             </nav>
//                         </div>
//                     </motion.div>

//                     <div className="lg:col-span-3">
//                         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
//                             {renderContent()}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ProfilePage;
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    User, Edit3, Save, X, Star, Trophy, Award, Target,
    Zap, Flame, Code, Calendar, MapPin, Globe, Github,
    Linkedin, Twitter, Briefcase, GraduationCap, Settings,
    Bell, CreditCard, FileText, DollarSign, HelpCircle, Flag,
    CheckCircle, MessageSquare, Shield, Lock, Unlock, TrendingUp,
    Users, Eye, Palette, Languages, Sun, Moon, Monitor, Heart,
    BookOpen, Download, Sparkles, Crown, Rocket, Brain, Cpu,
    Database, Layers, GitBranch, Terminal, Wrench, Key, Mail,
    Phone, Camera, Image, Music, Video, Gamepad2, Coffee,
    Pizza, Car, Home, Building, TreePine
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Helper Functions ---
const capitalizeWords = (str) => {
    if (typeof str !== 'string' || !str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const DEFAULT_NOTIFICATION_SETTINGS_FRONTEND = {
    importantAnnouncements: { email: true, site: false },
    featureAnnouncements: { email: true, site: false },
    awardNotification: { email: true, site: true },
    globalRanking: { email: false, site: true },
    contestBadge: { email: false, site: true },
    contestAnnouncements: { email: true, site: true },
    newComment: { email: false, site: true },
    otherNotifications: { email: true, site: false },
    promotions: { email: true, site: false },
    weeklyRecommendations: { email: true, site: false },
};

const DEFAULT_PRIVACY_SETTINGS_FRONTEND = {
    contactByCompanies: true,
    joinStudyPlanLeaderboard: true,
    displaySubmissionHistory: true,
};

// --- Animated Background with Floating Icons ---
const AnimatedProfileBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let floatingIcons = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const iconList = [
            Code, Trophy, Star, Award, Target, Zap, Flame, Brain, Cpu, Database,
            Layers, GitBranch, Terminal, Wrench, Key, Mail, Phone, Camera, Image,
            Music, Video, Gamepad2, Coffee, Pizza, Car, Home, Building, TreePine,
            Sparkles, Crown, Rocket, Heart, BookOpen, Download, Settings, Shield
        ];

        const createFloatingIcons = () => {
            floatingIcons = [];
            for (let i = 0; i < 25; i++) {
                const IconComponent = iconList[Math.floor(Math.random() * iconList.length)];
                floatingIcons.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 20 + 15,
                    opacity: Math.random() * 0.6 + 0.2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`, // Cyan to blue range
                    icon: IconComponent,
                    pulse: Math.random() * 0.02 + 0.01
                });
            }
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
                    twinkle: Math.random() * 0.02 + 0.01
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
            gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.6)');
            gradient.addColorStop(1, 'rgba(51, 65, 85, 0.4)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.opacity += particle.twinkle * (Math.random() > 0.5 ? 1 : -1);
                particle.opacity = Math.max(0.1, Math.min(0.9, particle.opacity));

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });

            floatingIcons.forEach((icon, index) => {
                icon.x += icon.vx;
                icon.y += icon.vy;
                icon.rotation += icon.rotationSpeed;
                icon.opacity += icon.pulse * (Math.random() > 0.5 ? 1 : -1);
                icon.opacity = Math.max(0.1, Math.min(0.7, icon.opacity));

                if (icon.x < -50 || icon.x > canvas.width + 50) icon.vx *= -1;
                if (icon.y < -50 || icon.y > canvas.height + 50) icon.vy *= -1;

                ctx.save();
                ctx.globalAlpha = icon.opacity;
                ctx.translate(icon.x, icon.y);
                ctx.rotate(icon.rotation);
                ctx.fillStyle = icon.color;
                ctx.font = `${icon.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('●', 0, 0);
                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createFloatingIcons();
        createParticles();
        animate();

        const handleResize = () => {
            resizeCanvas();
            createFloatingIcons();
            createParticles();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

// --- EditableField Component (Extracted and Improved) ---
const EditableField = ({ label, value, onSave, onCancel, isEditing, onEdit, type = 'text', placeholder, points = 0, icon: Icon, options }) => {
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleSave = () => {
        onSave(tempValue);
    };

    const handleCancel = () => {
        setTempValue(value);
        onCancel();
    };

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                    placeholder={placeholder}
                    rows="3"
                />
            );
        }
        if (type === 'select' && options) {
            return (
                <select
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        }
        return (
            <input
                type={type}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                placeholder={placeholder}
            />
        );
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-colors border border-gray-700/50 hover:bg-slate-800/70">
            <div className="flex-1 flex items-center gap-3 mb-2 md:mb-0">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-cyan-400" />
                </div>
                <div>
                    <div className="text-white font-medium">{label}</div>
                    {isEditing ? (
                        renderInput()
                    ) : (
                        <div className="text-slate-400 text-sm">{value || <span className="italic">{placeholder || 'Not provided'}</span>}</div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {points > 0 && !isEditing && (
                    <span className="text-cyan-400 text-sm font-medium">+{points}</span>
                )}
                {isEditing ? (
                    <div className="flex gap-1">
                        <button
                            onClick={handleSave}
                            className="p-1 bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
                        >
                            <Save size={16} />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onEdit()}
                        className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
                    >
                        <Edit3 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Main Profile Page Component ---
function ProfilePage() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

    const [profileData, setProfileData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [activeTab, setActiveTab] = useState('basic-info');

    const [editingField, setEditingField] = useState(null);
    const [editingPrivacyField, setEditingPrivacyField] = useState(null);
    const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
    const [privacySettings, setPrivacySettings] = useState(DEFAULT_PRIVACY_SETTINGS_FRONTEND);
    const [reportText, setReportText] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Chatbot state
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const chatbotResponses = {
        'getting started': "Welcome! To get started, you can explore the 'Problems' section to solve your first challenge, or check out a 'Study Plan' to guide your learning.",
        'problem solving': "Having trouble with a problem? Try breaking it down into smaller steps, drawing out the data flow, or searching for similar problems in the 'Discuss' section.",
        'contests': "To join a contest, simply go to the 'Contests' tab and register for an upcoming event. Make sure you're on time to compete for a prize!",
        'account issues': "For account issues, you can try resetting your password from the login page or send a detailed report from the 'Reports' tab. Our support team will help you out.",
        'hello': "Hi there! I'm here to help. What can I assist you with today?",
        'default': "I'm sorry, I don't have information on that topic yet. Please select from the options provided or try asking a different question."
    };

    const handleChatbotSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() === '') return;

        const userMessage = chatInput;
        setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setChatInput('');

        setTimeout(() => {
            const normalizedInput = userMessage.toLowerCase().trim();
            let botResponse = chatbotResponses.default;

            if (normalizedInput.includes('getting started')) {
                botResponse = chatbotResponses['getting started'];
            } else if (normalizedInput.includes('problem solving')) {
                botResponse = chatbotResponses['problem solving'];
            } else if (normalizedInput.includes('contests')) {
                botResponse = chatbotResponses['contests'];
            } else if (normalizedInput.includes('account issues')) {
                botResponse = chatbotResponses['account issues'];
            } else if (normalizedInput.includes('hello')) {
                botResponse = chatbotResponses['hello'];
            }

            setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 1000);
    };

    // Sample data for static sections
    const achievements = [
        { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: Trophy },
        { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: Trophy },
        { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: Target },
        { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: Code },
    ];

    const badges = [
        { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
        { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
        { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
        { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
    ];

    const stats = {
        problemsSolved: 117,
        totalProblems: 3617,
        easySolved: 40,
        easyTotal: 885,
        mediumSolved: 62,
        mediumTotal: 1881,
        hardSolved: 15,
        hardTotal: 851,
        currentStreak: 5,
        maxStreak: 34,
        rank: 1081203,
        reputation: 1,
        views: 107,
        solutions: 3,
        discussions: 0
    };

    const fetchProfileData = async () => {
        if (!isAuthenticated) {
            setPageLoading(false);
            return;
        }
        try {
            setPageLoading(true);
            setFetchError(null);
            const res = await axiosClient.get('/profile');
            setProfileData(res.data);
            setNotificationSettings(res.data.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
            setPrivacySettings(res.data.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
        } catch (err) {
            console.error('Error fetching profile data:', err);
            setFetchError('Failed to load profile data. Please try again.');
            if (err.response?.status === 401) {
                dispatch(logoutUser());
            }
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchProfileData();
        } else if (!isAuthenticated && !authLoading) {
            setPageLoading(false);
        }
    }, [isAuthenticated, authLoading, dispatch]);

    const handleSaveBasicInfo = async (fieldPath, value) => {
        try {
            setFetchError(null);
            let valueToSave = value;
            if (fieldPath === 'profile.gender') {
                valueToSave = value === 'Not provided' ? '' : value;
            } else if (fieldPath === 'profile.birthday') {
                valueToSave = value ? new Date(value).toISOString() : null;
            }

            const res = await axiosClient.put('/profile/field', { field: fieldPath, value: valueToSave });
            setProfileData(res.data.user);
            setEditingField(null);
        } catch (err) {
            console.error('Error updating field:', fieldPath, err);
            setFetchError(`Failed to update ${capitalizeWords(fieldPath.split('.').pop())}: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleNotificationChange = async (setting, type, checked) => {
        try {
            setFetchError(null);
            setNotificationSettings(prev => ({ ...prev, [setting]: { ...prev[setting], [type]: checked } }));
            await axiosClient.put('/profile/settings/notifications', { setting, type, value: checked });
        } catch (err) {
            console.error('Error updating notification setting:', err);
            setNotificationSettings(profileData.settings?.notifications || DEFAULT_NOTIFICATION_SETTINGS_FRONTEND);
            setFetchError('Failed to update notification setting. Please retry.');
        }
    };

    const handlePrivacyChange = async (field, value) => {
        try {
            setFetchError(null);
            const booleanValue = value === 'Yes';
            setPrivacySettings(prev => ({ ...prev, [field]: booleanValue }));
            await axiosClient.put('/profile/settings/privacy', { field, value: booleanValue });
            setEditingPrivacyField(null);
        } catch (err) {
            console.error('Error updating privacy setting:', err);
            setPrivacySettings(profileData.settings?.privacy || DEFAULT_PRIVACY_SETTINGS_FRONTEND);
            setFetchError('Failed to update privacy setting. Please retry.');
        }
    };

    const handleSubmitReport = () => {
        if (reportText.trim() === '') {
            setFetchError('Please enter a report description.');
            return;
        }
        console.log('Report submitted:', reportText);
        setShowSuccessMessage(true);
        setReportText('');
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    // --- Render Functions for Each Tab ---
    const renderBasicInfo = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Basic Info</h3>
            <div className="space-y-6">
                <EditableField
                    label="Name"
                    value={profileData.firstname || ''}
                    onSave={(value) => handleSaveBasicInfo('firstname', value)}
                    isEditing={editingField === 'firstname'}
                    onEdit={() => setEditingField('firstname')}
                    onCancel={() => setEditingField(null)}
                    icon={User}
                    points={2}
                    placeholder="Enter your full name"
                />
                <EditableField
                    label="Gender"
                    value={profileData.profile?.gender || 'Not provided'}
                    onSave={(value) => handleSaveBasicInfo('profile.gender', value)}
                    isEditing={editingField === 'profile.gender'}
                    onEdit={() => setEditingField('profile.gender')}
                    onCancel={() => setEditingField(null)}
                    icon={User}
                    type="select"
                    options={['Not provided', 'Male', 'Female', 'Other']}
                    points={2}
                />
                <EditableField
                    label="Location"
                    value={profileData.profile?.location || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.location', value)}
                    isEditing={editingField === 'profile.location'}
                    onEdit={() => setEditingField('profile.location')}
                    onCancel={() => setEditingField(null)}
                    icon={MapPin}
                    points={2}
                    placeholder="City, Country"
                />
                <EditableField
                    label="Birthday"
                    value={profileData.profile?.birthday ? new Date(profileData.profile.birthday).toISOString().split('T')[0] : ''}
                    onSave={(value) => handleSaveBasicInfo('profile.birthday', value)}
                    isEditing={editingField === 'profile.birthday'}
                    onEdit={() => setEditingField('profile.birthday')}
                    onCancel={() => setEditingField(null)}
                    icon={Calendar}
                    type="date"
                    points={2}
                />
                <EditableField
                    label="Summary"
                    value={profileData.profile?.summary || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.summary', value)}
                    isEditing={editingField === 'profile.summary'}
                    onEdit={() => setEditingField('profile.summary')}
                    onCancel={() => setEditingField(null)}
                    icon={FileText}
                    type="textarea"
                    points={2}
                    placeholder="Tell us about yourself..."
                />
                <EditableField
                    label="Website"
                    value={profileData.profile?.website || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.website', value)}
                    isEditing={editingField === 'profile.website'}
                    onEdit={() => setEditingField('profile.website')}
                    onCancel={() => setEditingField(null)}
                    icon={Globe}
                    points={2}
                    placeholder="https://your-website.com"
                />
                <EditableField
                    label="Github"
                    value={profileData.profile?.github || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.github', value)}
                    isEditing={editingField === 'profile.github'}
                    onEdit={() => setEditingField('profile.github')}
                    onCancel={() => setEditingField(null)}
                    icon={Github}
                    points={2}
                    placeholder="https://github.com/yourusername"
                />
                <EditableField
                    label="LinkedIn"
                    value={profileData.profile?.linkedin || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.linkedin', value)}
                    isEditing={editingField === 'profile.linkedin'}
                    onEdit={() => setEditingField('profile.linkedin')}
                    onCancel={() => setEditingField(null)}
                    icon={Linkedin}
                    points={2}
                    placeholder="https://linkedin.com/in/yourprofile"
                />
                <EditableField
                    label="X (formerly Twitter)"
                    value={profileData.profile?.twitter || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.twitter', value)}
                    isEditing={editingField === 'profile.twitter'}
                    onEdit={() => setEditingField('profile.twitter')}
                    onCancel={() => setEditingField(null)}
                    icon={Twitter}
                    points={2}
                    placeholder="https://x.com/yourusername"
                />
                <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Experience</h4>
                <EditableField
                    label="Work"
                    value={profileData.profile?.work || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.work', value)}
                    isEditing={editingField === 'profile.work'}
                    onEdit={() => setEditingField('profile.work')}
                    onCancel={() => setEditingField(null)}
                    icon={Briefcase}
                    points={2}
                    placeholder="Your current job title and company"
                />
                <EditableField
                    label="Education"
                    value={profileData.profile?.education || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.education', value)}
                    isEditing={editingField === 'profile.education'}
                    onEdit={() => setEditingField('profile.education')}
                    onCancel={() => setEditingField(null)}
                    icon={GraduationCap}
                    points={2}
                    placeholder="Your educational background"
                />
                <h4 className="text-xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Skills</h4>
                <EditableField
                    label="Technical Skills"
                    value={profileData.profile?.skills || ''}
                    onSave={(value) => handleSaveBasicInfo('profile.skills', value)}
                    isEditing={editingField === 'profile.skills'}
                    onEdit={() => setEditingField('profile.skills')}
                    onCancel={() => setEditingField(null)}
                    icon={Code}
                    points={2}
                    placeholder="List your programming languages and technologies"
                />
            </div>
        </motion.div>
    );

    const renderAccountInfo = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Account Information</h3>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
                    <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">ID</p>
                        <p className="text-white text-lg">{profileData.firstname?.toLowerCase() || ''}{profileData._id?.slice(0, 5) || ''}</p>
                    </div>
                    <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-700/50">
                    <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <p className="text-white text-lg">{profileData.emailId || 'N/A'}</p>
                    </div>
                    <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700 mt-2 md:mt-0" disabled>Edit</button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
                    <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">Password</p>
                        <p className="text-indigo-400 text-lg hover:underline cursor-pointer">Change Password</p>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-8 mb-6 border-b border-gray-700 pb-4">Social Accounts</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
                        <div className="flex items-center">
                            <span className="mr-3 text-2xl font-bold text-blue-500">in</span>
                            <p className="text-white text-lg">LinkedIn</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400">Not Connected</span>
                            <span className="text-green-400">+10</span>
                            <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
                        <div className="flex items-center">
                            <span className="mr-3 text-2xl font-bold text-gray-400">Gh</span>
                            <p className="text-white text-lg">Github</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400">Not Connected</span>
                            <span className="text-green-400">+10</span>
                            <button className="btn btn-sm btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">Connect</button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-error bg-red-600 hover:bg-red-700 border-red-600 text-white mt-10 px-8 py-3 rounded-xl shadow-lg">Delete Account</button>
            </div>
        </motion.div>
    );

    const renderPrivacySettings = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Privacy</h3>
            <div className="space-y-8">
                {[
                    { field: 'contactByCompanies', label: 'Can companies contact you?', description: 'We will only send your contact info to interested partners.' },
                    { field: 'joinStudyPlanLeaderboard', label: 'Join study plan leaderboard', description: 'Changes apply at the start of each week.' },
                    { field: 'displaySubmissionHistory', label: 'Display my submission history', description: 'History will not be visible to others on your profile.' }
                ].map(({ field, label, description }) => (
                    <div key={field} className="flex flex-col lg:flex-row lg:items-center justify-between py-2 border-b border-gray-700/50 last:border-none">
                        <div className="flex-1 pr-4 mb-4 lg:mb-0">
                            <p className="text-white text-lg font-medium">{label}</p>
                            <p className="text-gray-400 text-sm mt-1">{description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {editingPrivacyField === field ? (
                                <>
                                    <select
                                        className="select select-bordered bg-gray-700 text-slate-200 border-gray-600 focus:border-indigo-500 w-24"
                                        value={privacySettings[field] ? 'Yes' : 'No'}
                                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, [field]: e.target.value === 'Yes' }))}
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <button className="btn btn-sm btn-primary" onClick={() => handlePrivacyChange(field, privacySettings[field] ? 'Yes' : 'No')}>Save</button>
                                    <button className="btn btn-sm btn-ghost" onClick={() => setEditingPrivacyField(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-300 font-semibold">{privacySettings[field] ? 'Yes' : 'No'}</span>
                                    <button className="btn btn-ghost btn-sm text-indigo-400 hover:bg-gray-700" onClick={() => setEditingPrivacyField(field)}>Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderNotificationSettings = () => {
        const notificationCategories = {
            Announcements: ['importantAnnouncements', 'featureAnnouncements'],
            Contest: ['globalRanking', 'contestBadge', 'contestAnnouncements'],
            Other: ['otherNotifications', 'promotions', 'weeklyRecommendations'],
        };

        const renderCheckboxRow = (settingKey, label) => (
            <tr key={settingKey} className="border-b border-gray-700/50 last:border-none">
                <td className="py-3 px-4 text-white text-md font-medium">{label}</td>
                <td className="py-3 px-4 text-center">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
                        checked={notificationSettings[settingKey]?.email || false}
                        onChange={(e) => handleNotificationChange(settingKey, 'email', e.target.checked)}
                    />
                </td>
                <td className="py-3 px-4 text-center">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary bg-gray-600 border-gray-500 checked:bg-indigo-500"
                        checked={notificationSettings[settingKey]?.site || false}
                        onChange={(e) => handleNotificationChange(settingKey, 'site', e.target.checked)}
                    />
                </td>
            </tr>
        );

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Notifications</h3>
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-200">
                        <thead>
                            <tr className="border-b border-gray-700 bg-gray-700/50">
                                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"></th>
                                <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Email</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Site</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(notificationCategories).map(([category, settings]) => (
                                <React.Fragment key={category}>
                                    <tr>
                                        <td colSpan="3" className="py-4 px-4 text-gray-400 font-bold uppercase text-sm border-b border-gray-700/50 bg-gray-800/60">{category}</td>
                                    </tr>
                                    {settings.map(settingKey => renderCheckboxRow(settingKey, capitalizeWords(settingKey.replace(/([A-Z])/g, ' $1').trim())))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        );
    };

    const renderAchievements = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="text-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'} shadow-lg`}>
                            {<achievement.icon size={32} className="text-white" />}
                        </div>
                        <div className="text-white text-sm font-medium">{achievement.name}</div>
                        <div className="text-slate-400 text-xs">{achievement.description}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderBadges = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {badges.map((badge) => (
                    <div key={badge.id} className={`p-6 rounded-xl border-2 ${badge.unlocked ? 'bg-slate-800/50 border-cyan-400/50' : 'bg-slate-800/30 border-slate-600'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? `bg-${badge.color}-500` : 'bg-slate-600'}`}>
                                <Award size={24} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-semibold">{badge.name}</h4>
                                <p className="text-slate-400 text-sm">{badge.description}</p>
                                <div className={`text-xs mt-1 ${badge.unlocked ? 'text-green-400' : 'text-slate-500'}`}>
                                    {badge.unlocked ? '✓ Earned' : 'Locked'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderPoints = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Points & Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, icon: Code },
                    { label: 'Current Streak', value: stats.currentStreak, icon: Star },
                    { label: 'Max Streak', value: stats.maxStreak, icon: Star },
                    { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Globe }
                ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
                        <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <stat.icon size={24} className="text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                        {stat.total && <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderTransactions = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Transaction History</h3>
            <p className="text-slate-400 text-sm mb-4">View your payment and subscription history.</p>
            <div className="space-y-4">
                {[
                    { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
                    { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
                ].map((transaction) => (
                    <div key={transaction.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <DollarSign size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{transaction.type}</div>
                                    <div className="text-slate-400 text-sm">{transaction.date}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-green-400 font-semibold">{transaction.amount}</div>
                                <div className="text-slate-400 text-sm">{transaction.status}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderHelp = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Help & Support</h3>
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <p className="text-slate-400">Get quick answers from our automated assistant.</p>
                </div>

                {/* Chatbot Interface */}
                <div className="flex flex-col h-[500px] bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChatbotSubmit} className="p-4 border-t border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
                        />
                        <button type="submit" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white">
                            <MessageSquare size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );

    const renderReports = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Reports</h3>
            <div className="space-y-4">
                {showSuccessMessage && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle size={16} className="text-white" />
                            </div>
                            <div>
                                <p className="text-green-200 font-medium">Report Submitted Successfully!</p>
                                <p className="text-green-300/80 text-sm">Thank you for your feedback.</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="p-6 bg-slate-800/50 rounded-xl">
                    <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
                    <textarea
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        placeholder="Describe the issue you encountered..."
                        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                        rows={4}
                    />
                    <button
                        onClick={handleSubmitReport}
                        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                    >
                        Submit Report
                    </button>
                </div>
            </div>
        </motion.div>
    );

    const renderComingSoon = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16 bg-slate-800/50 rounded-xl border border-gray-700">
            <div className="flex flex-col items-center justify-center">
                <Settings size={64} className="mx-auto mb-4 text-slate-600" />
                <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-slate-400">This section is under development.</p>
            </div>
        </motion.div>
    );

    const renderContent = () => {
        if (!profileData) return null;
        switch (activeTab) {
            case 'basic-info': return renderBasicInfo();
            case 'account': return renderAccountInfo();
            case 'privacy': return renderPrivacySettings();
            case 'notifications': return renderNotificationSettings();
            case 'achievements': return renderAchievements();
            case 'badges': return renderBadges();
            case 'points': return renderPoints();
            case 'transactions': return renderTransactions();
            case 'reports': return renderReports();
            case 'help': return renderHelp();
            case 'billing':
            case 'orders':
                return renderComingSoon();
            default:
                return null;
        }
    };

    const sidebarItems = [
        { id: 'basic-info', label: 'Basic Info', icon: User },
        { id: 'account', label: 'Account', icon: Settings },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'badges', label: 'Badges', icon: Award },
        { id: 'points', label: 'Points', icon: Star },
        { id: 'transactions', label: 'Transactions', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: Flag },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'orders', label: 'Orders', icon: FileText }
    ];

    if (authLoading || pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
                <span className="loading loading-spinner loading-lg text-indigo-500"></span>
                <p className="ml-3 text-lg">Loading profile...</p>
            </div>
        );
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (fetchError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-500">
                <p className="text-xl mb-4 text-center">Error: {fetchError}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Loading Profile</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <AnimatedProfileBackground />
            <Header />
            <main className="container mx-auto px-4 py-8 relative z-20">
                <motion.div
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center">
                            <User size={40} className="text-slate-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">{profileData.firstname}</h1>
                            <p className="text-slate-400">ID: {profileData._id}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm">
                            <nav className="space-y-2">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                                            activeTab === item.id
                                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <item.icon size={18} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-3">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;