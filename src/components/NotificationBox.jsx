import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
    Bell, X, Check, AlertCircle, Info, Star, MessageSquare,
    Users, Calendar, Clock, Eye, EyeOff, Trash2, Archive,
    ChevronDown, ChevronUp, Settings, Volume2, VolumeX, RefreshCw
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../utils/axiosClient';

// Register GSAP plugins
gsap.registerPlugin();

const NotificationBox = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const notificationRef = useRef(null);
    const bellRef = useRef(null);

    // Fetch notifications from backend
    const fetchNotifications = async () => {
        if (!user?.id) return;
        
        setIsLoading(true);
        try {
            // Try to fetch from API first, fallback to localStorage
            try {
                const response = await axiosClient.get(`/api/notifications/${user.id}`);
                const data = response.data;
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
            } catch (apiError) {
                console.log('API not available, using localStorage');
                const storedNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
                console.log('All stored notifications:', storedNotifications);
                console.log('Current user:', user);
                
                // Filter notifications for current user based on role or all users
                const userNotifications = storedNotifications.filter(notification => {
                    // If notification is for all users (no targetRole means all users)
                    if (!notification.targetRole) {
                        return true;
                    }
                    // If notification is specifically for all users
                    if (notification.targetRole === 'all') {
                        return true;
                    }
                    // If notification is for user's specific role
                    if (notification.targetRole === user.role) {
                        return true;
                    }
                    // If notification is from admin and has fromAdmin flag
                    if (notification.fromAdmin) {
                        return true;
                    }
                    return false;
                });
                
                console.log('Filtered notifications for user:', userNotifications);
                setNotifications(userNotifications);
                setUnreadCount(userNotifications.filter(n => !n.isRead).length);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]);
            setUnreadCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            // Try API first, fallback to localStorage
            try {
                await axiosClient.put(`/api/notifications/${notificationId}/read`);
            } catch (apiError) {
                console.log('API not available, updating localStorage');
                // Update localStorage
                const storedNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
                const updatedNotifications = storedNotifications.map(notif => 
                    notif.id === notificationId 
                        ? { ...notif, isRead: true }
                        : notif
                );
                localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
            }
            
            // Update local state
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId 
                        ? { ...notif, isRead: true }
                        : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
            
            console.log(`Notification ${notificationId} marked as read`);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            // Try API first, fallback to localStorage
            try {
                await axiosClient.put(`/api/notifications/${user.id}/mark-all-read`);
            } catch (apiError) {
                console.log('API not available, updating localStorage');
                // Update localStorage
                const storedNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
                const updatedNotifications = storedNotifications.map(notif => ({ ...notif, isRead: true }));
                localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
            }
            
            // Update local state
            setNotifications(prev => 
                prev.map(notif => ({ ...notif, isRead: true }))
            );
            setUnreadCount(0);
            
            console.log('All notifications marked as read');
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    // Delete notification
    const deleteNotification = async (notificationId) => {
        try {
            // Try API first, fallback to localStorage
            try {
                await axiosClient.delete(`/api/notifications/${notificationId}`);
            } catch (apiError) {
                console.log('API not available, updating localStorage');
                // Update localStorage
                const storedNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
                const updatedNotifications = storedNotifications.filter(notif => notif.id !== notificationId);
                localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
            }
            
            // Update local state
            setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
            setUnreadCount(prev => {
                const deletedNotif = notifications.find(n => n.id === notificationId);
                return deletedNotif && !deletedNotif.isRead ? prev - 1 : prev;
            });
            
            console.log(`Notification ${notificationId} deleted`);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    // Clear all notifications
    const clearAllNotifications = async () => {
        try {
            // Try API first, fallback to localStorage
            try {
                await axiosClient.delete(`/api/notifications/${user.id}/clear-all`);
            } catch (apiError) {
                console.log('API not available, updating localStorage');
                // Clear localStorage
                localStorage.setItem('userNotifications', JSON.stringify([]));
            }
            
            // Update local state
            setNotifications([]);
            setUnreadCount(0);
            
            console.log('All notifications cleared');
        } catch (error) {
            console.error('Error clearing all notifications:', error);
        }
    };

    // Play notification sound
    const playNotificationSound = () => {
        if (soundEnabled) {
            const audio = new Audio('/notification-sound.mp3');
            audio.play().catch(() => {
                // Fallback if audio file doesn't exist
                console.log('Notification sound not available');
            });
        }
    };

    // Bell animation when new notification arrives
    const animateBell = () => {
        if (bellRef.current) {
            gsap.to(bellRef.current, {
                rotation: [0, -10, 10, -10, 10, 0],
                duration: 0.6,
                ease: "power2.inOut"
            });
        }
    };

    // Setup real-time notifications (WebSocket or polling)
    useEffect(() => {
        fetchNotifications();
        
        // Poll for new notifications every 10 seconds (more frequent for testing)
        const interval = setInterval(fetchNotifications, 10000);
        
        return () => clearInterval(interval);
    }, [user?.id]);

    // Manual refresh function
    const refreshNotifications = () => {
        console.log('Manually refreshing notifications...');
        fetchNotifications();
    };

    // Test function to add a sample notification
    const addTestNotification = () => {
        const testNotification = {
            id: `test_${Date.now()}`,
            title: 'Test Notification',
            message: 'This is a test notification to verify the system is working.',
            type: 'info',
            priority: 'medium',
            isRead: false,
            createdAt: new Date().toISOString(),
            fromAdmin: true,
            adminName: 'Test Admin'
        };
        
        const existingNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
        existingNotifications.unshift(testNotification);
        localStorage.setItem('userNotifications', JSON.stringify(existingNotifications));
        
        console.log('Test notification added:', testNotification);
        console.log('All notifications after test:', existingNotifications);
        
        // Refresh notifications
        fetchNotifications();
    };

    // Animate bell when unread count changes
    useEffect(() => {
        if (unreadCount > 0) {
            animateBell();
            playNotificationSound();
        }
    }, [unreadCount]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'message': return MessageSquare;
            case 'system': return AlertCircle;
            case 'achievement': return Star;
            case 'admin': return Users;
            case 'info': return Info;
            default: return Bell;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'message': return 'text-blue-400';
            case 'system': return 'text-yellow-400';
            case 'achievement': return 'text-green-400';
            case 'admin': return 'text-purple-400';
            case 'info': return 'text-cyan-400';
            default: return 'text-gray-400';
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

    return (
        <div className="relative">
            {/* Notification Bell */}
            <motion.button
                ref={bellRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </motion.div>
                )}
            </motion.button>

            {/* Notification Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Notifications
                                    {unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={refreshNotifications}
                                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                                        title="Refresh notifications"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setSoundEnabled(!soundEnabled)}
                                        className={`p-1 rounded transition-colors ${
                                            soundEnabled ? 'text-cyan-400' : 'text-gray-500'
                                        }`}
                                        title={soundEnabled ? 'Disable sound' : 'Enable sound'}
                                    >
                                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                                {notifications.length > 0 ? (
                                    <>
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            Mark all as read
                                        </button>
                                        <button
                                            onClick={clearAllNotifications}
                                            className="text-sm text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={addTestNotification}
                                        className="text-sm text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        Add Test Notification
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 text-center">
                                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">Loading notifications...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">No notifications yet</p>
                                    <p className="text-gray-500 text-sm">You'll see updates here when they arrive</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-700">
                                    {displayedNotifications.map((notification) => {
                                        const IconComponent = getNotificationIcon(notification.type);
                                        const iconColor = getNotificationColor(notification.type);
                                        
                                        return (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`p-4 hover:bg-slate-700/50 transition-colors ${
                                                    !notification.isRead ? 'bg-slate-700/30' : ''
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded-lg bg-slate-600/50 ${iconColor}`}>
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h4 className={`text-sm font-medium ${
                                                                    !notification.isRead ? 'text-white' : 'text-gray-300'
                                                                }`}>
                                                                    {notification.title}
                                                                </h4>
                                                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                                                    {notification.message}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <span className="text-xs text-gray-500">
                                                                        {formatTimeAgo(notification.createdAt)}
                                                                    </span>
                                                                    {!notification.isRead && (
                                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-1 ml-2">
                                                                {!notification.isRead && (
                                                                    <button
                                                                        onClick={() => markAsRead(notification.id)}
                                                                        className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                                                                        title="Mark as read"
                                                                    >
                                                                        <Check className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
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

                        {/* Footer */}
                        {notifications.length > 5 && (
                            <div className="p-4 border-t border-slate-700">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="w-full flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                >
                                    {showAll ? (
                                        <>
                                            <ChevronUp className="w-4 h-4" />
                                            Show Less
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" />
                                            Show All ({notifications.length})
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBox;
