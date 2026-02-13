import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { FaCode, FaPaintBrush, FaServer, FaMobileAlt, FaRocket, FaCogs } from 'react-icons/fa';
import { SkeletonCard } from '../components/Loaders';

const getIcon = (iconName) => {
    // Extended icon mapping
    const icons = {
        'FaCode': <FaCode />,
        'FaPaintBrush': <FaPaintBrush />,
        'FaServer': <FaServer />,
        'FaMobileAlt': <FaMobileAlt />,
        'FaRocket': <FaRocket />,
        'FaCogs': <FaCogs />
    };
    return icons[iconName] || <FaCode />;
};

const ServicesPage = () => {
    const { data: services, loading } = useFetch('http://localhost:5000/api/services');

    if (loading) return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
        </div>
    );

    return (
        <div className="ServicesPage_container pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    My Services
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    I offer a range of services to help you build your digital presence, from initial concept to final deployment.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col items-center text-center group"
                    >
                        <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-4xl text-blue-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg border border-slate-800">
                            {getIcon(service.icon)}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                        <button className="mt-auto px-6 py-2 border border-blue-500/30 text-blue-400 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-colors">
                            Learn More
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
