import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    MessageSquare, Users, Heart, Share2, Bookmark, Flag, 
    Search, Filter, SortAsc, SortDesc, Plus, Edit3, Trash2,
    Clock, ThumbsUp, Reply, MoreVertical, Star, Zap,
    ChevronRight, ChevronDown, ArrowLeft, Settings, Bell,
    CheckCircle, XCircle, AlertCircle, Sparkles, Crown, Lock, Eye
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';
import DiscussionForm from '../components/DiscussionForm';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Utility function to format time ago
const formatTimeAgo = (timestamp) => {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
};

// Enhanced Floating Discussion Particles with GSAP
const FloatingParticles = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

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
            MessageSquare, Users, Heart, Share2, Bookmark, Star, Zap, Sparkles, Crown
        ];

        const createFloatingIcons = () => {
            floatingIcons = [];
            for (let i = 0; i < 20; i++) {
                const IconComponent = iconList[Math.floor(Math.random() * iconList.length)];
                floatingIcons.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 25 + 20,
                    opacity: Math.random() * 0.4 + 0.2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.03,
                    color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
                    icon: IconComponent,
                    pulse: Math.random() * 0.02 + 0.01
                });
            }
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    size: Math.random() * 4 + 1,
                    opacity: Math.random() * 0.6 + 0.3,
                    color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
                    twinkle: Math.random() * 0.03 + 0.01
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
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
            gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.7)');
            gradient.addColorStop(1, 'rgba(51, 65, 85, 0.5)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.opacity += particle.twinkle * (Math.random() > 0.5 ? 1 : -1);
                particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });

            floatingIcons.forEach((icon) => {
                icon.x += icon.vx;
                icon.y += icon.vy;
                icon.rotation += icon.rotationSpeed;
                icon.opacity += icon.pulse * (Math.random() > 0.5 ? 1 : -1);
                icon.opacity = Math.max(0.1, Math.min(0.6, icon.opacity));

                if (icon.x < -50 || icon.x > canvas.width + 50) icon.vx *= -1;
                if (icon.y < -50 || icon.y > canvas.height + 50) icon.vy *= -1;

                ctx.save();
                ctx.globalAlpha = icon.opacity * 0.3;
                ctx.translate(icon.x + 3, icon.y + 3);
                ctx.rotate(icon.rotation);
                ctx.fillStyle = '#000000';
                ctx.font = `${icon.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💬', 0, 0);
                ctx.restore();

                ctx.save();
                ctx.globalAlpha = icon.opacity;
                ctx.translate(icon.x, icon.y);
                ctx.rotate(icon.rotation);
                ctx.fillStyle = icon.color;
                ctx.font = `${icon.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💬', 0, 0);
                ctx.restore();
            });

            requestAnimationFrame(animate);
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
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
            />
        </div>
    );
};

