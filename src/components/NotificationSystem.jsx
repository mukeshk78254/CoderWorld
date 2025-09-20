import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Send, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

// Notification Types
const NOTIFICATION_TYPES = {
    info: { icon: Info, color: 'blue', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
    success: { icon: CheckCircle, color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
    warning: { icon: AlertTriangle, color: 'yellow', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
    error: { icon: AlertCircle, color: 'red', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' }
};

// Admin Notification Panel
export const AdminNotificationPanel = ({ isOpen, onClose }) => {
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        type: 'info',
        targetUsers: 'all' // 'all', 'premium', 'free'
    });

    const handleSendNotification = async () => {
        if (!notification.title || !notification.message) {
            alert('Please fill in all fields');
            return;
        }

        try {
            // Mock response for now
            console.log('Sending notification:', notification);
            alert('Notification sent successfully!');
            setNotification({ title: '', message: '', type: 'info', targetUsers: 'all' });
            onClose();
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification');
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Bell size={24} className="text-cyan-400" />
                        Send Notification
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-white font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={notification.title}
                            onChange={(e) => setNotification(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter notification title..."
                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-2">Message</label>
                        <textarea
                            value={notification.message}
                            onChange={(e) => setNotification(prev => ({ ...prev, message: e.target.value }))}
                            placeholder="Enter notification message..."
                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-2">Type</label>
                            <select
                                value={notification.type}
                                onChange={(e) => setNotification(prev => ({ ...prev, type: e.target.value }))}
                                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                            >
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Target Users</label>
                            <select
                                value={notification.targetUsers}
                                onChange={(e) => setNotification(prev => ({ ...prev, targetUsers: e.target.value }))}
                                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                            >
                                <option value="all">All Users</option>
                                <option value="premium">Premium Users</option>
                                <option value="free">Free Users</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSendNotification}
                            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Send size={16} />
                            Send Notification
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// User Notification Popup
export const UserNotificationPopup = ({ notification, onClose }) => {
    if (!notification) return null;

    const notificationType = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.info;
    const Icon = notificationType.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-4 right-4 z-50 max-w-sm w-full ${notificationType.bgColor} ${notificationType.borderColor} border rounded-xl p-4 shadow-lg`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notificationType.color === 'blue' ? 'bg-blue-500' :
                    notificationType.color === 'green' ? 'bg-green-500' :
                    notificationType.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                }`}>
                    <Icon size={16} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm mb-1">{notification.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{notification.message}</p>
                    <div className="text-xs text-slate-400 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                    </div>
                </div>
                
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                >
                    <X size={16} className="text-slate-400" />
                </button>
            </div>
        </motion.div>
    );
};

// Notification Bell Component
export const NotificationBell = ({ user, onNotificationClick }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Mock notifications for now
        const mockNotifications = [
            {
                id: 1,
                title: 'Welcome!',
                message: 'Welcome to CoderWorld! Start solving problems now.',
                type: 'info',
                read: false,
                timestamp: new Date().toISOString()
            },
            {
                id: 2,
                title: 'New Contest',
                message: 'Weekly coding contest is now live!',
                type: 'success',
                read: false,
                timestamp: new Date(Date.now() - 3600000).toISOString()
            }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    const markAsRead = async (notificationId) => {
        setNotifications(prev => 
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
                <Bell size={20} className="text-slate-400" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900/95 border border-slate-700 rounded-xl shadow-xl z-50">
                    <div className="p-4 border-b border-slate-700">
                        <h3 className="text-white font-semibold">Notifications</h3>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-slate-400">
                                No notifications
                            </div>
                        ) : (
                            notifications.map((notification) => {
                                const notificationType = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.info;
                                const Icon = notificationType.icon;
                                
                                return (
                                    <div
                                        key={notification.id}
                                        onClick={() => {
                                            markAsRead(notification.id);
                                            onNotificationClick?.(notification);
                                        }}
                                        className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                                            !notification.read ? 'bg-slate-800/30' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                notificationType.color === 'blue' ? 'bg-blue-500' :
                                                notificationType.color === 'green' ? 'bg-green-500' :
                                                notificationType.color === 'yellow' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}>
                                                <Icon size={12} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium text-sm mb-1">{notification.title}</h4>
                                                <p className="text-slate-400 text-xs leading-relaxed">{notification.message}</p>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    {new Date(notification.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1"></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Global Notification Manager
export const NotificationManager = () => {
    const [currentNotification, setCurrentNotification] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Mock notification for testing
        const mockNotification = {
            id: 1,
            title: 'Welcome to CoderWorld!',
            message: 'Start your coding journey with us today.',
            type: 'success',
            timestamp: new Date().toISOString()
        };
        
        setCurrentNotification(mockNotification);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            setCurrentNotification(null);
        }, 5000);
    }, []);

    return (
        <AnimatePresence>
            {currentNotification && (
                <UserNotificationPopup
                    notification={currentNotification}
                    onClose={() => setCurrentNotification(null)}
                />
            )}
        </AnimatePresence>
    );
};