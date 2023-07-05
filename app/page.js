import GoalsSection from "./components/Goals";
import Hero from "./components/Hero";
import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/Products";


export default function Home() {
  return (
   <>
   <div>
    <Navbar/>
  <Hero/>
  <Logo/>

<IdeaToCompanySection/>
<GoalsSection/>
<ProductsSection/>
   </div>
   </>
  )
}
