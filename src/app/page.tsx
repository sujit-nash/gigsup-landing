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
  { name: 'University of Toronto', color: '#002A5C', logo: '/logos/universities/uoft.png', initials: 'UofT' },
  { name: 'UBC', color: '#002145', logo: '/logos/universities/ubc.png', initials: 'UBC' },
  { name: 'McGill University', color: '#ED1B2F', logo: '/logos/universities/mcgill.png', initials: 'McG' },
  { name: 'University of Alberta', color: '#007C41', logo: '/logos/universities/uofa.png', initials: 'UofA' },
  { name: 'University of Waterloo', color: '#FFD54F', logo: '/logos/universities/waterloo.png', initials: 'UW' },
  { name: "Queen's University", color: '#B90E31', logo: '/logos/universities/queens.png', initials: "QU" },
  { name: 'Western University', color: '#4F2683', logo: '/logos/universities/western.png', initials: 'WU' },
  { name: 'Dalhousie University', color: '#FFD100', logo: '/logos/universities/dalhousie.png', initials: 'Dal' },
  { name: 'Simon Fraser University', color: '#CC0633', logo: '/logos/universities/sfu.png', initials: 'SFU' },
  { name: 'University of Calgary', color: '#CF0722', logo: '/logos/universities/ucalgary.png', initials: 'UCal' },
  { name: 'York University', color: '#E31837', logo: '/logos/universities/york.png', initials: 'YU' },
  { name: 'University of Ottawa', color: '#8F001A', logo: '/logos/universities/uottawa.png', initials: 'UOtt' },
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
        heading="Trusted by Leading Universities"
        logos={universityLogos}
        direction="left"
        speed="normal"
        rows={2}
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
