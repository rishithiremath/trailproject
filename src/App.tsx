import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollBackground3D from './components/ScrollBackground3D';
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
      <div className="relative min-h-screen bg-[#070612] text-white overflow-hidden">
        <ScrollBackground3D />
        <div className="relative z-10">
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
      </div>
    </>
  );
}

export default App;
