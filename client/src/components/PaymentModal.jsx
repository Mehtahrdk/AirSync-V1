import React, { useState, useEffect } from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
    const [status, setStatus] = useState('processing'); // processing, success

    useEffect(() => {
        if (isOpen) {
            setStatus('processing');
            // Simulate 2-second bank delay
            const timer = setTimeout(() => {
                setStatus('success');
                // Auto-close after success
                setTimeout(() => {
                    onConfirm(); 
                }, 1500);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
                
                {status === 'processing' ? (
                    <div className="animate-pulse">
                        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-white mb-2">Processing Payment</h2>
                        <p className="text-slate-400 text-sm">Contacting Secure Gateway...</p>
                    </div>
                ) : (
                    <div className="animate-bounce-in">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl text-white">✓</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Payment Approved!</h2>
                        <p className="text-slate-400 text-sm">Redirecting...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;