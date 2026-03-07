import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { FaCode, FaPaintBrush, FaServer, FaMobileAlt, FaDatabase, FaDesktop } from 'react-icons/fa';

// Map icon string to component
const getIcon = (iconName, title) => {
    const iconMap = {
        'FaCode': <FaCode />,
        'FaPaintBrush': <FaPaintBrush />,
        'FaServer': <FaServer />,
        'FaMobileAlt': <FaMobileAlt />,
        'FaDatabase': <FaDatabase />,
        'FaDesktop': <FaDesktop />,
    };

    if (iconName && iconMap[iconName]) {
        return iconMap[iconName];
    }

    // Fallback/Mapping based on title Keyords from user request
    if (title) {
        const lowerTitle = title.toLowerCase();
        // User requested mapping:
        // ERP -> FaDatabase
        // Software -> FaDesktop
        // Mobile -> FaMobileAlt
        // Web -> FaCode 
        if (lowerTitle.includes('erp')) return <FaDatabase />;
        if (lowerTitle.includes('software')) return <FaDesktop />;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return <FaMobileAlt />;
        if (lowerTitle.includes('web')) return <FaCode />;
    }

    return <FaCode />;
};

import { SkeletonCard } from '../Loaders';

const ServicesSection = () => {
    const { data: services, loading } = useFetch('/api/services');

    if (loading) {
        return (
            <section className="py-20 bg-slate-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-slate-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        What I Do
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
                        >
                            <div className="text-4xl text-blue-500 mb-6 bg-slate-900 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                                {getIcon(service.icon, service.title)}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
