import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TerminalHero from './components/TerminalHero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './pages/CaseStudy';

function AppContent() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isCaseStudy = location.pathname.startsWith('/project/');

  return (
    <div className="min-h-screen">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Routes>
        <Route path="/" element={
          <main>
            <TerminalHero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        } />
        <Route path="/project/:slug" element={<CaseStudy />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
