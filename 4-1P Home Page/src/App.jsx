import HeaderBar from './components/HeaderBar';
import Hero from './components/Hero';
import CardGrid from './components/CardGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { articles, tutorials } from './data';

export default function App() {
  return (
    <>
      <HeaderBar />
      <Hero />
      <CardGrid title="Featured Articles" items={articles} />
      <CardGrid title="Featured Tutorials" items={tutorials} />
      <Newsletter />
      <Footer />
    </>
  );
}
