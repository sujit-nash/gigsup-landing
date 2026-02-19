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
import PartnerWall from '@/components/PartnerWall'

const universityLogos = [
  // Row 1 — Major universities
  { name: 'University of Toronto', color: '#002A5C', initials: 'UofT', logo: '/logos/universities/uoft.png' },
  { name: 'UBC', color: '#002145', initials: 'UBC', logo: '/logos/universities/ubc.png' },
  { name: 'McGill University', color: '#ED1B2F', initials: 'McG', logo: '/logos/universities/mcgill.png' },
  { name: 'University of Alberta', color: '#007C41', initials: 'UofA', logo: '/logos/universities/uofa.png' },
  { name: 'University of Waterloo', color: '#FFD54F', initials: 'UW', logo: '/logos/universities/waterloo.png' },
  { name: "Queen's University", color: '#B90E31', initials: 'QU', logo: '/logos/universities/queens.png' },
  { name: 'Western University', color: '#4F2683', initials: 'WU', logo: '/logos/universities/western.png' },
  // Row 2 — More universities
  { name: 'Simon Fraser University', color: '#CC0633', initials: 'SFU', logo: '/logos/universities/sfu.png' },
  { name: 'University of Calgary', color: '#CF0722', initials: 'UCal', logo: '/logos/universities/ucalgary.png' },
  { name: 'York University', color: '#E31837', initials: 'YU', logo: '/logos/universities/york.png' },
  { name: 'University of Ottawa', color: '#8F001A', initials: 'UOtt', logo: '/logos/universities/uottawa.png' },
  { name: 'Dalhousie University', color: '#FFD100', initials: 'Dal', logo: '/logos/universities/dal.png' },
  { name: 'University of Victoria', color: '#005493', initials: 'UVic', logo: '/logos/universities/uvic.png' },
  { name: 'Toronto Metropolitan University', color: '#004C9B', initials: 'TMU', logo: '/logos/universities/tmu.png' },
  // Row 3 — BC colleges
  { name: 'Alexander College', color: '#1B3A6B', initials: 'AC', logo: '/logos/universities/alexander.png' },
  { name: 'BCIT', color: '#003C71', initials: 'BCIT', logo: '/logos/universities/bcit.png' },
  { name: 'UCW', color: '#1E3A5F', initials: 'UCW', logo: '/logos/universities/ucw.png' },
  { name: 'Langara College', color: '#E4002B', initials: 'LC', logo: '/logos/universities/langara.png' },
  { name: 'Douglas College', color: '#003DA5', initials: 'DC', logo: '/logos/universities/douglas.png' },
  { name: 'Capilano University', color: '#00529B', initials: 'CapU', logo: '/logos/universities/capu.png' },
  { name: 'Kwantlen Polytechnic', color: '#00704A', initials: 'KPU', logo: '/logos/universities/kpu.png' },
]

const employerLogos = [
  { name: 'RBC', logo: '/logos/employers/rbc.png' },
  { name: 'CIBC', logo: '/logos/employers/cibc.png' },
  { name: 'Scotiabank', logo: '/logos/employers/scotiabank.png' },
  { name: 'Desjardins', logo: '/logos/employers/desjardins.png' },
  { name: 'Air Canada', logo: '/logos/employers/aircanada.png' },
  { name: 'Shopify', logo: '/logos/employers/shopify.png' },
  { name: 'OpenText', logo: '/logos/employers/opentext.png' },
  { name: 'Loblaw', logo: '/logos/employers/loblaw.png' },
  { name: 'Maple Leaf Foods', logo: '/logos/employers/mapleleaf.png' },
  { name: 'BC Hydro', logo: '/logos/employers/bchydro.png' },
  { name: 'Telus', logo: '/logos/employers/telus.png' },
  { name: 'TD Bank', logo: '/logos/employers/td.png' },
  { name: 'BMO', logo: '/logos/employers/bmo.png' },
  { name: 'Rogers', logo: '/logos/employers/rogers.png' },
  { name: 'Manulife', logo: '/logos/employers/manulife.png' },
  { name: 'Sun Life', logo: '/logos/employers/sunlife.png' },
  { name: 'Lululemon', logo: '/logos/employers/lululemon.png' },
  { name: 'BlackBerry', logo: '/logos/employers/blackberry.png' },
  { name: 'Canadian Tire', logo: '/logos/employers/canadiantirecorp.png' },
  { name: 'Enbridge', logo: '/logos/employers/enbridge.png' },
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
        eyebrow="Across Campuses"
        heading="Empowering students across Canada"
        logos={universityLogos}
        direction="left"
        speed="normal"
        rows={3}
      />
      <JoinNetwork />
      <LogoCarousel
        id="employers"
        eyebrow="Employer Network"
        heading="Leading employers across Canada"
        logos={employerLogos}
        direction="right"
        speed="normal"
      />
      <WhoItsFor />
      <Pricing />
      <PartnerWall />
      <Footer />
    </>
  )
}
