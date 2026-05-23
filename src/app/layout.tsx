import "./globals.css";
import Navbar from "@/components/common/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,rgba(55,89,132,0.55),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(35,59,93,0.4),transparent_25%),linear-gradient(180deg,#15304e_0%,#0e1f35_40%,#0b1726_100%)] text-slate-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
