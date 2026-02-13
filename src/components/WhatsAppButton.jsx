import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const WhatsAppButton = () => {
    const { settings } = useSettings();

    if (!settings?.whatsapp) return null;

    // Remove non-numeric characters for the link
    const phoneNumber = settings.whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <AnimatePresence>
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-green-500/50 transition-shadow flex items-center justify-center cursor-pointer"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp size={32} />
                <span className="absolute left-full ml-3 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    Chat with me
                </span>
            </motion.a>
        </AnimatePresence>
    );
};

export default WhatsAppButton;
