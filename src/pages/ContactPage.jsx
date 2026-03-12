import { useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext'; // Import hook
import SEO from '../components/SEO';

const ContactPage = () => {
    const { settings } = useSettings(); // Get settings
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', // Added phone
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await API.post('/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' }); // Reset phone too
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="ContactPage_container pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <SEO 
                title="Contact Ved Prakash | MERN Stack Developer"
                description="Get in touch with Ved Prakash for freelance web development projects, cybersecurity consultations, or programming mentorship."
            />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Get In Touch
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-900/50 p-3 rounded-lg text-blue-400 text-xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="text-gray-300 font-medium">Email</h4>
                                    <p className="text-blue-400 break-all">{settings?.email || 'contact@example.com'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-900/50 p-3 rounded-lg text-blue-400 text-xl">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4 className="text-gray-300 font-medium">Phone</h4>
                                    <p className="text-gray-400">{settings?.phone || '+91 123 456 7890'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-900/50 p-3 rounded-lg text-blue-400 text-xl">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="text-gray-300 font-medium">Location</h4>
                                    <p className="text-gray-400">Remote / India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder or integrated map */}
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 h-64 overflow-hidden relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15081.666993883777!2d72.87765585!3d19.0760905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709664555555!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800 p-8 rounded-2xl border border-slate-700"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${status === 'success'
                                ? 'bg-green-600 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25'
                                }`}
                        >
                            {status === 'loading' ? (
                                <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                            ) : status === 'success' ? (
                                <>Message Sent <FaCheck /></>
                            ) : (
                                <>Send Message <FaPaperPlane /></>
                            )}
                        </button>
                        {status === 'error' && (
                            <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
