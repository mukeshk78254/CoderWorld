import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    User, Edit3, Save, X, Star, Trophy, Award, Target, 
    Zap, Flame, Code, Calendar, MapPin, Globe, Github, 
    Linkedin, Twitter, Briefcase, GraduationCap, Settings,
    Bell, Shield, CreditCard, FileText, Plus, CheckCircle,
    Lock, Unlock, TrendingUp, Users, MessageSquare, Eye,
    Palette, Languages, DollarSign, HelpCircle, Flag,
    Sun, Moon, Monitor, Heart, BookOpen, Download,
    Sparkles, Crown, Rocket, Brain, Cpu, Database,
    Layers, GitBranch, Terminal, Wrench, Key, Mail,
    Phone, Camera, Image, Music, Video, Gamepad2,
    Coffee, Pizza, Car, Home, Building, TreePine
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Advanced Animated Background with Floating Icons
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

        // Create floating icons
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

            // Draw gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
            gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.6)');
            gradient.addColorStop(1, 'rgba(51, 65, 85, 0.4)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Animate and draw particles
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

            // Animate and draw floating icons
            floatingIcons.forEach((icon, index) => {
                icon.x += icon.vx;
                icon.y += icon.vy;
                icon.rotation += icon.rotationSpeed;
                icon.opacity += icon.pulse * (Math.random() > 0.5 ? 1 : -1);
                icon.opacity = Math.max(0.1, Math.min(0.7, icon.opacity));

                if (icon.x < -50 || icon.x > canvas.width + 50) icon.vx *= -1;
                if (icon.y < -50 || icon.y > canvas.height + 50) icon.vy *= -1;

                // Draw icon shadow
                ctx.save();
                ctx.globalAlpha = icon.opacity * 0.3;
                ctx.translate(icon.x + 2, icon.y + 2);
                ctx.rotate(icon.rotation);
                ctx.fillStyle = '#000000';
                ctx.font = `${icon.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('●', 0, 0);
                ctx.restore();

                // Draw icon
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
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
            />
        </div>
    );
};

// Floating Icon Components
const FloatingIcon = ({ Icon, delay = 0, duration = 3, x = 0, y = 0 }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (iconRef.current) {
            gsap.fromTo(iconRef.current,
                { 
                    opacity: 0, 
                    scale: 0, 
                    rotation: -180,
                    x: x,
                    y: y
                },
                {
                    opacity: 0.6,
                    scale: 1,
                    rotation: 0,
                    x: x + (Math.random() - 0.5) * 100,
                    y: y + (Math.random() - 0.5) * 100,
                    duration: duration,
                    delay: delay,
                    ease: "back.out(1.7)",
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: Math.random() * 2
                }
            );

            gsap.to(iconRef.current, {
                rotation: 360,
                duration: 10,
                repeat: -1,
                ease: "none"
            });
        }
    }, [delay, duration, x, y]);

    return (
        <div
            ref={iconRef}
            className="absolute text-cyan-400/60 pointer-events-none"
            style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
        >
            <Icon size={24} />
        </div>
    );
};

// Theme Context
const ThemeContext = React.createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('en');

    const themes = {
        dark: {
            bg: 'bg-slate-950',
            card: 'bg-slate-900/60',
            border: 'border-slate-800',
            text: 'text-slate-200',
            accent: 'text-cyan-400'
        },
        light: {
            bg: 'bg-gray-50',
            card: 'bg-white/80',
            border: 'border-gray-200',
            text: 'text-gray-800',
            accent: 'text-blue-600'
        },
        purple: {
            bg: 'bg-purple-950',
            card: 'bg-purple-900/60',
            border: 'border-purple-800',
            text: 'text-purple-200',
            accent: 'text-purple-400'
        },
        green: {
            bg: 'bg-green-950',
            card: 'bg-green-900/60',
            border: 'border-green-800',
            text: 'text-green-200',
            accent: 'text-green-400'
        }
    };

    const languages = {
        en: 'English',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        hi: 'हिन्दी',
        zh: '中文'
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes, language, setLanguage, languages }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Theme Toggle Component
const ThemeToggle = () => {
    const { theme, setTheme, themes } = React.useContext(ThemeContext);
    const [showThemes, setShowThemes] = useState(false);

    const themeOptions = [
        { id: 'dark', name: 'Dark', icon: Moon, color: 'bg-slate-600' },
        { id: 'light', name: 'Light', icon: Sun, color: 'bg-yellow-500' },
        { id: 'purple', name: 'Purple', icon: Palette, color: 'bg-purple-500' },
        { id: 'green', name: 'Green', icon: Heart, color: 'bg-green-500' }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setShowThemes(!showThemes)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
                <Palette size={18} className="text-cyan-400" />
                <span className="text-white">Theme</span>
            </button>
            
            {showThemes && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                    {themeOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                setTheme(option.id);
                                setShowThemes(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                                theme === option.id ? 'bg-slate-700' : ''
                            }`}
                        >
                            <div className={`w-6 h-6 rounded-full ${option.color} flex items-center justify-center`}>
                                <option.icon size={12} className="text-white" />
                    </div>
                            <span className="text-white">{option.name}</span>
                        </button>
                    ))}
                        </div>
                    )}
                </div>
    );
};

