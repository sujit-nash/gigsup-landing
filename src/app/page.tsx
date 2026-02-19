import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import VideoTransition from '@/components/VideoTransition'
import PersonaCards from '@/components/PersonaCards'
import HowItWorks from '@/components/HowItWorks'
import NetworkEcosystem from '@/components/NetworkEcosystem'
import JoinNetwork from '@/components/JoinNetwork'
import WhoItsFor from '@/components/WhoItsFor'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import LogoCarousel from '@/components/LogoCarousel'

const universityLogos = [
  // Row 1 — Major universities
  { name: 'University of Toronto', color: '#002A5C', initials: 'UofT' },
  { name: 'UBC', color: '#002145', initials: 'UBC' },
  { name: 'McGill University', color: '#ED1B2F', initials: 'McG' },
  { name: 'University of Alberta', color: '#007C41', initials: 'UofA' },
  { name: 'University of Waterloo', color: '#FFD54F', initials: 'UW' },
  { name: "Queen's University", color: '#B90E31', initials: 'QU' },
  { name: 'Western University', color: '#4F2683', initials: 'WU' },
  // Row 2 — More universities
  { name: 'Simon Fraser University', color: '#CC0633', initials: 'SFU' },
  { name: 'University of Calgary', color: '#CF0722', initials: 'UCal' },
  { name: 'York University', color: '#E31837', initials: 'YU' },
  { name: 'University of Ottawa', color: '#8F001A', initials: 'UOtt' },
  { name: 'Dalhousie University', color: '#FFD100', initials: 'Dal' },
  { name: 'University of Victoria', color: '#005493', initials: 'UVic' },
  { name: 'Toronto Metropolitan University', color: '#004C9B', initials: 'TMU' },
  // Row 3 — BC colleges
  { name: 'Alexander College', color: '#1B3A6B', initials: 'AC' },
  { name: 'BCIT', color: '#003C71', initials: 'BCIT' },
  { name: 'UCW', color: '#1E3A5F', initials: 'UCW' },
  { name: 'Langara College', color: '#E4002B', initials: 'LC' },
  { name: 'Douglas College', color: '#003DA5', initials: 'DC' },
  { name: 'Capilano University', color: '#00529B', initials: 'CapU' },
  { name: 'Kwantlen Polytechnic', color: '#00704A', initials: 'KPU' },
]

const employerLogos = [
  'Accelerate Okanagan',
  'Spring',
  'M51 Accelerator',
  'NVIDIA Inception',
  'Virtual Trade Accelerator',
  'NRC IRAP',
  'Mitacs',
  'BCIT',
  'UCW',
]

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <VideoTransition />
      <Navigation />
      <Hero />
      <NetworkEcosystem />
      <PersonaCards />
      <HowItWorks />
      <LogoCarousel
        id="universities"
        heading="Connecting Students Across Canada"
        logos={universityLogos}
        direction="left"
        speed="normal"
        rows={3}
      />
      <JoinNetwork />
      <LogoCarousel
        id="supporters"
        eyebrow="Our Partners"
        heading="Supported By"
        logos={employerLogos}
        direction="right"
        speed="normal"
      />
      <WhoItsFor />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
