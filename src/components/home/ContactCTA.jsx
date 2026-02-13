import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-blue-600/10 border border-blue-500/30 rounded-3xl p-12 backdrop-blur-sm"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Have a project in mind?
                    </h2>
                    <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                        Let's collaborate and bring your ideas to life. I'm currently available for freelance projects.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
                    >
                        Let's Talk
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactCTA;
