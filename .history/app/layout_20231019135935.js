import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import TidioChat from './components/TidioChat';
import GoogleAnalytics from "../app/GoogleAnalytics";
const pop = Poppins({ 
  subsets: ['latin'] ,
  weight:["400", "500", "600"]
})

export const metadata = {
  title: 'Bloop Global LLC',
  description: 'Turning Ideas into Businesses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pop.className}>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
        <Navbar/>
        <main>
        <TidioChat />
        {children}
        </main>
     
        <Footer/>
        
        </body>
    </html>
  )
}
