import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axiosClient from '../utils/axiosClient';
import { AlertTriangle } from 'lucide-react'; // Removed WifiOff as it wasn't used
import Header from '../components/dashboard/Header';
import MainContent from '../components/dashboard/MainContent';
import ProfileSidebar from '../components/dashboard/ProfileSidebar';

// ✨ ENHANCED: Interactive Particle Background Component
// This is now more dynamic. For better organization, you can move this to its own file, 
// e.g., src/components/ui/InteractiveParticles.js
const InteractiveParticles = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null, radius: 150 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        
        const mouseMoveHandler = (event) => {
            mouse.current.x = event.x;
            mouse.current.y = event.y;
        };
        window.addEventListener('mousemove', mouseMoveHandler);

        class Particle {
            constructor(x, y, vx, vy, radius, color) {
                this.x = x; this.y = y; this.vx = vx; this.vy = vy;
                this.radius = radius; this.color = color;
                this.baseX = this.x; this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                let dx = mouse.current.x - this.x;
                let dy = mouse.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.current.radius) {
                    this.x -= dx / 20;
                    this.y -= dy / 20;
                } else {
                    if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
                    if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
                }

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;
                this.draw();
            }
        }

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let radius = Math.random() * 1 + 1;
                let x = Math.random() * (canvas.width - radius * 2) + radius;
                let y = Math.random() * (canvas.height - radius * 2) + radius;
                let vx = (Math.random() - 0.5) * 0.3;
                let vy = (Math.random() - 0.5) * 0.3;
                particles.push(new Particle(x, y, vx, vy, radius, 'rgba(100, 116, 139, 0.5)'));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(100, 116, 139, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => p.update());
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', mouseMoveHandler);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

// ✨ NEW: Reusable custom hook for fetching dashboard data
const useDashboardStats = (user) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                // Artificial delay to prevent loader flashing during fast loads
                await new Promise(res => setTimeout(res, 500));
                // Ensure user.id is correctly passed from Redux store
                const { data } = await axiosClient.get(`/user/${user.id}/dashboard-pro`);
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user]); // Re-fetch if user object changes (e.g., after login/logout)

    return { stats, loading, error };
};

// ✨ Main Dashboard Component Refactored
function Dashboard() {
    // Get the user object from Redux store
    const { user } = useSelector(state => state.auth);
    // Use the custom hook to fetch dashboard stats
    const { stats, loading, error } = useDashboardStats(user);

    const renderContent = () => {
        // If no user is logged in, redirect to login
        if (!user) {
            return (
                <motion.div 
                    key="no-user" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-[80vh] text-center"
                >
                    <h2 className="text-2xl font-bold text-white mb-2">Please log in to view your dashboard</h2>
                    <p className="text-slate-400">You need to be logged in to access this page.</p>
                </motion.div>
            );
        }

        if (loading) {
            return (
                <motion.div key="loader" exit={{ opacity: 0 }} className="flex items-center justify-center h-[80vh]">
                    <span className="loading loading-infinity loading-lg text-primary"></span>
                </motion.div>
            );
        }

        if (error) {
            return (
                <motion.div 
                    key="error" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-[80vh] text-center text-rose-400"
                >
                    <AlertTriangle size={48} className="mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Dashboard</h2>
                    <p className="text-slate-400">Please check your connection and try again.</p>
                    {/* Optionally display more detailed error for development */}
                    <p className="text-xs text-slate-500 mt-2">{error.message || 'Unknown error'}</p>
                </motion.div>
            );
        }

        // Only render content if stats are available (not loading, no error)
        if (stats) {
            return (
                <motion.div
                    key="content"
                    className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                    initial="hidden" animate="visible" exit={{ opacity: 0 }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                >
                    <div className="lg:col-span-3"><ProfileSidebar user={user} stats={stats} /></div>
                    <div className="lg:col-span-9"><MainContent stats={stats} /></div>
                </motion.div>
            );
        }
        
        // This case should ideally not be reached if `user` is null initially and then `loading` becomes false.
        // It handles the initial state where `user` might be null and `stats` is null, without showing a loader or error.
        return null; 
    };

    return (
        <div className="min-h-screen bg-slate-950 text-gray-300 font-sans overflow-x-hidden">
            <InteractiveParticles />
            {/* Background gradient for visual appeal */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_100%_50%_at_50%_0%,rgba(56,189,248,0.1),transparent)]"></div>

            <div className="relative z-10">
                <Header user={user} />
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Dashboard;