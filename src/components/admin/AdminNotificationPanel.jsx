// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { gsap } from 'gsap';
// import {
//     Send, Users, MessageSquare, AlertCircle, Star, Info,
//     Clock, Check, X, Eye, EyeOff, Trash2, Edit3, Save,
//     Target, Globe, Bell, Volume2, VolumeX, Calendar,
//     User, Mail, Hash, Type, Palette, Zap
// } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import axiosClient from '../../utils/axiosClient';

// // Register GSAP plugins
// gsap.registerPlugin();

// const AdminNotificationPanel = () => {
//     const { user } = useSelector(state => state.auth);
//     const [isOpen, setIsOpen] = useState(false);
//     const [notifications, setNotifications] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [editingNotification, setEditingNotification] = useState(null);
    
//     const [formData, setFormData] = useState({
//         title: '',
//         message: '',
//         type: 'info',
//         targetUsers: 'all', // 'all', 'specific', 'role'
//         specificUsers: [],
//         userRole: 'member',
//         priority: 'normal', // 'low', 'normal', 'high', 'urgent'
//         scheduledFor: '',
//         expiresAt: '',
//         actionUrl: '',
//         actionText: ''
//     });

//     const [users, setUsers] = useState([]);
//     const [stats, setStats] = useState({
//         totalSent: 0,
//         totalRead: 0,
//         totalUnread: 0,
//         todaySent: 0
//     });

//     const panelRef = useRef(null);
//     const formRef = useRef(null);

//     // Check if user is admin
//     const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

//     useEffect(() => {
//         if (isAdmin && isOpen) {
//             fetchNotifications();
//             fetchUsers();
//             fetchStats();
//         }
//     }, [isAdmin, isOpen]);

