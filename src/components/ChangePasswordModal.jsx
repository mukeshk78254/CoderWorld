import React, { useState } from 'react';
import axiosClient from '../utils/axiosClient';

function ChangePasswordModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP & New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

    const clearState = () => {
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMessage(null);
        setLoading(false);
    };

    const handleSendOtp = async () => {
        if (!email) {
            setMessage({ type: 'error', text: "Please enter your email." });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            const res = await axiosClient.post('/auth/send-reset-otp', { emailId: email });
            setMessage({ type: 'success', text: res.data.message || "OTP sent to your email!" });
            setStep(2);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || "Failed to send OTP. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmNewPassword) {
            setMessage({ type: 'error', text: "Please fill all fields." });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setMessage({ type: 'error', text: "Passwords do not match." });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: "Password must be at least 6 characters long." });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            const res = await axiosClient.post('/auth/reset-password', {
                emailId: email,
                otp,
                newPassword
            });
            setMessage({ type: 'success', text: res.data.message || "Password reset successfully!" });
            setTimeout(() => {
                onClose();
                clearState(); // Reset modal state
            }, 1500); // Give user time to read success message
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || "Failed to reset password. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]">
            <div className="modal-box bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg text-white">
                <button
                    onClick={() => { onClose(); clearState(); }}
                    className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-700 border-gray-600 hover:bg-gray-600"
                >
                    ✕
                </button>
                <h3 className="font-bold text-3xl mb-6 text-center text-indigo-400">
                    {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                </h3>

                {message && (
                    <div className={`alert ${message.type === 'success' ? 'alert-success bg-emerald-700' : 'alert-error bg-red-700'} text-white mb-4 shadow-lg rounded-lg text-sm`}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={message.type === 'success' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2L8 10m8 4L10 10m0 0l-2 2m2-2L14 10m-2 2l2-2m-2 2l-2-2m-2 2m2-2m-2 2m2-2m-2 2m2-2M12 8V6m0 4V8m0 4v2m0 4v-2m0-4h2m-4 0H8m4 0h-2m2 0H8m4 0h2m-4 0H8m4 0z"}></path></svg>
                            <span>{message.text}</span>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <p className="text-gray-300 text-center mb-4 text-sm">
                            Enter your email address to receive an OTP for password reset.
                        </p>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white w-full mt-4"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Send OTP'}
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-gray-300 text-center mb-4 text-sm">
                            An OTP has been sent to <span className="font-bold text-indigo-400">{email}</span>.
                            Enter the OTP and your new password.
                        </p>
                        <input
                            type="text"
                            placeholder="OTP"
                            className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password (min 6 characters)"
                            className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white w-full mt-4"
                            onClick={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Reset Password'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChangePasswordModal;