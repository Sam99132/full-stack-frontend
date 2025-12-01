import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata = {
    title: 'Novacart',
    description: 'A full-stack e-commerce application',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.className} ${geistMono.className} font-sans antialiased`}>
                <Navbar />
                {children}
                <Footer />
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
