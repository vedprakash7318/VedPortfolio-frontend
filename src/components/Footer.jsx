import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaPhoneAlt } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
    const { settings } = useSettings();

    return (
        <footer className="Footer_container bg-slate-950 border-t border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold text-gradient-theme mb-6">
                    {settings?.footerText || "Let's Build Something Amazing"}
                </h2>
                <div className="flex justify-center gap-6 mb-8">
                    {settings?.github && <a href={settings.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-2xl transition-colors"><FaGithub /></a>}
                    {settings?.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 text-2xl transition-colors"><FaLinkedin /></a>}
                    {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 text-2xl transition-colors"><FaInstagram /></a>}
                </div>
                <div className="flex justify-center items-center gap-2 mb-6 text-gray-300" itemScope itemType="http://schema.org/LocalBusiness">
                    <FaPhoneAlt className="text-green-500" />
                    <a href="tel:6307275065" itemProp="telephone" className="hover:text-green-400 transition-colors font-medium tracking-wider" aria-label="Call me at 6307275065">
                        +91 6307275065
                    </a>
                </div>
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    Made with <FaHeart className="text-red-500 animate-pulse" /> by Portfolio Admin
                </p>
                <div className="mt-4 text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
