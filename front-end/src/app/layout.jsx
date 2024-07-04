import "./globals.css";
import Banner from '@/components/Banner';

export const metadata = {
  title: "Esef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/upe_logo_quadrada.png" />
      </head>
      
      <body>{children}</body>
    </html>
  );
}
