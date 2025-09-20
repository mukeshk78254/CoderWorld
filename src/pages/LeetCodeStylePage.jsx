import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import Editorial from "../components/Editorial";
import ChatAi from "../components/ChatAi";
import ProblemDiscussion from "../components/ProblemDiscussion";
import { gsap } from "gsap";

const langMap = { cpp: "C++", java: "Java", javascript: "JavaScript" };

function LeetCodeStylePage() {
    const { problemid } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [loading, setLoading] = useState(true);
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const [showModal, setShowModal] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [allProblems, setAllProblems] = useState([]);
    const [showProblemList, setShowProblemList] = useState(false);
    const [loadingModalText, setLoadingModalText] = useState("");
    const [editorZoom, setEditorZoom] = useState(14);
    const [submissionKnowledge, setSubmissionKnowledge] = useState("");
    const [submissionTags, setSubmissionTags] = useState("");
    const [hasSubmittedSolution, setHasSubmittedSolution] = useState(false);
    const [sharedSolutions, setSharedSolutions] = useState([]);

    // Enhanced GSAP Animations
    useEffect(() => {
        if (containerRef.current) {
            // Initial page animation
            gsap.fromTo(containerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, []);

    // Load shared solutions from localStorage
    useEffect(() => {
        const savedSolutions = JSON.parse(localStorage.getItem('sharedSolutions') || '[]');
        const problemSolutions = savedSolutions.filter(sol => sol.problemId === problemid);
        setSharedSolutions(problemSolutions);
    }, [problemid]);

    // Enhanced problem fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
                setProblem(data);
                
                const starter = data.startcode?.find(sc => 
                    selectedLanguage === "cpp" ? ["cpp", "c++"].includes(sc.language) : sc.language === selectedLanguage
                );
                setCode(starter?.initialcode || "// No starter code available");
            } catch (err) {
                console.error("Error loading problem:", err);
                // Mock problem for development
                setProblem({
                    _id: problemid,
                    title: "Add Two Numbers",
                    description: "<p>You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p>",
                    visibletestcases: [
                        { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" },
                        { input: "l1 = [0], l2 = [0]", output: "[0]", explanation: "0 + 0 = 0" }
                    ],
                    startcode: [
                        { language: "javascript", initialcode: "function addTwoNumbers(l1, l2) {\n    // Your code here\n    return null;\n};" }
                    ]
                });
                setCode("function addTwoNumbers(l1, l2) {\n    // Your code here\n    return null;\n};");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [problemid, selectedLanguage]);

    // Enhanced code reset with animation
    useEffect(() => {
        if (problem) {
            const starter = problem.startcode?.find(sc => 
                selectedLanguage === "cpp" ? ["cpp", "c++"].includes(sc.language) : sc.language === selectedLanguage
            );
            const newCode = starter?.initialcode || "// No starter code for this language.";
            
            if (newCode !== code) {
                gsap.to(editorRef.current, { 
                    opacity: 0.5, 
                    duration: 0.3,
                    onComplete: () => {
                        setCode(newCode);
                        gsap.to(editorRef.current, { 
                            opacity: 1, 
                            duration: 0.3 
                        });
                    }
                });
            }
        }
    }, [selectedLanguage, problem]);

    // Enhanced handlers with animations
    const handleRun = async () => {
        setShowModal(true);
        setLoadingModalText("💻 Running your code...");
        setRunResult(null);
        setSubmitResult(null);
        
        // Animate modal appearance
        gsap.fromTo('.modal-content', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        try {
            const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
                code,
                language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
            });
            
            const results = data.map((res, i) => ({
                input: problem.visibletestcases[i]?.input || "",
                expected: problem.visibletestcases[i]?.output || "",
                output: res.stdout || res.stderr || res.compile_output || "No output",
                passed: res.status.id === 3
            }));
            
            setRunResult(results);
            
            // Animate results
            gsap.fromTo('.result-item',
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        } catch {
            setRunResult([{ error: "Run failed. Please try again." }]);
        } finally {
            setLoadingModalText("");
        }
    };

    const handleSubmit = async () => {
        setShowModal(true);
        setLoadingModalText("🚀 Submitting...");
        setRunResult(null);
        setSubmitResult(null);
        
        try {
            const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
                code,
                language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
            });
            setSubmitResult(data);
            console.log("Submit result data:", data);
            console.log("Submit result status:", data.status);
            
            // If submission is successful, mark that user has submitted a solution
            if (data.status === "accepted" || data.status === "Accepted") {
                setHasSubmittedSolution(true);
                // Save the user's code and language for the write solution page
                localStorage.setItem('lastSubmittedCode', code);
                localStorage.setItem('lastSubmittedLanguage', selectedLanguage);
            }
        } catch {
            setSubmitResult({ status: "error", message: "Submission failed." });
        } finally {
            setLoadingModalText("");
        }
    };

    const handleZoomIn = () => {
        setEditorZoom(prev => Math.min(prev + 2, 24));
    };

    const handleZoomOut = () => {
        setEditorZoom(prev => Math.max(prev - 2, 8));
    };

    const handleResetZoom = () => {
        setEditorZoom(14);
    };

    const handleShareSolution = async () => {
        if (!submissionKnowledge.trim() || !submissionTags.trim()) {
            alert("Please provide knowledge description and tags before sharing.");
            return;
        }

        try {
            // Create solution data
            const solutionData = {
                id: Date.now(), // Simple ID for demo
                problemId: problemid,
                code,
                language: selectedLanguage,
                knowledge: submissionKnowledge,
                tags: submissionTags.split(',').map(tag => tag.trim()),
                timestamp: new Date().toISOString(),
                author: "You" // In real app, this would be the logged-in user
            };
            
            // Add to shared solutions list
            setSharedSolutions(prev => [solutionData, ...prev]);
            
            // Clear form
            setSubmissionKnowledge("");
            setSubmissionTags("");
            
            alert("Solution shared successfully! Thank you for contributing to the community.");
        } catch (error) {
            alert("Failed to share solution. Please try again.");
        }
    };


    const handleResetCode = () => {
        gsap.to(editorRef.current, { 
            scale: 0.95, 
            duration: 0.2,
            onComplete: () => {
                setCode("");
                gsap.to(editorRef.current, { 
                    scale: 1, 
                    duration: 0.2 
                });
            }
        });
    };

    const handleFormatCode = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
            gsap.to(editorRef.current, { 
                scale: 1.02, 
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleBack = () => {
        gsap.to(containerRef.current, { 
            x: -window.innerWidth, 
            duration: 0.5, 
            ease: "power2.in",
            onComplete: () => navigate("/")
        });
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
            
            // Animate problem list
            gsap.fromTo('.problem-list-item',
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
            );
        } catch (err) {
            alert("Failed to load problem list.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-white text-xl font-mono">Loading...</div>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-600 text-xl">Problem not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono ${isFullScreen ? "fixed inset-0 z-50" : ""}`}>
            <style>{`
                .tab-active { border-bottom: 2px solid cyan; }
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
            `}</style>
            
            
            {/* Main Content - Desktop Split Layout */}
            <div ref={containerRef} className="relative z-10 flex w-full">
                {/* Left Panel - Problem Description */}
                <div className="w-1/2 p-4 space-y-3 overflow-y-auto relative">
                    <div className="flex justify-between items-center">
                        {/* Enhanced CoderWorld Logo with Icon and Hover Effects */}
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            onClick={handleBack} 
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            {/* Logo Icon */}
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/20 group-hover:shadow-cyan-500/40 transition-all duration-300"
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
                                    className="w-12 h-12"
                                >
                                    <img 
                                        src="/src/pages/2896418.png" 
                                        alt="CoderWorld Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            </motion.div>
                            
                            {/* Logo Text */}
                            <div className="flex flex-col">
                                <motion.span 
                                    whileHover={{ scale: 1.02 }}
                                    className="text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    CoderWorld
                                </motion.span>
                                <motion.span 
                                    initial={{ opacity: 0.7 }}
                                    whileHover={{ opacity: 1 }}
                                    className="text-sm text-slate-400 group-hover:text-cyan-400 transition-colors duration-300"
                                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                                >
                                    Code • Learn • Solve
                                </motion.span>
                            </div>
                        </motion.div>
                        
                        {/* Enhanced Problems Button with Hover Effect */}
                        <motion.div 
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={fetchAllProblems} 
                            className="cursor-pointer text-cyan-300 hover:text-cyan-200 hover:underline transition-all duration-300 px-4 py-3 rounded-lg hover:bg-slate-800/50 flex items-center gap-2"
                            style={{ fontFamily: "'Source Code Pro', monospace" }}
                        >
                              <img src="/src/pages/3240846.png" alt="Problems" className="w-10 h-10 justify-align-start padding-10" /> 
                              <span className="text-xl font-bold w-20 justify-align-start padding-10">Problems</span>
                        </motion.div>
                    </div>

                    {showProblemList && (
                        <div className="bg-gray-900 border border-gray-700 p-3 rounded max-h-60 overflow-y-auto">
                            <h3 className="text-xl font-bold mb-2">All Problems</h3>
                            <ul className="space-y-1">
                                {allProblems.map((p, index) => (
                                    <motion.li 
                                        key={p._id} 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(`/problem/${p._id}`)} 
                                        className="problem-list-item text-cyan-300 cursor-pointer hover:text-cyan-200 hover:underline transition-all duration-300 py-1 px-2 rounded hover:bg-gray-800/50 text-base font-medium"
                                    >
                                        ➤ {p.title}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex space-x-6 border-b border-gray-600 text-gray-300 mt-2">
                        {["description", "editorial", "solution", "discuss", "submissions", "chatAi"].map(tab => (
                            <motion.div 
                                key={tab} 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(tab)} 
                                className={`py-2 cursor-pointer transition-all duration-300 text-base font-medium ${
                                    activeTab === tab 
                                        ? "text-cyan-400 border-b-2 border-cyan-400" 
                                        : "hover:text-white hover:border-b-2 hover:border-gray-400"
                                }`}
                                style={{ fontFamily: "'Source Code Pro', monospace" }}
                            >
                                {tab.toUpperCase()}
                            </motion.div>
                        ))}
                    </div>

                    <div className="fade-in">
                        {activeTab === "description" && (
                            <>
                                <motion.h2 
                                    whileHover={{ scale: 1.02 }}
                                    className="text-2xl font-bold mt-3 text-white"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    {problem?.title}
                                </motion.h2>
                                <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem?.description }} />
                                <div className="mt-4 space-y-2">
                                    {problem?.visibletestcases?.map((ex, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-gray-600 transition-all duration-300"
                                        >
                                            <p><strong>Input:</strong> {ex.input}</p>
                                            <p><strong>Output:</strong> {ex.output}</p>
                                            {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                        
                        {activeTab === "editorial" && (
                            <div>
                                <h3 className="text-lg font-bold mb-4">📚 Editorial Solution</h3>
                                {problem?.secureUrl ? (
                                    <Editorial secureUrl={problem.secureUrl} />
                                ) : (
                                    <div className="bg-gray-800 p-6 rounded border border-gray-700 text-center">
                                        <div className="text-gray-400 text-lg mb-2">📝</div>
                                        <p className="text-gray-400">No editorial solution available for this problem yet.</p>
                                        <p className="text-sm text-gray-500 mt-2">Check back later or contribute by sharing your solution!</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {activeTab === "solution" && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">💡 Solutions</h3>
                                    {hasSubmittedSolution && (
                                        <button 
                                            onClick={() => {
                                                const encodedCode = encodeURIComponent(code);
                                                const encodedLanguage = encodeURIComponent(selectedLanguage);
                                                navigate(`/problem/${problemid}/write-solution?code=${encodedCode}&language=${encodedLanguage}`);
                                            }}
                                            className="btn btn-success btn-sm"
                                        >
                                            + Write Solution
                                        </button>
                                    )}
                                </div>
                                
                                {sharedSolutions.length > 0 ? (
                                    <div className="space-y-4">
                                        {sharedSolutions.map((solution) => (
                                            <div key={solution.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-cyan-400">{solution.author}</span>
                                                            <span className="text-xs text-gray-500">•</span>
                                                            <span className="text-xs text-gray-500">{solution.language}</span>
                                                            <span className="text-xs text-gray-500">•</span>
                                                            <span className="text-xs text-gray-500">{new Date(solution.timestamp).toLocaleDateString()}</span>
                                                            {solution.isPermanent && (
                                                                <>
                                                                    <span className="text-xs text-gray-500">•</span>
                                                                    <span className="text-xs text-green-400">🔒 Permanent</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {solution.tags.map((tag, index) => (
                                                                <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <p className="text-sm text-gray-300">{solution.description}</p>
                                                </div>
                                                
                                                <div className="bg-gray-700 border border-gray-600 rounded p-3">
                                                    <div className="text-xs text-gray-400 mb-2">Code:</div>
                                                    <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">{solution.code}</pre>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-800 p-6 rounded border border-gray-700 text-center">
                                        <div className="text-gray-400 text-4xl mb-4">📝</div>
                                        <h4 className="text-lg font-semibold text-gray-300 mb-3">No solutions shared yet</h4>
                                        <p className="text-gray-400 mb-4">
                                            {hasSubmittedSolution 
                                                ? "Be the first to share your solution with the community!"
                                                : "Solve this problem first, then share your solution!"
                                            }
                                        </p>
                                        {hasSubmittedSolution && (
                                            <button 
                                                onClick={() => {
                                                    const encodedCode = encodeURIComponent(code);
                                                    const encodedLanguage = encodeURIComponent(selectedLanguage);
                                                    navigate(`/problem/${problemid}/write-solution?code=${encodedCode}&language=${encodedLanguage}`);
                                                }}
                                                className="btn btn-success btn-sm"
                                            >
                                                Write First Solution
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {activeTab === "discuss" && (
                            <ProblemDiscussion 
                                problemId={problemid} 
                                problemTitle={problem?.title || "Problem"} 
                            />
                        )}
                        
                        {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
                        {activeTab === "chatAi" && <ChatAi problem={problem} />}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 p-4 flex flex-col gap-3">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-3">
                            <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="bg-gray-800 border border-gray-600 p-2 rounded text-white">
                                {Object.entries(langMap).map(([k, v]) => (
                                    <option key={k} value={k}>{v}</option>
                                ))}
                            </select>
                            
                            {/* Zoom Controls */}
                            <div className="flex items-center gap-1 bg-gray-800 border border-gray-600 rounded">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleZoomOut} 
                                    className="px-2 py-1 text-white hover:bg-gray-700 rounded-l transition-colors duration-200" 
                                    title="Zoom Out"
                                >
                                    -
                                </motion.button>
                                <span className="px-2 py-1 text-white text-sm border-x border-gray-600">{editorZoom}px</span>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleZoomIn} 
                                    className="px-2 py-1 text-white hover:bg-gray-700 rounded-r transition-colors duration-200" 
                                    title="Zoom In"
                                >
                                    +
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleResetZoom} 
                                    className="px-2 py-1 text-white hover:bg-gray-700 ml-1 rounded transition-colors duration-200" 
                                    title="Reset Zoom"
                                >
                                    ⌂
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRun} 
                                className="btn btn-info btn-sm transition-all duration-200 font-bold"
                            >
                                Run
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit} 
                                className="btn btn-success btn-sm transition-all duration-200 font-bold"
                            >
                                Submit
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    console.log("Test navigation to write solution page");
                                    const encodedCode = encodeURIComponent(code);
                                    const encodedLanguage = encodeURIComponent(selectedLanguage);
                                    const url = `/problem/${problemid}/write-solution?code=${encodedCode}&language=${encodedLanguage}`;
                                    console.log("Test URL:", url);
                                    navigate(url);
                                }}
                                className="btn btn-warning btn-sm transition-all duration-200 font-bold"
                            >
                                Test Write Solution
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    navigator.clipboard.writeText(code);
                                    alert("Code copied to clipboard!");
                                }}
                                className="btn btn-primary btn-sm transition-all duration-200 font-bold"
                            >
                                Copy
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleResetCode} 
                                className="btn btn-warning btn-sm transition-all duration-200 font-bold"
                            >
                                Reset
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleFormatCode} 
                                className="btn btn-secondary btn-sm transition-all duration-200 font-bold"
                            >
                                Format
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleFullScreen} 
                                className="btn btn-outline btn-sm transition-all duration-200 font-bold"
                            >
                                {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex-grow border border-gray-700 rounded overflow-hidden">
                        <Editor
                            language={selectedLanguage}
                            value={code}
                            onChange={(v) => setCode(v || "")}
                            theme="vs-dark"
                            onMount={(editor) => (editorRef.current = editor)}
                            options={{ 
                                minimap: { enabled: false }, 
                                fontSize: editorZoom,
                                automaticLayout: true,
                                wordWrap: "on",
                                lineNumbers: "on",
                                renderLineHighlight: "line",
                                cursorStyle: "line",
                                fontLigatures: true,
                                bracketPairColorization: { enabled: true },
                                guides: { bracketPairs: true }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Floating Result Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg border border-gray-700 w-[90%] max-w-2xl fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">🎯 Result</h3>
                            <button onClick={() => setShowModal(false)} className="btn btn-error btn-sm">Close</button>
                        </div>
                        
                        {loadingModalText && <div className="text-center text-cyan-300 mb-4">{loadingModalText}</div>}
                        
                        {runResult && runResult.map((r, i) => (
                            <div key={i} className="result-item bg-gray-800 p-3 mb-2 rounded">
                                {r.error ? (
                                    <p className="text-red-400">{r.error}</p>
                                ) : (
                                    <>
                                        <p><strong>Input:</strong> {r.input}</p>
                                        <p><strong>Expected:</strong> {r.expected}</p>
                                        <p><strong>Output:</strong> {r.output}</p>
                                        <p className={r.passed ? "text-green-400" : "text-red-400"}>
                                            {r.passed ? "✓ Passed" : "✗ Failed"}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                        
                        {submitResult && (
                            <div className="text-center mt-4">
                                <h2 className="text-2xl text-green-400">🎉 {submitResult.status?.toUpperCase()}</h2>
                                {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
                                {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
                                {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
                                
                                {(submitResult.status === "accepted" || submitResult.status === "Accepted") && (
                                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                        <p className="text-green-400 mb-2">🎉 Congratulations! Your solution was accepted!</p>
                                        <p className="text-sm text-gray-300 mb-3">Would you like to share your solution with the community?</p>
                                        <button 
                                            onClick={() => {
                                                console.log("Write Solution button clicked");
                                                console.log("Current code:", code);
                                                console.log("Current language:", selectedLanguage);
                                                const encodedCode = encodeURIComponent(code);
                                                const encodedLanguage = encodeURIComponent(selectedLanguage);
                                                const url = `/problem/${problemid}/write-solution?code=${encodedCode}&language=${encodedLanguage}`;
                                                console.log("Navigating to:", url);
                                                navigate(url);
                                            }}
                                            className="btn btn-success btn-sm"
                                        >
                                            Write Solution
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default LeetCodeStylePage;