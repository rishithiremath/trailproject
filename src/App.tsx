import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import Stats from './sections/Stats';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';

function App() {
  return (
    <>
      <Loader />
      <div className="min-h-screen bg-[#070612]">
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <Stats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default App;
