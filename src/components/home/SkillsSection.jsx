import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaAws, FaFigma } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiNextdotjs, SiGreensock, SiExpress, SiRedux, SiFirebase, SiPhp, SiC } from 'react-icons/si';

const staticSkills = [
    { name: 'React', icon: <FaReact className="text-blue-400" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
    { name: 'Express', icon: <SiExpress className="text-white" /> },
    { name: 'PHP Core', icon: <SiPhp className="text-indigo-400" /> },
    { name: 'C Programming', icon: <SiC className="text-blue-500" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'Redux', icon: <SiRedux className="text-purple-500" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
    { name: 'GSAP', icon: <SiGreensock className="text-green-400" /> },
    { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    { name: 'Figma', icon: <FaFigma className="text-purple-400" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'Git', icon: <FaGitAlt className="text-red-500" /> },
    { name: 'SQL', icon: <FaDatabase className="text-gray-400" /> },
];

const SkillsSection = () => {
    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-gray-400">Technologies I work with</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {staticSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10, rotate: 5 }}
                            className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-750 transition-all flex flex-col items-center gap-3 w-32 md:w-40 shadow-lg group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl filter drop-shadow-md">
                                {skill.icon}
                            </div>
                            <span className="text-gray-300 font-medium text-center">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
