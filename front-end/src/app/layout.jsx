import "./globals.css";
import Banner from '@/components/Banner';

export const metadata = {
  title: "Esef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>{children}</body>
    </html>
  );
}
