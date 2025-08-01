
import HeroSection from "./components/HeroTransform";
import ChallengeSolution from "./components/Pitch"
import WhatSetsUsApart from "./components/WhatSetsUsApart";
import CallToAction from "./components/CallToAction";

export default function Page() {
    return (
      <main>
        <HeroSection />
        <ChallengeSolution/>
        <WhatSetsUsApart/>
        <CallToAction/>
        {/* Render other components or content here */}
      </main>
    );
  }