import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

const Services = dynamic(
  () => import('@/components/services').then((m) => ({ default: m.Services })),
  { ssr: true }
)
const About = dynamic(
  () => import('@/components/about').then((m) => ({ default: m.About })),
  { ssr: true }
)
const Testimonials = dynamic(
  () => import('@/components/testimonials').then((m) => ({ default: m.Testimonials })),
  { ssr: true }
)
const Contact = dynamic(
  () => import('@/components/contact').then((m) => ({ default: m.Contact })),
  { ssr: true }
)

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