// Language Toggle Component
const LanguageToggle = () => {
    const { language, setLanguage, languages } = React.useContext(ThemeContext);
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
                <Languages size={18} className="text-cyan-400" />
                <span className="text-white">{languages[language]}</span>
            </button>
            
            {showLanguages && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                    {Object.entries(languages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => {
                                setLanguage(code);
                                setShowLanguages(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                                language === code ? 'bg-slate-700' : ''
                            }`}
                        >
                            <Flag size={16} className="text-cyan-400" />
                            <span className="text-white">{name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Achievement Badge Component
const AchievementBadge = ({ achievement, index }) => {
    return (
        <div className="relative group">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-700'
            } shadow-lg`}>
                {achievement.unlocked ? (
                    <Trophy size={32} className="text-white" />
                ) : (
                    <Lock size={32} className="text-slate-400" />
                )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                    <div className="font-semibold">{achievement.name}</div>
                    <div className="text-slate-300">{achievement.description}</div>
                    {achievement.unlocked && (
                        <div className="text-green-400 mt-1">✓ Unlocked</div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Editable Field Component
const EditableField = ({ label, value, onSave, type = "text", placeholder, points = 0, icon: Icon }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-cyan-400" />
                </div>
                <div>
                    <div className="text-white font-medium">{label}</div>
                    {isEditing ? (
                        <input
                            type={type}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="mt-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                            placeholder={placeholder}
                        />
                    ) : (
                        <div className="text-slate-400 text-sm">
                            {value || placeholder}
                    </div>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                {points > 0 && (
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
                        onClick={() => setIsEditing(true)}
                        className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
                    >
                        <Edit3 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

// Main Profile Page Component
function EnhancedProfilePage() {
    const { user: currentUser, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [activeTab, setActiveTab] = useState('basic-info');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!isAuthenticated || authLoading) return;
            
            try {
                setLoading(true);
                setError(null);
                const response = await axiosClient.get('/profile');
                setProfileData(response.data.user || response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                // Don't set error state, just use fallback data
                console.log('Using fallback profile data');
                // Set loading to false immediately so content shows
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if authenticated and not loading
        if (isAuthenticated && !authLoading) {
            fetchProfileData();
        } else {
            // If not authenticated, just set loading to false
            setLoading(false);
        }
    }, [isAuthenticated, authLoading]);

    const [achievements, setAchievements] = useState([
        { id: 1, name: 'First Problem Solved', description: 'Solve your first coding problem', unlocked: true, icon: '🎯' },
        { id: 2, name: 'Streak Master', description: 'Maintain a 7-day solving streak', unlocked: true, icon: '🔥' },
        { id: 3, name: 'Algorithm Expert', description: 'Solve 50 algorithm problems', unlocked: false, icon: '🧠' },
        { id: 4, name: 'Data Structure Pro', description: 'Master all data structures', unlocked: false, icon: '📊' },
        { id: 5, name: 'Contest Champion', description: 'Win a coding contest', unlocked: false, icon: '🏆' },
        { id: 6, name: 'Community Helper', description: 'Help 10 other users', unlocked: false, icon: '🤝' }
    ]);

    // Handle saving profile field
    const handleSaveField = async (fieldPath, value) => {
        try {
            const response = await axiosClient.put('/profile/field', {
                field: fieldPath,
                value: value
            });
            
            // Update local profile data
            setProfileData(response.data.user || response.data);
        } catch (err) {
            console.error('Error updating profile field:', err);
            setError('Failed to update profile field');
        }
    };

    const [badges, setBadges] = useState([
        { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', unlocked: true, color: 'green' },
        { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in one day', unlocked: true, color: 'blue' },
        { id: 3, name: 'Consistent Coder', description: '7-day streak', unlocked: false, color: 'purple' },
        { id: 4, name: 'Algorithm Master', description: 'Solved 25 algorithm problems', unlocked: false, color: 'orange' }
    ]);

    const [stats, setStats] = useState({
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
    });


    const sidebarItems = [
        { id: 'basic-info', label: 'Basic Info', icon: User },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'badges', label: 'Badges', icon: Award },
        { id: 'points', label: 'Points', icon: Star },
        { id: 'transactions', label: 'Transactions', icon: DollarSign },
        { id: 'account', label: 'Account', icon: Settings },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
        { id: 'reports', label: 'Reports', icon: Flag },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'orders', label: 'Orders', icon: FileText }
    ];

    const renderBasicInfo = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Info</h3>
                <EditableField
                    label="Name"
                    value={displayProfileData.firstname || 'Demo User'}
                    onSave={(value) => handleSaveField('firstname', value)}
                    points={2}
                    icon={User}
                    placeholder="Enter your full name"
                />
                <EditableField
                    label="Gender"
                    value={displayProfileData.profile?.gender || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.gender', value)}
                    points={2}
                    icon={User}
                    placeholder="Male, Female, Other, or Not specified"
                />
                <EditableField
                    label="Location"
                    value={displayProfileData.profile?.location || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.location', value)}
                    points={2}
                    icon={MapPin}
                    placeholder="City, Country"
                />
                <EditableField
                    label="Birthday"
                    value={displayProfileData.profile?.birthday ? new Date(displayProfileData.profile.birthday).toISOString().split('T')[0] : ''}
                    onSave={(value) => handleSaveField('profile.birthday', value)}
                    type="date"
                    points={2}
                    icon={Calendar}
                    placeholder="Select your birthday"
                />
                <EditableField
                    label="Summary"
                    value={displayProfileData.profile?.summary || 'Welcome to your LeetCode profile! Complete your profile to get started.'}
                    onSave={(value) => handleSaveField('profile.summary', value)}
                    points={2}
                    icon={FileText}
                    placeholder="Tell us about yourself, your coding journey, and interests"
                />
                <EditableField
                    label="Website"
                    value={displayProfileData.profile?.website || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.website', value)}
                    points={2}
                    icon={Globe}
                    placeholder="https://your-website.com"
                />
                <EditableField
                    label="Github"
                    value={displayProfileData.profile?.github || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.github', value)}
                    points={2}
                    icon={Github}
                    placeholder="https://github.com/yourusername"
                />
                <EditableField
                    label="LinkedIn"
                    value={displayProfileData.profile?.linkedin || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.linkedin', value)}
                    points={2}
                    icon={Linkedin}
                    placeholder="https://linkedin.com/in/yourprofile"
                />
                <EditableField
                    label="X (formerly Twitter)"
                    value={displayProfileData.profile?.twitter || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.twitter', value)}
                    points={2}
                    icon={Twitter}
                    placeholder="https://x.com/yourusername"
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
                <EditableField
                    label="Work"
                    value={displayProfileData.profile?.work || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.work', value)}
                    points={2}
                    icon={Briefcase}
                    placeholder="Your current job title and company"
                />
                <EditableField
                    label="Education"
                    value={displayProfileData.profile?.education || 'Not specified'}
                    onSave={(value) => handleSaveField('profile.education', value)}
                    points={2}
                    icon={GraduationCap}
                    placeholder="Your educational background"
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
                <EditableField
                    label="Technical Skills"
                    value={displayProfileData.profile?.skills || 'JavaScript, Python, Java, C++, React, Node.js'}
                    onSave={(value) => handleSaveField('profile.skills', value)}
                    icon={Code}
                    placeholder="List your programming languages and technologies"
                />
            </div>
                            </div>
    );

    const renderAchievements = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Your Achievements</h3>
                <p className="text-slate-400">Track your coding journey milestones</p>
                            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {achievements.map((achievement, index) => (
                    <div key={achievement.id} className="text-center">
                        <AchievementBadge achievement={achievement} index={index} />
                        <div className="mt-2">
                            <div className="text-white text-sm font-medium">{achievement.name}</div>
                            <div className="text-slate-400 text-xs">{achievement.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBadges = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Your Badges</h3>
                <p className="text-slate-400">Showcase your coding accomplishments</p>
                        </div>
                        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {badges.map((badge, index) => (
                    <div
                        key={badge.id}
                        className={`p-6 rounded-xl border-2 ${
                            badge.unlocked 
                                ? 'bg-slate-800/50 border-cyan-400/50' 
                                : 'bg-slate-800/30 border-slate-600'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                badge.unlocked 
                                    ? `bg-${badge.color}-500` 
                                    : 'bg-slate-600'
                            }`}>
                                {badge.unlocked ? (
                                    <Award size={24} className="text-white" />
                                ) : (
                                    <Lock size={24} className="text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-semibold">{badge.name}</h4>
                                <p className="text-slate-400 text-sm">{badge.description}</p>
                                <div className={`text-xs mt-1 ${
                                    badge.unlocked ? 'text-green-400' : 'text-slate-500'
                                }`}>
                                    {badge.unlocked ? '✓ Earned' : 'Locked'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPoints = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Your Points & Stats</h3>
                <p className="text-slate-400">Track your progress and achievements</p>
                    </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Problems Solved', value: stats.problemsSolved, total: stats.totalProblems, color: 'cyan' },
                    { label: 'Current Streak', value: stats.currentStreak, color: 'orange' },
                    { label: 'Max Streak', value: stats.maxStreak, color: 'red' },
                    { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, color: 'purple' }
                ].map((stat, index) => (
                    <div key={stat.label} className="p-6 bg-slate-800/50 rounded-xl text-center">
                        <div className={`w-12 h-12 bg-${stat.color}-500 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                            <Star size={24} className="text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                        {stat.total && (
                            <div className="text-slate-500 text-xs mt-1">of {stat.total}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTransactions = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Transaction History</h3>
                <p className="text-slate-400">View your payment and subscription history</p>
                </div>

                    <div className="space-y-4">
                {[
                    { id: 1, type: 'Premium Subscription', amount: '$9.99', date: '2024-01-15', status: 'Completed' },
                    { id: 2, type: 'Contest Entry', amount: '$2.99', date: '2024-01-10', status: 'Completed' },
                    { id: 3, type: 'Premium Subscription', amount: '$9.99', date: '2023-12-15', status: 'Completed' }
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
                    </div>
    );

    const renderHelp = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Help & Support</h3>
                <p className="text-slate-400">Get help and support for your coding journey</p>
                            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: 'Getting Started', description: 'Learn how to use the platform', icon: BookOpen },
                    { title: 'Problem Solving', description: 'Tips for solving coding problems', icon: Code },
                    { title: 'Contests', description: 'How to participate in contests', icon: Trophy },
                    { title: 'Account Issues', description: 'Troubleshoot account problems', icon: Settings }
                ].map((help, index) => (
                    <div key={index} className="p-6 bg-slate-800/50 rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                                <help.icon size={24} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{help.title}</h4>
                                <p className="text-slate-400 text-sm">{help.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderReports = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Reports</h3>
                <p className="text-slate-400">Report issues or violations</p>
            </div>

            <div className="space-y-4">
                <div className="p-6 bg-slate-800/50 rounded-xl">
                    <h4 className="text-white font-semibold mb-4">Report a Problem</h4>
                    <textarea
                        placeholder="Describe the issue you encountered..."
                        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                        rows={4}
                    />
                    <button className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
                        Submit Report
                    </button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'basic-info':
                return renderBasicInfo();
            case 'achievements':
                return renderAchievements();
            case 'badges':
                return renderBadges();
            case 'points':
                return renderPoints();
            case 'transactions':
                return renderTransactions();
            case 'help':
                return renderHelp();
            case 'reports':
                return renderReports();
            default:
                return (
                    <div className="text-center py-16">
                        <Settings size={64} className="mx-auto mb-4 text-slate-600" />
                        <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                        <p className="text-slate-400">This section is under development</p>
                    </div>
                );
        }
    };

    // Show loading state only briefly, then show content
    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-cyan-400 mb-4"></div>
                    <p className="text-lg text-slate-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Show a warning if not authenticated but still show the profile
    const showAuthWarning = !isAuthenticated;

    // Create fallback profile data if none exists
    const displayProfileData = profileData || {
        firstname: currentUser?.firstname || 'Demo User',
        profile: {
            gender: 'Not specified',
            location: 'Not specified',
            birthday: '',
            summary: 'Welcome to your LeetCode profile! Complete your profile to get started.',
            website: 'Not specified',
            github: 'Not specified',
            linkedin: 'Not specified',
            twitter: 'Not specified',
            work: 'Not specified',
            education: 'Not specified',
            skills: 'JavaScript, Python, Java, C++, React, Node.js'
        },
        _id: currentUser?.id || 'demo-user-123'
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
                <AnimatedProfileBackground />
                
                {/* Floating Icons Overlay */}
                <div className="fixed inset-0 pointer-events-none z-10">
                    <FloatingIcon Icon={Code} delay={0} duration={4} x={-200} y={-100} />
                    <FloatingIcon Icon={Trophy} delay={0.5} duration={3.5} x={200} y={-150} />
                    <FloatingIcon Icon={Star} delay={1} duration={4.5} x={-150} y={100} />
                    <FloatingIcon Icon={Award} delay={1.5} duration={3} x={150} y={120} />
                    <FloatingIcon Icon={Target} delay={2} duration={4} x={-100} y={-200} />
                    <FloatingIcon Icon={Zap} delay={2.5} duration={3.5} x={100} y={-100} />
                    <FloatingIcon Icon={Flame} delay={3} duration={4} x={-200} y={150} />
                    <FloatingIcon Icon={Brain} delay={3.5} duration={3} x={200} y={100} />
                    <FloatingIcon Icon={Cpu} delay={4} duration={4.5} x={-150} y={-50} />
                    <FloatingIcon Icon={Database} delay={4.5} duration={3.5} x={150} y={-200} />
                    <FloatingIcon Icon={Layers} delay={5} duration={4} x={-100} y={200} />
                    <FloatingIcon Icon={GitBranch} delay={5.5} duration={3} x={100} y={200} />
                    <FloatingIcon Icon={Terminal} delay={6} duration={4.5} x={-250} y={50} />
                    <FloatingIcon Icon={Wrench} delay={6.5} duration={3.5} x={250} y={-50} />
                    <FloatingIcon Icon={Key} delay={7} duration={4} x={-200} y={-250} />
                    <FloatingIcon Icon={Mail} delay={7.5} duration={3} x={200} y={250} />
                    <FloatingIcon Icon={Phone} delay={8} duration={4.5} x={-50} y={-300} />
                    <FloatingIcon Icon={Camera} delay={8.5} duration={3.5} x={50} y={300} />
                    <FloatingIcon Icon={Image} delay={9} duration={4} x={-300} y={-100} />
                    <FloatingIcon Icon={Music} delay={9.5} duration={3} x={300} y={100} />
                    <FloatingIcon Icon={Video} delay={10} duration={4.5} x={-100} y={-300} />
                    <FloatingIcon Icon={Gamepad2} delay={10.5} duration={3.5} x={100} y={300} />
                    <FloatingIcon Icon={Coffee} delay={11} duration={4} x={-300} y={200} />
                    <FloatingIcon Icon={Pizza} delay={11.5} duration={3} x={300} y={-200} />
                    <FloatingIcon Icon={Car} delay={12} duration={4.5} x={-250} y={-150} />
                    <FloatingIcon Icon={Home} delay={12.5} duration={3.5} x={250} y={150} />
                    <FloatingIcon Icon={Building} delay={13} duration={4} x={-150} y={-300} />
                    <FloatingIcon Icon={TreePine} delay={13.5} duration={3} x={150} y={300} />
                </div>

                <Header />
                
                {/* Authentication Warning Banner */}
                {showAuthWarning && (
                    <motion.div 
                        className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mx-4 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <Shield size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-yellow-200 font-medium">Demo Mode</p>
                                    <p className="text-yellow-300/80 text-sm">You're viewing a demo profile. <button onClick={() => navigate('/login')} className="underline hover:text-yellow-200">Login</button> to access your real profile.</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Login
                            </button>
                        </div>
                    </motion.div>
                )}
                
                <main className="container mx-auto px-4 py-8 relative z-20">
                    {/* Profile Header */}
                    <motion.div 
                        className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "back.out(1.7)" }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <motion.div 
                                className="flex items-center gap-6"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <motion.div 
                                    className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center"
                                    whileHover={{ 
                                        scale: 1.1, 
                                        rotate: 360,
                                        backgroundColor: "rgba(6, 182, 212, 0.2)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <User size={40} className="text-slate-400" />
                                </motion.div>
                                <div>
                                    <motion.div 
                                        className="flex items-center gap-3 mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                    >
                                        <h1 className="text-2xl font-bold text-white">{displayProfileData.firstname || 'User'}</h1>
                                        <motion.button 
                                            className="p-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Edit3 size={16} />
                                        </motion.button>
                                    </motion.div>
                                    <motion.p 
                                        className="text-slate-400"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        LeetCode ID: {displayProfileData.firstname?.toLowerCase() || 'user'}{displayProfileData._id?.slice(0, 5) || ''}
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* Theme and Language Controls */}
                            <motion.div 
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                <ThemeToggle />
                                <LanguageToggle />
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <motion.div 
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.div 
                                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-8 backdrop-blur-sm"
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                                }}
                            >
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
                            </motion.div>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div 
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div 
                                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
                                whileHover={{ 
                                    scale: 1.01,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    {renderContent()}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </div>
            </main>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .floating-icon {
                    animation: float 6s ease-in-out infinite;
                }
                
                .pulse-icon {
                    animation: pulse 2s ease-in-out infinite;
                }
                
                .rotate-icon {
                    animation: rotate 10s linear infinite;
                }
                
                .gradient-text {
                    background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899);
                    background-size: 200% 200%;
                    animation: gradientShift 3s ease-in-out infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
        </ThemeProvider>
    );
}

export default EnhancedProfilePage;