import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import GridBackground from './components/GridBackground'
import NoiseOverlay from './components/NoiseOverlay'
import SectionGlow from './components/SectionGlow'
import Hero from './components/Hero'
import About from './components/About'
import FunnelChart from './components/FunnelChart'
import CampaignImpact from './components/CampaignImpact'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <ScrollProgress />
      <GridBackground />
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <SectionGlow index={0} />
      <About />
      <SectionGlow index={1} />
      <FunnelChart />
      <SectionGlow index={2} />
      <CampaignImpact />
      <SectionGlow index={3} />
      <Experience />
      <SectionGlow index={4} />
      <Projects />
      <SectionGlow index={5} />
      <Skills />
      <SectionGlow index={6} />
      <Education />
      <SectionGlow index={7} />
      <Contact />
      <Footer />
    </div>
  )
}
