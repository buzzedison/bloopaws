
import GoalsSection from "./components/Goals";
import Hero from "./components/Hero";
// import HomePage from "./components/HeroHead";
import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";

// import ProductsSection from "./components/Products";


export default function Home() {
  return (
   <>
   <div>
   <Hero/>

    {/* <HomePage/> */}

  <Logo/>

<IdeaToCompanySection/>
<GoalsSection/>
{/* <ProductsSection/> */}


   </div>
   </>
  )
}
