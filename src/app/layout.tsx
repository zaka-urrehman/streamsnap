import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner"
import ReactQueryProvider from "@/providers/react-query-provider";
import ReduxProvider from "@/providers/redux-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "StreamSnap",
    description: "An AI powered Instagram Automation platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={montserrat.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ReduxProvider>
                            <ReactQueryProvider>
                                {children}
                            </ReactQueryProvider>
                            <Toaster />
                        </ReduxProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
