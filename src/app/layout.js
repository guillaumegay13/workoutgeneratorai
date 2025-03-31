import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OnboardingProvider } from '@/app/context/OnboardingContext';
import { AuthProvider } from '@/app/context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Workout Generator | Personalized Fitness Plans",
  description: "Get personalized workout plans in seconds with our AI-powered fitness generator. Create the perfect routine based on your goals and preferences.",
  keywords: "workout generator, AI fitness, personalized workouts, custom fitness plan, workout routine generator",
  openGraph: {
    title: "AI Workout Generator | Personalized Fitness Plans",
    description: "Get personalized workout plans in seconds with our AI-powered generator.",
    url: "https://ai-workout-generator.com",
    siteName: "AI Workout Generator",
    images: [
      {
        url: "https://ai-workout-generator.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Workout Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <OnboardingProvider>
            {children}
          </OnboardingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