//     const fetchNotifications = async () => {
//         setIsLoading(true);
//         try {
//             // Try to fetch from API first, fallback to localStorage
//             try {
//                 const response = await axiosClient.get('/api/admin/notifications');
//                 setNotifications(response.data.notifications || []);
//             } catch (apiError) {
//                 console.log('API not available, using localStorage');
//                 const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
//                 setNotifications(storedNotifications);
//             }
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//             // Fallback to empty array
//             setNotifications([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             // Try to fetch from API first, fallback to mock data
//             try {
//                 const response = await axiosClient.get('/api/admin/users');
//                 setUsers(response.data.users || []);
//             } catch (apiError) {
//                 console.log('API not available, using mock users');
//                 // Mock users data
//                 setUsers([
//                     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'member' },
//                     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'premium' },
//                     { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
//                 ]);
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const fetchStats = async () => {
//         try {
//             // Try to fetch from API first, fallback to localStorage
//             try {
//                 const response = await axiosClient.get('/api/admin/notification-stats');
//                 setStats(response.data.stats || stats);
//             } catch (apiError) {
//                 console.log('API not available, calculating stats from localStorage');
//                 const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
//                 const today = new Date().toDateString();
//                 const todaySent = storedNotifications.filter(n => 
//                     new Date(n.sentAt).toDateString() === today
//                 ).length;
                
//                 setStats({
//                     totalSent: storedNotifications.length,
//                     totalRead: storedNotifications.filter(n => n.readCount > 0).length,
//                     totalUnread: storedNotifications.filter(n => !n.isRead).length,
//                     todaySent: todaySent
//                 });
//             }
//         } catch (error) {
//             console.error('Error fetching stats:', error);
//         }
//     };

//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleSendNotification = async () => {
//         console.log('Form submitted with data:', formData);
        
//         if (!formData.title.trim() || !formData.message.trim()) {
//             alert('Please fill in title and message');
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const notificationId = Date.now().toString();
//             const payload = {
//                 id: notificationId,
//                 ...formData,
//                 sentBy: user.id,
//                 sentByName: user.firstname || user.name || 'Admin',
//                 sentAt: new Date().toISOString(),
//                 readCount: 0,
//                 isRead: false
//             };

//             // Try to send via API first
//             try {
//                 await axiosClient.post('/api/admin/notifications/send', payload);
//                 console.log('Notification sent via API');
//             } catch (apiError) {
//                 console.log('API not available, storing locally');
                
//                 // Store in localStorage for admin panel
//                 const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
//                 storedNotifications.unshift(payload);
//                 localStorage.setItem('adminNotifications', JSON.stringify(storedNotifications));
                
//                 // Create user notifications based on target
//                 const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
//                 console.log('Existing user notifications before adding new ones:', userNotifications);
//                 const newUserNotifications = [];
                
//                 console.log('Target users setting:', formData.targetUsers);
                
//                 if (formData.targetUsers === 'all') {
//                     console.log('Creating notification for all users');
//                     // Send to all users (simulate with current user for demo)
//                     const userNotification = {
//                         id: `user_${notificationId}`,
//                         title: formData.title,
//                         message: formData.message,
//                         type: formData.type,
//                         priority: formData.priority,
//                         isRead: false,
//                         createdAt: new Date().toISOString(),
//                         fromAdmin: true,
//                         adminName: user.firstname || user.name || 'Admin',
//                         targetRole: 'all' // Explicitly set for all users
//                     };
//                     console.log('Created user notification:', userNotification);
//                     newUserNotifications.push(userNotification);
//                 } else if (formData.targetUsers === 'role') {
//                     // Send to users with specific role
//                     newUserNotifications.push({
//                         id: `user_${notificationId}`,
//                         title: formData.title,
//                         message: formData.message,
//                         type: formData.type,
//                         priority: formData.priority,
//                         isRead: false,
//                         createdAt: new Date().toISOString(),
//                         fromAdmin: true,
//                         adminName: user.firstname || user.name || 'Admin',
//                         targetRole: formData.userRole
//                     });
//                 }
                
//                 // Add to user notifications
//                 userNotifications.unshift(...newUserNotifications);
//                 localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
                
//                 console.log('Notification stored locally and sent to users');
//                 console.log('New notifications created:', newUserNotifications);
//                 console.log('All user notifications after update:', userNotifications);
                
//                 // Show success message
//                 alert(`Notification sent successfully! ${newUserNotifications.length} notification(s) created.`);
//             }
            
//             // Reset form
//             setFormData({
//                 title: '',
//                 message: '',
//                 type: 'info',
//                 targetUsers: 'all',
//                 specificUsers: [],
//                 userRole: 'member',
//                 priority: 'normal',
//                 scheduledFor: '',
//                 expiresAt: '',
//                 actionUrl: '',
//                 actionText: ''
//             });
            
//             setShowForm(false);
//             fetchNotifications();
//             fetchStats();
            
//             // Success animation
//             if (formRef.current) {
//                 gsap.to(formRef.current, {
//                     scale: 1.05,
//                     duration: 0.2,
//                     yoyo: true,
//                     repeat: 1,
//                     ease: "power2.inOut"
//                 });
//             }
            
//             // Show success message
//             alert('Notification sent successfully!');
            
//         } catch (error) {
//             console.error('Error sending notification:', error);
//             alert('Failed to send notification: ' + error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleEditNotification = (notification) => {
//         setEditingNotification(notification);
//         setFormData({
//             title: notification.title,
//             message: notification.message,
//             type: notification.type,
//             targetUsers: notification.targetUsers,
//             specificUsers: notification.specificUsers || [],
//             userRole: notification.userRole || 'member',
//             priority: notification.priority || 'normal',
//             scheduledFor: notification.scheduledFor || '',
//             expiresAt: notification.expiresAt || '',
//             actionUrl: notification.actionUrl || '',
//             actionText: notification.actionText || ''
//         });
//         setShowForm(true);
//     };

//     const handleDeleteNotification = async (notificationId) => {
//         if (!confirm('Are you sure you want to delete this notification?')) return;
        
//         try {
//             await axiosClient.delete(`/api/admin/notifications/${notificationId}`);
//             fetchNotifications();
//             fetchStats();
//         } catch (error) {
//             console.error('Error deleting notification:', error);
//         }
//     };

//     const getNotificationTypeIcon = (type) => {
//         switch (type) {
//             case 'message': return MessageSquare;
//             case 'system': return AlertCircle;
//             case 'achievement': return Star;
//             case 'admin': return Users;
//             case 'info': return Info;
//             default: return Bell;
//         }
//     };

//     const getNotificationTypeColor = (type) => {
//         switch (type) {
//             case 'message': return 'text-blue-400 bg-blue-500/20';
//             case 'system': return 'text-yellow-400 bg-yellow-500/20';
//             case 'achievement': return 'text-green-400 bg-green-500/20';
//             case 'admin': return 'text-purple-400 bg-purple-500/20';
//             case 'info': return 'text-cyan-400 bg-cyan-500/20';
//             default: return 'text-gray-400 bg-gray-500/20';
//         }
//     };

//     const getPriorityColor = (priority) => {
//         switch (priority) {
//             case 'urgent': return 'text-red-400 bg-red-500/20';
//             case 'high': return 'text-orange-400 bg-orange-500/20';
//             case 'normal': return 'text-blue-400 bg-blue-500/20';
//             case 'low': return 'text-gray-400 bg-gray-500/20';
//             default: return 'text-gray-400 bg-gray-500/20';
//         }
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleString();
//     };

//     if (!isAdmin) {
//         return null;
//     }

//     return (
//         <div className="relative">
//             {/* Admin Panel Toggle */}
//             <motion.button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="relative p-2 text-gray-300 hover:text-white transition-colors"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 title="Admin Notification Panel"
//             >
//                 <Users className="w-6 h-6" />
//                 {stats.totalUnread > 0 && (
//                     <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
//                     >
//                         {stats.totalUnread > 99 ? '99+' : stats.totalUnread}
//                     </motion.div>
//                 )}
//             </motion.button>

//             {/* Admin Panel */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         ref={panelRef}
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 top-full mt-2 w-[500px] bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50"
//                     >
//                         {/* Header */}
//                         <div className="p-4 border-b border-slate-700">
//                             <div className="flex items-center justify-between">
//                                 <h3 className="text-white font-semibold flex items-center gap-2">
//                                     <Users className="w-5 h-5 text-purple-400" />
//                                     Admin Notifications
//                                 </h3>
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         onClick={() => setShowForm(!showForm)}
//                                         className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
//                                     >
//                                         <Send className="w-4 h-4" />
//                                         Send
//                                     </button>
//                                     <button
//                                         onClick={() => setIsOpen(false)}
//                                         className="p-1 text-gray-400 hover:text-white transition-colors"
//                                     >
//                                         <X className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             {/* Stats */}
//                             <div className="grid grid-cols-4 gap-2 mt-3">
//                                 <div className="text-center p-2 bg-slate-700/50 rounded-lg">
//                                     <div className="text-lg font-bold text-cyan-400">{stats.totalSent}</div>
//                                     <div className="text-xs text-gray-400">Sent</div>
//                                 </div>
//                                 <div className="text-center p-2 bg-slate-700/50 rounded-lg">
//                                     <div className="text-lg font-bold text-green-400">{stats.totalRead}</div>
//                                     <div className="text-xs text-gray-400">Read</div>
//                                 </div>
//                                 <div className="text-center p-2 bg-slate-700/50 rounded-lg">
//                                     <div className="text-lg font-bold text-yellow-400">{stats.totalUnread}</div>
//                                     <div className="text-xs text-gray-400">Unread</div>
//                                 </div>
//                                 <div className="text-center p-2 bg-slate-700/50 rounded-lg">
//                                     <div className="text-lg font-bold text-purple-400">{stats.todaySent}</div>
//                                     <div className="text-xs text-gray-400">Today</div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Send Notification Form */}
//                         <AnimatePresence>
//                             {showForm && (
//                                 <motion.div
//                                     ref={formRef}
//                                     initial={{ opacity: 0, height: 0 }}
//                                     animate={{ opacity: 1, height: 'auto' }}
//                                     exit={{ opacity: 0, height: 0 }}
//                                     className="p-4 border-b border-slate-700 bg-slate-700/30"
//                                 >
//                                     <h4 className="text-white font-medium mb-3">Send New Notification</h4>
                                    
//                                     <div className="space-y-3">
//                                         <div className="grid grid-cols-2 gap-3">
//                                             <div>
//                                                 <label className="block text-sm text-gray-300 mb-1">Title</label>
//                                                 <input
//                                                     type="text"
//                                                     value={formData.title}
//                                                     onChange={(e) => handleInputChange('title', e.target.value)}
//                                                     className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                     placeholder="Notification title"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm text-gray-300 mb-1">Type</label>
//                                                 <select
//                                                     value={formData.type}
//                                                     onChange={(e) => handleInputChange('type', e.target.value)}
//                                                     className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                 >
//                                                     <option value="info">Info</option>
//                                                     <option value="message">Message</option>
//                                                     <option value="system">System</option>
//                                                     <option value="achievement">Achievement</option>
//                                                     <option value="admin">Admin</option>
//                                                 </select>
//                                             </div>
//                                         </div>
                                        
//                                         <div>
//                                             <label className="block text-sm text-gray-300 mb-1">Message</label>
//                                             <textarea
//                                                 value={formData.message}
//                                                 onChange={(e) => handleInputChange('message', e.target.value)}
//                                                 className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                 rows="3"
//                                                 placeholder="Notification message"
//                                             />
//                                         </div>
                                        
//                                         <div className="grid grid-cols-2 gap-3">
//                                             <div>
//                                                 <label className="block text-sm text-gray-300 mb-1">Target</label>
//                                                 <select
//                                                     value={formData.targetUsers}
//                                                     onChange={(e) => handleInputChange('targetUsers', e.target.value)}
//                                                     className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                 >
//                                                     <option value="all">All Users</option>
//                                                     <option value="role">By Role</option>
//                                                     <option value="specific">Specific Users</option>
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm text-gray-300 mb-1">Priority</label>
//                                                 <select
//                                                     value={formData.priority}
//                                                     onChange={(e) => handleInputChange('priority', e.target.value)}
//                                                     className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                 >
//                                                     <option value="low">Low</option>
//                                                     <option value="normal">Normal</option>
//                                                     <option value="high">High</option>
//                                                     <option value="urgent">Urgent</option>
//                                                 </select>
//                                             </div>
//                                         </div>
                                        
//                                         {formData.targetUsers === 'role' && (
//                                             <div>
//                                                 <label className="block text-sm text-gray-300 mb-1">User Role</label>
//                                                 <select
//                                                     value={formData.userRole}
//                                                     onChange={(e) => handleInputChange('userRole', e.target.value)}
//                                                     className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
//                                                 >
//                                                     <option value="member">Members</option>
//                                                     <option value="premium">Premium Users</option>
//                                                     <option value="admin">Admins</option>
//                                                 </select>
//                                             </div>
//                                         )}
                                        
//                                         <div className="flex gap-2">
//                                             <button
//                                                 onClick={handleSendNotification}
//                                                 disabled={isLoading}
//                                                 className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                                             >
//                                                 {isLoading ? (
//                                                     <>
//                                                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                                         Sending...
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <Send className="w-4 h-4" />
//                                                         Send Notification
//                                                     </>
//                                                 )}
//                                             </button>
//                                             <button
//                                                 onClick={() => {
//                                                     setShowForm(false);
//                                                     setEditingNotification(null);
//                                                 }}
//                                                 className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* Notifications List */}
//                         <div className="max-h-96 overflow-y-auto">
//                             {isLoading ? (
//                                 <div className="p-8 text-center">
//                                     <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                                     <p className="text-gray-400 text-sm">Loading notifications...</p>
//                                 </div>
//                             ) : notifications.length === 0 ? (
//                                 <div className="p-8 text-center">
//                                     <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
//                                     <p className="text-gray-400">No notifications sent yet</p>
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-slate-700">
//                                     {notifications.map((notification) => {
//                                         const IconComponent = getNotificationTypeIcon(notification.type);
//                                         const typeColor = getNotificationTypeColor(notification.type);
//                                         const priorityColor = getPriorityColor(notification.priority);
                                        
//                                         return (
//                                             <motion.div
//                                                 key={notification.id}
//                                                 initial={{ opacity: 0, x: -20 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 className="p-4 hover:bg-slate-700/50 transition-colors"
//                                             >
//                                                 <div className="flex items-start gap-3">
//                                                     <div className={`p-2 rounded-lg ${typeColor}`}>
//                                                         <IconComponent className="w-4 h-4" />
//                                                     </div>
                                                    
//                                                     <div className="flex-1 min-w-0">
//                                                         <div className="flex items-start justify-between">
//                                                             <div className="flex-1">
//                                                                 <div className="flex items-center gap-2 mb-1">
//                                                                     <h4 className="text-sm font-medium text-white">
//                                                                         {notification.title}
//                                                                     </h4>
//                                                                     <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
//                                                                         {notification.priority}
//                                                                     </span>
//                                                                 </div>
//                                                                 <p className="text-gray-400 text-sm mb-2">
//                                                                     {notification.message}
//                                                                 </p>
//                                                                 <div className="flex items-center gap-4 text-xs text-gray-500">
//                                                                     <span>Sent: {formatDate(notification.sentAt)}</span>
//                                                                     <span>Target: {notification.targetUsers}</span>
//                                                                     <span>Read: {notification.readCount || 0}</span>
//                                                                 </div>
//                                                             </div>
                                                            
//                                                             <div className="flex items-center gap-1 ml-2">
//                                                                 <button
//                                                                     onClick={() => handleEditNotification(notification)}
//                                                                     className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
//                                                                     title="Edit"
//                                                                 >
//                                                                     <Edit3 className="w-3 h-3" />
//                                                                 </button>
//                                                                 <button
//                                                                     onClick={() => handleDeleteNotification(notification.id)}
//                                                                     className="p-1 text-gray-400 hover:text-red-400 transition-colors"
//                                                                     title="Delete"
//                                                                 >
//                                                                     <Trash2 className="w-3 h-3" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </motion.div>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default AdminNotificationPanel;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
    Send, Users, MessageSquare, AlertCircle, Star, Info,
    Clock, Check, X, Eye, EyeOff, Trash2, Edit3, Save,
    Target, Globe, Bell, Volume2, VolumeX, Calendar,
    User, Mail, Hash, Type, Palette, Zap
} from 'lucide-react';
import { useSelector } from 'react-redux';
// Note: axiosClient needs to be a valid import that connects to your API.
// For this example, we will assume it's correctly configured.
import axiosClient from '../../utils/axiosClient';

