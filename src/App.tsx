import { Hero } from "./components/sections/Hero";
import { Navbar } from "./components/layout/Navbar";
import { SpiderWeb } from "./components/layout/SpiderWeb";

function App() {
  return (
    <main className="landing-page" id="event">
      <SpiderWeb className="spider-web spider-web--left" />
      <SpiderWeb className="spider-web spider-web--right" />
      <div className="page-content">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}

export default App;
