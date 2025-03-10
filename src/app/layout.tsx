import Navbar from "../../components/ui/navbar"; // Import the Navbar component
import Footer from "../../components/ui/footer"; // Import the Footer component

import "@/app/globals.css"; // Global styles

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Travel Explorer</title>
        <meta name="description" content="Explore your dream destinations" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="sticky">
        <Navbar />
        </div>
        <div className="sticky">
        <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