// Register GSAP plugins
gsap.registerPlugin();

const AdminNotificationPanel = () => {
    const { user } = useSelector(state => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingNotification, setEditingNotification] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'info',
        targetUsers: 'all', // 'all', 'specific', 'role'
        specificUsers: [],
        userRole: 'member',
        priority: 'normal', // 'low', 'normal', 'high', 'urgent'
        scheduledFor: '',
        expiresAt: '',
        actionUrl: '',
        actionText: ''
    });

    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalSent: 0,
        totalRead: 0,
        totalUnread: 0,
        todaySent: 0
    });

    const panelRef = useRef(null);
    const formRef = useRef(null);

    // Check if user is admin
    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

    useEffect(() => {
        if (isAdmin && isOpen) {
            fetchNotifications();
            fetchUsers();
            fetchStats();
        }
    }, [isAdmin, isOpen]);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            // Try to fetch from API first, fallback to localStorage
            try {
                const response = await axiosClient.get('/api/admin/notifications');
                setNotifications(response.data.notifications || []);
            } catch (apiError) {
                console.log('API not available, using localStorage');
                const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
                setNotifications(storedNotifications);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Fallback to empty array
            setNotifications([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            // Try to fetch from API first, fallback to mock data
            try {
                const response = await axiosClient.get('/api/admin/users');
                setUsers(response.data.users || []);
            } catch (apiError) {
                console.log('API not available, using mock users');
                // Mock users data
                setUsers([
                    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'member' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'premium' },
                    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchStats = async () => {
        try {
            // Try to fetch from API first, fallback to localStorage
            try {
                const response = await axiosClient.get('/api/admin/notification-stats');
                setStats(response.data.stats || stats);
            } catch (apiError) {
                console.log('API not available, calculating stats from localStorage');
                const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
                const today = new Date().toDateString();
                const todaySent = storedNotifications.filter(n =>
                    new Date(n.sentAt).toDateString() === today
                ).length;

                setStats({
                    totalSent: storedNotifications.length,
                    totalRead: storedNotifications.filter(n => n.readCount > 0).length,
                    totalUnread: storedNotifications.filter(n => !n.isRead).length,
                    todaySent: todaySent
                });
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSendNotification = async () => {
        console.log('Form submitted with data:', formData);

        if (!formData.title.trim() || !formData.message.trim()) {
            alert('Please fill in title and message');
            return;
        }

        setIsLoading(true);
        try {
            const notificationId = Date.now().toString();
            const payload = {
                id: notificationId,
                ...formData,
                sentBy: user.id,
                sentByName: user.firstname || user.name || 'Admin',
                sentAt: new Date().toISOString(),
                readCount: 0,
                isRead: false
            };

            // Try to send via API first
            try {
                await axiosClient.post('/api/admin/notifications/send', payload);
                console.log('Notification sent via API');
            } catch (apiError) {
                console.log('API not available, storing locally');

                // Store in localStorage for admin panel
                const storedNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
                storedNotifications.unshift(payload);
                localStorage.setItem('adminNotifications', JSON.stringify(storedNotifications));

                // Create user notifications based on target
                const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
                console.log('Existing user notifications before adding new ones:', userNotifications);
                const newUserNotifications = [];

                console.log('Target users setting:', formData.targetUsers);

                if (formData.targetUsers === 'all') {
                    console.log('Creating notification for all users');
                    // Send to all users (simulate with current user for demo)
                    const userNotification = {
                        id: `user_${notificationId}`,
                        title: formData.title,
                        message: formData.message,
                        type: formData.type,
                        priority: formData.priority,
                        isRead: false,
                        createdAt: new Date().toISOString(),
                        fromAdmin: true,
                        adminName: user.firstname || user.name || 'Admin',
                        targetRole: 'all' // Explicitly set for all users
                    };
                    console.log('Created user notification:', userNotification);
                    newUserNotifications.push(userNotification);
                } else if (formData.targetUsers === 'role') {
                    // Send to users with specific role
                    newUserNotifications.push({
                        id: `user_${notificationId}`,
                        title: formData.title,
                        message: formData.message,
                        type: formData.type,
                        priority: formData.priority,
                        isRead: false,
                        createdAt: new Date().toISOString(),
                        fromAdmin: true,
                        adminName: user.firstname || user.name || 'Admin',
                        targetRole: formData.userRole
                    });
                }

                // Add to user notifications
                userNotifications.unshift(...newUserNotifications);
                localStorage.setItem('userNotifications', JSON.stringify(userNotifications));

                console.log('Notification stored locally and sent to users');
                console.log('New notifications created:', newUserNotifications);
                console.log('All user notifications after update:', userNotifications);

                // Show success message
                alert(`Notification sent successfully! ${newUserNotifications.length} notification(s) created.`);
            }

            // Reset form
            setFormData({
                title: '',
                message: '',
                type: 'info',
                targetUsers: 'all',
                specificUsers: [],
                userRole: 'member',
                priority: 'normal',
                scheduledFor: '',
                expiresAt: '',
                actionUrl: '',
                actionText: ''
            });

            setShowForm(false);
            fetchNotifications();
            fetchStats();

            // Success animation
            if (formRef.current) {
                gsap.to(formRef.current, {
                    scale: 1.05,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }

            // Show success message
            alert('Notification sent successfully!');

        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditNotification = (notification) => {
        setEditingNotification(notification);
        setFormData({
            title: notification.title,
            message: notification.message,
            type: notification.type,
            targetUsers: notification.targetUsers,
            specificUsers: notification.specificUsers || [],
            userRole: notification.userRole || 'member',
            priority: notification.priority || 'normal',
            scheduledFor: notification.scheduledFor || '',
            expiresAt: notification.expiresAt || '',
            actionUrl: notification.actionUrl || '',
            actionText: notification.actionText || ''
        });
        setShowForm(true);
    };

    const handleDeleteNotification = async (notificationId) => {
        if (!confirm('Are you sure you want to delete this notification?')) return;

        try {
            await axiosClient.delete(`/api/admin/notifications/${notificationId}`);
            fetchNotifications();
            fetchStats();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const getNotificationTypeIcon = (type) => {
        switch (type) {
            case 'message': return MessageSquare;
            case 'system': return AlertCircle;
            case 'achievement': return Star;
            case 'admin': return Users;
            case 'info': return Info;
            default: return Bell;
        }
    };

    const getNotificationTypeColor = (type) => {
        switch (type) {
            case 'message': return 'text-blue-400 bg-blue-500/20';
            case 'system': return 'text-yellow-400 bg-yellow-500/20';
            case 'achievement': return 'text-green-400 bg-green-500/20';
            case 'admin': return 'text-purple-400 bg-purple-500/20';
            case 'info': return 'text-cyan-400 bg-cyan-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'text-red-400 bg-red-500/20';
            case 'high': return 'text-orange-400 bg-orange-500/20';
            case 'normal': return 'text-blue-400 bg-blue-500/20';
            case 'low': return 'text-gray-400 bg-gray-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="relative">
            {/* Admin Panel Toggle */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Admin Notification Panel"
            >
                <Users className="w-6 h-6" />
                {stats.totalUnread > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                        {stats.totalUnread > 99 ? '99+' : stats.totalUnread}
                    </motion.div>
                )}
            </motion.button>

            {/* Admin Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-[500px] bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    Admin Notifications
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowForm(!showForm)}
                                        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                                    <div className="text-lg font-bold text-cyan-400">{stats.totalSent}</div>
                                    <div className="text-xs text-gray-400">Sent</div>
                                </div>
                                <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                                    <div className="text-lg font-bold text-green-400">{stats.totalRead}</div>
                                    <div className="text-xs text-gray-400">Read</div>
                                </div>
                                <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                                    <div className="text-lg font-bold text-yellow-400">{stats.totalUnread}</div>
                                    <div className="text-xs text-gray-400">Unread</div>
                                </div>
                                <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                                    <div className="text-lg font-bold text-purple-400">{stats.todaySent}</div>
                                    <div className="text-xs text-gray-400">Today</div>
                                </div>
                            </div>
                        </div>

                        {/* Send Notification Form */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.div
                                    ref={formRef}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 border-b border-slate-700 bg-slate-700/30"
                                >
                                    <h4 className="text-white font-medium mb-3">Send New Notification</h4>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm text-gray-300 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                    placeholder="Notification title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-300 mb-1">Type</label>
                                                <select
                                                    value={formData.type}
                                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                >
                                                    <option value="info">Info</option>
                                                    <option value="message">Message</option>
                                                    <option value="system">System</option>
                                                    <option value="achievement">Achievement</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">Message</label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                rows="3"
                                                placeholder="Notification message"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm text-gray-300 mb-1">Target</label>
                                                <select
                                                    value={formData.targetUsers}
                                                    onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                >
                                                    <option value="all">All Users</option>
                                                    <option value="role">By Role</option>
                                                    <option value="specific">Specific Users</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-300 mb-1">Priority</label>
                                                <select
                                                    value={formData.priority}
                                                    onChange={(e) => handleInputChange('priority', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="normal">Normal</option>
                                                    <option value="high">High</option>
                                                    <option value="urgent">Urgent</option>
                                                </select>
                                            </div>
                                        </div>

                                        {formData.targetUsers === 'role' && (
                                            <div>
                                                <label className="block text-sm text-gray-300 mb-1">User Role</label>
                                                <select
                                                    value={formData.userRole}
                                                    onChange={(e) => handleInputChange('userRole', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:border-cyan-400"
                                                >
                                                    <option value="member">Members</option>
                                                    <option value="premium">Premium Users</option>
                                                    <option value="admin">Admins</option>
                                                </select>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSendNotification}
                                                disabled={isLoading}
                                                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        Send Notification
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowForm(false);
                                                    setEditingNotification(null);
                                                }}
                                                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 text-center">
                                    <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">Loading notifications...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">No notifications sent yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-700">
                                    {notifications.map((notification) => {
                                        const IconComponent = getNotificationTypeIcon(notification.type);
                                        const typeColor = getNotificationTypeColor(notification.type);
                                        const priorityColor = getPriorityColor(notification.priority);

                                        return (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="p-4 hover:bg-slate-700/50 transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded-lg ${typeColor}`}>
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h4 className="text-sm font-medium text-white">
                                                                        {notification.title}
                                                                    </h4>
                                                                    <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
                                                                        {notification.priority}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-400 text-sm mb-2">
                                                                    {notification.message}
                                                                </p>
                                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                    <span>Sent: {formatDate(notification.sentAt)}</span>
                                                                    <span>Target: {notification.targetUsers}</span>
                                                                    <span>Read: {notification.readCount || 0}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1 ml-2">
                                                                <button
                                                                    onClick={() => handleEditNotification(notification)}
                                                                    className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                                                                    title="Edit"
                                                                >
                                                                    <Edit3 className="w-3 h-3" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteNotification(notification.id)}
                                                                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNotificationPanel;