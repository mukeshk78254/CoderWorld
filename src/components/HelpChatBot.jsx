import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosClient from '../utils/axiosClient';

const HelpChatBot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: 'Hello! I\'m your LeetCode support assistant. I can help you with:\n\n• Account and profile issues\n• Platform navigation\n• Problem-solving tips\n• Contest information\n• Technical support\n\nHow can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Create messages array in the format expected by your backend
            const messagesForAPI = [
                ...messages.map(msg => ({
                    role: msg.role === 'bot' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: inputMessage.trim() }]
                }
            ];

            const response = await axiosClient.post('/ai/chat', {
                messages: messagesForAPI,
                title: 'LeetCode Platform Support',
                description: 'User is asking for help with LeetCode platform, account issues, or general support questions.',
                testcases: 'N/A - Support Request',
                startcode: 'N/A - Support Request'
            });

            const botMessage = {
                role: 'bot',
                content: response.data.message,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'bot',
                content: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact support directly.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: 'bot',
                content: 'Hello! I\'m your LeetCode support assistant. How can I help you today?',
                timestamp: new Date()
            }
        ]);
    };

    const formatMessage = (content) => {
        // Simple formatting for better readability
        return content.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < content.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className="relative">
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">LeetCode Support</h3>
                                    <p className="text-slate-400 text-xs">Online now</p>
                                </div>
                            </div>
                            <button
                                onClick={clearChat}
                                className="text-slate-400 hover:text-white transition-colors text-xs"
                            >
                                Clear Chat
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            message.role === 'user' 
                                                ? 'bg-cyan-500' 
                                                : 'bg-slate-700'
                                        }`}>
                                            {message.role === 'user' ? (
                                                <User size={16} className="text-white" />
                                            ) : (
                                                <Bot size={16} className="text-white" />
                                            )}
                                        </div>
                                        <div className={`px-3 py-2 rounded-2xl ${
                                            message.role === 'user'
                                                ? 'bg-cyan-500 text-white'
                                                : 'bg-slate-800 text-slate-200'
                                        }`}>
                                            <div className="text-sm whitespace-pre-wrap">
                                                {formatMessage(message.content)}
                                            </div>
                                            <div className={`text-xs mt-1 ${
                                                message.role === 'user' 
                                                    ? 'text-cyan-100' 
                                                    : 'text-slate-400'
                                            }`}>
                                                {message.timestamp.toLocaleTimeString([], { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                            <Bot size={16} className="text-white" />
                                        </div>
                                        <div className="bg-slate-800 px-3 py-2 rounded-2xl">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="text-slate-400 animate-spin" />
                                                <span className="text-slate-400 text-sm">Typing...</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-700">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-sm"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="p-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HelpChatBot;

