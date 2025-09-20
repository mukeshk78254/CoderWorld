import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, Tag, User, MessageSquare } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const DiscussionForm = ({ isOpen, onClose, onPostSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        category: 'general'
    });
    const [loading, setLoading] = useState(false);

    const categories = [
        { value: 'general', label: 'General Discussion' },
        { value: 'algorithm', label: 'Algorithm Help' },
        { value: 'data-structure', label: 'Data Structures' },
        { value: 'interview', label: 'Interview Prep' },
        { value: 'contest', label: 'Contest Discussion' },
        { value: 'bug-report', label: 'Bug Report' },
        { value: 'feature-request', label: 'Feature Request' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Please fill in title and content');
            return;
        }

        setLoading(true);
        try {
            // Try to post to backend first
            const response = await axiosClient.post('/api/discuss/posts', {
                title: formData.title,
                content: formData.content,
                category: formData.category,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            });
            
            console.log('Discussion posted to backend:', response.data);
            
            // Create frontend-compatible discussion object
            const newDiscussion = {
                id: response.data._id || Date.now(),
                title: response.data.title,
                content: response.data.content,
                category: response.data.category,
                tags: response.data.tags || [],
                author: response.data.author?.firstname || 'Current User',
                isVerified: false,
                timeAgo: 'Just now',
                difficulty: 'general',
                likes: 0,
                replies: 0,
                views: 0,
                isLiked: false,
                isBookmarked: false,
                timestamp: response.data.createdAt || new Date().toISOString()
            };
            
            onPostSuccess?.(newDiscussion);
            
            // Reset form
            setFormData({
                title: '',
                content: '',
                tags: '',
                category: 'general'
            });
            onClose();
        } catch (error) {
            console.error('Error posting discussion:', error);
            
            // Fallback to mock data if backend fails
            const newDiscussion = {
                id: Date.now(),
                title: formData.title,
                content: formData.content,
                category: formData.category,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                author: 'Current User',
                isVerified: false,
                timeAgo: 'Just now',
                difficulty: 'general',
                likes: 0,
                replies: 0,
                views: 0,
                isLiked: false,
                isBookmarked: false,
                timestamp: new Date().toISOString()
            };
            
            console.log('Using fallback discussion data:', newDiscussion);
            onPostSuccess?.(newDiscussion);
            
            // Reset form
            setFormData({
                title: '',
                content: '',
                tags: '',
                category: 'general'
            });
            onClose();
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
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
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                                <MessageSquare size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Start a Discussion</h3>
                                <p className="text-slate-400">Share your thoughts, ask questions, or help others</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <X size={24} className="text-slate-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-white font-medium mb-2">
                                <FileText size={16} className="inline mr-2" />
                                Discussion Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="What's your discussion about?"
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-white font-medium mb-2">
                                <Tag size={16} className="inline mr-2" />
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-white font-medium mb-2">
                                <Tag size={16} className="inline mr-2" />
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="e.g., algorithm, javascript, interview"
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-white font-medium mb-2">
                                <MessageSquare size={16} className="inline mr-2" />
                                Discussion Content
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Write your discussion content here. Be specific about your question or topic..."
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                                rows={8}
                                required
                            />
                        </div>

                        {/* Guidelines */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Discussion Guidelines</h4>
                            <ul className="text-slate-400 text-sm space-y-1">
                                <li>• Be respectful and constructive in your discussions</li>
                                <li>• Use clear and descriptive titles</li>
                                <li>• Provide context and examples when asking questions</li>
                                <li>• Search for similar discussions before posting</li>
                                <li>• Use appropriate tags to help others find your discussion</li>
                            </ul>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Post Discussion
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiscussionForm;
