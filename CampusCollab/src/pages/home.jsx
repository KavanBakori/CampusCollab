import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home({user, setUser}) {
  return (
    <div className="App">
      <Hero user={user} setUser={setUser} />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
