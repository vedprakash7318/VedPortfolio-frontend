import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ExperiencePage from './pages/ExperiencePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <Router>
          <div className="App_container min-h-screen text-white selection:bg-primary selection:text-white transition-colors duration-500 ease-in-out">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <WhatsAppButton />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
