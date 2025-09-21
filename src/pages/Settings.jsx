import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    Settings as SettingsIcon, User, Lock, Mail, Shield, Bell, Eye, Palette,
    Monitor, Sun, Moon, Type, Keyboard, Code, Volume2, VolumeX,
    Save, RotateCcw, Check, X, AlertCircle, Info, Star, Zap, Key, QrCode,
    Github, Linkedin, ExternalLink, EyeOff, Trash2, Plus
} from 'lucide-react';
import Header from '../components/dashboard/Header';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Settings = () => {
    const user = useSelector(state => state.auth.user);
    const { isDarkMode, theme, toggleTheme, setThemeMode } = useTheme();
    const {
        settings,
        isLoading,
        saveStatus,
        updateSetting,
        updateSocialAccount,
        saveSettings,
        resetSettings,
        changeEmail,
        enableTwoFactor,
        disableTwoFactor,
        connectSocialAccount,
        disconnectSocialAccount
    } = useSettings();

    const [activeTab, setActiveTab] = useState('account');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const backgroundRef = useRef(null);
    const particlesRef = useRef([]);

    // Authentic Gear-Based Settings GSAP Background Animation
    useEffect(() => {
        console.log('⚙️ Authentic Gear Settings GSAP Background starting...');
        console.log('backgroundRef.current:', backgroundRef.current);
        
        if (!backgroundRef.current) {
            console.log('❌ No backgroundRef.current found!');
            return;
        }

        const ctx = gsap.context(() => {
            console.log('✅ Authentic Gear context created, starting animations...');
            
            // Get current theme for adaptive colors
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                          !document.documentElement.getAttribute('data-theme');
            
            // Theme-aware colors
            const gearColor = isDark ? '#64748b' : '#94a3b8';
            const gearAccent = isDark ? '#475569' : '#64748b';
            const gearGlow = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.2)';
            const connectionColor = isDark ? '#475569' : '#64748b';
            
            // Create authentic gear shapes with proper teeth
            const gears = [];
            const gearSizes = [60, 80, 100, 70, 90, 50, 75, 65];
            const gearPositions = [
                { x: 15, y: 20 }, { x: 75, y: 15 }, { x: 20, y: 70 },
                { x: 80, y: 75 }, { x: 50, y: 10 }, { x: 10, y: 50 },
                { x: 70, y: 60 }, { x: 30, y: 85 }
            ];
            
            for (let i = 0; i < 8; i++) {
                const gear = document.createElement('div');
                const size = gearSizes[i];
                const pos = gearPositions[i];
                
                gear.className = 'absolute';
                gear.style.width = `${size}px`;
                gear.style.height = `${size}px`;
                gear.style.left = `${pos.x}%`;
                gear.style.top = `${pos.y}%`;
                gear.style.opacity = '0.4';
                gear.style.zIndex = '1';
                
                // Create authentic gear shape with CSS
                const teethCount = 12;
                const toothAngle = 360 / teethCount;
                let gearShape = '';
                
                for (let j = 0; j < teethCount; j++) {
                    const angle = j * toothAngle;
                    const innerRadius = size * 0.3;
                    const outerRadius = size * 0.5;
                    const toothWidth = size * 0.1;
                    
                    const x1 = 50 + Math.cos((angle - toothWidth/2) * Math.PI / 180) * innerRadius;
                    const y1 = 50 + Math.sin((angle - toothWidth/2) * Math.PI / 180) * innerRadius;
                    const x2 = 50 + Math.cos((angle + toothWidth/2) * Math.PI / 180) * outerRadius;
                    const y2 = 50 + Math.sin((angle + toothWidth/2) * Math.PI / 180) * outerRadius;
                    
                    gearShape += `M ${x1} ${y1} L ${x2} ${y2} `;
                }
                
                gear.style.background = `
                    radial-gradient(circle at 50% 50%, ${gearAccent} 15%, transparent 15%),
                    conic-gradient(from 0deg, 
                        ${gearColor} 0deg, transparent 8deg, 
                        ${gearColor} 16deg, transparent 24deg,
                        ${gearColor} 32deg, transparent 40deg,
                        ${gearColor} 48deg, transparent 56deg,
                        ${gearColor} 64deg, transparent 72deg,
                        ${gearColor} 80deg, transparent 88deg,
                        ${gearColor} 96deg, transparent 104deg,
                        ${gearColor} 112deg, transparent 120deg,
                        ${gearColor} 128deg, transparent 136deg,
                        ${gearColor} 144deg, transparent 152deg,
                        ${gearColor} 160deg, transparent 168deg,
                        ${gearColor} 176deg, transparent 184deg,
                        ${gearColor} 192deg, transparent 200deg,
                        ${gearColor} 208deg, transparent 216deg,
                        ${gearColor} 224deg, transparent 232deg,
                        ${gearColor} 240deg, transparent 248deg,
                        ${gearColor} 256deg, transparent 264deg,
                        ${gearColor} 272deg, transparent 280deg,
                        ${gearColor} 288deg, transparent 296deg,
                        ${gearColor} 304deg, transparent 312deg,
                        ${gearColor} 320deg, transparent 328deg,
                        ${gearColor} 336deg, transparent 344deg
                    )
                `;
                gear.style.borderRadius = '50%';
                gear.style.boxShadow = `
                    0 0 20px ${gearGlow},
                    inset 0 0 15px ${gearAccent}20
                `;
                gear.style.filter = 'blur(0.5px)';
                
                backgroundRef.current.appendChild(gear);
                gears.push(gear);
                console.log(`Created authentic gear ${i + 1} at ${pos.x}%, ${pos.y}%`);
            }

            // Animate gears with different rotation speeds (authentic gear behavior)
            gears.forEach((gear, index) => {
                const speed = 20 + index * 3; // Different speeds for each gear
                gsap.to(gear, {
                    rotation: 360,
                    duration: speed,
                    repeat: -1,
                    ease: "linear"
                });
            });

            // Create floating settings icons with gear theme
            const settingsIcons = [];
            const icons = ['⚙', '🔧', '🎛️', '⚡', '🔌', '📊', '🎯', '💻', '🔍', '📈'];
            
            for (let i = 0; i < 10; i++) {
                const icon = document.createElement('div');
                const iconSymbol = icons[Math.floor(Math.random() * icons.length)];
                const size = Math.random() * 20 + 15;
                
                icon.textContent = iconSymbol;
                icon.className = 'absolute';
                icon.style.fontSize = `${size}px`;
                icon.style.left = Math.random() * 80 + 10 + '%';
                icon.style.top = Math.random() * 80 + 10 + '%';
                icon.style.color = gearColor;
                icon.style.opacity = '0.3';
                icon.style.zIndex = '1';
                icon.style.textShadow = `0 0 10px ${gearGlow}`;
                icon.style.filter = 'grayscale(20%) brightness(0.9)';
                
                backgroundRef.current.appendChild(icon);
                settingsIcons.push(icon);
            }

            // Animate settings icons with gentle floating
            settingsIcons.forEach((icon, index) => {
                gsap.to(icon, {
                    y: Math.random() * 25 - 12.5,
                    x: Math.random() * 25 - 12.5,
                    rotation: Math.random() * 15 - 7.5,
                    duration: 20 + Math.random() * 15,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 1.5
                });
            });

            // Create gear connection lines (like mechanical connections)
            const connections = [];
            for (let i = 0; i < 6; i++) {
                const connection = document.createElement('div');
                const length = Math.random() * 100 + 80;
                const angle = Math.random() * 360;
                
                connection.className = 'absolute';
                connection.style.width = `${length}px`;
                connection.style.height = '2px';
                connection.style.background = `linear-gradient(90deg, transparent, ${connectionColor}40, ${connectionColor}, ${connectionColor}40, transparent)`;
                connection.style.left = Math.random() * 70 + 15 + '%';
                connection.style.top = Math.random() * 70 + 15 + '%';
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.opacity = '0.25';
                connection.style.zIndex = '1';
                connection.style.boxShadow = `0 0 8px ${gearGlow}`;
                
                backgroundRef.current.appendChild(connection);
                connections.push(connection);
            }

            // Animate connections with subtle pulsing
            connections.forEach((connection, index) => {
                gsap.to(connection, {
                    opacity: 0.15,
                    scale: 1.1,
                    duration: 6 + index * 1,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 1.2
                });
            });

            // Create floating particles (like gear dust/sparks)
            const particles = [];
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                const size = Math.random() * 4 + 2;
                
                particle.className = 'absolute rounded-full';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = gearColor;
                particle.style.left = Math.random() * 90 + 5 + '%';
                particle.style.top = Math.random() * 90 + 5 + '%';
                particle.style.opacity = '0.2';
                particle.style.zIndex = '1';
                particle.style.boxShadow = `0 0 8px ${gearGlow}`;
                
                backgroundRef.current.appendChild(particle);
                particles.push(particle);
            }

            // Animate particles with floating
            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    y: Math.random() * 30 - 15,
                    x: Math.random() * 30 - 15,
                    opacity: Math.random() * 0.3 + 0.1,
                    scale: Math.random() * 1.2 + 0.8,
                    duration: 12 + Math.random() * 8,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.8
                });
            });

            // Create theme-aware gradient animation
            const gradientAnimation = gsap.timeline({ repeat: -1 });
            
            if (isDark) {
                gradientAnimation
                    .to(backgroundRef.current, {
                        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(225deg, #1e293b 0%, #334155 50%, #475569 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(315deg, #334155 0%, #475569 50%, #64748b 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    });
            } else {
                gradientAnimation
                    .to(backgroundRef.current, {
                        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(225deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(315deg, #cbd5e1 0%, #94a3b8 50%, #64748b 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    })
                    .to(backgroundRef.current, {
                        background: "linear-gradient(45deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                        duration: 25,
                        ease: "power1.inOut"
                    });
            }

            console.log('⚙️ Authentic Gear Settings GSAP animations created successfully!');

        }, backgroundRef);

        console.log('✅ Authentic Gear animations setup complete!');
        return () => {
            console.log('🧹 Cleaning up authentic gear animations...');
            ctx.revert();
        };
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (fields) => {
        const newErrors = {};
        fields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailChange = async () => {
        if (!validateForm(['newEmail', 'currentPassword', 'confirmPassword'])) return;
        
        if (formData.currentPassword !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const result = await changeEmail(
                formData.newEmail,
                formData.currentPassword,
                formData.confirmPassword
            );
            setSuccessMessage(result.message);
            setShowEmailModal(false);
            setFormData({});
        } catch (error) {
            setErrors({ general: error.message });
        }
    };

    const handle2FA = async (action) => {
        if (action === 'enable') {
            if (!validateForm(['password', 'confirmPassword'])) return;
            if (formData.password !== formData.confirmPassword) {
                setErrors({ confirmPassword: 'Passwords do not match' });
                return;
            }
            try {
                const result = await enableTwoFactor(formData.password, formData.confirmPassword);
                setSuccessMessage(result.message);
                setShow2FAModal(false);
                setFormData({});
            } catch (error) {
                setErrors({ general: error.message });
            }
        } else {
            if (!validateForm(['password'])) return;
            try {
                const result = await disableTwoFactor(formData.password);
                setSuccessMessage(result.message);
                setShow2FAModal(false);
                setFormData({});
            } catch (error) {
                setErrors({ general: error.message });
            }
        }
    };

    const handleSocialConnect = async (platform) => {
        if (!validateForm(['username', 'password'])) return;
        
        try {
            const result = await connectSocialAccount(platform, formData.username, formData.password);
            setSuccessMessage(result.message);
            setShowSocialModal(null);
            setFormData({});
        } catch (error) {
            setErrors({ general: error.message });
        }
    };

    const handleSocialDisconnect = async (platform) => {
        try {
            const result = await disconnectSocialAccount(platform);
            setSuccessMessage(result.message);
        } catch (error) {
            setErrors({ general: error.message });
        }
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'editor', label: 'Editor', icon: Code },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            {/* Animated Background */}
            <div 
                ref={backgroundRef}
                className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                style={{ 
                    zIndex: 0,
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #0f172a 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 15s ease infinite'
                }}
            />
            
            {/* Additional overlay for depth */}
            <div 
                className="fixed inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"
                style={{ zIndex: 1 }}
            />

            <Header user={user} />

            <div className="container mx-auto px-4 py-8 relative" style={{ zIndex: 10 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <motion.h1 
                        className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                            textShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Settings
                    </motion.h1>
                    <motion.p 
                        className="text-slate-300 text-xl font-medium tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.01em"
                        }}
                    >
                        Customize your experience and preferences
                    </motion.p>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.div>

                {/* Success Message */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        {successMessage}
                    </motion.div>
                )}

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                                <motion.h3 
                                    className="text-xl font-bold mb-6 flex items-center gap-3 text-cyan-400"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        letterSpacing: "0.01em"
                                    }}
                                >
                                    <SettingsIcon className="w-6 h-6" />
                                    Categories
                                </motion.h3>
                                <nav className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <motion.button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                                    activeTab === tab.id
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                                                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-lg'
                                                }`}
                                                whileHover={{ scale: 1.02, x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * tabs.indexOf(tab) }}
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontWeight: activeTab === tab.id ? '600' : '500',
                                                    letterSpacing: "0.01em"
                                                }}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {tab.label}
                                            </motion.button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'account' && (
                                        <motion.div
                                            key="account"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6"
                                        >
                                            <motion.h2 
                                                className="text-3xl font-bold flex items-center gap-3 text-white mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    letterSpacing: "-0.01em",
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                                }}
                                            >
                                                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                Account Settings
                                            </motion.h2>
                                            <motion.p 
                                                className="text-slate-400 text-lg mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                Manage your account information and security settings
                                            </motion.p>

                                            {/* Email Settings */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="email"
                                                            value={settings.email}
                                                            readOnly
                                                            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                                        />
                                                        <button 
                                                            onClick={() => setShowEmailModal(true)}
                                                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                                                        >
                                                            <Mail className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Two-Factor Authentication */}
                                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                                                    <div>
                                                        <h3 className="font-medium">Two-Factor Authentication</h3>
                                                        <p className="text-sm text-slate-400">
                                                            {settings.twoFactor ? 'Enabled' : 'Add an extra layer of security'}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => setShow2FAModal(true)}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.twoFactor ? 'bg-cyan-500' : 'bg-slate-600'
                                                        }`}
                                                    >
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                            settings.twoFactor ? 'translate-x-6' : 'translate-x-1'
                                                        }`} />
                                                    </button>
                                                </div>

                                                {/* Social Accounts */}
                                                <div>
                                                    <h3 className="font-medium mb-3">Connected Accounts</h3>
                                                    <div className="space-y-3">
                                                        {Object.entries(settings.socialAccounts).map(([platform, account]) => (
                                                            <div key={platform} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                                <div className="flex items-center gap-3">
                                                                    {platform === 'github' ? <Github className="w-5 h-5" /> : 
                                                                     platform === 'linkedin' ? <Linkedin className="w-5 h-5" /> :
                                                                     <Mail className="w-5 h-5" />}
                                                                    <div>
                                                                        <span className="capitalize font-medium">{platform}</span>
                                                                        {account.connected && account.username && (
                                                                            <p className="text-sm text-slate-400">@{account.username}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    {account.connected ? (
                                                                        <>
                                                                            {account.url && (
                                                                                <a 
                                                                                    href={account.url} 
                                                                                    target="_blank" 
                                                                                    rel="noopener noreferrer"
                                                                                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                                                                                >
                                                                                    <ExternalLink className="w-4 h-4" />
                                                                                </a>
                                                                            )}
                                                                            <button
                                                                                onClick={() => handleSocialDisconnect(platform)}
                                                                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                                                                disabled={isLoading}
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => setShowSocialModal(platform)}
                                                                            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition-colors"
                                                                        >
                                                                            Connect
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'editor' && (
                                        <motion.div
                                            key="editor"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6"
                                        >
                                            <motion.h2 
                                                className="text-3xl font-bold flex items-center gap-3 text-white mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    letterSpacing: "-0.01em",
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                                }}
                                            >
                                                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                                    <Code className="w-6 h-6 text-white" />
                                                </div>
                                                Editor Settings
                                            </motion.h2>
                                            <motion.p 
                                                className="text-slate-400 text-lg mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                Customize your coding environment and preferences
                                            </motion.p>

                                            {/* Theme Toggle */}
                                            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                                    <div>
                                                        <h3 className="font-medium">Theme</h3>
                                                        <p className="text-sm text-slate-400">Switch between light and dark mode</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={toggleTheme}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${
                                                        isDarkMode ? 'bg-cyan-500' : 'bg-yellow-500'
                                                    }`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                                    }`} />
                                                </button>
                                            </div>

                                            {/* Font Settings */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Font Size</label>
                                                    <input
                                                        type="range"
                                                        min="10"
                                                        max="24"
                                                        value={settings.fontSize}
                                                        onChange={(e) => updateSetting('editor', 'fontSize', parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                    <div className="text-center text-sm text-slate-400 mt-1">{settings.fontSize}px</div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Font Family</label>
                                                    <select
                                                        value={settings.fontFamily}
                                                        onChange={(e) => updateSetting('editor', 'fontFamily', e.target.value)}
                                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                                                    >
                                                        <option value="JetBrains Mono">JetBrains Mono</option>
                                                        <option value="Fira Code">Fira Code</option>
                                                        <option value="Source Code Pro">Source Code Pro</option>
                                                        <option value="Monaco">Monaco</option>
                                                        <option value="Consolas">Consolas</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Editor Options */}
                                            <div className="space-y-3">
                                                <h3 className="font-medium">Editor Options</h3>
                                                {[
                                                    { key: 'wordWrap', label: 'Word Wrap' },
                                                    { key: 'minimap', label: 'Minimap' },
                                                    { key: 'lineNumbers', label: 'Line Numbers' },
                                                    { key: 'autoSave', label: 'Auto Save' },
                                                    { key: 'bracketMatching', label: 'Bracket Matching' }
                                                ].map((option) => (
                                                    <div key={option.key} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                                        <span>{option.label}</span>
                                                        <button
                                                            onClick={() => updateSetting('editor', option.key, !settings[option.key])}
                                                            className={`relative w-10 h-5 rounded-full transition-colors ${
                                                                settings[option.key] ? 'bg-cyan-500' : 'bg-slate-600'
                                                            }`}
                                                        >
                                                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings[option.key] ? 'translate-x-5' : 'translate-x-0.5'
                                                            }`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'notifications' && (
                                        <motion.div
                                            key="notifications"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6"
                                        >
                                            <motion.h2 
                                                className="text-3xl font-bold flex items-center gap-3 text-white mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    letterSpacing: "-0.01em",
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                                }}
                                            >
                                                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                                                    <Bell className="w-6 h-6 text-white" />
                                                </div>
                                                Notification Settings
                                            </motion.h2>
                                            <motion.p 
                                                className="text-slate-400 text-lg mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                Control how and when you receive notifications
                                            </motion.p>

                                            <div className="space-y-4">
                                                {[
                                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                                                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                                                    { key: 'soundEnabled', label: 'Sound Alerts', desc: 'Play sound for notifications' },
                                                    { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'System desktop notifications' },
                                                    { key: 'contestReminders', label: 'Contest Reminders', desc: 'Get reminded about upcoming contests' },
                                                    { key: 'problemRecommendations', label: 'Problem Recommendations', desc: 'Receive personalized problem suggestions' }
                                                ].map((notification) => (
                                                    <div key={notification.key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                                                        <div>
                                                            <h3 className="font-medium">{notification.label}</h3>
                                                            <p className="text-sm text-slate-400">{notification.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                updateSetting('', notification.key, !settings[notification.key]);
                                                                setSuccessMessage(`${notification.label} ${!settings[notification.key] ? 'enabled' : 'disabled'}`);
                                                                setTimeout(() => setSuccessMessage(''), 2000);
                                                            }}
                                                            className={`relative w-12 h-6 rounded-full transition-colors ${
                                                                settings[notification.key] ? 'bg-cyan-500' : 'bg-slate-600'
                                                            }`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings[notification.key] ? 'translate-x-6' : 'translate-x-1'
                                                            }`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'privacy' && (
                                        <motion.div
                                            key="privacy"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                                <Shield className="w-6 h-6" />
                                                Privacy Settings
                                            </h2>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                                                    <select
                                                        value={settings.profileVisibility}
                                                        onChange={(e) => updateSetting('', 'profileVisibility', e.target.value)}
                                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                                                    >
                                                        <option value="public">Public</option>
                                                        <option value="friends">Friends Only</option>
                                                        <option value="private">Private</option>
                                                    </select>
                                                </div>

                                                {[
                                                    { key: 'showEmail', label: 'Show Email Address', desc: 'Display email on profile' },
                                                    { key: 'showStats', label: 'Show Statistics', desc: 'Display solving statistics' },
                                                    { key: 'showSolvedProblems', label: 'Show Solved Problems', desc: 'Display solved problems list' },
                                                    { key: 'showContestHistory', label: 'Show Contest History', desc: 'Display contest participation history' },
                                                    { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Let other users send you messages' }
                                                ].map((privacy) => (
                                                    <div key={privacy.key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                                                        <div>
                                                            <h3 className="font-medium">{privacy.label}</h3>
                                                            <p className="text-sm text-slate-400">{privacy.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                updateSetting('', privacy.key, !settings[privacy.key]);
                                                                setSuccessMessage(`${privacy.label} ${!settings[privacy.key] ? 'enabled' : 'disabled'}`);
                                                                setTimeout(() => setSuccessMessage(''), 2000);
                                                            }}
                                                            className={`relative w-12 h-6 rounded-full transition-colors ${
                                                                settings[privacy.key] ? 'bg-cyan-500' : 'bg-slate-600'
                                                            }`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings[privacy.key] ? 'translate-x-6' : 'translate-x-1'
                                                            }`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center gap-4 mt-8"
                    >
                        <button
                            onClick={saveSettings}
                            disabled={isLoading}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                                isLoading 
                                    ? 'bg-slate-600 cursor-not-allowed' 
                                    : 'bg-cyan-600 hover:bg-cyan-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Settings
                                </>
                            )}
                        </button>
                        <button
                            onClick={resetSettings}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Reset to Default
                        </button>
                    </motion.div>

                    {/* Save Status */}
                    {saveStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mt-4"
                        >
                            {saveStatus === 'saved' && (
                                <p className="text-green-400 flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Settings saved successfully!
                                </p>
                            )}
                            {saveStatus === 'reset' && (
                                <p className="text-blue-400 flex items-center justify-center gap-2">
                                    <RotateCcw className="w-5 h-5" />
                                    Settings reset to default!
                                </p>
                            )}
                            {saveStatus === 'error' && (
                                <p className="text-red-400 flex items-center justify-center gap-2">
                                    <X className="w-5 h-5" />
                                    Error saving settings!
                                </p>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Email Change Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Change Email Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">New Email</label>
                                <input
                                    type="email"
                                    value={formData.newEmail || ''}
                                    onChange={(e) => handleInputChange('newEmail', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder="Enter new email"
                                />
                                {errors.newEmail && <p className="text-red-400 text-sm mt-1">{errors.newEmail}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={formData.currentPassword || ''}
                                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder="Enter current password"
                                />
                                {errors.currentPassword && <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword || ''}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder="Confirm password"
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                            {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleEmailChange}
                                disabled={isLoading}
                                className="flex-1 bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Updating...' : 'Update Email'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowEmailModal(false);
                                    setFormData({});
                                    setErrors({});
                                }}
                                className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2FA Modal */}
            {show2FAModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {settings.twoFactor ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password || ''}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                            </div>
                            {!settings.twoFactor && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword || ''}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                        placeholder="Confirm password"
                                    />
                                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}
                            {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handle2FA(settings.twoFactor ? 'disable' : 'enable')}
                                disabled={isLoading}
                                className={`flex-1 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                                    settings.twoFactor 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-cyan-600 hover:bg-cyan-700'
                                }`}
                            >
                                {isLoading ? 'Processing...' : (settings.twoFactor ? 'Disable 2FA' : 'Enable 2FA')}
                            </button>
                            <button
                                onClick={() => {
                                    setShow2FAModal(false);
                                    setFormData({});
                                    setErrors({});
                                }}
                                className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Account Modal */}
            {showSocialModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Connect {showSocialModal}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    value={formData.username || ''}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder={`Enter your ${showSocialModal} username`}
                                />
                                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password || ''}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                            </div>
                            {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handleSocialConnect(showSocialModal)}
                                disabled={isLoading}
                                className="flex-1 bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Connecting...' : 'Connect'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowSocialModal(null);
                                    setFormData({});
                                    setErrors({});
                                }}
                                className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;