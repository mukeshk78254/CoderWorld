import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import Editorial from "../components/Editorial";
import ChatAi from "../components/ChatAi";
import { 
    Code, Play, Send, Copy, RotateCcw, Maximize2, Minimize2, 
    FileText, BookOpen, History, MessageCircle, ChevronRight,
    ArrowLeft, Settings, Zap, Target, Clock, CheckCircle, XCircle,
    Lightbulb, Users, GripVertical
} from 'lucide-react';
import '../components/ResizableEditor.css';

// Simple Resizable Editor Component
const ResizableEditor = ({ value, onChange, language, onMount }) => {
    const textareaRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(0);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '400px'; // Default height
            onMount && onMount(textareaRef.current);
        }
    }, [onMount]);

    const handleMouseDown = (e) => {
        setIsResizing(true);
        setStartY(e.clientY);
        setStartHeight(textareaRef.current.offsetHeight);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing) return;
        const newHeight = startHeight + (e.clientY - startY);
        if (newHeight > 200 && newHeight < 800) { // Min and max height
            textareaRef.current.style.height = `${newHeight}px`;
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const getLanguageClass = (lang) => {
        switch (lang) {
            case 'javascript': return 'language-javascript';
            case 'java': return 'language-java';
            case 'cpp': return 'language-cpp';
            default: return 'language-javascript';
        }
    };

    return (
        <div className="resizable-editor flex-1">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${getLanguageClass(language)}`}
                placeholder={`// Write your ${language} code here...`}
            />
            <div 
                className="resize-handle"
                onMouseDown={handleMouseDown}
            >
                <GripVertical size={16} className="text-slate-400" />
            </div>
        </div>
    );
};

