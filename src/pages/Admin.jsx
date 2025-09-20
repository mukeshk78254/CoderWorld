// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Home, RefreshCw, Zap,Video } from 'lucide-react';

// import { NavLink } from 'react-router';

// function Admin() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const adminOptions = [
//     {
//       id: 'create',
//       title: 'Create Problem',
//       description: 'Add a new coding problem to the platform',
//       icon: Plus,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/create'
//     },
//     {
//       id: 'update',
//       title: 'Update Problem',
//       description: 'Edit existing problems and their details',
//       icon: Edit,
//       color: 'btn-warning',
//       bgColor: 'bg-warning/10',
//       route: '/admin/update'
//     },
//     {
//       id: 'delete',
//       title: 'Delete Problem',
//       description: 'Remove problems from the platform',
//       icon: Trash2,
//       color: 'btn-error',
//       bgColor: 'bg-error/10',
//       route: '/admin/delete'
//     },
 
//         {
//           id: 'video',
//           title: 'Video Problem',
//           description: 'Upload And Delete Videos',
//           icon: Video,
//           color: 'btn-success',
//           bgColor: 'bg-success/10',
//           route: '/admin/video'
//         }
//   ];

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-base-content mb-4">
//             Admin Panel
//           </h1>
//           <p className="text-base-content/70 text-lg">
//             Manage coding problems on your platform
//           </p>
//         </div>

//         {/* Admin Options Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {adminOptions.map((option) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className="card-body items-center text-center p-8">
//                   {/* Icon */}
//                   <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
//                     <IconComponent size={32} className="text-base-content" />
//                   </div>
                  
//                   {/* Title */}
//                   <h2 className="card-title text-xl mb-2">
//                     {option.title}
//                   </h2>
                  
//                   {/* Description */}
//                   <p className="text-base-content/70 mb-6">
//                     {option.description}
//                   </p>
                  
//                   {/* Action Button */}
//                   <div className="card-actions">
//                     <div className="card-actions">
//                     <NavLink 
//                     to={option.route}
//                    className={`btn ${option.color} btn-wide`}
//                    >
//                    {option.title}
//                    </NavLink>
//                    </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Admin;
// Enhanced Admin Panel with GSAP Animations
import React, { useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Video, Home, Settings, Zap, Crown, Shield, Sparkles, Database, Users, BarChart3, FileText, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Floating Particles Component
const FloatingParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const symbols = ['⚡', '✨', '🚀', '💎', '⭐', '🔥', '💫', '🌟'];

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute text-cyan-400/30 text-lg pointer-events-none';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            container.appendChild(particle);
            particles.push(particle);
        }

        particles.forEach((particle, index) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 1.5 + 0.5,
                rotation: Math.random() * 360,
            });

            gsap.to(particle, {
                x: `+=${Math.random() * 400 - 200}`,
                y: `+=${Math.random() * 400 - 200}`,
                rotation: `+=${Math.random() * 720 - 360}`,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: index * 0.3,
            });
        });

        return () => {
            particles.forEach(particle => particle.remove());
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

// Enhanced Admin Option Card
const UltraAdminCard = ({ option, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0, scale: 0.8, rotation: -10 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1.2,
                delay: index * 0.15,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Continuous floating animation
        gsap.to(cardRef.current, {
            y: -8,
            duration: 3 + index * 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
        });

        // Glow effect on hover
        gsap.to(cardRef.current, {
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.3
        });
    }, [index]);

    const IconComponent = option.icon;

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}
            className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-700 overflow-hidden cursor-pointer"
        >
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
                {/* Icon with enhanced animation */}
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className={`w-20 h-20 bg-gradient-to-br ${option.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-2xl`}
                >
                    <IconComponent size={40} className="text-white" />
                </motion.div>
                
                {/* Title with typing effect */}
                <motion.h2 
                    className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                >
                    {option.title}
                </motion.h2>
                
                {/* Description */}
                <motion.p 
                    className="text-slate-400 mb-8 text-lg leading-relaxed group-hover:text-slate-300 transition-colors duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                >
                    {option.description}
                </motion.p>
                
                {/* Action Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                >
                    <NavLink 
                        to={option.route}
                        className={`btn ${option.color} btn-lg btn-block transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:shadow-cyan-500/30`}
                    >
                        <IconComponent className="w-6 h-6 mr-3" />
                        {option.title.split(' ')[0] === 'Manage' ? 'Go to Manager' : option.title}
                    </NavLink>
                </motion.div>
            </div>

            {/* Floating particles around card */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${20 + i * 10}%`,
                            top: `${20 + i * 5}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: -1,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

// Enhanced Stats Overview
const AdminStatsOverview = () => {
    const statsRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(statsRef.current?.children,
            { y: 50, opacity: 0, scale: 0.8 },
            { 
                y: 0, opacity: 1, scale: 1, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: "back.out(1.7)" 
            }
        );
    }, []);

    return (
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Total Problems', value: '156', icon: FileText, color: 'from-cyan-500 to-blue-500' },
                { label: 'Active Users', value: '2.4K', icon: Users, color: 'from-emerald-500 to-green-500' },
                { label: 'Submissions', value: '12.8K', icon: BarChart3, color: 'from-amber-500 to-orange-500' },
                { label: 'Success Rate', value: '87%', icon: Crown, color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

function Admin() {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // Header animations
        gsap.fromTo(headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
        );

        // Title typing effect
        gsap.to(titleRef.current, {
            text: "CodeFlow Admin Panel",
            duration: 2,
            ease: "none",
            delay: 0.5
        });

        // Subtitle animation
        gsap.fromTo(subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" }
        );
    }, []);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
            description: 'Add a brand new coding problem with comprehensive details, test cases, and solutions.',
      icon: Plus,
      color: 'btn-success',
            bgColor: 'from-emerald-500 to-green-500',
      route: '/admin/create'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
            description: 'Permanently remove problems and their associated data from the platform.',
      icon: Trash2,
      color: 'btn-error',
            bgColor: 'from-red-500 to-pink-500',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Manage Videos',
            description: 'Upload, update, or delete video solutions and tutorials for problems.',
      icon: Video,
      color: 'btn-info',
            bgColor: 'from-sky-500 to-blue-500',
      route: '/admin/video'
    }
  ];

  return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <Header />
            <FloatingParticles />
            
            <main className="container mx-auto px-4 py-12 relative z-10">
                {/* Back Button */}
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

                {/* Enhanced Header */}
                <motion.div 
                    ref={headerRef}
                    className="text-center mb-16"
                >
                    <motion.h1 
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
        style={{
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite'
                        }}
                    >
                        {/* Text will be filled by GSAP */}
                    </motion.h1>
                    
                    <motion.p 
                        ref={subtitleRef}
                        className="text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed"
                    >
                        Empower your platform with advanced administrative tools and comprehensive management capabilities! 🚀
                    </motion.p>
                </motion.div>

                {/* Stats Overview */}
                <AdminStatsOverview />

        {/* Admin Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {adminOptions.map((option, index) => (
                        <UltraAdminCard
                key={option.id}
                            option={option}
                            index={index}
                        />
                    ))}
                </div>

                {/* Enhanced Footer */}
                <motion.footer 
                    className="text-center text-slate-500 mt-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Crown size={20} className="text-amber-400" />
                        <span className="text-lg font-bold">Admin Panel</span>
                        <Crown size={20} className="text-amber-400" />
              </div>
                    <p>© {new Date().getFullYear()} CodeFlow. All rights reserved.</p>
                </motion.footer>
            </main>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
    </div>
  );
}

export default Admin;