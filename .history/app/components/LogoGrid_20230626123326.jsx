import Image from 'next/image'

// An array of logo objects with src and alt properties
const logos = [
  { src: '/images/unfpa.png', alt: 'Logo 1' },
  { src: '/images/taskwit.png', alt: 'Logo 2' },
  { src: '/images/loudspeakerwebp', alt: 'Logo 3' },
  { src: '/logo4.png', alt: 'Logo 4' },
  { src: '/logo5.png', alt: 'Logo 5' },
]

// A functional component that renders a grid of logos
export default function LogoGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Some logos</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {logos.map((logo) => (
          <div key={logo.src} className="flex items-center justify-center">
            <Image src={logo.src} alt={logo.alt} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
