import Footer from "./components/Footer";
import GoalsSection from "./components/Goals";
import Hero from "./components/Hero";
import HomePage from "./components/HeroHead";
import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";
import Navbar from "./components/Navbar";
// import ProductsSection from "./components/Products";


export default function Home() {
  return (
   <>
   <div>
    <Navbar/>
    <HomePage/>

  <Logo/>

<IdeaToCompanySection/>
<GoalsSection/>
{/* <ProductsSection/> */}
<Hero/>
<Footer/>
   </div>
   </>
  )
}