// Simplified Header Component
const SimplifiedHeader = ({ problem, onBack }) => {
    return (
        <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-slate-800">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={onBack}
                            className="text-xl font-bold text-white flex items-center gap-2 hover:text-cyan-400 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>LeetCode</span>
                        </button>
                        
                        {problem && (
                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Code size={16} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        {problem.title}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                            problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                                        </span>
                                        {problem.tags && (
                                            <span className="text-xs text-slate-400">
                                                {Array.isArray(problem.tags) ? problem.tags[0] : problem.tags}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

// Action Button Component
const ActionButton = ({ onClick, variant, icon: Icon, loading, children, ...props }) => {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        secondary: "bg-slate-600 hover:bg-slate-700 text-white",
        warning: "bg-yellow-600 hover:bg-yellow-700 text-white"
    };

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variants[variant]}`}
            {...props}
        >
            {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <Icon size={16} />
            )}
            {children}
        </button>
    );
};

// Main Simplified Problem Page Component
function SimplifiedProblemPage() {
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
    const [loadingModalText, setLoadingModalText] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const langMap = {
        cpp: "C++",
        java: "Java",
        javascript: "JavaScript"
    };

    // Fetch problem on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
                setProblem(data);
                
                // Set initial code based on language
                if (data.startCode && data.startCode.length > 0) {
                    const initialCode = data.startCode.find(sc => sc.language === selectedLanguage);
                    if (initialCode) {
                        setCode(initialCode.initialCode);
                    }
                }
            } catch (error) {
                console.error('Error fetching problem:', error);
                
                // If problem fetch fails, create a mock problem for testing
                const mockProblem = {
                    _id: problemid,
                    title: "Add Two Numbers",
                    description: `Given two integers a and b, return the sum of a and b.

Example 1:
Input: a = 1, b = 2
Output: 3

Example 2:
Input: a = 2, b = 3
Output: 5

Constraints:
- -1000 <= a, b <= 1000`,
                    difficulty: "easy",
                    tags: "array",
                    visibletestcases: [
                        { input: "1 2", output: "3" },
                        { input: "2 3", output: "5" }
                    ],
                    hiddentestcases: [
                        { input: "0 0", output: "0" },
                        { input: "-1 1", output: "0" }
                    ],
                    startCode: [
                        {
                            language: "javascript",
                            initialCode: `function add(a, b) {
    // Write your code here
    return a + b;
}`
                        },
                        {
                            language: "java",
                            initialCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`
                        },
                        {
                            language: "cpp",
                            initialCode: `#include<iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`
                        }
                    ]
                };
                
                setProblem(mockProblem);
                
                // Set initial code based on language
                const initialCode = mockProblem.startCode.find(sc => sc.language === selectedLanguage);
                if (initialCode) {
                    setCode(initialCode.initialCode);
                }
            } finally {
                setLoading(false);
            }
        };

        if (problemid) {
            fetchData();
        }
    }, [problemid, selectedLanguage]);

    // Update code when language changes
    useEffect(() => {
        if (problem && problem.startCode) {
            const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage);
            if (initialCode) {
                setCode(initialCode.initialCode);
            }
        }
    }, [selectedLanguage, problem]);

    const handleRun = async () => {
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

    const getSubmissionMessage = (status, passed, total) => {
        if (status === 'accepted') {
            return `🎉 Accepted! Passed ${passed}/${total} test cases.`;
        } else if (status === 'wrong answer') {
            return `❌ Wrong Answer. Passed ${passed}/${total} test cases.`;
        } else if (status === 'error') {
            return `💥 Runtime Error. Passed ${passed}/${total} test cases.`;
        }
        return `📊 Status: ${status}. Passed ${passed}/${total} test cases.`;
    };

    const handleResetCode = () => {
        if (problem && problem.startCode) {
            const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage);
            if (initialCode) {
                setCode(initialCode.initialCode);
            }
        }
    };

    const handleFormatCode = () => {
        // Simple formatting - just clean up whitespace
        setCode(code.trim());
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleBack = () => {
        navigate('/problems');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white text-xl">Problem not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <SimplifiedHeader problem={problem} onBack={handleBack} />
            
            <main className="container mx-auto px-4 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
                    {/* Left Panel - Problem Content */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-sm flex flex-col">
                        {/* Problem Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <FileText size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">
                                        {problem.title}
                                    </h1>
                                    <p className="text-slate-400 text-sm">
                                        {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)} • {problem.tags}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex space-x-1 mb-4 bg-slate-800/50 p-1 rounded-lg">
                            {[
                                { id: "description", label: "Description", icon: FileText },
                                { id: "submissions", label: "Submissions", icon: History },
                                { id: "solutions", label: "Solutions", icon: BookOpen },
                                { id: "discussions", label: "Discussions", icon: MessageCircle },
                                { id: "editorial", label: "Editorial", icon: Lightbulb },
                                { id: "chatAi", label: "AI Chat", icon: Users }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? "bg-cyan-600 text-white"
                                            : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                    }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === "description" && (
                                        <div className="prose prose-invert max-w-none">
                                            <div className="text-slate-300 whitespace-pre-wrap">
                                                {problem.description}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "submissions" && <SubmissionHistory problemId={problemid} />}
                                    {activeTab === "solutions" && (
                                        <div className="text-slate-300">
                                            <p>Solutions will be available after you solve the problem.</p>
                                        </div>
                                    )}
                                    {activeTab === "discussions" && (
                                        <div className="text-slate-300">
                                            <p>Discussions feature coming soon.</p>
                                        </div>
                                    )}
                                    {activeTab === "editorial" && <Editorial secureUrl={problem?.secureUrl} />}
                                    {activeTab === "chatAi" && <ChatAi problem={problem} />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Panel - Code Editor */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-sm flex flex-col">
                        {/* Editor Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Code size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">
                                        Code Editor
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        {langMap[selectedLanguage]}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="bg-slate-800 border border-slate-600 text-white px-3 py-1 rounded-lg text-sm"
                                >
                                    {Object.entries(langMap).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <ActionButton 
                                onClick={handleRun} 
                                variant="primary" 
                                icon={Play}
                                loading={isRunning}
                            >
                                Run
                            </ActionButton>
                            <ActionButton 
                                onClick={handleSubmit} 
                                variant="success" 
                                icon={Send}
                                loading={isSubmitting}
                            >
                                Submit
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
                            >
                                Format
                            </ActionButton>
                            <ActionButton 
                                onClick={toggleFullScreen} 
                                variant="secondary" 
                                icon={isFullScreen ? Minimize2 : Maximize2}
                            >
                                {isFullScreen ? "Exit" : "Fullscreen"}
                            </ActionButton>
                        </div>

                        {/* Resizable Code Editor */}
                        <ResizableEditor
                            value={code}
                            onChange={setCode}
                            language={selectedLanguage}
                            onMount={(editor) => (editorRef.current = editor)}
                        />
                    </div>
                </div>
            </main>

            {/* Result Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Execution Results</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-slate-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            {loadingModalText && (
                                <div className="text-center py-8">
                                    <div className="text-cyan-400 text-lg">{loadingModalText}</div>
                                </div>
                            )}
                            
                            {runResult && (
                                <div className="space-y-4">
                                    {runResult.map((result, index) => (
                                        <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                                            {result.error ? (
                                                <div className="text-red-400">{result.error}</div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-sm text-slate-400">Test Case {index + 1}</span>
                                                        <span className={`px-2 py-1 rounded text-xs ${
                                                            result.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                            {result.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm space-y-1">
                                                        <div><span className="text-slate-400">Input:</span> {result.input}</div>
                                                        <div><span className="text-slate-400">Expected:</span> {result.expected}</div>
                                                        <div><span className="text-slate-400">Output:</span> {result.output}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {submitResult && (
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <div className="text-lg font-semibold mb-2">{submitResult.message}</div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="text-slate-400">Test Cases:</span> {submitResult.testCasesPassed}/{submitResult.testCasesTotal}</div>
                                        <div><span className="text-slate-400">Runtime:</span> {submitResult.runtime}ms</div>
                                        <div><span className="text-slate-400">Memory:</span> {submitResult.memory}KB</div>
                                        <div><span className="text-slate-400">Status:</span> {submitResult.status}</div>
                                    </div>
                                    {submitResult.errorMessage && (
                                        <div className="mt-2 text-red-400 text-sm">
                                            {submitResult.errorMessage}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SimplifiedProblemPage;