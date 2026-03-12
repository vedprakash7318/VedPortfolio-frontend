import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { SkeletonCard } from '../components/Loaders';
import SEO from '../components/SEO';

const ProjectsPage = () => {
    const { data: projects, loading } = useFetch('/api/projects');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const projectsArray = Array.isArray(projects) ? projects : [];

    useEffect(() => {
        setFilteredProjects(projectsArray);
    }, [projects]);

    const categories = ['All', ...new Set(projectsArray.map(p => p.category))];

    const filterProjects = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProjects(projectsArray);
        } else {
            setFilteredProjects(projectsArray.filter(p => p.category === category));
        }
    };

    if (loading) return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
        </div>
    );

    return (
        <div className="ProjectsPage_container pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <SEO 
                title="Projects | Ved Prakash - Web & Mobile App Developer"
                description="Explore the portfolio projects by Ved Prakash, showcasing web applications built with the MERN stack, React Native, and focus on clean coding and performance."
            />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    My Projects
                </h1>
                <p className="text-gray-400">Explore my latest work and case studies.</p>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => filterProjects(category)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="h-56 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-3 mb-2">{project.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className="text-xs text-gray-500 bg-slate-900 px-2 py-1 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 bg-slate-800 p-2 rounded-full text-gray-400 hover:text-white z-10"
                            >
                                <FaTimes />
                            </button>

                            <div className="h-64 md:h-96 w-full relative">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                                        {selectedProject.title}
                                    </h2>
                                    <div className="flex gap-4">
                                        {selectedProject.liveLink && (
                                            <a
                                                href={selectedProject.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition-colors"
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                        {selectedProject.githubLink && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-2 rounded-full font-bold transition-colors"
                                            >
                                                <FaGithub /> Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags.map((tag, idx) => (
                                        <span key={idx} className="text-sm text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
                                    <p>{selectedProject.description}</p>
                                    {/* Placeholder for detailed content logic if added to backend later */}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsPage;
