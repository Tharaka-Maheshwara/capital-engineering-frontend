import "./globals.css";
import SiteChrome from "@/components/common/site-chrome";
import GoogleOAuthProviderShell from "@/components/common/google-oauth-provider";
import { defaultDescription, defaultKeywords, siteName, siteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,rgba(55,89,132,0.55),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(35,59,93,0.4),transparent_25%),linear-gradient(180deg,#15304e_0%,#0e1f35_40%,#0b1726_100%)] text-slate-100">
        <GoogleOAuthProviderShell>
          <SiteChrome>{children}</SiteChrome>
        </GoogleOAuthProviderShell>
      </body>
    </html>
  );
}
