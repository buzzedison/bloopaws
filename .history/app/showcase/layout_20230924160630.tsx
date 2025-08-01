import "./globals.css";

import NavbarNew from "./components/NavbarNew";

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable developer projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <NavbarNew />
        <main>
          {children}
        </main>
    
      </body>
    </html>
  );
}