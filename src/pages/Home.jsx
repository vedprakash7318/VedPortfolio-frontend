import { motion } from 'framer-motion';
import { PageLoader } from '../components/Loaders';
import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

import ProjectsSection from '../components/home/ProjectsSection';
import ServicesSection from '../components/home/ServicesSection';
import ExperienceSection from '../components/home/ExperienceSection';
import SkillsSection from '../components/home/SkillsSection';
import ReviewsSection from '../components/home/ReviewsSection';
import ContactCTA from '../components/home/ContactCTA';
import Button from '../components/ui/Button';

import { FaReact, FaNodeJs, FaDatabase, FaCode } from 'react-icons/fa';
import { SiJavascript, SiMongodb } from 'react-icons/si';
import SEO from '../components/SEO';

const Home = () => {
    const { settings, loading } = useSettings();
    const [roles, setRoles] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        if (settings?.roles) {
            const rolesArray = settings.roles.split(',').map(role => role.trim());
            setRoles(rolesArray);
        } else {
            setRoles(['Frontend Developer', 'Backend Developer', 'Full Stack Developer']);
        }
    }, [settings]);

    useEffect(() => {
        if (roles.length === 0) return;

        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setDisplayText(isDeleting
                ? fullText.substring(0, displayText.length - 1)
                : fullText.substring(0, displayText.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, roles, typingSpeed]);

    if (loading) return <PageLoader />;

    return (
        <div className="Home_container">
            <SEO
                title={`${settings?.heroTitle || 'Ved Prakash'} | MERN Stack Developer & Full Stack Developer`}
                description="Portfolio of Ved Prakash, a MERN Stack Developer, Cybersecurity Enthusiast, and Programming Mentor specializing in React, Node.js, and secure web applications."
                keywords="Ved Prakash, MERN Stack Developer, Cybersecurity, Programming Mentor, React Developer, Node.js Developer, Web Development India"
            />
            {/* Hero Section */}
            <section className="Home_heroSection min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 px-4 md:px-12 lg:px-20">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

                    {/* Left Column: Text */}
                    <div className="text-left order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-6"
                        >
                            👋 Welcome to my portfolio
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
                        >
                            <span className="block text-white mb-2 text-3xl md:text-5xl lg:text-6xl">{settings?.heroTitle || "Hey, I'm Ved Prakash"}</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 block min-h-[1.2em] text-2xl md:text-5xl lg:text-6xl">
                                {displayText}
                                <span className="animate-pulse text-gray-400">|</span>
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed"
                        >
                            {settings?.heroSubtitle || 'Full Stack Developer focused on building high-performance and user-centric digital products.'}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button href="/contact" variant="outline">
                                Contact Me
                            </Button>
                            {settings?.resumeLink && (
                                // <Button onClick={() => setIsResumeOpen(true)} variant="secondary">
                                //     Download CV
                                // </Button>
                                <></>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Image & Animation */}
                    <div className="relative flex justify-center items-center order-1 md:order-2 h-[400px] md:h-[600px]">
                        {/* Central Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-20 w-64 h-64 md:w-110 md:h-110"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <img
                                src={settings?.profileImage || 'https://via.placeholder.com/400'}
                                alt="Ved Prakash - Full Stack Developer & MERN Stack Expert Profile Photo"
                                title="Ved Prakash Profile - Software Developer"
                                className="w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl relative z-10 aspect-square"
                            />
                        </motion.div>

                        {/* Floating Icons Ring */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            {/* Orbit Animations */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-gray-800/50"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 p-3 rounded-xl border border-gray-700 text-blue-400 shadow-lg">
                                    <FaReact size={24} />
                                </div>
                                <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-gray-900 p-3 rounded-xl border border-gray-700 text-green-400 shadow-lg">
                                    <FaNodeJs size={24} />
                                </div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 p-3 rounded-xl border border-gray-700 text-yellow-400 shadow-lg">
                                    <SiJavascript size={24} />
                                </div>
                                <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-gray-900 p-3 rounded-xl border border-gray-700 text-green-600 shadow-lg">
                                    <SiMongodb size={24} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-gray-800/30 border-dashed"
                            >
                                <div className="absolute top-0 right-1/4 bg-gray-900 p-2 rounded-lg border border-gray-700 text-purple-400 shadow-lg">
                                    <FaCode size={20} />
                                </div>
                                <div className="absolute bottom-1/4 left-0 bg-gray-900 p-2 rounded-lg border border-gray-700 text-blue-300 shadow-lg">
                                    <FaDatabase size={20} />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>

                {/* Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                </div>
            </section>

            <div id="projects">
                <ProjectsSection />
            </div>
            <SkillsSection />
            <ServicesSection />
            <ExperienceSection />
            <ReviewsSection />
            <ContactCTA />

            {/* Resume Modal */}
            {isResumeOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 print:hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 w-full max-w-5xl h-[90vh] rounded-xl border border-gray-800 flex flex-col shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">My Resume</h2>
                            <button
                                onClick={() => setIsResumeOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 bg-gray-800 relative flex items-center justify-center">
                            {/* Fallback to simple object/embed which uses browser's native PDF viewer */}
                            <object
                                data={settings.resumeLink}
                                type="application/pdf"
                                className="w-full h-full"
                            >
                                <p className="text-center text-gray-400 p-8">
                                    Your browser does not support PDF embedding.
                                    <br />
                                    <a href={settings.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                                        Click here to view/download the PDF.
                                    </a>
                                </p>
                            </object>
                        </div>

                        <div className="p-4 border-t border-gray-800 flex justify-end gap-4 bg-gray-900">
                            {settings?.whatsapp && (
                                <a
                                    href={`https://wa.me/${settings.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    WhatsApp
                                </a>
                            )}
                            <a
                                href={settings.resumeLink}
                                download="Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
                            >
                                Download PDF
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Home;
