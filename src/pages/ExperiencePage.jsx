import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { Spinner } from '../components/Loaders';

const ExperiencePage = () => {
    const { data: experiences, loading } = useFetch('http://localhost:5000/api/experience');

    if (loading) return <div className="pt-32 flex justify-center"><Spinner /></div>;

    return (
        <div className="ExperiencePage_container pt-24 px-4 max-w-6xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Experience & Education
                </h1>
                <p className="text-gray-400">My professional journey so far.</p>
            </motion.div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 transform md:-translate-x-1/2"></div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp._id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="hidden md:block w-1/2"></div>

                            {/* Icon Logic: Using briefcases for all for now, logic needed for education distinction */}
                            <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-slate-900 z-10 transform -translate-x-1/2 flex items-center justify-center text-white text-xs">
                                <FaBriefcase />
                            </div>

                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors shadow-lg relative">
                                    {/* Arrow for Desktop */}
                                    <div className={`hidden md:block absolute top-6 ${index % 2 === 0 ? 'right-full border-r-slate-800' : 'left-full border-l-slate-800'} w-4 h-4 border-8 border-transparent`}></div>

                                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded-full mb-3">
                                        {exp.year} | {exp.duration}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.jobTitle}</h3>
                                    <h4 className="text-lg text-gray-400 mb-4">{exp.company}</h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;
