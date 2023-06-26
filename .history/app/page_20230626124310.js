import GoalsSection from "./components/Goals";
import Hero from "./components/Hero";
import Logo from "./components/LogoSection";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
   <>
   <div>
    <Navbar/>
  <Hero/>
  <Logo/>
<GoalsSection/>
   </div>
   </>
  )
}
