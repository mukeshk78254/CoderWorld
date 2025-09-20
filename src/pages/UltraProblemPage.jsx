import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    Code, Play, CheckCircle, XCircle, Clock, Star, 
    Zap, Target, Trophy, Flame, Brain, Rocket,
    ChevronRight, ChevronLeft, RotateCcw, Save,
    Eye, EyeOff, Maximize, Minimize, Settings
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Floating Code Particles
const CodeParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const codeSymbols = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/'];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute text-cyan-400/30 font-mono text-sm pointer-events-none';
            particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
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
                duration: Math.random() * 15 + 10,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: index * 0.2,
            });
        });

        return () => {
            particles.forEach(particle => particle.remove());
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

// Enhanced Problem Header
const UltraProblemHeader = ({ problem, onRun, onSubmit, isRunning, isSubmitting }) => {
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const difficultyRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        // Title typing effect
        tl.to(titleRef.current, {
            text: problem?.title || "Loading Problem...",
            duration: 2,
            ease: "none"
        })
        // Difficulty badge animation
        .fromTo(difficultyRef.current,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.3)" },
            "-=1"
        )
        // Buttons cascade
        .fromTo(buttonsRef.current?.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.5"
        );

        // Continuous glow effect
        gsap.to(difficultyRef.current, {
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }, [problem]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'from-emerald-500 to-green-500';
            case 'medium': return 'from-amber-500 to-orange-500';
            case 'hard': return 'from-red-500 to-pink-500';
            default: return 'from-slate-500 to-gray-500';
        }
    };

    return (
        <div ref={headerRef} className="relative overflow-hidden bg-slate-900/50 border-b border-slate-800">
            <CodeParticles />
            
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                    <div className="flex-grow">
                        <motion.h1 
                            ref={titleRef}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4"
                            style={{ 
                                backgroundSize: '200% 200%',
                                animation: 'gradientShift 3s ease-in-out infinite'
                            }}
                        >
                            {/* Text will be filled by GSAP */}
                        </motion.h1>
                        
                        <div className="flex items-center gap-6 mb-6">
                            <motion.div
                                ref={difficultyRef}
                                className={`px-6 py-3 rounded-full text-white font-bold text-lg bg-gradient-to-r ${getDifficultyColor(problem?.difficulty)}`}
                            >
                                {problem?.difficulty || 'Unknown'}
                            </motion.div>
                            
                            <div className="flex items-center gap-2 text-slate-400">
                                <Clock size={20} />
                                <span className="text-lg">{Math.floor(Math.random() * 30) + 5} min</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-400">
                                <Star size={20} />
                                <span className="text-lg">{Math.floor(Math.random() * 5) + 1}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {problem?.tags?.map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                    className="px-4 py-2 bg-slate-800 text-cyan-400 rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRun}
                            disabled={isRunning}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg flex items-center gap-3 disabled:opacity-50"
                        >
                            <Play size={24} />
                            {isRunning ? 'Running...' : 'Run Code'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl text-lg flex items-center gap-3 disabled:opacity-50"
                        >
                            <CheckCircle size={24} />
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </motion.button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
};

// Enhanced Code Editor
const UltraCodeEditor = ({ code, setCode, language = 'javascript' }) => {
    const editorRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Code editor entrance animation
        gsap.fromTo(editorRef.current,
            { scale: 0.9, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <motion.div
            ref={editorRef}
            className={`relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden ${
                isFullscreen ? 'fixed inset-0 z-50' : ''
            }`}
            layout
        >
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-400 font-mono text-sm">{language}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 text-slate-400 hover:text-white transition-colors duration-300"
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Code Editor */}
            <div className="relative">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 p-6 bg-slate-900 text-slate-100 font-mono text-lg resize-none focus:outline-none"
                    placeholder="// Write your code here..."
                    spellCheck={false}
                />
                
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 p-6 text-slate-600 font-mono text-lg pointer-events-none">
                    {code.split('\n').map((_, i) => (
                        <div key={i} className="h-6 leading-6">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Problem Description
const UltraProblemDescription = ({ problem }) => {
    const descRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(descRef.current?.children,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
    }, [problem]);

    return (
        <div ref={descRef} className="space-y-8">
            <motion.div
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Brain size={28} className="text-cyan-400" />
                    Problem Description
                </h3>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {problem?.description || "Loading problem description..."}
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Target size={28} className="text-cyan-400" />
                    Examples
                </h3>
                <div className="space-y-4">
                    {problem?.examples?.map((example, index) => (
                        <div key={index} className="bg-slate-800/50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Example {index + 1}:</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="text-sm font-medium text-slate-400 mb-2">Input:</h5>
                                    <pre className="bg-slate-900 p-4 rounded-lg text-slate-300 font-mono text-sm">
                                        {example.input}
                                    </pre>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-slate-400 mb-2">Output:</h5>
                                    <pre className="bg-slate-900 p-4 rounded-lg text-slate-300 font-mono text-sm">
                                        {example.output}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap size={28} className="text-cyan-400" />
                    Constraints
                </h3>
                <div className="bg-slate-800/50 rounded-xl p-6">
                    <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
                        {problem?.constraints || "No constraints specified."}
                    </pre>
                </div>
            </motion.div>
        </div>
    );
};

// Enhanced Test Results
const UltraTestResults = ({ results, isRunning }) => {
    const resultsRef = useRef(null);

    useEffect(() => {
        if (results?.length > 0) {
            gsap.fromTo(resultsRef.current?.children,
                { x: 50, opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
            );
        }
    }, [results]);

    if (isRunning) {
        return (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center py-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: -1, ease: "linear" }}
                        className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
                    />
                    <span className="ml-4 text-xl text-slate-400">Running tests...</span>
                </div>
            </div>
        );
    }

    if (!results || results.length === 0) {
        return (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircle size={28} className="text-cyan-400" />
                    Test Results
                </h3>
                <div className="text-center py-8 text-slate-400">
                    <Code size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Run your code to see test results</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={resultsRef} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle size={28} className="text-cyan-400" />
                Test Results
            </h3>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <motion.div
                        key={index}
                        className={`p-6 rounded-xl border-2 ${
                            result.passed 
                                ? 'bg-emerald-500/10 border-emerald-500/50' 
                                : 'bg-red-500/10 border-red-500/50'
                        }`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                result.passed ? 'bg-emerald-500' : 'bg-red-500'
                            }`}>
                                {result.passed ? <CheckCircle size={20} className="text-white" /> : <XCircle size={20} className="text-white" />}
                            </div>
                            <h4 className="text-lg font-semibold text-white">Test Case {index + 1}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                result.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                                {result.passed ? 'PASSED' : 'FAILED'}
                            </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm font-medium text-slate-400 mb-2">Input:</h5>
                                <pre className="bg-slate-800 p-3 rounded-lg text-slate-300 font-mono text-sm">
                                    {result.input}
                                </pre>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-slate-400 mb-2">Expected vs Actual:</h5>
                                <div className="space-y-2">
                                    <div className="bg-slate-800 p-3 rounded-lg">
                                        <span className="text-emerald-400">Expected: </span>
                                        <span className="text-slate-300 font-mono">{result.expected}</span>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-lg">
                                        <span className="text-cyan-400">Actual: </span>
                                        <span className="text-slate-300 font-mono">{result.actual}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Main Ultra Problem Page Component
function UltraProblemPage() {
    const { problemid } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [results, setResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/problem/getproblem/${problemid}`);
                setProblem(response.data);
                
                // Set default code based on problem
                setCode(`// Solution for ${response.data.title}
function solution() {
    // Your code here
    
}`);

            } catch (error) {
                console.error('Error fetching problem:', error);
            } finally {
                setLoading(false);
            }
        };

        if (problemid) {
            fetchProblem();
        }
    }, [problemid]);

    const handleRun = async () => {
        setIsRunning(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock test results
            setResults([
                { passed: true, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]" },
                { passed: true, input: "nums = [3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]" },
                { passed: false, input: "nums = [3,3], target = 6", expected: "[0,1]", actual: "[1,0]" }
            ]);
        } catch (error) {
            console.error('Error running code:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Mock submission result
            alert('Code submitted successfully!');
        } catch (error) {
            console.error('Error submitting code:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                    <p className="text-2xl text-slate-400 font-medium">Loading problem...</p>
                </motion.div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Problem Not Found</h1>
                    <p className="text-xl text-slate-400 mb-8">The problem you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-primary text-lg px-8 py-4"
                    >
                        Return to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header />
            
            <main>
                <UltraProblemHeader 
                    problem={problem}
                    onRun={handleRun}
                    onSubmit={handleSubmit}
                    isRunning={isRunning}
                    isSubmitting={isSubmitting}
                />

                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Problem Description */}
                        <div className="space-y-8">
                            <UltraProblemDescription problem={problem} />
                        </div>

                        {/* Right Column - Code Editor and Results */}
                        <div className="space-y-8">
                            <UltraCodeEditor 
                                code={code}
                                setCode={setCode}
                                language="javascript"
                            />
                            
                            <UltraTestResults 
                                results={results}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UltraProblemPage;

