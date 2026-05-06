import "./globals.css";

export const metadata = {
  title: "Tanim Distribution",
  description: "Bangladesh's Trusted B2B Distributor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
