import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import VideoTransition from '@/components/VideoTransition'
import PersonaCards from '@/components/PersonaCards'
import HowItWorks from '@/components/HowItWorks'
import NetworkEcosystem from '@/components/NetworkEcosystem'
import WhoItsFor from '@/components/WhoItsFor'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

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
      <WhoItsFor />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
