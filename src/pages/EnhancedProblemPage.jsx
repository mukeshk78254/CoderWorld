import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import Editorial from "../components/Editorial";
import ChatAi from "../components/ChatAi";
import ProblemDiscussion from "../components/ProblemDiscussion";
import Header from '../components/dashboard/Header';
import { 
    Code, Play, Send, Copy, RotateCcw, Maximize2, Minimize2, 
    FileText, BookOpen, History, MessageCircle, ChevronRight,
    ArrowLeft, Settings, Zap, Target, Clock, CheckCircle, XCircle,
    Lightbulb, Users, MessageSquare, TrendingUp, Award, Star,
    Heart, Share2, Bookmark, Eye, EyeOff, Download, Upload,
    Filter, Search, SortAsc, SortDesc, MoreVertical, Edit3,
    Trash2, Flag, ThumbsUp, Reply, Sparkles, Rocket, Brain,
    Cpu, Database, Layers, GitBranch, Terminal, Monitor,
    Smartphone, Globe, Lock, Unlock, Shield, AlertTriangle,
    Info, HelpCircle, CheckSquare, Square, Circle, Triangle
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced Algorithm-Themed Animated Background
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let algorithmNodes = [];
        let dataFlow = [];
        let codeLines = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createAlgorithmNodes = () => {
            algorithmNodes = [];
            for (let i = 0; i < 20; i++) {
                algorithmNodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 8 + 4,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
                    connections: []
                });
            }
        };

        const createDataFlow = () => {
            dataFlow = [];
            for (let i = 0; i < 12; i++) {
                dataFlow.push({
                    startX: Math.random() * canvas.width,
                    startY: Math.random() * canvas.height,
                    endX: Math.random() * canvas.width,
                    endY: Math.random() * canvas.height,
                    progress: 0,
                    speed: Math.random() * 0.02 + 0.01,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: `hsl(${Math.random() * 60 + 180}, 70%, 50%)`
                });
            }
        };

        const createCodeLines = () => {
            codeLines = [];
            const codeTexts = ['function', 'if', 'else', 'for', 'while', 'return', 'const', 'let', 'var'];
            for (let i = 0; i < 15; i++) {
                codeLines.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    text: codeTexts[Math.floor(Math.random() * codeTexts.length)],
                    size: Math.random() * 16 + 12,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    opacity: Math.random() * 0.5 + 0.1,
                    color: `hsl(${Math.random() * 60 + 160}, 80%, 60%)`,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.01
                });
            }
        };

        const drawAlgorithmNode = (node) => {
            ctx.save();
            ctx.globalAlpha = node.opacity;
            ctx.fillStyle = node.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = node.color;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add inner glow
            ctx.globalAlpha = node.opacity * 0.5;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const drawDataFlow = (flow) => {
            ctx.save();
            ctx.globalAlpha = flow.opacity;
            ctx.strokeStyle = flow.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = flow.color;
            
            const currentX = flow.startX + (flow.endX - flow.startX) * flow.progress;
            const currentY = flow.startY + (flow.endY - flow.startY) * flow.progress;
            
            ctx.beginPath();
            ctx.moveTo(flow.startX, flow.startY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            // Add data packet
            ctx.fillStyle = flow.color;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const drawCodeLine = (line) => {
            ctx.save();
            ctx.translate(line.x, line.y);
            ctx.rotate(line.rotation);
            ctx.globalAlpha = line.opacity;
            ctx.fillStyle = line.color;
            ctx.font = `${line.size}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 10;
            ctx.shadowColor = line.color;
            ctx.fillText(line.text, 0, 0);
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            // Draw data flow
            dataFlow.forEach(flow => {
                drawDataFlow(flow);
                flow.progress += flow.speed;
                if (flow.progress >= 1) {
                    flow.progress = 0;
                    flow.startX = Math.random() * canvas.width;
                    flow.startY = Math.random() * canvas.height;
                    flow.endX = Math.random() * canvas.width;
                    flow.endY = Math.random() * canvas.height;
                }
            });

            // Draw algorithm nodes
            algorithmNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < -node.size) node.x = canvas.width + node.size;
                if (node.x > canvas.width + node.size) node.x = -node.size;
                if (node.y < -node.size) node.y = canvas.height + node.size;
                if (node.y > canvas.height + node.size) node.y = -node.size;

                drawAlgorithmNode(node);
            });

            // Draw code lines
            codeLines.forEach(line => {
                line.x += line.vx;
                line.y += line.vy;
                line.rotation += line.rotationSpeed;

                if (line.x < -100) line.x = canvas.width + 100;
                if (line.x > canvas.width + 100) line.x = -100;
                if (line.y < -50) line.y = canvas.height + 50;
                if (line.y > canvas.height + 50) line.y = -50;

                drawCodeLine(line);
            });

            // Add pulsing background effect
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, `hsla(200, 50%, 12%, ${0.1 + Math.sin(time) * 0.05})`);
            gradient.addColorStop(1, 'hsla(220, 60%, 8%, 0.9)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createAlgorithmNodes();
        createDataFlow();
        createCodeLines();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createAlgorithmNodes();
            createDataFlow();
            createCodeLines();
        });

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ 
                background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2332 25%, #2d3748 50%, #1a2332 75%, #0a0f1c 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 12s ease-in-out infinite'
            }}
        />
    );
};

// Problem List Modal Component
const ProblemListModal = ({ isOpen, onClose, problems, onProblemSelect }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(modalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                📚 All Problems
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <XCircle size={24} className="text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                            {problems.map((problem, index) => (
                                <motion.div
                                    key={problem._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-cyan-400/50 transition-all duration-300"
                                    onClick={() => onProblemSelect(problem._id)}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-white font-semibold text-sm truncate" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                            {problem.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                            problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="text-slate-400 text-xs">
                                            {problem.tags}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Enhanced Tab Component with More Visible Animations
const TabButton = ({ isActive, onClick, children, icon: Icon }) => (
    <motion.button
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
         onClick={onClick}
        className={`group flex items-center gap-4 px-6 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
            isActive 
                ? 'bg-gradient-to-r from-cyan-500/40 to-blue-500/40 text-cyan-200 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-slate-600/50 hover:border-slate-400/70'
        }`}
        style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
        <motion.div
            animate={isActive ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: 15 }}
        >
            <Icon size={24} className={`transition-colors duration-300 ${
                isActive ? 'text-cyan-200' : 'text-slate-400 group-hover:text-white'
            }`} />
        </motion.div>
        <span className="text-lg font-bold">{children}</span>
    </motion.button>
);

// Enhanced Action Button Component with More Visible Animations
const ActionButton = ({ onClick, children, variant = "primary", icon: Icon, loading = false }) => {
    const variants = {
        primary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-xl shadow-cyan-500/50 border-2 border-cyan-400/40",
        success: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-xl shadow-green-500/50 border-2 border-green-400/40",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 shadow-xl shadow-yellow-500/50 border-2 border-yellow-400/40",
        danger: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 shadow-xl shadow-red-500/50 border-2 border-red-400/40",
        secondary: "bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 border-2 border-slate-500/40 shadow-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
            disabled={loading}
            className={`group flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 ${variants[variant]} ${
                loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
            {loading ? (
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                />
            ) : (
                Icon && (
                    <motion.div
                        whileHover={{ scale: 1.4, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Icon size={24} />
                    </motion.div>
                )
            )}
            <span className="text-lg">{children}</span>
        </motion.button>
    );
};

// Main Enhanced Problem Page Component
function EnhancedProblemPage() {
    const { problemid } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [loading, setLoading] = useState(true);
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const [showModal, setShowModal] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFormatting, setIsFormatting] = useState(false);
    const [allProblems, setAllProblems] = useState([]);
    const [showProblemList, setShowProblemList] = useState(false);
    const [loadingModalText, setLoadingModalText] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const langMap = {
        cpp: "C++",
        java: "Java",
        javascript: "JavaScript"
    };

    // Enhanced GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Page entrance animation
            gsap.fromTo("body", 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
            );

            // Staggered content animation
            gsap.fromTo(".content-section",
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.2, 
                    ease: "power3.out",
                    delay: 0.3
                }
            );
        });

        return () => ctx.revert();
    }, []);

    // Fetch problem on load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
                setProblem(data);
                const starter = data.startcode.find(sc =>
                    selectedLanguage === "cpp"
                        ? ["cpp", "c++"].includes(sc.language)
                        : sc.language === selectedLanguage
                );
                setCode(starter?.initialcode || "// No starter code available");
            } catch (err) {
                console.error("Error loading problem:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [problemid]);

    // Reset code on language change
    useEffect(() => {
        if (problem) {
            const starter = problem.startcode.find(sc =>
                selectedLanguage === "cpp"
                    ? ["cpp", "c++"].includes(sc.language)
                    : sc.language === selectedLanguage
            );
            setCode(starter?.initialcode || "// No starter code for this language.");
        }
    }, [selectedLanguage]);

    const handleRun = async () => {
        // Validate code before running
        if (!code.trim()) {
            setRunResult([{ error: "❌ Please write some code before running!" }]);
            setShowModal(true);
            return;
        }

        setIsRunning(true);
        setShowModal(true);
        setLoadingModalText("💻 Running your code...");
        setRunResult(null);
        setSubmitResult(null);
        
        try {
            const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
                code,
                language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
            });
            
            if (data && Array.isArray(data)) {
            const results = data.map((res, i) => ({
                input: problem.visibletestcases[i]?.input || "",
                expected: problem.visibletestcases[i]?.output || "",
                output: res.stdout || res.stderr || res.compile_output || "No output",
                    passed: res.status?.id === 3,
                    status: res.status?.description || "Unknown"
            }));
            setRunResult(results);
                setLoadingModalText("✅ Code executed successfully!");
            } else {
                setRunResult([{ error: "❌ Invalid response from server. Please try again." }]);
            }
        } catch (error) {
            console.error('Run error:', error);
            let errorMessage = "❌ Run failed. Please try again.";
            
            if (error.response?.status === 400) {
                errorMessage = "❌ Invalid code or missing parameters.";
            } else if (error.response?.status === 401) {
                errorMessage = "❌ Please login to run code.";
            } else if (error.response?.status === 500) {
                errorMessage = "❌ Server error. Please try again later.";
            }
            
            setRunResult([{ error: errorMessage }]);
        } finally {
            setIsRunning(false);
            setTimeout(() => setLoadingModalText(""), 2000);
        }
    };

    const handleSubmit = async () => {
        // Validate code before submitting
        if (!code.trim()) {
            setSubmitResult({ status: "error", message: "❌ Please write some code before submitting!" });
            setShowModal(true);
            return;
        }

        setIsSubmitting(true);
        setShowModal(true);
        setLoadingModalText("🚀 Submitting your solution...");
        setRunResult(null);
        setSubmitResult(null);
        
        try {
            const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
                code,
                language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
            });
            
            if (data) {
                // Format the response for better display
                const formattedResult = {
                    status: data.status || "unknown",
                    testCasesPassed: data.testCasesPassed || 0,
                    testCasesTotal: data.testCasesTotal || 0,
                    runtime: data.runtime || 0,
                    memory: data.memory || 0,
                    errorMessage: data.errorMessage || null,
                    message: getSubmissionMessage(data.status, data.testCasesPassed, data.testCasesTotal)
                };
                setSubmitResult(formattedResult);
                setLoadingModalText("✅ Submission completed!");
            } else {
                setSubmitResult({ status: "error", message: "❌ Invalid response from server." });
            }
        } catch (error) {
            console.error('Submit error:', error);
            let errorMessage = "❌ Submission failed. Please try again.";
            
            if (error.response?.status === 400) {
                errorMessage = "❌ Invalid code or missing parameters.";
            } else if (error.response?.status === 401) {
                errorMessage = "❌ Please login to submit code.";
            } else if (error.response?.status === 500) {
                errorMessage = "❌ Server error. Please try again later.";
            }
            
            setSubmitResult({ status: "error", message: errorMessage });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setLoadingModalText(""), 2000);
        }
    };

    // Helper function to generate user-friendly submission messages
    const getSubmissionMessage = (status, passed, total) => {
        switch (status) {
            case 'accepted':
                return `🎉 Congratulations! All ${total} test cases passed!`;
            case 'wrong answer':
                return `❌ Wrong Answer. ${passed}/${total} test cases passed.`;
            case 'error':
                return `❌ Runtime Error. ${passed}/${total} test cases passed.`;
            case 'time limit exceeded':
                return `⏰ Time Limit Exceeded. ${passed}/${total} test cases passed.`;
            case 'memory limit exceeded':
                return `💾 Memory Limit Exceeded. ${passed}/${total} test cases passed.`;
            default:
                return `❓ Unknown status. ${passed}/${total} test cases passed.`;
        }
    };


    const handleResetCode = () => {
        setCode("");
    };

    const handleFormatCode = async () => {
        setIsFormatting(true);
        
        try {
            if (editorRef.current) {
                // Use Monaco Editor's built-in format document action
                await editorRef.current.getAction('editor.action.formatDocument').run();
            } else {
                // Enhanced fallback: Manual formatting with proper left alignment
                const lines = code.split("\n");
                let formatted = lines.map(line => {
                    // Remove all leading whitespace and align to left
                    return line.trimLeft();
                }).join("\n");
                
                // Remove any trailing whitespace from the entire code
                formatted = formatted.replace(/\s+$/gm, '');
                
                // Remove empty lines at the beginning and end
                formatted = formatted.replace(/^\n+|\n+$/g, '');
                
                // Ensure proper spacing between code blocks
                formatted = formatted.replace(/\n{3,}/g, '\n\n');
                
                setCode(formatted);
            }
        } catch (error) {
            console.error('Formatting error:', error);
        } finally {
            // Add a small delay to show the formatting animation
            setTimeout(() => {
                setIsFormatting(false);
            }, 500);
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    };

    const fetchAllProblems = async () => {
        if (allProblems.length > 0) {
            setShowProblemList(!showProblemList);
            return;
        }
        try {
            const res = await axiosClient.get("/problem/getallproblem");
            setAllProblems(res.data);
            setShowProblemList(true);
        } catch (err) {
            alert("Failed to load problem list.");
        }
    };

    const handleProblemSelect = (newProblemId) => {
        setShowProblemList(false);
        navigate(`/problem/${newProblemId}`);
    };

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
                    <p className="text-2xl text-slate-400 font-medium" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                        Loading problem...
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <AnimatedBackground />
            <Header problem={problem} />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
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
                        <span className="text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>Back</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[80vh] h-full">
                    {/* Left Panel - Problem Description */}
                    <div className="content-section bg-slate-900/60 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-sm overflow-y-auto flex flex-col h-full">
                        {/* LeetCode-Style Header with CoderWorld Branding */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-6">
                                {/* CoderWorld Logo with Hover Effects */}
                                <motion.div 
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    onClick={() => navigate(-1)}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    {/* Triangle Logo Icon */}
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/20 group-hover:shadow-cyan-500/40 transition-all duration-300"
                                    >
                                        <motion.div
                                            animate={{ 
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{ 
                                                duration: 2, 
                                                repeat: Infinity, 
                                                ease: "easeInOut" 
                                            }}
                                            className="w-8 h-8"
                                        >
                                            <img 
                                                src="/src/pages/2896418.png" 
                                                alt="CoderWorld Logo" 
                                                className="w-full h-full object-contain"
                                            />
                                        </motion.div>
                                    </motion.div>
                                    
                                    {/* Logo Text */}
                                    <span className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        CoderWorld
                                    </span>
                                </motion.div>
                                
                                {/* Problem Title and Info */}
                                <div className="flex items-center gap-4">
                                    <div>
                                        <motion.h1 
                                            whileHover={{ scale: 1.02 }}
                                            className="text-2xl font-bold text-white mb-2" 
                                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                                        >
                                            {problem?.title || "Problem"}
                                        </motion.h1>
                                        <div className="flex items-center gap-3">
                                            <motion.span 
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    problem?.difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    problem?.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                    'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}
                                            >
                                                {problem?.difficulty}
                                            </motion.span>
                                            <motion.span 
                                                whileHover={{ scale: 1.02 }}
                                                className="text-slate-400 text-sm px-2 py-1 bg-slate-800/50 rounded border border-slate-700/50" 
                                                style={{ fontFamily: "'Source Code Pro', monospace" }}
                                            >
                                                {problem?.tags}
                                            </motion.span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Problems Button with Hover Effect */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={fetchAllProblems}
                                className="cursor-pointer text-cyan-300 text-sm hover:text-cyan-200 hover:underline transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-800/50"
                                style={{ fontFamily: "'Source Code Pro', monospace" }}
                            >
                                📘 Problems
                            </motion.button>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-400">Problem Progress</span>
                                <span className="text-sm text-cyan-400">0% Complete</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                    <span>Not Started</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>In Progress</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Completed</span>
                                </div>
                            </div>
                        </div>

                        {/* LeetCode-Style Tabs */}
                        <div className="flex space-x-6 border-b border-slate-600 text-slate-300 mb-6">
                            {["description", "editorial", "solutions", "discussions", "submissions", "chatAi"].map(tab => (
                                <motion.div 
                                    key={tab} 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab(tab)} 
                                    className={`py-2 cursor-pointer transition-all duration-300 ${
                                        activeTab === tab 
                                            ? "text-cyan-400 border-b-2 border-cyan-400" 
                                            : "hover:text-white hover:border-b-2 hover:border-slate-400"
                                    }`}
                                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                                >
                                    {tab.toUpperCase()}
                                </motion.div>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[400px]"
                            >
                                {activeTab === "description" && (
                                    <div className="space-y-4">
                                        <div 
                                            className="prose prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: problem?.description }} 
                                        />
                                        <div className="mt-4 space-y-2">
                                            {(problem?.visibletestcases || []).map((ex, i) => (
                                                <motion.div 
                                                    key={i} 
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="bg-slate-800 p-3 rounded border border-slate-700"
                                                >
                                                    <p><strong>Input:</strong> {ex.input}</p>
                                                    <p><strong>Output:</strong> {ex.output}</p>
                                                    {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
                                {activeTab === "solutions" && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-bold">💡 Solutions</h3>
                                        </div>
                                        
                                        <div className="bg-slate-800 p-6 rounded border border-slate-700 text-center">
                                            <div className="text-slate-400 text-4xl mb-4">📝</div>
                                            <h4 className="text-lg font-semibold text-slate-300 mb-3">No solutions shared yet</h4>
                                            <p className="text-slate-400 mb-4">
                                                Solve this problem first, then share your solution!
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "discussions" && (
                                    <ProblemDiscussion 
                                        problemId={problemid} 
                                        problemTitle={problem?.title || "Problem"} 
                                    />
                                )}
                                {activeTab === "editorial" && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-4">📚 Editorial Solution</h3>
                                        {problem?.secureUrl ? (
                                            <Editorial secureUrl={problem.secureUrl} />
                                        ) : (
                                            <div className="bg-slate-800 p-6 rounded border border-slate-700 text-center">
                                                <div className="text-slate-400 text-lg mb-2">📝</div>
                                                <p className="text-slate-400">No editorial solution available for this problem yet.</p>
                                                <p className="text-sm text-slate-500 mt-2">Check back later or contribute by sharing your solution!</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {activeTab === "chatAi" && <ChatAi problem={problem} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Enhanced Right Panel - Code Editor */}
                    <div className="content-section bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm flex flex-col shadow-2xl h-full min-h-[600px]">
                        {/* Enhanced Editor Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 border border-purple-400/20"
                                >
                                    <Terminal size={28} className="text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        Code Editor
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50"
                                        >
                                            <Cpu size={18} className="text-purple-400" />
                                            <p className="text-slate-300 text-lg font-semibold" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                {langMap[selectedLanguage]}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-3"
                            >
                                <select
                                    value={selectedLanguage}
                                    onChange={e => setSelectedLanguage(e.target.value)}
                                    className="bg-slate-800/80 border border-slate-700/50 text-white px-4 py-3 rounded-xl text-base focus:outline-none focus:border-purple-400 transition-all duration-300 shadow-lg"
                                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                                >
                                    {Object.entries(langMap).map(([k, v]) => (
                                        <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>
                            </motion.div>
                        </div>

                        {/* Enhanced Action Buttons with Better Spacing */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <ActionButton 
                                onClick={handleRun} 
                                variant="primary" 
                                icon={Play}
                                loading={isRunning}
                            >
                                {isRunning ? "Running..." : "Run"}
                            </ActionButton>
                            <ActionButton 
                                onClick={handleSubmit} 
                                variant="success" 
                                icon={Rocket}
                                loading={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </ActionButton>
                            <ActionButton 
                                onClick={() => {
                                    navigator.clipboard.writeText(code);
                                }} 
                                variant="secondary" 
                                icon={Copy}
                            >
                                Copy
                            </ActionButton>
                            <ActionButton 
                                onClick={handleResetCode} 
                                variant="warning" 
                                icon={RotateCcw}
                            >
                                Reset
                            </ActionButton>
                            <ActionButton 
                                onClick={handleFormatCode} 
                                variant="secondary" 
                                icon={Settings}
                                loading={isFormatting}
                            >
                                {isFormatting ? "Formatting..." : "Format"}
                            </ActionButton>
                            <ActionButton 
                                onClick={toggleFullScreen} 
                                variant="secondary" 
                                icon={isFullScreen ? Minimize2 : Maximize2}
                            >
                                {isFullScreen ? "Exit" : "Fullscreen"}
                            </ActionButton>
                        </div>

                        {/* Enhanced Code Editor */}
                        <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
                            <Editor
                                language={selectedLanguage}
                                value={code}
                                onChange={(v) => setCode(v || "")}
                                theme="vs-dark"
                                onMount={(editor) => (editorRef.current = editor)}
                                options={{ 
                                    minimap: { enabled: false }, 
                                    fontSize: 18,
                                    fontFamily: "'Source Code Pro', 'Fira Code', 'JetBrains Mono', monospace",
                                    lineNumbers: 'on',
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    renderLineHighlight: "line",
                                    cursorStyle: "line",
                                    fontLigatures: true,
                                    bracketPairColorization: { enabled: true },
                                    guides: { bracketPairs: true },
                                    padding: { top: 20, bottom: 20 },
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    cursorSmoothCaretAnimation: true,
                                    // Enhanced formatting options
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    insertSpaces: true,
                                    tabSize: 4,
                                    detectIndentation: false,
                                    trimAutoWhitespace: true,
                                    // Better code formatting
                                    suggest: {
                                        showKeywords: true,
                                        showSnippets: true
                                    },
                                    // Auto-formatting
                                    formatOnSave: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Problem List Modal */}
            <ProblemListModal
                isOpen={showProblemList}
                onClose={() => setShowProblemList(false)}
                problems={allProblems}
                onProblemSelect={handleProblemSelect}
            />

            {/* Result Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    🎯 Result
                                </h3>
                                <button 
                                    onClick={() => setShowModal(false)} 
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <XCircle size={24} className="text-slate-400" />
                                </button>
                            </div>
                            
                            {loadingModalText && (
                                <div className="text-center text-cyan-300 mb-6" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                    {loadingModalText}
                                </div>
                            )}
                            
                            {runResult && (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {/* Summary Header */}
                                    <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl">
                                        <h4 className="text-cyan-400 font-semibold mb-2" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                            🧪 Test Results Summary
                                        </h4>
                                        <div className="flex items-center gap-4">
                                            <span className="text-green-400">
                                                ✓ Passed: {runResult.filter(r => r.passed && !r.error).length}
                                            </span>
                                            <span className="text-red-400">
                                                ✗ Failed: {runResult.filter(r => !r.passed && !r.error).length}
                                            </span>
                                            <span className="text-slate-400">
                                                Total: {runResult.length}
                                            </span>
                                        </div>
                                    </div>

                                    {runResult.map((r, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`border p-4 rounded-xl ${
                                                r.error 
                                                    ? 'bg-red-500/10 border-red-500/30' 
                                                    : r.passed 
                                                        ? 'bg-green-500/10 border-green-500/30' 
                                                        : 'bg-orange-500/10 border-orange-500/30'
                                            }`}
                                        >
                                            {r.error ? (
                                                <div className="flex items-center gap-3">
                                                    <XCircle size={20} className="text-red-400" />
                                                    <p className="text-red-400 font-semibold" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                    {r.error}
                                                </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {/* Test Case Header */}
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-white font-semibold" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                            Test Case {i + 1}
                                                        </h5>
                                                        <div className="flex items-center gap-2">
                                                            {r.passed ? (
                                                                <>
                                                                    <CheckCircle size={20} className="text-green-400" />
                                                                    <span className="text-green-400 font-semibold">✓ PASSED</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle size={20} className="text-red-400" />
                                                                    <span className="text-red-400 font-semibold">✗ FAILED</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-cyan-400 font-semibold mb-2 text-sm" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                                📥 Input:
                                                            </p>
                                                            <p className="text-slate-300 font-mono text-sm bg-slate-900/50 p-2 rounded border">
                                                                {r.input || "No input"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-green-400 font-semibold mb-2 text-sm" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                                🎯 Expected:
                                                            </p>
                                                            <p className="text-slate-300 font-mono text-sm bg-slate-900/50 p-2 rounded border">
                                                                {r.expected || "No expected output"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-yellow-400 font-semibold mb-2 text-sm" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                            📤 Your Output:
                                                        </p>
                                                        <p className="text-slate-300 font-mono text-sm bg-slate-900/50 p-2 rounded border">
                                                            {r.output || "No output"}
                                                        </p>
                                                    </div>
                                                    {r.status && (
                                                        <div className="text-xs text-slate-400">
                                                            Status: {r.status}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            
                            {submitResult && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6"
                                >
                                    {/* Main Status Display */}
                                    <div className="text-center mb-6">
                                        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-bold ${
                                            submitResult.status === 'accepted' 
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                            {submitResult.status === 'accepted' ? (
                                                <>
                                                    <CheckCircle size={24} />
                                                    🎉 ACCEPTED
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={24} />
                                                    ❌ {submitResult.status?.toUpperCase() || 'FAILED'}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* User-friendly message */}
                                    {submitResult.message && (
                                        <div className="text-center mb-6">
                                            <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                {submitResult.message}
                                            </p>
                                        </div>
                                    )}

                                    {/* Test Cases Summary */}
                                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mb-4">
                                        <h4 className="text-cyan-400 font-semibold mb-3" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                            📊 Test Cases Summary
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-300">Passed:</span>
                                            <span className="text-green-400 font-bold">{submitResult.testCasesPassed || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-300">Total:</span>
                                            <span className="text-slate-300 font-bold">{submitResult.testCasesTotal || 0}</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${submitResult.testCasesTotal > 0 ? (submitResult.testCasesPassed / submitResult.testCasesTotal) * 100 : 0}%` 
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    {(submitResult.runtime || submitResult.memory) && (
                                        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mb-4">
                                            <h4 className="text-cyan-400 font-semibold mb-3" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                ⚡ Performance
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {submitResult.runtime && (
                                                    <div className="text-center">
                                                        <p className="text-slate-400 text-sm">Runtime</p>
                                                        <p className="text-yellow-400 font-bold">{submitResult.runtime}ms</p>
                                                    </div>
                                    )}
                                    {submitResult.memory && (
                                                    <div className="text-center">
                                                        <p className="text-slate-400 text-sm">Memory</p>
                                                        <p className="text-blue-400 font-bold">{submitResult.memory}KB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {submitResult.errorMessage && (
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                            <h4 className="text-red-400 font-semibold mb-2" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                                🚨 Error Details
                                            </h4>
                                            <p className="text-red-300 font-mono text-sm bg-slate-900/50 p-2 rounded">
                                                {submitResult.errorMessage}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}

export default EnhancedProblemPage;
