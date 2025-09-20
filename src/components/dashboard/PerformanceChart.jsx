import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BarChart3 } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

// Custom Tooltip for the chart for a more branded look
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 backdrop-blur-md shadow-lg">
                <p className="label text-sm text-cyan-400">{`${label}`}</p>
                <p className="intro text-sm text-white">{`Submissions : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

function PerformanceChart({ data }) {
    return (
        <motion.div
            variants={cardVariants}
            className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl h-full"
            whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-cyan-400" size={20} />
                <h3 className="font-bold text-white">7-Day Performance</h3>
            </div>
            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="name" 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            width={20}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                            type="monotone" 
                            dataKey="submissions" 
                            stroke="#22d3ee" 
                            strokeWidth={2} 
                            fillOpacity={1} 
                            fill="url(#chartGradient)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export default PerformanceChart;