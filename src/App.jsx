import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

const routes = { '/': Home, '/services': Services, '/about': About, '/contact': Contact };

export default function App() {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const onHash = () => {
      setPath(window.location.hash.replace('#', '') || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const Page = routes[path] ?? Home;

  return (
    <div className="min-h-screen flex flex-col bg-cream text-slate-800">
      <Navbar current={path} />
      <main className="flex-1">
        <Page />
      </main>
      <Footer />
    </div>
  );
}
