import MediaBrainHero from './components/MediaBrainHero'
import HowItWorks from './components/HowItWorks'
import OutputExamples from './components/OutputExamples'
import CreativeFormats from './components/CreativeFormats'
import WaitlistForm from './components/WaitlistForm'
import MediaBrainFAQ from './components/MediaBrainFAQ'
import MediaBrainCTA from './components/MediaBrainCTA'

export default function MediaBrainPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <MediaBrainHero />
      <HowItWorks />
      <OutputExamples />
      <CreativeFormats />
      <WaitlistForm />
      <MediaBrainFAQ />
      <MediaBrainCTA />
    </main>
  )
}
