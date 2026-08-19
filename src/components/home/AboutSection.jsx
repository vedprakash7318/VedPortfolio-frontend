import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800" id="about">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
                        About Ved Prakash
                    </h2>
                    <div className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6 text-left">
                        <p>
                            I am Ved Prakash, a Software Developer and MERN Stack Developer focused on building scalable and user-friendly web applications.
                        </p>
                        <p>
                            I work with JavaScript, React.js, Node.js, Express.js and MongoDB to develop full-stack applications, business software and custom digital solutions. My goal is to deliver high-performance applications that provide real business value.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
