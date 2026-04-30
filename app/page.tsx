import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import WorkSection from '@/components/WorkSection'
import PhilosophySection from '@/components/PhilosophySection'
import ServicesSection from '@/components/ServicesSection'
import StatsSection from '@/components/StatsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return <main><Navbar /><Hero /><Marquee /><WorkSection /><PhilosophySection /><ServicesSection /><StatsSection /><ContactSection /></main>
}
