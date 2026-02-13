import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaPaperPlane, FaCheck } from 'react-icons/fa';

const ReviewModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('http://localhost:5000/api/reviews', formData);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', rating: 5, comment: '' });
                onClose();
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[var(--bg-card)] border border-slate-700 w-full max-w-md p-8 rounded-2xl relative shadow-2xl"
                        style={{ backgroundColor: 'var(--bg-card)' }}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <FaTimes />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">Write a Review</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/20 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className={`text-2xl transition-transform hover:scale-110 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Comment</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.comment}
                                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-black/20 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                    placeholder="Share your experience..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${status === 'success' ? 'bg-green-600 text-white' : 'bg-primary hover:bg-secondary text-white'
                                    }`}
                            >
                                {status === 'loading' ? 'Submitting...' : status === 'success' ? <>Submitted <FaCheck /></> : <>Submit Review <FaPaperPlane /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
