import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaPalette, FaFont, FaCog, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitcher = () => {
    const { theme, setTheme, font, setFont } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'default', name: 'Cosmic', color: '#3b82f6' },
        { id: 'emerald', name: 'Nature', color: '#10b981' },
        { id: 'sunset', name: 'Sunset', color: '#f97316' },
        { id: 'ocean', name: 'Ocean', color: '#0ea5e9' },
        { id: 'cyber', name: 'Cyber', color: '#d946ef' },
    ];

    const fonts = [
        { id: 'sans', name: 'Modern Sans' },
        { id: 'serif', name: 'Elegant Serif' },
        { id: 'mono', name: 'Coding Mono' },
        { id: 'system', name: 'System UI' },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-full shadow-lg border border-slate-700 transition-all hover:rotate-90 hover:scale-110"
            >
                {isOpen ? <FaTimes /> : <FaCog />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl w-72"
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <FaPalette /> Color Theme
                        </h3>

                        {/* Mode Toggle */}
                        <div className="flex items-center justify-between mb-4 bg-slate-800 p-2 rounded-lg">
                            <span className="text-sm text-gray-300">Dark Mode</span>
                            <button
                                onClick={() => {
                                    document.body.classList.toggle('light-mode');
                                    // Optionally save preference to localStorage or Context
                                }}
                                className="w-12 h-6 bg-slate-600 rounded-full relative transition-colors focus:outline-none"
                            >
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform transform translate-x-0 light-mode:translate-x-6" />
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${theme === t.id ? 'border-white scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: t.color }}
                                    title={t.name}
                                />
                            ))}
                        </div>

                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <FaFont /> Typography
                        </h3>
                        <div className="space-y-2">
                            {fonts.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFont(f.id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${font === f.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'}`}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSwitcher;
