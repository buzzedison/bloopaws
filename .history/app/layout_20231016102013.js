import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import TidioChat from './components/TidioChat';
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
