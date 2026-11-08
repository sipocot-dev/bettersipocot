import Hero from '../components/sections/Hero';
import WeatherSection from '../components/home/WeatherSection';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO />
      <main className="flex-grow">
        <Hero />
        <WeatherSection />
        <ServicesSection />
        <GovernmentActivitySection />
      </main>
    </>
  );
};

export default Home;
