import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ✅ THIS WAS MISSING IN YOUR FILE
// We define the font here so we can use it below
const epicPro = localFont({
    src: [
        {
            path: "../fonts/epic.ttf", // Make sure your file is named epic.ttf in src/fonts
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-epic",
});

export const metadata: Metadata = {
    title: "Konark 2025",
    description: "The Annual Tech Fest of GJUS&T",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // ✅ Added suppressHydrationWarning to <html lang="en"> to fix the browser extension error
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={`${epicPro.variable} antialiased font-sans`}
            suppressHydrationWarning={true}
        >
        {children}
        </body>
        </html>
    );
}