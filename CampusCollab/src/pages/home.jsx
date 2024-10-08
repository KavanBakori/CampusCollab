import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="App ">
      <Navbar/>
      <Hero  />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
