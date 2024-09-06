import HeroWeb from './components/Heroweb'
import HeroPortfolio from './components/HeroPortfolio'
import ProblemSection from './components/ProblemSection'
import ConversionChallenges from './components/ProblemSectionB'
import SolutionHead from './components/SolutionHead'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import FAQ from './components/Faqs'
import CTA from './components/Cta'

export default function Home() {
  return (
    <main>
      <HeroWeb />
      <HeroPortfolio />
      <ProblemSection />
      <ConversionChallenges />
      <SolutionHead />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      {/* Other content */}
    </main>
  );
}