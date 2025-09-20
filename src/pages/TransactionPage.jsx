import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    DollarSign, CreditCard, Download, Filter, Search, 
    Calendar, TrendingUp, TrendingDown, CheckCircle, 
    XCircle, Clock, Eye, FileText, ArrowUpDown
} from 'lucide-react';
import Header from '../components/dashboard/Header';
import axiosClient from '../utils/axiosClient';

function TransactionPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/transactions');
                setTransactions(response.data || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                // Mock data for development
                const mockTransactions = [
                    {
                        id: 1,
                        type: 'Premium Subscription',
                        amount: 9.99,
                        status: 'completed',
                        date: '2024-01-15T10:30:00Z',
                        description: 'Monthly premium subscription',
                        category: 'subscription'
                    },
                    {
                        id: 2,
                        type: 'Contest Entry',
                        amount: 2.99,
                        status: 'completed',
                        date: '2024-01-10T14:20:00Z',
                        description: 'Weekly coding contest entry',
                        category: 'contest'
                    },
                    {
                        id: 3,
                        type: 'Premium Subscription',
                        amount: 9.99,
                        status: 'completed',
                        date: '2023-12-15T09:15:00Z',
                        description: 'Monthly premium subscription',
                        category: 'subscription'
                    },
                    {
                        id: 4,
                        type: 'Contest Entry',
                        amount: 2.99,
                        status: 'pending',
                        date: '2024-01-20T16:45:00Z',
                        description: 'Weekly coding contest entry',
                        category: 'contest'
                    },
                    {
                        id: 5,
                        type: 'Refund',
                        amount: -9.99,
                        status: 'completed',
                        date: '2023-11-15T11:30:00Z',
                        description: 'Premium subscription refund',
                        category: 'refund'
                    }
                ];
                setTransactions(mockTransactions);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-400" />;
            case 'pending':
                return <Clock size={16} className="text-yellow-400" />;
            case 'failed':
                return <XCircle size={16} className="text-red-400" />;
            default:
                return <Clock size={16} className="text-slate-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-400';
            case 'pending':
                return 'text-yellow-400';
            case 'failed':
                return 'text-red-400';
            default:
                return 'text-slate-400';
        }
    };

    const getAmountColor = (amount) => {
        return amount > 0 ? 'text-red-400' : 'text-green-400';
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = filter === 'all' || transaction.status === filter;
        const matchesSearch = searchTerm === '' || 
            transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalSpent = transactions
        .filter(t => t.status === 'completed' && t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalRefunded = transactions
        .filter(t => t.status === 'completed' && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-slate-400">Loading transactions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
                            <p className="text-slate-400">View your payment and subscription history</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors">
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                <TrendingDown size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</div>
                                <div className="text-slate-400 text-sm">Total Spent</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                <TrendingUp size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">${totalRefunded.toFixed(2)}</div>
                                <div className="text-slate-400 text-sm">Total Refunded</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                <FileText size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{transactions.length}</div>
                                <div className="text-slate-400 text-sm">Total Transactions</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search transactions..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-700">
                        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                    </div>
                    
                    <div className="divide-y divide-slate-700">
                        {filteredTransactions.length === 0 ? (
                            <div className="p-8 text-center">
                                <FileText size={48} className="mx-auto mb-4 text-slate-600" />
                                <h3 className="text-lg font-semibold text-white mb-2">No transactions found</h3>
                                <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                            </div>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                                                <DollarSign size={20} className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{transaction.type}</h4>
                                                <p className="text-slate-400 text-sm">{transaction.description}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar size={14} className="text-slate-500" />
                                                    <span className="text-slate-500 text-xs">
                                                        {new Date(transaction.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className={`text-lg font-bold ${getAmountColor(transaction.amount)}`}>
                                                {transaction.amount > 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                {getStatusIcon(transaction.status)}
                                                <span className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TransactionPage;
