
import HeroSection from "./components/HeroTransform";
import ChallengeSolution from "./components/Pitch"
import WhatSetsUsApart from "./components/WhatSetsUsApart";

export default function Page() {
    return (
      <main>
        <HeroSection />
        <ChallengeSolution/>
        <WhatSetsUsApart/>
        {/* Render other components or content here */}
      </main>
    );
  }