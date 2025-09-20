import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowLeft, 
    Lightbulb, 
    FileText, 
    Tag, 
    Code, 
    Send, 
    CheckCircle, 
    AlertTriangle,
    Sparkles,
    BookOpen,
    MessageSquare,
    Zap,
    Shield,
    Clock,
    User,
    Star,
    Heart,
    Share2,
    Copy,
    Download,
    Upload,
    Settings,
    Eye,
    EyeOff
} from "lucide-react";

console.log("WriteSolutionPage: Component imported successfully");

const langMap = { cpp: "C++", java: "Java", javascript: "JavaScript" };

function WriteSolutionPage() {
    console.log("WriteSolutionPage: Component function called");
    const { problemid } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    
    console.log("WriteSolutionPage: problemid from params:", problemid);
    
    const [code, setCode] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load user's submitted code automatically
    useEffect(() => {
        console.log("WriteSolutionPage: Loading code from URL params");
        // Get the user's last submitted code from URL params first
        const urlParams = new URLSearchParams(window.location.search);
        const submittedCode = urlParams.get('code');
        const submittedLanguage = urlParams.get('language');
        
        console.log("URL params - code:", submittedCode);
        console.log("URL params - language:", submittedLanguage);
        
        if (submittedCode) {
            const decodedCode = decodeURIComponent(submittedCode);
            console.log("Setting code from URL:", decodedCode);
            setCode(decodedCode);
        } else {
            // Fallback: try to get from localStorage
            const lastSubmittedCode = localStorage.getItem('lastSubmittedCode');
            console.log("Fallback - localStorage code:", lastSubmittedCode);
            if (lastSubmittedCode) {
                setCode(lastSubmittedCode);
            }
        }
        
        if (submittedLanguage) {
            console.log("Setting language from URL:", submittedLanguage);
            setSelectedLanguage(submittedLanguage);
        } else {
            // Fallback: try to get from localStorage
            const lastSubmittedLanguage = localStorage.getItem('lastSubmittedLanguage');
            console.log("Fallback - localStorage language:", lastSubmittedLanguage);
            if (lastSubmittedLanguage) {
                setSelectedLanguage(lastSubmittedLanguage);
            }
        }
    }, []);

    // GSAP Animation
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, []);

    const handleSubmit = async () => {
        if (!description.trim() || !tags.trim() || !code.trim()) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Create solution data
            const solutionData = {
                id: Date.now(),
                problemId: problemid,
                code,
                language: selectedLanguage,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                timestamp: new Date().toISOString(),
                author: "You", // In real app, this would be the logged-in user
                isPermanent: true // Solutions are permanent
            };
            
            // Here you would typically send to backend
            console.log("Submitting solution:", solutionData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Store in localStorage for demo (in real app, this would be in database)
            const existingSolutions = JSON.parse(localStorage.getItem('sharedSolutions') || '[]');
            existingSolutions.push(solutionData);
            localStorage.setItem('sharedSolutions', JSON.stringify(existingSolutions));
            
            alert("Solution posted successfully! Redirecting to solution panel...");
            
            // Navigate back to solution panel
            navigate(`/problem/${problemid}?tab=solution`);
            
        } catch (error) {
            alert("Failed to post solution. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(`/problem/${problemid}`);
    };

    console.log("WriteSolutionPage: Rendering component");
    console.log("WriteSolutionPage: Current code state:", code);
    console.log("WriteSolutionPage: Current language state:", selectedLanguage);
    
    // Simple test to see if component is rendering
    if (typeof window !== 'undefined') {
        console.log("WriteSolutionPage: About to render - window object available");
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
            <div ref={containerRef} className="container mx-auto px-6 py-8 max-w-7xl">
                {/* Enhanced Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-center mb-10"
                >
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="text-4xl"
                            >
                                <Lightbulb className="w-10 h-10 text-yellow-400" />
                            </motion.div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Write Your Solution
                            </h1>
                        </div>
                        <p className="text-lg text-gray-300 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            Share your approach and help the community learn
                        </p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack} 
                        className="group flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-cyan-400 rounded-xl text-white font-medium transition-all duration-300 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                        Back to Problem
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Panel - Solution Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Description */}
                        <motion.div 
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="p-2 bg-cyan-500/20 rounded-lg"
                                >
                                    <FileText className="w-6 h-6 text-cyan-400" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-cyan-400">Solution Description</h3>
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your approach, time/space complexity, and key insights..."
                                className="w-full h-40 bg-gray-700/50 border border-gray-600/50 rounded-xl p-5 text-white text-base resize-none focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 placeholder-gray-400"
                            />
                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                                <BookOpen className="w-4 h-4" />
                                <span>Share your thought process and approach</span>
                            </div>
                        </motion.div>

                        {/* Tags */}
                        <motion.div 
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="p-2 bg-purple-500/20 rounded-lg"
                                >
                                    <Tag className="w-6 h-6 text-purple-400" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-purple-400">Tags</h3>
                            </div>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g., two-pointers, hash-map, dynamic-programming, recursion"
                                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-5 text-white text-base focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 placeholder-gray-400"
                            />
                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                                <Zap className="w-4 h-4" />
                                <span>Separate tags with commas for better categorization</span>
                            </div>
                        </motion.div>

                        {/* Language Selection */}
                        <motion.div 
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="p-2 bg-green-500/20 rounded-lg"
                                >
                                    <Code className="w-6 h-6 text-green-400" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-green-400">Programming Language</h3>
                            </div>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-5 text-white text-base focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                            >
                                {Object.entries(langMap).map(([k, v]) => (
                                    <option key={k} value={k}>{v}</option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                                <Settings className="w-4 h-4" />
                                <span>Choose the language for your solution</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Panel - Code Editor */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Code Editor Section */}
                        <motion.div 
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="p-2 bg-blue-500/20 rounded-lg"
                                    >
                                        <Code className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-blue-400">Your Solution Code</h3>
                                </div>
                                <AnimatePresence>
                                    {code && (
                                        <motion.span 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-2 text-sm text-green-400 bg-green-500/20 px-3 py-2 rounded-full border border-green-500/30"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Auto-loaded from submission
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="h-[500px] border border-gray-600/50 rounded-xl overflow-hidden shadow-2xl">
                                <Editor
                                    language={selectedLanguage}
                                    value={code}
                                    onChange={(v) => setCode(v || "")}
                                    theme="vs-dark"
                                    onMount={(editor) => (editorRef.current = editor)}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 16,
                                        automaticLayout: true,
                                        wordWrap: "on",
                                        lineNumbers: "on",
                                        renderLineHighlight: "line",
                                        cursorStyle: "line",
                                        fontLigatures: true,
                                        bracketPairColorization: { enabled: true },
                                        guides: { bracketPairs: true },
                                        padding: { top: 20, bottom: 20 },
                                        scrollBeyondLastLine: false,
                                        smoothScrolling: true,
                                        cursorBlinking: "smooth",
                                        cursorSmoothCaretAnimation: true
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                                <Eye className="w-4 h-4" />
                                <span>Write clean, well-commented code that others can learn from</span>
                            </div>
                        </motion.div>

                        {/* Submit Section */}
                        <motion.div 
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="text-center space-y-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="p-2 bg-orange-500/20 rounded-lg"
                                    >
                                        <AlertTriangle className="w-6 h-6 text-orange-400" />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-orange-400">Important Notice</h3>
                                </div>
                                
                                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                                    <p className="text-sm text-orange-200 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Once posted, your solution will be permanent and visible to all users. Only admins can delete it.
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="group relative w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:shadow-none overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    
                                    <div className="relative flex items-center justify-center gap-3">
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <Clock className="w-6 h-6" />
                                                </motion.div>
                                                <span>Posting Solution...</span>
                                            </>
                                        ) : (
                                            <>
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <Send className="w-6 h-6" />
                                                </motion.div>
                                                <span>🚀 Post Solution</span>
                                            </>
                                        )}
                                    </div>
                                </motion.button>

                                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>Share with community</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        <span>Help others learn</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        <span>Get feedback</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default WriteSolutionPage;
