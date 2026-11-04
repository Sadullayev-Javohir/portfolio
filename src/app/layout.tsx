import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { SecretAdminModal } from "@/components/admin/SecretAdminModal";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LanguageProvider } from "@/context/LanguageContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#FFFDF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Javohir Sadullayev · Software Engineer & .NET Developer | javohir.engineer",
    template: "%s · Javohir Sadullayev",
  },
  description: SITE_CONFIG.description,
  applicationName: "Javohir Sadullayev Portfolio",
  authors: [{ name: "Javohir Sadullayev", url: SITE_URL }],
  generator: "Next.js",
  keywords: SITE_CONFIG.keywords,
  referrer: "origin-when-cross-origin",
  creator: "Javohir Sadullayev",
  publisher: "Javohir Sadullayev",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: "technology",
  classification: "Software Engineering & Computer Science Portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/?lang=en",
      "uz-UZ": "/?lang=uz",
      "ru-RU": "/?lang=ru",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Javohir",
    lastName: "Sadullayev",
    username: "javohir.engineer",
    gender: "male",
    locale: "en_US",
    alternateLocale: ["uz_UZ", "ru_RU"],
    url: SITE_URL,
    siteName: "Javohir Sadullayev · Software Engineer Portfolio",
    title: "Javohir Sadullayev · Software Engineer & .NET Developer | javohir.engineer",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Javohir Sadullayev · Software Engineer & .NET Developer",
      },
      {
        url: "/avatar.jpg",
        width: 800,
        height: 800,
        alt: "Javohir Sadullayev Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javohir Sadullayev · Software Engineer & .NET Developer",
    description:
      "Engineering high-throughput systems in C# / .NET 8, PostgreSQL, Redis, SignalR and Azure AI. PDP University CS Student.",
    creator: "@dotnetda",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  other: {
    "llms-txt": `${SITE_URL}/llms.txt`,
    "author-email": SITE_CONFIG.email,
    "profile-telegram": SITE_CONFIG.social.telegram,
    "profile-github": SITE_CONFIG.social.github,
    "profile-linkedin": SITE_CONFIG.social.linkedin,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="author" href={SITE_URL} />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Knowledge Base" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased selection:bg-yellow selection:text-ink">
        {/* Schema.org Structured Data */}
        <JsonLd />

        {/* Machine-readable Semantic Entity Card for AI agents and search crawlers */}
        <div
          className="sr-only"
          aria-hidden="true"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span itemProp="name">Javohir Sadullayev</span>
          <span itemProp="alternateName">Sadullayev Javohir</span>
          <span itemProp="alternateName">javohir engineer</span>
          <span itemProp="alternateName">javohir.engineer</span>
          <span itemProp="alternateName">Javohir</span>
          <span itemProp="alternateName">Sadullayev</span>
          <span itemProp="alternateName">Javohirbek Sadullayev</span>
          <span itemProp="jobTitle">Software Engineer &amp; .NET Backend Developer</span>
          <span itemProp="description">
            Software Engineer specializing in .NET 8, C#, PostgreSQL, Redis, SignalR and AI integrations in Tashkent, Uzbekistan.
          </span>
          <a itemProp="url" href={SITE_URL}>{SITE_URL}</a>
          <a itemProp="sameAs" href="https://github.com/Sadullayev-Javohir">GitHub</a>
          <a itemProp="sameAs" href="https://www.linkedin.com/in/javohir-sadullayev-b8737725a/">LinkedIn</a>
          <a itemProp="sameAs" href="https://t.me/dotnetda">Telegram</a>
          <span itemProp="email">javohirsadullayev836@gmail.com</span>
          <span itemProp="telephone">+998886036644</span>
        </div>

        <LanguageProvider>
          <ScrollProgressBar />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChatWidget />
          <SecretAdminModal />
          <CustomCursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