// Discussion Post Card
const DiscussionPost = ({ post, index, onLike, onBookmark, onDelete, currentUser, onAddReply }) => {
    const cardRef = useRef(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState(post.replies || []);


    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'from-emerald-500 to-green-500';
            case 'medium': return 'from-amber-500 to-orange-500';
            case 'hard': return 'from-red-500 to-pink-500';
            default: return 'from-slate-500 to-gray-500';
        }
    };

    const handleSubmitReply = () => {
        if (!replyText.trim()) return;
        
        const currentTime = new Date();
        const newReply = {
            id: Date.now(),
            author: currentUser?.firstname || 'Anonymous',
            content: replyText.trim(),
            timestamp: currentTime.getTime(),
            createdAt: currentTime.toISOString(),
            timeAgo: 'Just now'
        };
        
        setReplies(prev => [newReply, ...prev]);
        setReplyText('');
        setShowReplyForm(false);
        
        if (onAddReply) {
            onAddReply(post.id, newReply);
        }
    };

    const canDeletePost = currentUser && (post.author === currentUser.firstname || currentUser.role === 'admin');

    return (
        <div
            ref={cardRef}
            className="discussion-card group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {post.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white">
                                    {post.author}
                                </h3>
                                {post.isVerified && (
                                    <CheckCircle size={16} className="text-cyan-400" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock size={14} />
                                <span>{post.timeAgo}</span>
                                {post.difficulty && (
                                    <>
                                        <span>•</span>
                                        <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(post.difficulty)} text-white`}>
                                            {post.difficulty}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onBookmark(post.id)}
                            className={`p-2 rounded-lg ${
                                post.isBookmarked 
                                    ? 'bg-yellow-500/20 text-yellow-400' 
                                    : 'bg-slate-800 text-slate-400'
                            }`}
                        >
                            <Bookmark size={18} fill={post.isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                        
                        {canDeletePost && (
                            <button
                                onClick={() => onDelete(post.id)}
                                className="p-2 rounded-lg bg-red-500/20 text-red-400"
                                title="Delete your post"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                        
                        <button
                            className="p-2 rounded-lg bg-slate-800 text-slate-400"
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 
                        className="text-2xl font-bold text-white mb-4"
                        style={{
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontWeight: '700',
                            letterSpacing: '-0.01em',
                            lineHeight: '1.3'
                        }}
                    >
                        {post.title}
                    </h2>
                    <p 
                        className="text-slate-300 leading-relaxed mb-4 text-lg"
                        style={{
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontWeight: '400',
                            letterSpacing: '0.01em',
                            lineHeight: '1.6'
                        }}
                    >
                        {post.content}
                    </p>
                    
                    {post.code && (
                        <div className="bg-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
                            <pre className="text-cyan-400 text-sm">
                                <code>{post.code}</code>
                            </pre>
                        </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-sm font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => onLike(post.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                post.isLiked 
                                    ? 'bg-red-500/20 text-red-400' 
                                    : 'bg-slate-800 text-slate-400'
                            }`}
                        >
                            <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                            <span className="font-medium">{post.likes}</span>
                        </button>
                        
                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-400"
                        >
                            <Reply size={18} />
                            <span className="font-medium">{replies.length}</span>
                        </button>
                        
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-400"
                        >
                            <Share2 size={18} />
                            <span className="font-medium">Share</span>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Eye size={16} />
                        <span>{post.views} views</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showReplyForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-slate-700"
                    >
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white">Add a Reply</h4>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                                rows={3}
                                style={{
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: '400'
                                }}
                            />
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmitReply}
                                    disabled={!replyText.trim()}
                                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                                >
                                    Post Reply
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowReplyForm(false)}
                                    className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {replies.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Replies ({replies.length})</h4>
                    <div className="space-y-4">
                        {replies.map((reply) => (
                            <motion.div
                                key={reply.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-800/50 rounded-lg p-4"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {reply.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="text-white font-medium">{reply.author}</span>
                                        <span className="text-slate-400 text-sm ml-2">{reply.timeAgo}</span>
                                    </div>
                                </div>
                                <p 
                                    className="text-slate-300"
                                    style={{
                                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                        fontWeight: '400',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {reply.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

// Search and Filter Bar
const DiscussionSearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterBy, setFilterBy }) => {
    const searchRef = useRef(null);

    useEffect(() => {
        if (searchRef.current) {
            gsap.fromTo(searchRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
        }
    }, []);

    return (
        <motion.div
            ref={searchRef}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mb-8"
        >
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search discussions..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-lg"
                        style={{
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontWeight: '400',
                            letterSpacing: '0.01em'
                        }}
                    />
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="most_liked">Most Liked</option>
                    <option value="most_replied">Most Replied</option>
                </select>

                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                >
                    <option value="all">All Topics</option>
                    <option value="algorithms">Algorithms</option>
                    <option value="data_structures">Data Structures</option>
                    <option value="system_design">System Design</option>
                    <option value="interview">Interview Prep</option>
                </select>
            </div>
        </motion.div>
    );
};

// Main Enhanced Discuss Page Component
function EnhancedDiscussPage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');
    const [showDiscussionForm, setShowDiscussionForm] = useState(false);

    const headerRef = useRef(null);
    const titleRef = useRef(null);

    const handleNewDiscussion = (newPost) => {
        const currentTime = new Date();
        const postWithTimestamp = {
            ...newPost,
            id: Date.now(),
            author: user?.firstname || 'Anonymous',
            isVerified: !!user,
            timeAgo: 'Just now',
            timestamp: currentTime.getTime(),
            createdAt: currentTime.toISOString(),
            likes: 0,
            replies: [],
            views: 1,
            isLiked: false,
            isBookmarked: false,
        };
        
        setPosts(prev => [postWithTimestamp, ...prev]);
        
        const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
        const updatedDiscussions = [postWithTimestamp, ...savedDiscussions];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
        
        setShowDiscussionForm(false);
    };

    const handleAddReply = (postId, newReply) => {
        const updatedPosts = posts.map(post => 
            post.id === postId 
                ? { ...post, replies: [...(post.replies || []), newReply] }
                : post
        );
        setPosts(updatedPosts);
        
        const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
        const updatedDiscussions = savedDiscussions.map(post => 
            post.id === postId 
                ? { ...post, replies: [...(post.replies || []), newReply] }
                : post
        );
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
    };

    const handleLike = (postId) => {
        setPosts(prev => prev.map(post => 
            post.id === postId 
                ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) }
                : post
        ));
    };

    const handleBookmark = (postId) => {
        setPosts(prev => prev.map(post => 
            post.id === postId 
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ));
    };

    const handleDeletePost = (postId) => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            setPosts(prev => prev.filter(post => post.id !== postId));
            
            const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
            const updatedDiscussions = savedDiscussions.filter(post => post.id !== postId);
            localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
        }
    };

    // Update timestamps periodically
    useEffect(() => {
        const updateTimestamps = () => {
            setPosts(prev => prev.map(post => ({
                ...post,
                timeAgo: formatTimeAgo(post.timestamp),
                replies: post.replies?.map(reply => ({
                    ...reply,
                    timeAgo: formatTimeAgo(reply.timestamp)
                })) || []
            })));
        };

        // Update every minute
        const interval = setInterval(updateTimestamps, 60000);
        return () => clearInterval(interval);
    }, []);

    // Load discussions from localStorage and add mock data
    useEffect(() => {
        const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
        
        const now = new Date().getTime();
        const mockPosts = [
            {
                id: 1,
                title: 'Best approach for Two Sum problem?',
                content: 'I\'m struggling with the Two Sum problem. I\'ve tried brute force but it\'s too slow. What\'s the optimal approach using hash maps?',
                author: 'Alex Chen',
                isVerified: true,
                timestamp: now - 2 * 60 * 60 * 1000, // 2 hours ago
                timeAgo: formatTimeAgo(now - 2 * 60 * 60 * 1000),
                difficulty: 'easy',
                likes: 24,
                replies: [
                    {
                        id: 1,
                        author: 'Sarah Johnson',
                        content: 'Great question! The hash map approach is indeed optimal. Here\'s why it works...',
                        timestamp: now - 1.5 * 60 * 60 * 1000, // 1.5 hours ago
                        timeAgo: formatTimeAgo(now - 1.5 * 60 * 60 * 1000)
                    }
                ],
                views: 156,
                isLiked: false,
                isBookmarked: false,
                tags: ['algorithms', 'hash-table', 'arrays'],
                code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
            },
            {
                id: 2,
                title: 'Dynamic Programming: Memoization vs Tabulation',
                content: 'When should I use memoization vs tabulation in DP problems? Both seem to work but I want to understand the trade-offs.',
                author: 'Alice Smith',
                isVerified: true,
                timestamp: now - 4 * 60 * 60 * 1000, // 4 hours ago
                timeAgo: formatTimeAgo(now - 4 * 60 * 60 * 1000),
                difficulty: 'medium',
                likes: 18,
                replies: [],
                views: 203,
                isLiked: true,
                isBookmarked: true,
                tags: ['dynamic-programming', 'algorithms', 'optimization']
            },
            {
                id: 3,
                title: 'System Design: Designing a URL Shortener',
                content: 'I have an interview next week for a senior position. They might ask about designing a URL shortener like bit.ly. Any tips on the key components?',
                author: 'Bob Johnson',
                isVerified: false,
                timestamp: now - 6 * 60 * 60 * 1000, // 6 hours ago
                timeAgo: formatTimeAgo(now - 6 * 60 * 60 * 1000),
                difficulty: 'hard',
                likes: 31,
                replies: [],
                views: 287,
                isLiked: false,
                isBookmarked: false,
                tags: ['system-design', 'interview', 'distributed-systems']
            }
        ];

        const allPosts = [...savedDiscussions, ...mockPosts];
        allPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        
        setPosts(allPosts);
        setLoading(false);
    }, []);

    // Enhanced GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only animate if refs exist
            if (titleRef.current) {
                gsap.to(titleRef.current, {
                    text: "Discussion Forum",
                    duration: 2.5,
                    ease: "power2.out",
                    delay: 0.5
                });
            }

            if (headerRef.current) {
                gsap.fromTo(headerRef.current,
                    { y: -100, opacity: 0, scale: 0.8 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        duration: 1.2, 
                        ease: "back.out(1.7)",
                        delay: 0.2
                    }
                );
            }

        }, headerRef);

        return () => ctx.revert();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchSearch = searchTerm === '' || 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        
        const matchFilter = filterBy === 'all' || 
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(filterBy.toLowerCase())));
        
        return matchSearch && matchFilter;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'oldest':
                return new Date(a.timeAgo) - new Date(b.timeAgo);
            case 'most_liked':
                return b.likes - a.likes;
            case 'most_replied':
                return (b.replies?.length || 0) - (a.replies?.length || 0);
            default:
                return (b.timestamp || 0) - (a.timestamp || 0);
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-2xl text-slate-400 font-medium">Loading discussions...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <FloatingParticles />
            <Header />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-lg">Back</span>
                    </button>
                </motion.div>

                <motion.div 
                    ref={headerRef}
                    className="text-center mb-12"
                >
                    <motion.h1 
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-8"
                        style={{ 
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite',
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontWeight: '900',
                            letterSpacing: '-0.02em',
                            lineHeight: '0.9'
                        }}
                    >
                        {/* Text will be filled by GSAP */}
                    </motion.h1>
                    
                    <motion.p 
                        className="text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto leading-relaxed font-medium"
                        style={{
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontWeight: '500',
                            letterSpacing: '-0.01em'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        Connect with fellow programmers and share knowledge! 💬
                    </motion.p>
                    
                    <motion.div 
                        className="mt-6 flex items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Users size={20} />
                            <span className="text-lg font-semibold">Active Community</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        <div className="flex items-center gap-2 text-purple-400">
                            <MessageSquare size={20} />
                            <span className="text-lg font-semibold">Real-time Discussions</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        <div className="flex items-center gap-2 text-pink-400">
                            <Star size={20} />
                            <span className="text-lg font-semibold">Expert Insights</span>
                        </div>
                    </motion.div>
                </motion.div>

                <DiscussionSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                />

                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDiscussionForm(true)}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                    >
                        <Plus size={20} />
                        Start New Discussion
                    </motion.button>
                </motion.div>

                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <AnimatePresence>
                        {filteredPosts.map((post, index) => (
                            <DiscussionPost
                                key={post.id}
                                post={post}
                                index={index}
                                onLike={handleLike}
                                onBookmark={handleBookmark}
                                onDelete={handleDeletePost}
                                currentUser={user}
                                onAddReply={handleAddReply}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPosts.length === 0 && (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <MessageSquare size={80} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-2xl font-bold text-white mb-4">No Discussions Found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                    </motion.div>
                )}
            </main>

            <DiscussionForm 
                isOpen={showDiscussionForm}
                onClose={() => setShowDiscussionForm(false)}
                onPostSuccess={handleNewDiscussion}
            />

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}

export default EnhancedDiscussPage;
