import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
    User, Edit3, Save, X, Star, Trophy, Award, Target, 
    Zap, Flame, Code, Calendar, MapPin, Globe, Github, 
    Linkedin, Twitter, Briefcase, GraduationCap, Settings,
    Bell, Shield, CreditCard, FileText, Plus, CheckCircle,
    Lock, Unlock, TrendingUp, Users, MessageSquare, Eye,
    Palette, Languages, DollarSign, HelpCircle, Flag,
    Sun, Moon, Monitor, Heart, BookOpen, Download
} from 'lucide-react';
import Header from '../components/dashboard/Header';

function SimpleProfilePage() {
    const { user: currentUser } = useSelector(state => state.auth);
    
    const [activeTab, setActiveTab] = useState('basic-info');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: currentUser?.firstname || 'User',
        email: currentUser?.email || 'user@example.com',
        gender: 'Not provided',
        location: 'Your location',
        birthday: 'Your birthday',
        summary: 'Tell us about yourself (interests, experience, etc.)',
        website: 'Your blog, portfolio, etc.',
        github: 'Your Github username or url',
        linkedin: 'Your Linkedin username or url',
        twitter: 'Your X (formerly Twitter) username or url',
        work: 'Add a workplace',
        education: 'Add a school',
        technicalSkills: 'Your Skills.'
    });

    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('en');

    const sidebarItems = [
        { id: 'basic-info', label: 'Basic Info', icon: User },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'badges', label: 'Badges', icon: Award },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
        { id: 'reports', label: 'Reports', icon: Flag }
    ];

    const achievements = [
        { id: 1, title: 'First Problem Solved', description: 'Solved your first coding problem', icon: Star, earned: true },
        { id: 2, title: 'Streak Master', description: 'Maintained a 7-day solving streak', icon: Flame, earned: true },
        { id: 3, title: 'Algorithm Expert', description: 'Solved 50 algorithm problems', icon: Code, earned: false },
        { id: 4, title: 'Contest Champion', description: 'Won a coding contest', icon: Trophy, earned: false }
    ];

    const badges = [
        { id: 1, name: 'Problem Solver', description: 'Solved 10 problems', icon: Target, earned: true, color: 'bg-green-500' },
        { id: 2, name: 'Quick Learner', description: 'Solved 5 problems in a day', icon: Zap, earned: true, color: 'bg-blue-500' },
        { id: 3, name: 'Consistent Coder', description: 'Active for 30 days', icon: Calendar, earned: false, color: 'bg-purple-500' },
        { id: 4, name: 'Community Helper', description: 'Helped 5 users', icon: Users, earned: false, color: 'bg-yellow-500' }
    ];

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
        console.log('Profile saved:', profileData);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'basic-info':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                            >
                                {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                                        />
                                    ) : (
                                        <p className="text-white">{profileData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                                    <p className="text-white">{profileData.email}</p>
                                </div>

                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                                        />
                                    ) : (
                                        <p className="text-white">{profileData.location}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Summary</label>
                                    {isEditing ? (
                                        <textarea
                                            value={profileData.summary}
                                            onChange={(e) => handleInputChange('summary', e.target.value)}
                                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 resize-none"
                                            rows={4}
                                        />
                                    ) : (
                                        <p className="text-white">{profileData.summary}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                >
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'achievements':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Achievements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`p-4 rounded-xl border ${
                                        achievement.earned
                                            ? 'bg-green-500/10 border-green-500/30'
                                            : 'bg-slate-800/50 border-slate-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            achievement.earned ? 'bg-green-500' : 'bg-slate-700'
                                        }`}>
                                            <achievement.icon size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{achievement.title}</h3>
                                            <p className="text-slate-400 text-sm">{achievement.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'badges':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Badges</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className={`p-4 rounded-xl border ${
                                        badge.earned
                                            ? 'bg-slate-800/50 border-slate-700'
                                            : 'bg-slate-800/30 border-slate-800'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                                            badge.earned ? badge.color : 'bg-slate-700'
                                        }`}>
                                            <badge.icon size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-1">{badge.name}</h3>
                                        <p className="text-slate-400 text-sm">{badge.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Settings</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Theme</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                                >
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                    <option value="purple">Purple</option>
                                    <option value="green">Green</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="hi">Hindi</option>
                                    <option value="zh">Chinese</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                        <p className="text-slate-400">This section is under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header user={currentUser} />
            
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                                <User size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                                <p className="text-slate-400">{profileData.email}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-cyan-400 font-medium">Level 5 Coder</span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-slate-400">1,250 points</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                                <nav className="space-y-2">
                                    {sidebarItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
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
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SimpleProfilePage;

