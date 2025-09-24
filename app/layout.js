import './globals.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import TidioChat from './components/TidioChat';
import GoogleAnalytics from "../app/components/GoogleAnalytics";
// Metadata is imported via the export const metadata object below

export const metadata = {
  title: 'Bloop Global LLC',
  description: 'Turning Ideas into Businesses'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      {process.env.NEXT_PUBLIC_GA_ID ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
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
