import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';

import { Spinner } from '../Loaders';

const ExperienceSection = () => {
    const { data: experiences, loading } = useFetch('/api/experience');

    if (loading) return <div className="py-20"><Spinner /></div>;

    return (
        <section className="py-20 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        My Journey
                    </h2>
                    <p className="text-gray-400">Professional Timeline</p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30"></div>

                    <div className="space-y-12">
                        {(Array.isArray(experiences) ? experiences : []).map((exp, index) => (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 mt-6"></div>

                                {/* Content Card */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors shadow-lg backdrop-blur-sm group">
                                        <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-3 border border-blue-500/20">
                                            {exp.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                                            {exp.jobTitle}
                                        </h3>
                                        <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-800/50">
                                            {exp.duration}
                                        </p>
                                    </div>
                                </div>

                                {/* Empty space for the other side in desktop view */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
