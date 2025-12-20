import React, { useState } from 'react';
import PaymentModal from './PaymentModal';
import { API_BASE_URL } from '../config'; // Import the modal

const FlightResult = ({ price, latency }) => {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [bookingStatus, setBookingStatus] = useState("idle"); 
    const [message, setMessage] = useState("");

    if (!price) return null;

    const initiateBooking = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Please Login first!");
            return;
        }
        // Open the fake payment gateway
        setIsPaymentOpen(true);
    };

    const finalizeBooking = async () => {
        setIsPaymentOpen(false); // Close modal
        setBookingStatus("loading");
        setMessage("Finalizing Booking...");

        // NOW call the backend to lock the seat
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('${API_BASE_URL}/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ flightId: 1, seatNo: "1A" })
            });

            const data = await response.json();

            if (data.success) {
                setBookingStatus("success");
                setMessage("Booking Confirmed! ✅");
            } else {
                setBookingStatus("error");
                setMessage(data.message || "Booking Failed");
            }
        } catch (error) {
            setBookingStatus("error");
            setMessage("Server Error");
        }
    };

    return (
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-sky-400/30 p-6 rounded-2xl animate-fade-in shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            <h3 className="text-xl text-slate-200 mb-2">Cheapest Flight Found</h3>
            <div className="flex items-end gap-4">
                <span className="text-5xl font-bold text-sky-400">₹{price}</span>
            </div>
            
            {/* ... (Keep your latency badges here) ... */}

            <button 
                onClick={initiateBooking}
                disabled={bookingStatus === "success"}
                className={`w-full mt-4 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] bg-gradient-to-r from-sky-500 to-blue-600 text-white`}
            >
                {bookingStatus === "success" ? "Booking Confirmed" : "Book Now"}
            </button>

            {message && <div className="mt-2 text-center text-sm font-bold text-sky-300">{message}</div>}

            {/* The Simulation Modal */}
            <PaymentModal 
                isOpen={isPaymentOpen} 
                onClose={() => setIsPaymentOpen(false)} 
                onConfirm={finalizeBooking} 
            />
        </div>
    );
};

export default FlightResult;