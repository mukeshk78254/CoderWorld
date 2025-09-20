import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
    MessageCircle, X, Send, Bot, User, 
    Sparkles, Zap, Brain, Code, Lightbulb,
    Minimize2, Maximize2, Settings
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin();

// Floating AI Chat Assistant Component
const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: "👋 Hi! I'm your AI coding assistant. I can help you with programming questions, debug code, explain concepts, and provide coding tips. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    
    const chatRef = useRef(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const dragRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Entrance animation
    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(chatRef.current,
                { scale: 0, opacity: 0, rotation: -180 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" }
            );
        }
    }, [isOpen]);

    // Drag functionality
    const handleMouseDown = (e) => {
        if (e.target.closest('.drag-handle')) {
            setIsDragging(true);
            const startX = e.clientX - position.x;
            const startY = e.clientY - position.y;

            const handleMouseMove = (e) => {
                setPosition({
                    x: e.clientX - startX,
                    y: e.clientY - startY
                });
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    };

    // Send message function
    const sendMessage = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(inputValue);
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    // Generate AI response based on input
    const generateAIResponse = (input) => {
        const responses = [
            "That's a great question! Let me help you with that. Based on your query, I'd recommend checking the documentation and considering edge cases.",
            "I understand you're working on this problem. Here's a step-by-step approach that might help you solve it more efficiently.",
            "Interesting! This is a common pattern in programming. Let me break down the solution for you with some examples.",
            "Great question! This involves several concepts. Let me explain each part and show you how they work together.",
            "I can help you debug this! The issue might be related to variable scope or data type conversion. Let me walk you through it.",
            "Excellent! This is an advanced topic. Here's a comprehensive explanation with code examples and best practices.",
            "I see what you're trying to achieve. Here's a more efficient approach using modern JavaScript/React patterns.",
            "That's a tricky one! Let me provide you with multiple solutions and explain the trade-offs between them."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Quick action buttons
    const quickActions = [
        { icon: Code, text: "Explain this code", action: "Can you explain how this code works?" },
        { icon: Bug, text: "Debug help", action: "I'm getting an error, can you help debug?" },
        { icon: Lightbulb, text: "Optimize code", action: "How can I optimize this code?" },
        { icon: Brain, text: "Algorithm help", action: "Can you explain this algorithm?" }
    ];

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                    <MessageCircle size={28} />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ scale: 0, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`fixed z-50 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'} bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl`}
                        style={{
                            left: position.x,
                            top: position.y,
                            maxWidth: 'calc(100vw - 40px)',
                            maxHeight: 'calc(100vh - 40px)'
                        }}
                        onMouseDown={handleMouseDown}
                    >
                        {/* Header */}
                        <div className="drag-handle flex items-center justify-between p-4 bg-slate-800 rounded-t-2xl cursor-move">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">AI Assistant</h3>
                                    <p className="text-xs text-slate-400">Always here to help</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 text-slate-400 hover:text-white transition-colors duration-300"
                                >
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-300"
                                >
                                    <X size={16} />
                                </motion.button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px]">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex items-start gap-3 max-w-[80%] ${
                                                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                                            }`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    message.type === 'user' 
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                                                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                }`}>
                                                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                                </div>
                                                <div className={`px-4 py-3 rounded-2xl ${
                                                    message.type === 'user'
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                                        : 'bg-slate-800 text-slate-200'
                                                }`}>
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {message.timestamp.toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing indicator */}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <Bot size={16} />
                                                </div>
                                                <div className="bg-slate-800 px-4 py-3 rounded-2xl">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Actions */}
                                <div className="p-4 border-t border-slate-800">
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {quickActions.map((action, index) => (
                                            <motion.button
                                                key={action.text}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setInputValue(action.action)}
                                                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm transition-colors duration-300"
                                            >
                                                <action.icon size={16} />
                                                {action.text}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask me anything about coding..."
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                                            disabled={isTyping}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={sendMessage}
                                            disabled={!inputValue.trim() || isTyping}
                                            className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            <Send size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatAssistant;




















