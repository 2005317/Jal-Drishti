import type {Metadata} from 'next';
import './globals.css';
import { AppProvider } from '@/contexts/app-provider';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Jal Drishti',
  description: 'An intelligent water management and forecasting platform.',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <div className="fixed top-0 left-0 w-full h-full bg-background -z-10"></div>
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
